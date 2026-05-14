<template>
  <div>
    <div class="stat-grid g3" style="margin-bottom:16px">
      <div class="stat-card">
        <div class="stat-label">FY 2026–27 Total Payroll</div>
        <div class="stat-val">₹31.4L</div>
        <div class="stat-sub">Apr 2026 (1 month processed)</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Avg. Net Salary/Employee</div>
        <div class="stat-val">₹50,330</div>
        <div class="stat-sub">54 employees, Apr 2026</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Statutory Compliance</div>
        <div class="stat-val" style="font-size:17px;margin-top:3px">
          <span class="badge b-green" style="font-size:13px;padding:5px 13px">✓ Compliant</span>
        </div>
        <div class="stat-sub">PF · ESIC · TDS up to date</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Available Reports</div>

      <div class="section-title">Monthly Reports</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
        <div v-for="r in monthlyReports" :key="r.title" class="report-row">
          <div>
            <div style="font-size:13px;font-weight:600">{{ r.title }}</div>
            <div style="font-size:11px;color:#888780;margin-top:2px">{{ r.desc }}</div>
          </div>
          <div style="display:flex;gap:5px">
            <button v-for="a in r.actions" :key="a.label" :class="['btn btn-sm', a.primary ? 'btn-primary' : '']">{{ a.label }}</button>
          </div>
        </div>
      </div>

      <div class="section-title">Statutory / Compliance</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px">
        <div v-for="r in statutoryReports" :key="r.title" class="report-row">
          <div>
            <div style="font-size:13px;font-weight:600">{{ r.title }}</div>
            <div style="font-size:11px;color:#888780;margin-top:2px">{{ r.desc }}</div>
          </div>
          <div style="display:flex;gap:5px">
            <button v-for="a in r.actions" :key="a.label" :class="['btn btn-sm', a.primary ? 'btn-primary' : '']">{{ a.label }}</button>
          </div>
        </div>
      </div>

      <div class="section-title">Analytics</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div v-for="r in analyticsReports" :key="r.title" class="report-row">
          <div>
            <div style="font-size:13px;font-weight:600">{{ r.title }}</div>
            <div style="font-size:11px;color:#888780;margin-top:2px">{{ r.desc }}</div>
          </div>
          <div style="display:flex;gap:5px">
            <button v-for="a in r.actions" :key="a.label" :class="['btn btn-sm', a.primary ? 'btn-primary' : '']">{{ a.label }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const monthlyReports = [
  { title:'Salary Register',      desc:'Full earnings & deductions per employee', actions:[{label:'PDF'},{label:'Excel'}] },
  { title:'Bank ECS / NEFT File', desc:'Bank-format salary transfer file',        actions:[{label:'Generate',primary:true}] },
  { title:'Payslip Bulk Download',desc:'All payslips for selected month as ZIP',  actions:[{label:'Download ZIP'}] },
  { title:'Anomaly Report',       desc:'Negative pay, missing grade, data errors',actions:[{label:'PDF'},{label:'Excel'}] },
]
const statutoryReports = [
  { title:'PF Challan (ECR)',  desc:'EPFO upload format',                       actions:[{label:'Generate ECR',primary:true}] },
  { title:'ESIC Challan',      desc:'ESIC portal upload format',                actions:[{label:'Generate',primary:true}] },
  { title:'TDS / Form 24Q',    desc:'Quarterly TDS return for TRACES',          actions:[{label:'PDF'},{label:'Export 24Q',primary:true}] },
  { title:'Form 16 (Annual)',  desc:'Issue to all employees at year end',       actions:[{label:'Bulk Generate'}] },
]
const analyticsReports = [
  { title:'Year-to-Date Cost Report', desc:'Month-wise payroll cost trend',      actions:[{label:'PDF'},{label:'Excel'}] },
  { title:'Department-wise Cost',     desc:'Payroll split by department',        actions:[{label:'PDF'},{label:'Excel'}] },
  { title:'Grade-wise Pay Analysis',  desc:'Distribution by salary band',       actions:[{label:'PDF'},{label:'Excel'}] },
  { title:'Arrear & Advance Summary', desc:'Outstanding loans and arrear payouts',actions:[{label:'PDF'},{label:'Excel'}] },
]
</script>

<style scoped>
.report-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 13px;
  border: 1px solid #e0ddd6;
  border-radius: 8px;
  background: #fafaf8;
  gap: 10px;
}
</style>
