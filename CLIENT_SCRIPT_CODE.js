// Client Script for Request For Payment
// This script filters out employee-submitted requests for users without "Proj Coordinator" role

frappe.listview_settings['Request For Payment'] = {
    onload: function(listview) {
        // Get current user roles
        const user_roles = frappe.user_roles || [];
        const has_proj_coordinator_role = user_roles.includes('Proj Coordinator');
        
        // If user doesn't have Proj Coordinator role, apply filter
        if (!has_proj_coordinator_role) {
            // Wait for filter area to be ready
            setTimeout(function() {
                // Add filter to hide employee_submitted = true
                // Using the filter_area.add method
                if (listview.filter_area) {
                    // Remove any existing employee_submitted filter first
                    try {
                        listview.filter_area.remove('employee_submitted');
                    } catch(e) {
                        // Filter doesn't exist, that's fine
                    }
                    
                    // Add new filter
                    listview.filter_area.add([
                        {
                            fieldname: 'employee_submitted',
                            condition: '!=',
                            value: 1
                        }
                    ]);
                    
                    // Refresh the list to apply filter
                    listview.refresh();
                }
            }, 1000);
        }
    },
    
    // Also apply on refresh to ensure filter persists
    refresh: function(listview) {
        const user_roles = frappe.user_roles || [];
        const has_proj_coordinator_role = user_roles.includes('Proj Coordinator');
        
        if (!has_proj_coordinator_role) {
            // Check if filter is already applied
            const filters = listview.filter_area.get();
            let has_filter = false;
            
            if (filters && filters.length > 0) {
                has_filter = filters.some(function(f) {
                    return f[1] === 'employee_submitted' && f[2] === '!=' && f[3] == 1;
                });
            }
            
            // Apply filter if not already applied
            if (!has_filter && listview.filter_area) {
                setTimeout(function() {
                    try {
                        listview.filter_area.remove('employee_submitted');
                    } catch(e) {}
                    
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
        } else {
            // Proj Coordinator - remove filter if exists
            if (listview.filter_area) {
                try {
                    listview.filter_area.remove('employee_submitted');
                } catch(e) {}
            }
        }
    },
    
    // Get filters - modify filters before they're applied
    get_filters: function() {
        const user_roles = frappe.user_roles || [];
        const has_proj_coordinator_role = user_roles.includes('Proj Coordinator');
        
        if (!has_proj_coordinator_role) {
            // Return filter condition
            return [
                ['Request For Payment', 'employee_submitted', '!=', 1]
            ];
        }
        
        // Proj Coordinator sees all - return empty array (no additional filters)
        return [];
    }
};

