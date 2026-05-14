<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:13px;flex-wrap:wrap;gap:8px">
      <div style="display:flex;gap:8px;align-items:center">
        <select class="form-input" style="width:auto">
          <option selected>April 2026</option><option>March 2026</option><option>February 2026</option>
        </select>
        <select class="form-input" style="width:auto">
          <option>All Departments</option><option>Development</option><option>Support</option><option>Leadership</option>
        </select>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn btn-sm">Export Anomalies</button>
        <button class="btn btn-sm btn-warning" @click="modalStore.openModal('modal-payroll-publish')">Publish Payroll</button>
        <button class="btn btn-sm btn-primary">Mark as Paid</button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">
        April 2026 — Run Status
        <span class="badge b-amber">Processing</span>
      </div>
      <div class="lc">
        <div class="lc-step"><div class="lc-line done"></div><div class="lc-dot done">✓</div><div class="lc-lbl">Attendance<br>Locked</div></div>
        <div class="lc-step"><div class="lc-line done"></div><div class="lc-dot done">✓</div><div class="lc-lbl">Computed</div></div>
        <div class="lc-step"><div class="lc-line"></div><div class="lc-dot curr">3</div><div class="lc-lbl curr">HR Review</div></div>
        <div class="lc-step"><div class="lc-line"></div><div class="lc-dot pend">4</div><div class="lc-lbl">Published</div></div>
        <div class="lc-step"><div class="lc-dot pend">5</div><div class="lc-lbl">Paid</div></div>
      </div>
      <div style="display:flex;gap:16px;font-size:13px;flex-wrap:wrap">
        <span>Period: <strong>26 Mar – 25 Apr 2026</strong></span>
        <span>Working days: <strong>27</strong></span>
        <span>Computed: <span class="badge b-green">54 employees</span></span>
        <span>Anomalies: <span class="badge b-red">2 employees</span></span>
      </div>
    </div>

    <div class="tbl-wrap">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox"/></th>
            <th>Employee</th><th>Grade</th><th>Working Days</th><th>Present Days</th>
            <th>LOP Days</th><th>Gross (₹)</th><th>Deductions (₹)</th><th>Net Pay (₹)</th>
            <th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="e in employees" :key="e.id" :style="e.anomaly ? 'background:#fdf5f0' : ''">
            <td><input type="checkbox" :checked="!e.anomaly"/></td>
            <td>
              <div style="font-weight:600">{{ e.name }}</div>
              <div style="font-size:11px;color:#888780">{{ e.id }}</div>
            </td>
            <td><span class="chip">{{ e.grade }}</span></td>
            <td>{{ e.wd }}</td><td>{{ e.pd }}</td><td>{{ e.lop }}</td>
            <td>{{ e.gross }}</td><td>{{ e.ded }}</td>
            <td :style="{ fontWeight:600, color: e.anomaly ? '#e24b4a' : '#3b6d11' }">{{ e.net }}</td>
            <td>
              <span v-if="e.noGrade" class="badge b-red">No Grade</span>
              <span v-else-if="e.anomaly" class="badge b-red">⚠ Anomaly</span>
              <span v-else class="badge b-green">OK</span>
            </td>
            <td>
              <button v-if="!e.noGrade" class="btn btn-sm btn-icon" @click="modalStore.openModal('modal-payroll-payslip')">👁</button>
              <button v-else class="btn btn-sm btn-icon">✏️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;font-size:13px;color:#888780;padding:4px 2px">
      <span>Showing 5 of 56 employees</span>
      <span>Total Net Payable: <strong style="color:#1a1a2e;font-size:15px">₹27,18,400</strong></span>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()

const employees = [
  { id:'EMP-001', name:'Alpesh Kothari',  grade:'Software 02', wd:27, pd:27, lop:0, gross:'68,000',   ded:'9,840',  net:'58,160',  anomaly:false, noGrade:false },
  { id:'EMP-002', name:'Priya Mehta',     grade:'Support 01',  wd:27, pd:25, lop:2, gross:'22,741',   ded:'3,200',  net:'19,541',  anomaly:false, noGrade:false },
  { id:'EMP-018', name:'Rahul Joshi',     grade:'Software 01', wd:27, pd:20, lop:7, gross:'38,148',   ded:'7,200',  net:'30,948',  anomaly:true,  noGrade:false },
  { id:'EMP-031', name:'Deepa Shah',      grade:'',            wd:27, pd:27, lop:0, gross:'—',        ded:'—',      net:'—',       anomaly:true,  noGrade:true  },
  { id:'EMP-004', name:'Manish Vekariya', grade:'Leadership',  wd:27, pd:27, lop:0, gross:'1,08,000', ded:'14,400', net:'93,600',  anomaly:false, noGrade:false },
]
</script>
