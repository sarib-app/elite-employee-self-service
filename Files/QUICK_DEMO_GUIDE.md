# Employee Portal - Quick Demo Guide

## 🚀 Quick Start

**Portal URL:** https://erpeliteresourcesco.frappe.cloud/employee-self-service  
**Test Credentials:**
- Email: `payroll@eliteresources.co`
- Password: `camille@#123`

---

## 📋 Demo Flow Checklist

### ✅ Step 1: Login & Dashboard
- [ ] Open portal URL
- [ ] Click "Get Started" / "Sign In"
- [ ] Enter credentials and login
- [ ] View dashboard with statistics and service cards

### ✅ Step 2: Submit Payment Request
- [ ] Click "Submit Payment Request"
- [ ] Step 1: Review auto-filled employee data → Click "Next"
- [ ] Step 2: Select expense type → Click "Next"
- [ ] Step 3: Add items/advances → Click "Next"
- [ ] Step 4: Upload attachments (required) → Click "Submit Request"
- [ ] Note the Request ID (e.g., RFP-2025-00001)

**Admin Check:**
- [ ] Go to ERPNext → "Request For Payment"
- [ ] Find the submitted request
- [ ] Verify `verified = "False"`
- [ ] Check attachments in sidebar
- [ ] Update `verified` to "True" and process

### ✅ Step 3: Submit General Request
- [ ] Click "Submit General Request"
- [ ] Select Request Type (e.g., "Salary Slip")
- [ ] Enter details
- [ ] Upload attachments (optional)
- [ ] Click "Submit Request"
- [ ] Note the Request ID (e.g., EGR-2025-00001)

**Admin Check:**
- [ ] Go to ERPNext → "Employee General Requests"
- [ ] Find the submitted request
- [ ] Review details and add comment
- [ ] Update `fulfilled` to "Yes" when done

### ✅ Step 4: Upload Attendance File
- [ ] Click "Upload Attendance File"
- [ ] Select month
- [ ] Upload attendance file (PDF/Excel/CSV)
- [ ] Click "Upload File"
- [ ] Note the Record ID (e.g., AF-2025-00001)

**Admin Check:**
- [ ] Go to ERPNext → "Attendance Files"
- [ ] Find the uploaded file
- [ ] Download and review the file
- [ ] Process attendance records

---

## 🔍 Admin Side - Quick Access

### Payment Requests
**Location:** ERPNext → `Request For Payment`  
**Key Actions:**
1. Filter by date/employee to find new requests
2. Open request → Review items/advances
3. Check attachments in sidebar
4. Update `verified` field
5. Submit to create Journal Entry/Sales Invoice/Loans

### General Requests
**Location:** ERPNext → `Employee General Requests`  
**Key Actions:**
1. Filter by `fulfilled = "No"` to see pending
2. Open request → Read details
3. Add comment in `comment` field
4. Generate required document
5. Attach document → Update `fulfilled = "Yes"`

### Attendance Files
**Location:** ERPNext → `Attendance Files`  
**Key Actions:**
1. Filter by month/employee
2. Open record → Download file
3. Review attendance data
4. Process in ERPNext Attendance module

---

## 📝 Important Notes

1. **All employee submissions** have `verified = "False"` by default
2. **Project Coordinators** see all requests
3. **Other users** only see verified requests
4. **Attachments** appear in ERPNext sidebar
5. **Request IDs** follow naming series (RFP-, EGR-, AF-)

---

## 🎯 Demo Tips

1. **Start with Payment Request** - Most complex, shows full workflow
2. **Show General Request** - Simple, quick to process
3. **End with Attendance** - Straightforward file upload
4. **Switch to Admin view** after each submission to show processing
5. **Highlight** the automatic status updates and document creation

---

**Quick Reference Card - Keep This Handy During Demo**

| Feature | User Action | Admin Location | Key Field |
|---------|------------|----------------|-----------|
| Payment Request | Submit via form | Request For Payment | `verified` |
| General Request | Submit via form | Employee General Requests | `fulfilled` |
| Attendance File | Upload file | Attendance Files | `attendance_file` |

