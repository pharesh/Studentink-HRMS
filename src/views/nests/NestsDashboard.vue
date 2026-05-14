<template>
  <div>
    <div class="info-nests">
      <strong>NESTS National View</strong> — National Education Society for Tribal Students · 740 EMRS Schools · 9,266 Employees · Central Govt. Pay (7th CPC)
    </div>
    <div class="stat-grid g4" style="margin-bottom:11px">
      <div class="stat-card"><div class="stat-label">Total Schools</div><div class="stat-val">740</div></div>
      <div class="stat-card"><div class="stat-label">Total Employees</div><div class="stat-val">9,266</div></div>
      <div class="stat-card"><div class="stat-label">Present Today</div><div class="stat-val" style="color:#3b6d11">8,941</div></div>
      <div class="stat-card"><div class="stat-label">Apr 2026 Payroll</div><div class="stat-val" style="color:#185FA5;font-size:16px">₹14.2Cr</div></div>
    </div>
    <div class="two-col">
      <div class="card">
        <div class="card-title">Region-wise Distribution</div>
        <table>
          <thead><tr><th>Region</th><th>Schools</th><th>Employees</th><th>Payroll (₹Cr)</th><th>Avg Level</th></tr></thead>
          <tbody>
            <tr v-for="r in regions" :key="r.region">
              <td>{{ r.region }}</td><td>{{ r.schools }}</td><td>{{ r.employees }}</td>
              <td>{{ r.payroll }}</td><td>{{ r.avgLevel }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title">Payroll Status — April 2026</div>
        <div style="display:flex;flex-direction:column;gap:7px">
          <div v-for="item in payrollStatus" :key="item.label" style="display:flex;justify-content:space-between;align-items:center;padding:7px 10px;background:#f8f7f4;border-radius:7px">
            <span style="font-size:11px">{{ item.label }}</span>
            <span style="font-weight:700" :style="{ color: item.color }">{{ item.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const regions = [
  { region:'North',   schools:148, employees:1924, payroll:2.91, avgLevel:8.4 },
  { region:'South',   schools:201, employees:2613, payroll:3.96, avgLevel:9.1 },
  { region:'East',    schools:176, employees:2288, payroll:3.46, avgLevel:7.9 },
  { region:'West',    schools:129, employees:1677, payroll:2.54, avgLevel:8.2 },
  { region:'Central', schools:86,  employees:764,  payroll:1.31, avgLevel:9.6 },
]
const payrollStatus = [
  { label:'Schools with Payroll Published',  value:'706 / 740',       color:'#3b6d11' },
  { label:'Schools Pending Processing',      value:'34',              color:'#854f0b' },
  { label:'Increments Due This Month',       value:'218 Employees',   color:'#185FA5' },
  { label:'NPS/PRAN Reconciliation',         value:'Reconciled',      color:'#3b6d11' },
  { label:'GIS Premium Deductions',          value:'₹18.4L deducted', color:'#1a1a2e' },
]
</script>
