# Client Script Setup Instructions for Request For Payment

## How to Add Client Script in ERPNext UI

### Step 1: Navigate to Client Script
1. Go to **Customize** → **Client Script**
2. Click **New** to create a new Client Script

### Step 2: Fill in the Form
- **DocType**: `Request For Payment`
- **Apply To**: `List`
- **Enabled**: ✓ (checked)
- **Script**: Copy and paste the code from `CLIENT_SCRIPT_SIMPLE.js` (Recommended - simpler and more reliable)

**OR** use `CLIENT_SCRIPT_CODE.js` for more advanced filtering with onload/refresh hooks

### Step 3: Save
Click **Save** to save the Client Script

## What the Script Does

1. **Checks User Role**: On list load, checks if current user has "Proj Coordinator" role
2. **Applies Filter**: If user doesn't have the role, automatically adds a filter to hide records where `employee_submitted = 1` (True)
3. **Auto-Refresh**: Refreshes the list to apply the filter
4. **Role-Based Access**: 
   - **Proj Coordinator**: Sees ALL RFPs (no filter)
   - **Other Users**: Only see RFPs where `employee_submitted = 0` or `NULL`

## Alternative: Simpler Version (If above doesn't work)

If the filter method doesn't work as expected, use this simpler version:

```javascript
frappe.listview_settings['Request For Payment'] = {
    onload: function(listview) {
        frappe.call({
            method: 'frappe.get_roles',
            args: {
                user: frappe.session.user
            },
            callback: function(r) {
                if (r.message) {
                    const user_roles = r.message;
                    const has_proj_coordinator_role = user_roles.includes('Proj Coordinator');
                    
                    if (!has_proj_coordinator_role) {
                        // Set default filter
                        listview.page.add_inner_button(__('Filter Employee Requests'), function() {
                            listview.filter_area.add([
                                {
                                    fieldname: 'employee_submitted',
                                    condition: '!=',
                                    value: 1
                                }
                            ]);
                            listview.refresh();
                        });
                        
                        // Auto-apply filter on load
                        setTimeout(function() {
                            listview.filter_area.add([
                                {
                                    fieldname: 'employee_submitted',
                                    condition: '!=',
                                    value: 1
                                }
                            ]);
                            listview.refresh();
                        }, 500);
                    }
                }
            }
        });
    }
};
```

## Testing

1. **Login as Proj Coordinator**: Should see all RFPs
2. **Login as Regular User**: Should only see RFPs where `employee_submitted = false`
3. **Check List View**: The filter should be automatically applied

## Notes

- This is a **client-side** filter, so it works on the List View
- The filter is applied automatically when the list loads
- Users with "Proj Coordinator" role see everything (no restrictions)
- Other users will have the filter applied automatically

