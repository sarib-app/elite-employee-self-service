// Client Script for Request For Payment - Simple Version
// Copy this code into ERPNext Client Script form

frappe.listview_settings['Request For Payment'] = {
    onload: function(listview) {
        // Get current user roles
        const user_roles = frappe.user_roles || [];
        const has_proj_coordinator_role = user_roles.includes('Proj Coordinator');
        
        // If user doesn't have Proj Coordinator role, apply filter
        if (!has_proj_coordinator_role) {
            // Wait a bit for listview to be fully initialized
            setTimeout(function() {
                applyEmployeeSubmittedFilter(listview);
            }, 1500);
        }
    },
    
    refresh: function(listview) {
        const user_roles = frappe.user_roles || [];
        const has_proj_coordinator_role = user_roles.includes('Proj Coordinator');
        
        if (!has_proj_coordinator_role) {
            // Check if correct filter is already applied
            if (!isFilterApplied(listview)) {
                setTimeout(function() {
                    applyEmployeeSubmittedFilter(listview);
                }, 300);
            }
        }
    }
};

// Helper function to check if filter is already applied
function isFilterApplied(listview) {
    if (!listview || !listview.filter_area || !listview.filter_area.filter_list) {
        return false;
    }
    
    try {
        const filter_list = listview.filter_area.filter_list;
        // Check if the correct filter exists (employee_submitted != 'True')
        return filter_list.some(function(f) {
            return f && 
                   Array.isArray(f) && 
                   f.length >= 4 && 
                   f[1] === 'employee_submitted' && 
                   f[2] === '!=' && 
                   f[3] === 'True';
        });
    } catch(e) {
        return false;
    }
}

// Helper function to apply the filter (prevents duplicates)
function applyEmployeeSubmittedFilter(listview) {
    if (!listview || !listview.filter_area) {
        return;
    }
    
    // Check if filter already exists to prevent duplicates
    if (isFilterApplied(listview)) {
        return;
    }
    
    // Remove any existing employee_submitted filters first (including empty ones)
    try {
        if (listview.filter_area.filter_list) {
            const filter_list = listview.filter_area.filter_list;
            // Remove all employee_submitted filters
            for (let i = filter_list.length - 1; i >= 0; i--) {
                if (filter_list[i] && filter_list[i][1] === 'employee_submitted') {
                    filter_list.splice(i, 1);
                }
            }
        }
    } catch(e) {
        // Ignore errors when removing filters
    }
    
    // Apply the correct filter
    try {
        // Method 1: Use filter_list.add (most reliable)
        if (listview.filter_area.filter_list && typeof listview.filter_area.filter_list.add === 'function') {
            listview.filter_area.filter_list.add([
                ['Request For Payment', 'employee_submitted', '!=', 'True']
            ]);
            listview.refresh();
            return;
        }
        
        // Method 2: Use filter_area.add
        if (typeof listview.filter_area.add === 'function') {
            listview.filter_area.add([
                ['Request For Payment', 'employee_submitted', '!=', 'True']
            ]);
            listview.refresh();
            return;
        }
    } catch(e) {
        console.error('Error applying filter:', e);
    }
}

