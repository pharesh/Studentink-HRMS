<template>
  <div>
    <!-- Header -->
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:13px;flex-wrap:wrap">
      <div style="width:44px;height:44px;border-radius:50%;background:#e6f1fb;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;color:#185FA5;flex-shrink:0">AK</div>
      <div>
        <div style="font-size:14px;font-weight:700">Alpesh Kothari</div>
        <div style="font-size:11px;color:#888780">EMP-001 · Senior Developer · Development</div>
      </div>
      <span class="badge b-green" style="margin-left:auto">Active</span>
      <button class="btn btn-sm" @click="router.push({ name: 'hrms-staff' })">← Back to list</button>
    </div>

    <!-- Tabs -->
    <div class="tab-bar">
      <div v-for="tab in tabs" :key="tab.id" class="tab" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
        {{ tab.label }}
      </div>
    </div>

    <!-- Tab: Basic Info -->
    <div v-if="activeTab === 'basic'">
      <div class="two-col">
        <div class="card">
          <div class="card-title">Personal Information</div>
          <div class="form-grid fg-2">
            <div class="form-group"><label class="form-label">First Name</label><input class="form-input" value="Alpesh"/></div>
            <div class="form-group"><label class="form-label">Last Name</label><input class="form-input" value="Kothari"/></div>
            <div class="form-group"><label class="form-label">Date of Birth</label><input type="date" class="form-input" value="1990-05-14"/></div>
            <div class="form-group"><label class="form-label">Gender</label><select class="form-input"><option>Male</option><option>Female</option><option>Other</option></select></div>
            <div class="form-group"><label class="form-label">Mobile</label><input class="form-input" value="98XXXXX001"/></div>
            <div class="form-group"><label class="form-label">Email</label><input class="form-input" value="alpesh@jaynik.in"/></div>
            <div class="form-group"><label class="form-label">Blood Group</label><select class="form-input"><option>B+</option><option>A+</option><option>O+</option><option>AB+</option></select></div>
            <div class="form-group"><label class="form-label">Emergency Contact</label><input class="form-input" value="Meera Kothari · 97XXXXX900"/></div>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:7px">
            <button class="btn btn-sm">Cancel</button>
            <button class="btn btn-primary btn-sm">Save Changes</button>
          </div>
        </div>
        <div class="card">
          <div class="card-title">Profile Photo</div>
          <div style="width:80px;height:80px;border-radius:50%;background:#e6f1fb;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;color:#185FA5;margin:0 auto 12px">AK</div>
          <div style="text-align:center;font-size:11px;color:#888780;margin-bottom:10px">JPG or PNG · Max 5MB · Auto-resized to 200×200px</div>
          <button class="btn btn-sm" style="width:100%;text-align:center">Upload New Photo</button>
          <div class="section-title" style="margin-top:14px">Academy Assignments</div>
          <div class="emp-field"><span class="efl">Jaynik Eduserve Pvt Ltd</span><div><span class="badge b-green">Primary · 100%</span></div></div>
          <button class="btn btn-sm" style="margin-top:7px;font-size:10px">+ Add Academy Assignment</button>
          <div class="info-banner info-blue" style="margin-top:10px;font-size:10px">Multi-academy: assign cost-centre % to split payroll across academies.</div>
        </div>
      </div>
    </div>

    <!-- Tab: Employment -->
    <div v-if="activeTab === 'employment'">
      <div class="two-col">
        <div class="card">
          <div class="card-title">Employment Details</div>
          <div class="form-grid fg-2">
            <div class="form-group"><label class="form-label">Department <span class="req">*</span></label><select class="form-input"><option>Development</option><option>Support</option><option>Sales</option><option>Leadership</option></select></div>
            <div class="form-group"><label class="form-label">Designation <span class="req">*</span></label><select class="form-input"><option>Senior Developer</option><option>Developer</option><option>Support Executive</option></select></div>
            <div class="form-group"><label class="form-label">Employment Type</label><select class="form-input"><option>Permanent</option><option>Contract</option><option>Intern</option></select></div>
            <div class="form-group"><label class="form-label">Employee Type</label><select class="form-input"><option>Faculty</option><option>Support Staff</option><option>Management</option></select></div>
            <div class="form-group"><label class="form-label">Manager</label><select class="form-input"><option>Manish Vekariya</option><option>Nihar Sheth</option></select></div>
            <div class="form-group"><label class="form-label">Sr. Manager</label><select class="form-input"><option>Nihar Sheth</option></select></div>
            <div class="form-group"><label class="form-label">Date of Joining</label><input type="date" class="form-input" value="2021-06-01"/></div>
            <div class="form-group"><label class="form-label">Date of Leaving</label><input type="date" class="form-input" placeholder="— still employed —"/></div>
          </div>
          <div style="display:flex;justify-content:flex-end;gap:7px"><button class="btn btn-sm">Cancel</button><button class="btn btn-primary btn-sm">Save Changes</button></div>
        </div>
        <div class="card">
          <div class="card-title">Status Control</div>
          <div class="emp-field"><span class="efl">Current Status</span><span class="badge b-green">Active</span></div>
          <div style="display:flex;gap:7px;margin-top:9px">
            <button class="btn btn-sm btn-danger" style="flex:1">Deactivate Employee</button>
            <button class="btn btn-sm" style="flex:1">Mark as Resigned</button>
          </div>
          <div class="info-banner info-amber" style="margin-top:10px;font-size:10px">Deactivating excludes the employee from payroll runs and attendance computation. All historical data is retained.</div>
          <div class="section-title">Audit Log (last 5)</div>
          <div style="font-size:10px;color:#888780;line-height:1.8">
            <div>02 May 2026 · Nihar Sheth updated Department</div>
            <div>15 Jan 2026 · System auto-assigned SH holidays</div>
            <div>01 Jun 2021 · HR Admin created employee record</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab: Payroll -->
    <div v-if="activeTab === 'payroll'">
      <div class="two-col">
        <div class="card">
          <div class="card-title">Payroll Grade &amp; Salary</div>
          <div class="form-grid fg-2">
            <div class="form-group"><label class="form-label">Grade Pay</label><select class="form-input"><option>Software 02 · ₹50,000 basic</option><option>Software 01</option><option>Support 01</option></select></div>
            <div class="form-group"><label class="form-label">Gross CTC (computed)</label><input class="form-input" value="₹68,000 / mo" readonly/></div>
          </div>
          <div class="section-title">Banking &amp; Statutory (Encrypted at Rest)</div>
          <div class="form-grid fg-2">
            <div class="form-group"><label class="form-label">Bank Name</label><input class="form-input" value="HDFC Bank"/></div>
            <div class="form-group"><label class="form-label">Account No. (masked)</label><input class="form-input" value="••••••8421" readonly/></div>
            <div class="form-group"><label class="form-label">IFSC Code</label><input class="form-input" value="HDFC0001234"/></div>
            <div class="form-group"><label class="form-label">Branch</label><input class="form-input" value="Ahmedabad Main"/></div>
            <div class="form-group"><label class="form-label">PF Account No.</label><input class="form-input" value="MH/49201"/></div>
            <div class="form-group"><label class="form-label">ESIC No.</label><input class="form-input" value="31001234"/></div>
            <div class="form-group"><label class="form-label">PAN (masked)</label><input class="form-input" value="AB•••7891K" readonly/></div>
            <div class="form-group"><label class="form-label">PRAN (for govt)</label><input class="form-input" placeholder="N/A for private"/></div>
          </div>
          <div class="info-banner info-blue" style="font-size:10px">PAN and Account No. are encrypted at rest (AES-256). Only HR Admin and Finance roles can unmask.</div>
          <div style="display:flex;justify-content:flex-end"><button class="btn btn-primary btn-sm">Save Payroll Profile</button></div>
        </div>
        <div class="card">
          <div class="card-title">Payslip History</div>
          <table>
            <thead><tr><th>Month</th><th>Net Pay</th><th>Status</th><th></th></tr></thead>
            <tbody>
              <tr><td>Apr 2026</td><td>₹58,160</td><td><span class="badge b-amber">Pending</span></td><td><button class="btn btn-sm btn-icon">👁</button></td></tr>
              <tr><td>Mar 2026</td><td>₹58,160</td><td><span class="badge b-green">Paid</span></td><td><button class="btn btn-sm btn-icon">⬇</button></td></tr>
              <tr><td>Feb 2026</td><td>₹58,160</td><td><span class="badge b-green">Paid</span></td><td><button class="btn btn-sm btn-icon">⬇</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Tab: Leave -->
    <div v-if="activeTab === 'leave'">
      <div class="card">
        <div class="card-title">
          Leave Balances — FY 2026
          <select class="form-input" style="width:auto;padding:4px 8px;font-size:10px"><option>2026</option><option>2025</option><option>2024</option></select>
        </div>
        <table>
          <thead><tr><th>Leave Type</th><th>Carry Forward</th><th>Allocated</th><th>Used</th><th>Remaining</th></tr></thead>
          <tbody>
            <tr><td>Paid Leave (PL)</td><td>10.0</td><td>12.0</td><td>4.0</td><td style="font-weight:600;color:#3b6d11">18.0</td></tr>
            <tr><td>Casual/Sick Leave (CSL)</td><td>0.0</td><td>8.0</td><td>2.0</td><td style="font-weight:600;color:#3b6d11">6.0</td></tr>
            <tr><td>Statutory Holiday (SH)</td><td>0.0</td><td>14.0</td><td>13.0</td><td style="font-weight:600;color:#3b6d11">1.0</td></tr>
            <tr><td>Work From Home (WFH)</td><td>0.0</td><td>24.0</td><td>8.0</td><td style="font-weight:600;color:#3b6d11">16.0</td></tr>
          </tbody>
        </table>
        <div style="display:flex;justify-content:flex-end;margin-top:9px;gap:7px">
          <button class="btn btn-sm" @click="router.push({ name: 'hrms-leave-ledger' })">View Full Ledger →</button>
          <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-assign-leave')">Assign Leave</button>
        </div>
      </div>
    </div>

    <!-- Tab: Documents -->
    <div v-if="activeTab === 'documents'">
      <div class="card">
        <div class="card-title">Employee Documents <button class="btn btn-primary btn-sm">+ Upload Document</button></div>
        <table>
          <thead><tr><th>Document Type</th><th>Filename</th><th>Uploaded</th><th>Verified</th><th></th></tr></thead>
          <tbody>
            <tr><td>Offer Letter</td><td style="color:#185FA5">offer_letter_alpesh_2021.pdf</td><td>01 Jun 2021</td><td><span class="badge b-green">Verified</span></td><td><div style="display:flex;gap:3px"><button class="btn btn-sm btn-icon">⬇</button><button class="btn btn-sm btn-icon btn-danger">🗑</button></div></td></tr>
            <tr><td>Aadhaar Card</td><td style="color:#185FA5">aadhaar_alpesh.pdf</td><td>01 Jun 2021</td><td><span class="badge b-green">Verified</span></td><td><div style="display:flex;gap:3px"><button class="btn btn-sm btn-icon">⬇</button><button class="btn btn-sm btn-icon btn-danger">🗑</button></div></td></tr>
            <tr><td>PAN Card</td><td style="color:#185FA5">pan_alpesh.jpg</td><td>01 Jun 2021</td><td><span class="badge b-amber">Pending</span></td><td><div style="display:flex;gap:3px"><button class="btn btn-sm btn-icon">⬇</button><button class="btn btn-sm btn-icon">✓</button></div></td></tr>
            <tr><td>Bank Passbook / Cheque</td><td style="color:#185FA5">bank_alpesh.jpg</td><td>03 Jun 2021</td><td><span class="badge b-green">Verified</span></td><td><div style="display:flex;gap:3px"><button class="btn btn-sm btn-icon">⬇</button><button class="btn btn-sm btn-icon btn-danger">🗑</button></div></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tab: Evaluation -->
    <div v-if="activeTab === 'evaluation'">
      <div class="card">
        <div class="card-title">Performance Reviews <button class="btn btn-primary btn-sm">+ Start New Review</button></div>
        <table>
          <thead><tr><th>Period</th><th>Type</th><th>Overall Score</th><th>Reviewer</th><th>Status</th><th></th></tr></thead>
          <tbody>
            <tr><td>FY 2025–26</td><td><span class="badge b-blue">Annual</span></td><td><span style="font-weight:600;color:#185FA5">4.2 / 5.0</span></td><td>Manish Vekariya</td><td><span class="badge b-green">Published</span></td><td><button class="btn btn-sm">View</button></td></tr>
            <tr><td>FY 2024–25</td><td><span class="badge b-blue">Annual</span></td><td><span style="font-weight:600;color:#185FA5">3.9 / 5.0</span></td><td>Manish Vekariya</td><td><span class="badge b-green">Published</span></td><td><button class="btn btn-sm">View</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useModalStore } from '@/stores/useModalStore'

const router     = useRouter()
const modalStore = useModalStore()
const activeTab  = ref('basic')

const tabs = [
  { id: 'basic',      label: 'Basic Info' },
  { id: 'employment', label: 'Employment' },
  { id: 'payroll',    label: 'Payroll' },
  { id: 'leave',      label: 'Leave' },
  { id: 'documents',  label: 'Documents' },
  { id: 'evaluation', label: 'Evaluation' },
]
</script>
