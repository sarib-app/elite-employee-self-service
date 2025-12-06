# Integration Instructions for Request For Payment Permission Control

## Overview
This script restricts access to employee-submitted requests based on user roles:
- **Proj Coordinator** role: Can see ALL RFPs (including `employee_submitted: true`)
- **Other users**: Cannot see RFPs where `employee_submitted: true`

## Step 1: Add to Request For Payment Doctype Python File

Add the following code to your existing `request_for_payment.py` file in:
`apps/hr_services/hr_services/hr_services/doctype/request_for_payment/request_for_payment.py`

### Option A: Using Permission Query (Recommended - More Efficient)

Add this function to your `RequestForPayment` class or as a module-level function:

```python
def get_permission_query_conditions(user):
    """
    Add permission query conditions to filter Request For Payment records
    based on the employee_submitted field and user roles.
    """
    # Check if user has "Proj Coordinator" role
    user_roles = frappe.get_roles(user)
    has_proj_coordinator_role = "Proj Coordinator" in user_roles
    
    # If user has Proj Coordinator role, they can see all RFPs (no restriction)
    if has_proj_coordinator_role:
        return ""
    
    # For all other users, hide RFPs where employee_submitted = 1 (True)
    return """(`tabRequest For Payment`.employee_submitted = 0 OR `tabRequest For Payment`.employee_submitted IS NULL)"""
```

### Option B: Using has_permission Hook (More Granular Control)

Add this method to your `RequestForPayment(Document)` class:

```python
def has_permission(self, user, permission_type="read"):
    """
    Check if user has permission to access this Request For Payment document.
    """
    # Check if user has "Proj Coordinator" role
    user_roles = frappe.get_roles(user)
    has_proj_coordinator_role = "Proj Coordinator" in user_roles
    
    # Proj Coordinators can access all documents
    if has_proj_coordinator_role:
        return True
    
    # Other users cannot access documents where employee_submitted = True
    if self.employee_submitted == 1:
        return False
    
    # Other users can access documents where employee_submitted = False or NULL
    return True
```

## Step 2: Register the Permission Query (If using Option A)

In your `request_for_payment.py` file, you need to register the permission query. Add this at the module level:

```python
# Register permission query
frappe.permissions.add_permission_query_condition("Request For Payment", get_permission_query_conditions)
```

Or you can add it in the `hooks.py` file of your app:

```python
# In apps/hr_services/hr_services/hooks.py
permission_query_conditions = {
    "Request For Payment": "hr_services.hr_services.doctype.request_for_payment.request_for_payment.get_permission_query_conditions"
}
```

## Step 3: Restart ERPNext

After adding the code:
1. Restart your ERPNext bench
2. Clear cache: `bench clear-cache`
3. Reload doctype: `bench migrate` (if needed)

## Testing

1. **Test as Proj Coordinator:**
   - Login as a user with "Proj Coordinator" role
   - Should see ALL RFPs (both employee_submitted: true and false)

2. **Test as Regular User:**
   - Login as a user WITHOUT "Proj Coordinator" role
   - Should only see RFPs where employee_submitted: false or NULL
   - Should NOT see RFPs where employee_submitted: true

## Notes

- The permission query filters records at the database level, so it's secure and efficient
- This applies to all views: List View, Reports, API calls, etc.
- The `has_permission` method provides document-level control if needed
- Both methods can be used together for maximum security

