# Employee Self-Service Portal - User & Admin Guide

## Table of Contents
1. [Accessing the Portal](#accessing-the-portal)
2. [Dashboard Overview](#dashboard-overview)
3. [Payment Request Submission](#payment-request-submission)
4. [General Request Submission](#general-request-submission)
5. [Attendance File Upload](#attendance-file-upload)
6. [Admin Side - Viewing & Processing Requests](#admin-side)

---

## Accessing the Portal

### Step 1: Open the Portal
Navigate to: **https://erpeliteresourcesco.frappe.cloud/employee-self-service**

### Step 2: Sign In
1. Click on **"Get Started"** or **"Sign In"** button
2. Enter your credentials:
   - **Email:** `payroll@eliteresources.co`
   - **Password:** `camille@#123`
3. Click **"Sign In"**

### Step 3: Dashboard Access
Once logged in, you will be redirected to the **Employee Portal Dashboard** where you can see:
- Your request statistics (Total, Completed, Pending, In Progress)
- Quick access cards to different services
- Navigation to all available features

---

## Dashboard Overview

The dashboard is organized into several sections:

### 1. **Statistics Cards** (Top Section)
- **Total Requests:** Shows count of all your payment requests
- **Completed:** Number of approved/completed requests
- **Pending:** Requests awaiting approval
- **In Progress:** Requests currently being processed

*Click on any card to filter and view those specific requests.*

### 2. **Payment Requests Section**
- **Submit Payment Request:** Create new payment/expense requests
- **My Requests:** View all your submitted payment requests
- **Request Details:** View detailed information about specific requests

### 3. **General Requests Section**
- **Submit General Request:** Request documents (salary slips, letters, certificates, etc.)
- **All General Requests:** View all your general service requests

### 4. **Attendance Files Section**
- **Upload Attendance File:** Submit monthly attendance records
- **All Attendance Files:** View all uploaded attendance files

### 5. **Personal & Support Section**
- **My Profile:** View your employee information, vacation balance, loans
- **Support & Help:** Access step-by-step guides and FAQs

---

## Payment Request Submission

### User Side: How to Submit a Payment Request

#### Step 1: Navigate to Submit Form
1. From the dashboard, click on **"Submit Payment Request"** card in the Payment Requests section
2. You will be taken to the multi-step request form

#### Step 2: Step 1 - Employee Data (Auto-filled)
- Your employee information is automatically populated:
  - Employee Name
  - Employee Number
  - Iqama Number
  - Request Date (set to today)
- **Action:** Click **"Next"** to proceed

#### Step 3: Step 2 - Request Type Selection
- **Expense Type Options:**
  - **Operational Expense** (default): For regular business expenses
  - **Employee Advance**: For salary advances/loans (deducted from salary)
- **Action:** 
  - Check the box if you want **"Deduct from salary (Loan/Advance)"**
  - Click **"Next"**

#### Step 4: Step 3 - Request Form Details

**If Operational Expense:**
1. Click **"Add Item"** to add expense items
2. For each item:
   - **Search & Select Item:** Type to search and select from the dropdown
   - **Quantity:** Enter quantity (default: 1)
   - **Rate (SAR):** Enter the price per unit
   - **Remarks:** (Optional) Add any notes
   - Amount is calculated automatically (Quantity × Rate)
3. You can add multiple items by clicking **"Add Item"** again
4. To remove an item, click **"Remove"** on the item card

**If Employee Advance:**
1. Click **"Add Advance"** to add advance details
2. For each advance:
   - **Search & Select Advance Type:** Select loan type (e.g., Housing Advance)
   - **Advance Amount (SAR):** Enter the advance amount
   - **Monthly Repayment (SAR):** (Optional) Enter monthly deduction amount
   - **Repayment Start Date:** (Optional) Select when repayment begins
   - **Remarks:** (Optional) Add any notes
3. You can add multiple advances
4. To remove an advance, click **"Remove"** on the advance card

**Action:** Click **"Next"** after filling all required fields

#### Step 5: Step 4 - Attach Documents
1. **Attachments are MANDATORY**
2. Click on the upload area or drag and drop files
3. Supported formats: PDF, JPG, PNG, Excel, Word
4. You can upload multiple files
5. Files will appear below the upload area
6. To remove a file, click the **"×"** button

**Action:** Click **"Submit Request"** button

#### Step 6: Confirmation
- You will see a success message with your **Request ID** (e.g., `RFP-2025-00001`)
- You will be redirected to the dashboard after 2 seconds
- The request is now submitted and visible to admins

---

### Admin Side: How to View & Process Payment Requests

#### Step 1: Access ERPNext Admin Panel
1. Log in to ERPNext as an admin user
2. Navigate to **"Request For Payment"** doctype

#### Step 2: View Submitted Requests
1. Go to **"Request For Payment"** list view
2. You will see all submitted requests with:
   - Request ID (naming series: RFP-.YY.-)
   - Employee Name
   - Expense Type
   - Total Amount
   - Date
   - Status (Draft, Pending, Approved, Rejected)
   - **Verified** field (shows "False" for employee-submitted requests)

#### Step 3: Filter Requests
- **For Non-Project Coordinators:** Requests where `verified = "False"` are automatically hidden
- **For Project Coordinators:** All requests are visible
- Use filters to find specific requests:
  - Filter by Employee
  - Filter by Date Range
  - Filter by Expense Type
  - Filter by Status

#### Step 4: Open Request Details
1. Click on any request to open it
2. View complete details:
   - Employee information
   - Expense type
   - Items/Advances list with amounts
   - Total amount
   - Attachments (in the sidebar under "Attachments")
   - Request date

#### Step 5: Verify & Process Request
1. **Review the Request:**
   - Check all items/advances
   - Verify amounts
   - Review attached documents
   - Check employee details

2. **Update Verified Status:**
   - Change `verified` field from **"False"** to **"True"** (or leave as "False" if needs review)
   - This controls visibility for non-coordinator users

3. **Approve/Reject:**
   - Use workflow states if configured
   - Add comments if needed
   - Save the document

4. **Submit Request (if workflow enabled):**
   - Click **"Submit"** button
   - This will trigger automatic processes:
     - Create Journal Entry (for Operational Expenses)
     - Create Sales Invoice (if invoice_to_client = "Yes")
     - Create Loan records (for Employee Advances)
     - Create Payment Entry (for Supplier Payments)

#### Step 6: Track Processing
- After submission, linked documents are created automatically
- Check:
  - **Journal Entries** (for expense requests)
  - **Sales Invoices** (if invoicing to client)
  - **Loans** (for advance requests)
  - **Payment Entries** (for supplier payments)

---

## General Request Submission

### User Side: How to Submit a General Request

#### Step 1: Navigate to General Request Form
1. From the dashboard, click on **"Submit General Request"** card in the General Requests section
2. You will be taken to the general request form

#### Step 2: Fill in Request Details
1. **Employee & Employee Name:** Auto-filled (read-only)

2. **Request Type:** Select from dropdown:
   - Salary Slip
   - Embassy Form
   - Employment Letter
   - End of Contract Notification
   - ERC Assets Receiving
   - Experience Letter
   - Indebtedness Letter
   - Letter for Extend of Probation
   - Passport Office Authorization
   - Salary Certificate
   - Salary Increment Letter
   - Salary Letter

3. **Details:** Enter any additional information or special instructions
   - Example: "Please provide salary slip for January 2025"
   - Example: "Need employment letter for visa application"

4. **Attachments:** (Optional but recommended)
   - Click upload area or drag and drop
   - Upload supporting documents if needed
   - Multiple files allowed

#### Step 3: Submit Request
1. Click **"Submit Request"** button
2. You will see a success message with **Request ID** (e.g., `EGR-2025-00001`)
3. You will be redirected to the General Requests list page

#### Step 4: Track Your Request
1. Go to **"All General Requests"** from dashboard
2. View your request status:
   - **Fulfilled:** "Yes" (completed) or "No" (pending)
   - Click **"View"** to see full details and any admin comments

---

### Admin Side: How to View & Process General Requests

#### Step 1: Access General Requests
1. Log in to ERPNext as admin
2. Navigate to **"Employee General Requests"** doctype

#### Step 2: View All Requests
1. Go to **"Employee General Requests"** list view
2. You will see all requests with:
   - Request ID (naming series: EGR-.YYYY.-)
   - Employee Name
   - Request Type
   - Fulfilled Status (Yes/No)
   - Created Date

#### Step 3: Filter Requests
- Filter by:
  - **Request Type:** Select specific type (e.g., Salary Slip)
  - **Fulfilled:** Filter by Yes/No
  - **Date Range:** Filter by creation date
  - **Employee:** Filter by specific employee

#### Step 4: Open Request Details
1. Click on any request to open it
2. View complete information:
   - Employee details
   - Request Type
   - Details (employee's notes)
   - **Comment Field:** (Admin only) Add your response or notes
   - Attachments (in sidebar)

#### Step 5: Process Request
1. **Review the Request:**
   - Read employee's details and requirements
   - Check attached documents (if any)

2. **Add Admin Comment:**
   - Use the **"Comment"** field to:
     - Provide status updates
     - Request additional information
     - Add internal notes
     - Confirm completion

3. **Update Fulfilled Status:**
   - Change **"Fulfilled"** from **"No"** to **"Yes"** when request is completed
   - This updates the status visible to the employee

4. **Save the Document:**
   - Click **"Save"** to update the request
   - Employee will see the updated status and comments

#### Step 6: Generate Documents (if needed)
- For document requests (Salary Slip, Employment Letter, etc.):
  - Generate the required document in ERPNext
  - Attach it to the request using the "Attach" button in sidebar
  - Update "Fulfilled" to "Yes"
  - Add a comment confirming document is attached

---

## Attendance File Upload

### User Side: How to Upload Attendance File

#### Step 1: Navigate to Upload Form
1. From the dashboard, click on **"Upload Attendance File"** card in the Attendance Files section
2. You will be taken to the attendance upload form

#### Step 2: Fill in Details
1. **Employee & Employee Name:** Auto-filled (read-only)

2. **Month:** Select the month for the attendance file
   - Default: Current month
   - Format: YYYY-MM (e.g., 2025-01 for January 2025)
   - Use the date picker to select

3. **Attendance File:** Upload your attendance file
   - Click upload area or drag and drop
   - **Supported formats:** PDF, Excel (.xlsx, .xls), CSV
   - **Maximum size:** 10MB
   - The file should contain attendance records for the selected month

#### Step 3: Submit File
1. Click **"Upload File"** button
2. You will see a success message with **Record ID** (e.g., `AF-2025-00001`)
3. You will be redirected to the Attendance Files list page

#### Step 4: View Uploaded Files
1. Go to **"All Attendance Files"** from dashboard
2. View all your submissions:
   - Record ID
   - Month
   - Upload Date
   - File status

---

### Admin Side: How to View & Process Attendance Files

#### Step 1: Access Attendance Files
1. Log in to ERPNext as admin
2. Navigate to **"Attendance Files"** doctype

#### Step 2: View All Submissions
1. Go to **"Attendance Files"** list view
2. You will see all uploaded files with:
   - Record ID (naming series: AF-.YYYY.-)
   - Employee Name
   - Month
   - Upload Date (modified date)
   - Attendance File (link to attached file)

#### Step 3: Filter Submissions
- Filter by:
   - **From Month / To Month:** Filter by date range
   - **Employee:** Filter by specific employee
   - **Date Range:** Filter by upload date

#### Step 4: Open File Details
1. Click on any record to open it
2. View complete information:
   - Employee details
   - Month (date field showing first day of month)
   - **Attendance File:** Link to the uploaded file
   - Attachments (in sidebar - check both generic attachments and the `attendance_file` field)

#### Step 5: Process Attendance File
1. **Download the File:**
   - Click on the file link in the `attendance_file` field
   - Or check the "Attachments" sidebar
   - Download to review attendance records

2. **Review Attendance Data:**
   - Open the file (Excel/PDF/CSV)
   - Verify attendance records for the month
   - Check for any discrepancies

3. **Process in ERPNext (if needed):**
   - Import attendance data to ERPNext Attendance doctype
   - Or use the file for payroll processing
   - Add internal notes if required

4. **Mark as Processed (optional):**
   - You can add a custom status field if needed
   - Or use comments to track processing status

---

## Admin Side

### Quick Reference: Admin Access Points

#### 1. Payment Requests (Request For Payment)
- **Doctype:** `Request For Payment`
- **List View URL:** `/app/request-for-payment`
- **Key Fields:**
  - `verified`: "False" for employee-submitted (hidden from non-coordinators)
  - `expense_type`: Type of expense
  - `total_amount`: Total request amount
  - `items`: Child table for operational expenses
  - `advances`: Child table for employee advances
- **Workflow:** Submit → Creates Journal Entry, Sales Invoice, Loans, etc.

#### 2. General Requests (Employee General Requests)
- **Doctype:** `Employee General Requests`
- **List View URL:** `/app/employee-general-requests`
- **Key Fields:**
  - `request_type`: Type of document requested
  - `fulfilled`: "Yes" or "No" status
  - `details`: Employee's notes
  - `comment`: Admin response field
- **Processing:** Update `fulfilled` and add `comment`

#### 3. Attendance Files (Attendance Files)
- **Doctype:** `Attendance Files`
- **List View URL:** `/app/attendance-files`
- **Key Fields:**
  - `month`: Date field (first day of month)
  - `attendance_file`: Attach field for the file
  - `employee`: Link to Employee
- **Processing:** Download file and process attendance records

### Admin Best Practices

1. **Regular Review:**
   - Check new requests daily
   - Filter by date to see recent submissions
   - Prioritize urgent requests

2. **Communication:**
   - Use comment fields to communicate with employees
   - Update status fields promptly
   - Attach generated documents when ready

3. **Verification:**
   - Verify all amounts and details
   - Check attached documents
   - Confirm employee information

4. **Processing:**
   - Follow company approval workflows
   - Create linked documents as needed
   - Update status fields after processing

---

## Support & Help

### For Users
- Access **"Support & Help"** from the dashboard
- View step-by-step guides for all features
- Read FAQs for common questions
- Contact IT support: **itc@eliteresources.co**

### For Admins
- Refer to ERPNext documentation for doctype details
- Check workflow configurations
- Review permission settings for role-based access

---

## Notes

- All employee-submitted requests are automatically marked with `verified = "False"`
- Project Coordinators can see all requests regardless of verified status
- Other users only see requests where `verified != "False"`
- File uploads are attached as generic attachments in ERPNext
- All requests are tracked with naming series for easy identification

---

**Document Version:** 1.0  
**Last Updated:** January 2025  
**For:** Internal Use - Employee Portal Testing & Demo

