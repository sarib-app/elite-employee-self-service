# Copyright (c) 2024, Elite Resources and contributors
# For license information, please see license.txt

"""
Permission Query for Request For Payment
This script restricts access to employee-submitted requests based on user roles.

Rules:
- Users with "Proj Coordinator" role: Can see all RFPs (including employee_submitted: true)
- Other users: Cannot see RFPs where employee_submitted: true
"""

import frappe
from frappe import _

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
    # This means they can only see RFPs where employee_submitted = 0 (False) or NULL
    return """(`tabRequest For Payment`.employee_submitted = 0 OR `tabRequest For Payment`.employee_submitted IS NULL)"""

# Alternative approach using has_permission hook (more comprehensive)
def has_permission(doc, user, permission_type="read"):
    """
    Check if user has permission to access a specific Request For Payment document.
    This is called for each document individually.
    """
    # Check if user has "Proj Coordinator" role
    user_roles = frappe.get_roles(user)
    has_proj_coordinator_role = "Proj Coordinator" in user_roles
    
    # Proj Coordinators can access all documents
    if has_proj_coordinator_role:
        return True
    
    # Other users cannot access documents where employee_submitted = True
    if doc.employee_submitted == 1:
        return False
    
    # Other users can access documents where employee_submitted = False or NULL
    return True

