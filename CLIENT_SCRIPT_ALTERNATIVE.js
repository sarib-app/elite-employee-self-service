// Client Script for Request For Payment - Alternative Version
// This version uses the standard ERPNext filter API

frappe.listview_settings['Request For Payment'] = {
    onload: function(listview) {
        console.log('=== Request For Payment List View Script Started ===');
        console.log('User:', frappe.session.user);
        console.log('User roles:', frappe.user_roles);
        
        // Get current user roles
        const user_roles = frappe.user_roles || [];
        const has_proj_coordinator_role = user_roles.includes('Proj Coordinator');
        
        alert('Script loaded!\nUser: ' + frappe.session.user + '\nHas Proj Coordinator: ' + has_proj_coordinator_role);
        
        // If user doesn't have Proj Coordinator role, apply filter
        if (!has_proj_coordinator_role) {
            // Use setTimeout to ensure listview is fully ready
            setTimeout(function() {
                console.log('Attempting to apply filter...');
                alert('Attempting to apply filter...');
                
                // Try different methods to apply filter
                if (listview && listview.filter_area) {
                    // Method 1: Use the standard add_filter method
                    try {
                        listview.filter_area.add_filter('Request For Payment', 'employee_submitted', '!=', 1);
                        console.log('Filter applied using add_filter');
                        alert('Filter applied successfully!');
                        listview.refresh();
                        return;
                    } catch(e) {
                        console.error('Method 1 failed:', e);
                    }
                    
                    // Method 2: Use add method
                    try {
                        listview.filter_area.add([
                            ['Request For Payment', 'employee_submitted', '!=', 1]
                        ]);
                        console.log('Filter applied using add');
                        alert('Filter applied using add method!');
                        listview.refresh();
                        return;
                    } catch(e) {
                        console.error('Method 2 failed:', e);
                    }
                    
                    // Method 3: Direct filter manipulation
                    try {
                        const filter_wrapper = listview.filter_area;
                        if (filter_wrapper && filter_wrapper.add) {
                            filter_wrapper.add([{
                                fieldname: 'employee_submitted',
                                condition: '!=',
                                value: 1
                            }]);
                            console.log('Filter applied using direct add');
                            alert('Filter applied using direct method!');
                            listview.refresh();
                        }
                    } catch(e) {
                        console.error('Method 3 failed:', e);
                        alert('All filter methods failed. Check console for details.');
                    }
                } else {
                    alert('Filter area not found! listview.filter_area is: ' + typeof listview.filter_area);
                    console.error('Filter area not available:', listview);
                }
            }, 2000); // Wait 2 seconds for listview to be ready
        } else {
            alert('Proj Coordinator - No filter needed (showing all records)');
        }
    },
    
    // Also try get_filters as backup
    get_filters: function() {
        console.log('get_filters called');
        const user_roles = frappe.user_roles || [];
        const has_proj_coordinator_role = user_roles.includes('Proj Coordinator');
        
        if (!has_proj_coordinator_role) {
            console.log('Returning filter from get_filters');
            return [
                ['Request For Payment', 'employee_submitted', '!=', 1]
            ];
        }
        
        return [];
    }
};

