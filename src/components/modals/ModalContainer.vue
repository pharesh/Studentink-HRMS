<template>
  <!-- All modals are controlled by useModalStore.activeModal -->
  <!-- Click overlay → close · Escape key → close (handled in BaseModal) -->

  <!-- Present/Absent quick lists -->
  <BaseModal modal-id="modal-present" title="Present Today (47 employees)">
    <div style="max-height:300px;overflow-y:auto">
      <table><thead><tr><th>Name</th><th>Dept.</th><th>In Time</th></tr></thead>
      <tbody>
        <tr><td style="font-weight:600">Alpesh Kothari</td><td>Development</td><td>09:02</td></tr>
        <tr><td style="font-weight:600">Manish Vekariya</td><td>Leadership</td><td>09:15</td></tr>
        <tr><td style="font-weight:600">Sunita Rao</td><td>Office</td><td>09:44</td></tr>
        <tr><td colspan="3" style="color:#888780;text-align:center;padding:10px">+ 44 more employees present</td></tr>
      </tbody></table>
    </div>
    <div class="modal-footer"><button class="btn" @click="modalStore.closeModal()">Close</button></div>
  </BaseModal>

  <BaseModal modal-id="modal-absent" title="Absent Today (4 employees)">
    <table><thead><tr><th>Name</th><th>Dept.</th><th>Last Present</th><th>Reason</th></tr></thead>
    <tbody>
      <tr><td style="font-weight:600">Deepa Shah</td><td>Support</td><td>29 Apr 2026</td><td><span class="badge b-red">Unauthorised</span></td></tr>
      <tr><td style="font-weight:600">Manoj Kumar</td><td>Sales</td><td>28 Apr 2026</td><td><span class="badge b-red">Unauthorised</span></td></tr>
      <tr><td style="font-weight:600">Rohan Desai</td><td>Development</td><td>30 Apr 2026</td><td><span class="badge b-blue">On Leave</span></td></tr>
      <tr><td style="font-weight:600">Meena Joshi</td><td>Support</td><td>01 May 2026</td><td><span class="badge b-blue">On Leave</span></td></tr>
    </tbody></table>
    <div class="modal-footer"><button class="btn" @click="modalStore.closeModal()">Close</button></div>
  </BaseModal>

  <!-- Apply Leave (ESS) -->
  <BaseModal modal-id="modal-apply-leave" title="Apply for Leave">
    <div class="form-grid fg-2">
      <div class="form-group"><label class="form-label">Leave Type</label>
        <select class="form-input"><option>Casual Leave (CL)</option><option>Annual Leave (AL)</option><option>Medical Leave (ML)</option><option>Comp Off (CO)</option></select>
      </div>
      <div class="form-group"><label class="form-label">Unit</label>
        <select class="form-input"><option>Full Day</option><option>Half Day (AM)</option><option>Half Day (PM)</option><option>Hours</option></select>
      </div>
      <div class="form-group"><label class="form-label">From Date</label><input type="date" class="form-input"/></div>
      <div class="form-group"><label class="form-label">To Date</label><input type="date" class="form-input"/></div>
      <div class="form-group" style="grid-column:span 2"><label class="form-label">Reason</label><textarea class="form-input" rows="2" placeholder="Brief reason…"></textarea></div>
      <div class="form-group" style="grid-column:span 2"><label class="form-label">Attach Document (optional)</label><input type="file" class="form-input"/></div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Submit Application</button>
    </div>
  </BaseModal>

  <!-- Reject Reason -->
  <BaseModal modal-id="modal-reject-reason" title="Reject Leave Application">
    <div class="form-group"><label class="form-label">Reason for Rejection</label>
      <textarea class="form-input" rows="3" placeholder="Explain why this leave cannot be approved…"></textarea>
    </div>
    <div class="info-banner info-amber" style="font-size:10px">Employee will be notified via email and in-app notification.</div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-danger">Confirm Rejection</button>
    </div>
  </BaseModal>

  <!-- Attendance Regularization -->
  <BaseModal modal-id="modal-regularization" title="Attendance Regularization">
    <div class="form-grid fg-2">
      <div class="form-group"><label class="form-label">Date</label><input type="date" class="form-input"/></div>
      <div class="form-group"><label class="form-label">Reason Type</label>
        <select class="form-input"><option>Forgot Punch-In</option><option>Forgot Punch-Out</option><option>Biometric Failure</option><option>WFH Not Marked</option></select>
      </div>
      <div class="form-group"><label class="form-label">In Time</label><input type="time" class="form-input" value="09:00"/></div>
      <div class="form-group"><label class="form-label">Out Time</label><input type="time" class="form-input" value="18:30"/></div>
      <div class="form-group" style="grid-column:span 2"><label class="form-label">Remarks</label><textarea class="form-input" rows="2" placeholder="Brief explanation…"></textarea></div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Submit Request</button>
    </div>
  </BaseModal>

  <!-- Attendance Lock -->
  <BaseModal modal-id="modal-att-lock" title="Lock Attendance — April 2026">
    <div class="info-banner info-red" style="font-size:11px">⚠ <strong>Irreversible.</strong> Once locked, attendance for April 2026 cannot be modified without a supervisor unlock request.</div>
    <div style="font-size:11px;color:#5f5e5a;margin-bottom:10px">Locking will:<br/>• Freeze all 56 employee attendance records<br/>• Trigger payroll computation eligibility<br/>• Log action with user ID + timestamp</div>
    <div class="form-group"><label class="form-label">Type "LOCK APRIL 2026" to confirm</label><input type="text" class="form-input" v-model="lockConfirm" placeholder="LOCK APRIL 2026"/></div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-danger" :disabled="lockConfirm !== 'LOCK APRIL 2026'">Lock Attendance</button>
    </div>
  </BaseModal>

  <!-- Add Holiday -->
  <BaseModal modal-id="modal-add-holiday" title="Add Holiday">
    <div class="form-grid fg-2">
      <div class="form-group"><label class="form-label">Holiday Name</label><input type="text" class="form-input" placeholder="e.g. Diwali"/></div>
      <div class="form-group"><label class="form-label">Date</label><input type="date" class="form-input"/></div>
      <div class="form-group"><label class="form-label">Type</label>
        <select class="form-input"><option>National Holiday</option><option>Restricted Holiday</option><option>Regional Holiday</option></select>
      </div>
      <div class="form-group"><label class="form-label">Applies To</label>
        <select class="form-input"><option>All Academies</option><option>Select Academies…</option></select>
      </div>
      <div class="form-group" style="grid-column:span 2">
        <label style="display:flex;align-items:center;gap:7px;font-size:11px"><input type="checkbox" checked/>Auto-assign to all employees' leave ledger on save</label>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Add Holiday</button>
    </div>
  </BaseModal>

  <!-- Add Leave Type -->
  <BaseModal modal-id="modal-add-leave-type" title="Add Leave Type">
    <div class="form-grid fg-2">
      <div class="form-group"><label class="form-label">Leave Code</label><input type="text" class="form-input" placeholder="e.g. PL"/></div>
      <div class="form-group"><label class="form-label">Full Name</label><input type="text" class="form-input" placeholder="e.g. Privilege Leave"/></div>
      <div class="form-group"><label class="form-label">Unit</label><select class="form-input"><option>Days</option><option>Hours</option><option>Days + Hours</option></select></div>
      <div class="form-group"><label class="form-label">Annual Allocation</label><input type="number" class="form-input" placeholder="e.g. 12"/></div>
      <div class="form-group"><label class="form-label">Carry Forward</label><select class="form-input"><option>No Carry Forward</option><option>Full</option><option>Capped</option></select></div>
      <div class="form-group"><label class="form-label">Max Carry Forward</label><input type="number" class="form-input" placeholder="0 = none"/></div>
      <div class="form-group" style="grid-column:span 2;display:flex;gap:14px;flex-wrap:wrap">
        <label style="display:flex;align-items:center;gap:5px;font-size:11px"><input type="checkbox"/>Self-Service</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:11px"><input type="checkbox"/>Requires Approval</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:11px"><input type="checkbox"/>Include in LOP</label>
        <label style="display:flex;align-items:center;gap:5px;font-size:11px"><input type="checkbox"/>Encashable</label>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Save Leave Type</button>
    </div>
  </BaseModal>

  <!-- Assign Leave Balance -->
  <BaseModal modal-id="modal-assign-leave" title="Assign Leave Balance">
    <div class="form-grid fg-2">
      <div class="form-group"><label class="form-label">Employee</label><select class="form-input"><option>Select…</option><option>Alpesh Kothari</option><option>Priya Mehta</option><option>Rahul Joshi</option></select></div>
      <div class="form-group"><label class="form-label">Leave Type</label><select class="form-input"><option>CL</option><option>AL</option><option>ML</option><option>CO</option></select></div>
      <div class="form-group"><label class="form-label">Days to Add</label><input type="number" class="form-input" placeholder="e.g. 5"/></div>
      <div class="form-group"><label class="form-label">Effective From</label><input type="date" class="form-input"/></div>
      <div class="form-group" style="grid-column:span 2"><label class="form-label">Remark</label><input type="text" class="form-input" placeholder="e.g. Annual credit FY 2026–27"/></div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Assign Leave</button>
    </div>
  </BaseModal>

  <!-- Bulk Assign Leave -->
  <BaseModal modal-id="modal-bulk-assign-leave" title="Bulk Assign Leave">
    <div class="info-banner info-blue" style="font-size:10px">Assigns leave balance to all employees matching the filter criteria.</div>
    <div class="form-grid fg-2">
      <div class="form-group"><label class="form-label">Leave Type</label><select class="form-input"><option>Paid Leave (PL)</option><option>Casual/Sick (CSL)</option></select></div>
      <div class="form-group"><label class="form-label">Days to Assign</label><input type="number" class="form-input" placeholder="e.g. 12"/></div>
      <div class="form-group"><label class="form-label">Apply To</label><select class="form-input"><option>All Active Employees</option><option>Department-wise</option></select></div>
      <div class="form-group"><label class="form-label">Effective From</label><input type="date" class="form-input"/></div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Assign Leave</button>
    </div>
  </BaseModal>

  <!-- Assign Shift -->
  <BaseModal modal-id="modal-assign-shift" title="Assign Shift">
    <div class="form-grid fg-2">
      <div class="form-group"><label class="form-label">Employee</label><select class="form-input"><option>Select…</option><option>Alpesh Kothari</option><option>Priya Mehta</option></select></div>
      <div class="form-group"><label class="form-label">Shift</label><select class="form-input"><option>Shift 1 (Support)</option><option>Shift 2 (Support)</option><option>Shift 3 (Dev)</option></select></div>
      <div class="form-group"><label class="form-label">Assignment Type</label><select class="form-input"><option>Permanent</option><option>Time-bound Override</option></select></div>
      <div class="form-group"><label class="form-label">Effective From</label><input type="date" class="form-input"/></div>
      <div class="form-group"><label class="form-label">Effective Till (if override)</label><input type="date" class="form-input"/></div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Assign Shift</button>
    </div>
  </BaseModal>

  <!-- Add Grade (NESTS) -->
  <BaseModal modal-id="modal-add-grade" title="Add / Edit Grade Level Config">
    <div class="form-grid fg-2">
      <div class="form-group"><label class="form-label">Grade Level</label><input type="text" class="form-input" placeholder="e.g. Level 7"/></div>
      <div class="form-group"><label class="form-label">Post / Designation</label><input type="text" class="form-input" placeholder="e.g. PGT Hindi"/></div>
      <div class="form-group"><label class="form-label">Basic Pay (₹)</label><input type="number" class="form-input" placeholder="e.g. 44900"/></div>
      <div class="form-group"><label class="form-label">DA %</label><input type="number" class="form-input" value="50"/></div>
      <div class="form-group"><label class="form-label">HRA %</label><input type="number" class="form-input" placeholder="8/16/24"/></div>
      <div class="form-group"><label class="form-label">TA (₹)</label><input type="number" class="form-input" placeholder="e.g. 3600"/></div>
      <div class="form-group"><label class="form-label">NPS %</label><input type="number" class="form-input" value="10"/></div>
      <div class="form-group"><label class="form-label">PWD Variant</label><select class="form-input"><option>No</option><option>Yes</option></select></div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Save Grade</button>
    </div>
  </BaseModal>

  <!-- Assign PRAN -->
  <BaseModal modal-id="modal-pran" title="Assign PRAN Number">
    <div class="info-nests" style="font-size:10px;margin-bottom:10px;border-radius:7px">PRAN encrypted at rest (AES-256). Only masked values displayed after saving.</div>
    <div class="form-grid" style="grid-template-columns:1fr">
      <div class="form-group"><label class="form-label">Employee</label><select class="form-input"><option>Mr. Dipak Roy — EMRS-WB-009</option><option>Other…</option></select></div>
      <div class="form-group"><label class="form-label">PRAN Number (12 digits)</label><input type="password" class="form-input" placeholder="Enter 12-digit PRAN…" maxlength="12"/></div>
      <div class="form-group"><label class="form-label">NPS Tier</label><select class="form-input"><option>Tier I (Mandatory)</option><option>Tier I + Tier II</option></select></div>
      <div class="form-group"><label class="form-label">Upload PRAN Card (optional)</label><input type="file" class="form-input"/></div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Save PRAN</button>
    </div>
  </BaseModal>

  <!-- Special Allowance Configure -->
  <BaseModal modal-id="modal-special-allowance" title="Configure Special Allowance">
    <div class="form-grid fg-2">
      <div class="form-group"><label class="form-label">Allowance Type</label><select class="form-input"><option>Tribal Area Allowance</option><option>Bad Climate Allowance</option><option>Special Duty Allowance</option><option>Sunderban Allowance</option></select></div>
      <div class="form-group"><label class="form-label">Rate Type</label><select class="form-input"><option>Fixed Amount</option><option>% of Basic+DA</option></select></div>
      <div class="form-group"><label class="form-label">Amount / %</label><input type="number" class="form-input" placeholder="e.g. 2700"/></div>
      <div class="form-group"><label class="form-label">Effective From</label><input type="date" class="form-input"/></div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Save Configuration</button>
    </div>
  </BaseModal>

  <!-- Bulk Increment -->
  <BaseModal modal-id="modal-bulk-increment" title="Process Annual Increments">
    <div class="info-banner info-amber" style="font-size:11px">⚠ This will advance stage by 1 for all eligible employees. Action is audit-logged and cannot be reversed without senior admin approval.</div>
    <div class="form-grid fg-2">
      <div class="form-group"><label class="form-label">Effective Date</label><input type="date" class="form-input" value="2026-07-01"/></div>
      <div class="form-group"><label class="form-label">Apply To</label><select class="form-input"><option>All Due Employees (218)</option><option>Selected School</option></select></div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Process Increments</button>
    </div>
  </BaseModal>

  <!-- Review Template -->
  <BaseModal modal-id="modal-review-template" title="Start Review Cycle">
    <div class="form-grid fg-2">
      <div class="form-group"><label class="form-label">Cycle Name</label><input type="text" class="form-input" placeholder="e.g. FY 2025–26 Annual Review"/></div>
      <div class="form-group"><label class="form-label">Template</label><select class="form-input"><option>OKR / Competency</option><option>ACR (Govt.)</option><option>360° Feedback</option></select></div>
      <div class="form-group"><label class="form-label">Review Period From</label><input type="date" class="form-input"/></div>
      <div class="form-group"><label class="form-label">Review Period To</label><input type="date" class="form-input"/></div>
      <div class="form-group"><label class="form-label">Self-Assessment Deadline</label><input type="date" class="form-input"/></div>
      <div class="form-group"><label class="form-label">Manager Review Deadline</label><input type="date" class="form-input"/></div>
      <div class="form-group" style="grid-column:span 2"><label class="form-label">Apply To</label><select class="form-input"><option>All Active Employees</option><option>Development</option><option>Support</option><option>Leadership</option></select></div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Start Review Cycle</button>
    </div>
  </BaseModal>

  <!-- Payslip Preview -->
  <BaseModal modal-id="modal-payslip-preview" title="Payslip — April 2026" modal-class="modal-lg">
    <div style="font-size:11px">
      <div style="display:flex;justify-content:space-between;margin-bottom:11px;flex-wrap:wrap;gap:7px">
        <div><div style="font-size:13px;font-weight:700">Alpesh Kothari</div><div style="color:#888780">EMP-001 · Senior Developer · Development</div></div>
        <div style="text-align:right"><div>April 2026</div><div style="color:#888780">Jaynik Eduserve Pvt Ltd</div></div>
      </div>
      <div class="two-col" style="margin-bottom:11px">
        <div><div class="section-title">Earnings</div>
          <table><tbody>
            <tr><td>Basic Pay</td><td style="text-align:right;font-weight:600">₹50,000</td></tr>
            <tr><td>HRA</td><td style="text-align:right;font-weight:600">₹12,000</td></tr>
            <tr><td>Special Allowance</td><td style="text-align:right;font-weight:600">₹10,000</td></tr>
            <tr style="background:#f0f7e6"><td style="font-weight:700">Total Earnings</td><td style="text-align:right;font-weight:700">₹72,000</td></tr>
          </tbody></table>
        </div>
        <div><div class="section-title">Deductions</div>
          <table><tbody>
            <tr><td>PF (Employee 12%)</td><td style="text-align:right;font-weight:600">₹6,000</td></tr>
            <tr><td>PT</td><td style="text-align:right;font-weight:600">₹200</td></tr>
            <tr><td>TDS</td><td style="text-align:right;font-weight:600">₹7,640</td></tr>
            <tr style="background:#fdf0f0"><td style="font-weight:700">Total Deductions</td><td style="text-align:right;font-weight:700">₹13,840</td></tr>
          </tbody></table>
        </div>
      </div>
      <div style="background:#e6f1fb;padding:10px;border-radius:7px;display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:13px;font-weight:700;color:#185FA5">Net Pay</span>
        <span style="font-size:18px;font-weight:700;color:#185FA5">₹58,160</span>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Close</button>
      <button class="btn btn-primary">Download PDF</button>
    </div>
  </BaseModal>

  <!-- Profile Update Request -->
  <BaseModal modal-id="modal-profile-update" title="Request Profile Update">
    <div class="info-banner info-amber" style="font-size:10px">Sensitive field changes (PAN, Bank Account) require document proof and senior HR approval.</div>
    <div class="form-grid fg-2">
      <div class="form-group"><label class="form-label">Field to Update</label><select class="form-input"><option>Mobile Number</option><option>Personal Email</option><option>Emergency Contact</option><option>Bank Account</option><option>PAN</option><option>Address</option></select></div>
      <div class="form-group"><label class="form-label">New Value</label><input type="text" class="form-input" placeholder="Enter new value…"/></div>
      <div class="form-group" style="grid-column:span 2"><label class="form-label">Reason for Change</label><textarea class="form-input" rows="2" placeholder="Brief explanation…"></textarea></div>
      <div class="form-group" style="grid-column:span 2"><label class="form-label">Supporting Document (if required)</label><input type="file" class="form-input"/></div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Submit Request</button>
    </div>
  </BaseModal>

  <!-- Add Tax Declaration -->
  <BaseModal modal-id="modal-add-declaration" title="Add Investment Declaration">
    <div class="form-grid fg-2">
      <div class="form-group"><label class="form-label">Section</label><select class="form-input"><option>80C</option><option>80D</option><option>80E</option><option>80G</option><option>HRA Exemption</option></select></div>
      <div class="form-group"><label class="form-label">Investment Type</label><select class="form-input"><option>PPF</option><option>ELSS MF</option><option>LIC Premium</option><option>Home Loan Principal</option><option>NSC</option><option>Health Insurance</option></select></div>
      <div class="form-group"><label class="form-label">Declared Amount (₹)</label><input type="number" class="form-input" placeholder="e.g. 50000"/></div>
      <div class="form-group"><label class="form-label">Investment Year</label><select class="form-input"><option>FY 2025–26</option><option>FY 2024–25</option></select></div>
      <div class="form-group" style="grid-column:span 2"><label class="form-label">Upload Proof</label><input type="file" class="form-input"/></div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary">Save Declaration</button>
    </div>
  </BaseModal>

  <!-- ─── PAYROLL MODALS ──────────────────────────────────────── -->

  <!-- Add Salary Header -->
  <BaseModal modal-id="modal-payroll-add-header" title="Add Salary Header">
    <div class="form-grid fg-2">
      <div class="form-group" style="grid-column:span 2">
        <label class="form-label">Header Title <span class="req">*</span></label>
        <input class="form-input" placeholder="e.g. HRA"/>
      </div>
      <div class="form-group">
        <label class="form-label">Order</label>
        <input class="form-input" type="number" value="8" min="1" max="20"/>
      </div>
      <div class="form-group">
        <label class="form-label">Category <span class="req">*</span></label>
        <select class="form-input"><option>Earnings (Addition)</option><option>Deduction</option></select>
      </div>
      <div class="form-group">
        <label class="form-label">Header Type <span class="req">*</span></label>
        <select class="form-input">
          <option>Basic Pay</option><option>DA</option><option>HRA</option><option>TA</option>
          <option>PF</option><option>PT</option><option>ESIC</option><option>TDS</option>
          <option>Arrear (ROP)</option><option>Advance</option><option>LOP</option><option>Gratuity</option><option>Other</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Rounding</label>
        <select class="form-input"><option>Round</option><option>Floor</option><option>Ceil</option></select>
      </div>
      <div class="form-group" style="grid-column:span 2">
        <label class="form-label">Formula / Calculation Basis</label>
        <input class="form-input" placeholder="e.g. 40% of Basic Pay  OR  Fixed 1600"/>
      </div>
    </div>
    <div style="display:flex;gap:18px;font-size:13px;margin-bottom:13px">
      <label style="display:flex;align-items:center;gap:6px"><input type="checkbox"/> Day-wise calculated</label>
      <label style="display:flex;align-items:center;gap:6px"><input type="checkbox" checked/> Include in TDS</label>
      <label style="display:flex;align-items:center;gap:6px"><input type="checkbox"/> Is Advance header</label>
    </div>
    <div class="form-group">
      <label class="form-label">Suspended employee % (0 = no pay)</label>
      <input class="form-input" value="0" type="number" min="0" max="100"/>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary" @click="modalStore.closeModal()">Add Header</button>
    </div>
  </BaseModal>

  <!-- Add Grade (Payroll) -->
  <BaseModal modal-id="modal-payroll-add-grade" title="Add Grade">
    <div class="form-grid fg-2">
      <div class="form-group">
        <label class="form-label">Grade Code <span class="req">*</span></label>
        <input class="form-input" placeholder="e.g. GR-011"/>
      </div>
      <div class="form-group">
        <label class="form-label">Grade Name <span class="req">*</span></label>
        <input class="form-input" placeholder="e.g. Software 03"/>
      </div>
      <div class="form-group">
        <label class="form-label">Group</label>
        <select class="form-input"><option>Support</option><option>Development</option><option>Leadership</option><option>Office</option><option>Sales</option></select>
      </div>
      <div class="form-group">
        <label class="form-label">Basic Pay (₹/month) <span class="req">*</span></label>
        <input class="form-input" placeholder="e.g. 60000" type="number"/>
      </div>
      <div class="form-group">
        <label class="form-label">HRA (₹/month)</label>
        <input class="form-input" placeholder="e.g. 15000" type="number"/>
      </div>
      <div class="form-group">
        <label class="form-label">Other Allowances (₹/month)</label>
        <input class="form-input" placeholder="e.g. 6000" type="number"/>
      </div>
    </div>
    <div style="display:flex;gap:22px;font-size:13px;margin-bottom:13px">
      <label style="display:flex;align-items:center;gap:6px"><input type="checkbox" checked/> ESI Applicable</label>
      <label style="display:flex;align-items:center;gap:6px"><input type="checkbox" checked/> PF Applicable</label>
    </div>
    <div class="info-banner info-blue">Gross CTC is auto-calculated as: Basic + HRA + Allowances + Employer PF + Employer ESIC</div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary" @click="modalStore.closeModal()">Add Grade</button>
    </div>
  </BaseModal>

  <!-- Configure Arrear -->
  <BaseModal modal-id="modal-payroll-add-arrear" title="Configure Arrear">
    <div class="form-grid fg-2">
      <div class="form-group" style="grid-column:span 2">
        <label class="form-label">Arrear Title <span class="req">*</span></label>
        <input class="form-input" placeholder="e.g. Annual Increment Arrear Q1 2026"/>
      </div>
      <div class="form-group">
        <label class="form-label">Arrear From Date <span class="req">*</span></label>
        <input type="date" class="form-input"/>
      </div>
      <div class="form-group">
        <label class="form-label">Arrear To Date <span class="req">*</span></label>
        <input type="date" class="form-input"/>
      </div>
      <div class="form-group" style="grid-column:span 2">
        <label class="form-label">Rate of Pay Basis</label>
        <select class="form-input">
          <option>Use current Basic Pay for each employee</option>
          <option>Custom per-employee override (enter below)</option>
        </select>
      </div>
    </div>
    <div class="info-banner info-amber">
      Click <strong>Preview Liability</strong> to see total arrear cost before activating.
      Arrear will be paid in the next payroll run after activation.
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn">Preview Liability</button>
      <button class="btn btn-primary" @click="modalStore.closeModal()">Save &amp; Activate</button>
    </div>
  </BaseModal>

  <!-- New Salary Advance -->
  <BaseModal modal-id="modal-payroll-add-advance" title="New Salary Advance">
    <div class="form-grid fg-2">
      <div class="form-group" style="grid-column:span 2">
        <label class="form-label">Employee <span class="req">*</span></label>
        <select class="form-input">
          <option>Select employee…</option>
          <option>Alpesh Kothari (EMP-001)</option>
          <option>Priya Mehta (EMP-002)</option>
          <option>Rahul Joshi (EMP-018)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Total Advance Amount (₹) <span class="req">*</span></label>
        <input class="form-input" placeholder="e.g. 50000" type="number"/>
      </div>
      <div class="form-group">
        <label class="form-label">Repayment Tenure (months) <span class="req">*</span></label>
        <input class="form-input" placeholder="e.g. 10" type="number"/>
      </div>
      <div class="form-group">
        <label class="form-label">Monthly EMI (auto-calc)</label>
        <input class="form-input" value="—" readonly/>
      </div>
      <div class="form-group">
        <label class="form-label">Deduction Header</label>
        <select class="form-input"><option>Salary Advance EMI (D05)</option></select>
      </div>
      <div class="form-group">
        <label class="form-label">Start Deduction From</label>
        <select class="form-input"><option>May 2026</option><option>June 2026</option></select>
      </div>
    </div>
    <div class="form-group" style="margin-bottom:13px">
      <label class="form-label">Remarks / Reason</label>
      <textarea class="form-input" rows="2" placeholder="Reason for advance…"></textarea>
    </div>
    <div class="info-banner info-amber">
      ⚠️ If this employee already has an active loan for the same header, creating a new advance will
      <strong>close the previous loan</strong>. Please confirm before saving.
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Cancel</button>
      <button class="btn btn-primary" @click="modalStore.closeModal()">Create Advance</button>
    </div>
  </BaseModal>

  <!-- Publish Payroll Confirmation -->
  <BaseModal modal-id="modal-payroll-publish" title="Publish April 2026 Payroll">
    <div class="info-banner info-green">
      All 52 eligible employees will receive their payslips via email. 2 anomalous employees are excluded.
    </div>
    <div class="emp-field"><span class="efl">Total employees publishing</span><span class="efv">52</span></div>
    <div class="emp-field"><span class="efl">Total gross payroll</span><span class="efv">₹31,40,000</span></div>
    <div class="emp-field"><span class="efl">Total net payable</span><span class="efv" style="color:#3b6d11;font-size:15px">₹27,18,400</span></div>
    <div class="emp-field"><span class="efl">Total PF (Employer + Employee)</span><span class="efv">₹1,94,400</span></div>
    <div class="emp-field"><span class="efl">Total ESIC</span><span class="efv">₹48,600</span></div>
    <div class="emp-field"><span class="efl">Total TDS</span><span class="efv">₹78,600</span></div>
    <div class="info-banner info-amber" style="margin-top:13px">
      Once published, payslips are visible to employees in their self-service portal. This action cannot be undone.
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Go Back</button>
      <button class="btn btn-primary" @click="modalStore.closeModal()">✓ Confirm &amp; Publish</button>
    </div>
  </BaseModal>

  <!-- Payslip Preview (Payroll) -->
  <BaseModal modal-id="modal-payroll-payslip" title="Payslip — Alpesh Kothari — April 2026" class="modal-lg">
    <div style="border:1px solid #e0ddd6;border-radius:8px;padding:16px;background:#fafaf8;margin-bottom:13px">
      <div style="display:flex;justify-content:space-between;margin-bottom:13px;padding-bottom:11px;border-bottom:1px solid #e0ddd6">
        <div>
          <div style="font-size:16px;font-weight:700;color:#185FA5">Jaynik Eduserve Pvt Ltd</div>
          <div style="font-size:11px;color:#888780;margin-top:3px">Payslip for the month of April 2026</div>
        </div>
        <div style="text-align:right;font-size:12px;color:#888780">
          <div>EMP-001</div><div>Software 02</div><div>Development</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:13px">
        <div class="emp-field"><span class="efl">Name</span><span class="efv">Alpesh Kothari</span></div>
        <div class="emp-field"><span class="efl">Working Days</span><span class="efv">27</span></div>
        <div class="emp-field"><span class="efl">Designation</span><span class="efv">Senior Developer</span></div>
        <div class="emp-field"><span class="efl">Present Days</span><span class="efv">27</span></div>
        <div class="emp-field"><span class="efl">Bank</span><span class="efv">HDFC ••••8421</span></div>
        <div class="emp-field"><span class="efl">LOP Days</span><span class="efv">0</span></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div>
          <div style="font-size:11px;font-weight:700;color:#888780;text-transform:uppercase;letter-spacing:.04em;margin-bottom:7px">Earnings</div>
          <div class="emp-field"><span>Basic Pay</span><span>₹50,000</span></div>
          <div class="emp-field"><span>HRA</span><span>₹15,000</span></div>
          <div class="emp-field"><span>Conveyance</span><span>₹1,600</span></div>
          <div class="emp-field"><span>Medical</span><span>₹1,250</span></div>
          <div class="emp-field"><span>Special Allowance</span><span>₹150</span></div>
          <div class="emp-field" style="font-weight:700;border-top:1px solid #d0cdc6;padding-top:7px;margin-top:3px">
            <span>Gross Earnings</span><span style="color:#3b6d11">₹68,000</span>
          </div>
        </div>
        <div>
          <div style="font-size:11px;font-weight:700;color:#888780;text-transform:uppercase;letter-spacing:.04em;margin-bottom:7px">Deductions</div>
          <div class="emp-field"><span>Employee PF</span><span>₹1,800</span></div>
          <div class="emp-field"><span>Employer PF</span><span>₹1,800</span></div>
          <div class="emp-field"><span>TDS</span><span>₹2,017</span></div>
          <div class="emp-field"><span>LOP Deduction</span><span>₹0</span></div>
          <div class="emp-field" style="font-weight:700;border-top:1px solid #d0cdc6;padding-top:7px;margin-top:3px">
            <span>Total Deductions</span><span style="color:#e24b4a">₹9,840</span>
          </div>
        </div>
      </div>
      <div style="margin-top:11px;padding:11px;background:#e6f1fb;border-radius:8px;display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:14px;font-weight:600;color:#185FA5">Net Pay</span>
        <span style="font-size:20px;font-weight:700;color:#185FA5">₹58,160</span>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" @click="modalStore.closeModal()">Close</button>
      <button class="btn btn-primary">Download PDF</button>
    </div>
  </BaseModal>
</template>

<script setup>
import { ref } from 'vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { useModalStore } from '@/stores/useModalStore'

const modalStore  = useModalStore()
const lockConfirm = ref('')
</script>
