<template>
  <div>
    <div style="display:flex;gap:8px;margin-bottom:13px;flex-wrap:wrap">
      <select class="form-input" style="width:auto"><option>FY 2026–27</option><option>FY 2025–26</option></select>
      <select class="form-input" style="width:auto"><option>All Employees</option></select>
      <button class="btn btn-sm" style="margin-left:auto">Export Form 24Q</button>
      <button class="btn btn-sm btn-primary">Download TDS Performa</button>
    </div>

    <div class="stat-grid g3" style="margin-bottom:16px">
      <div class="stat-card">
        <div class="stat-label">Total TDS Payable (FY)</div>
        <div class="stat-val">₹8.4L</div>
        <div class="stat-sub">Across 18 employees</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">TDS Deposited YTD</div>
        <div class="stat-val">₹4.2L</div>
        <div class="stat-sub">Jan–Mar quarters</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Balance TDS (Apr–Mar)</div>
        <div class="stat-val">₹4.2L</div>
        <div class="stat-sub">Remaining 9 months</div>
      </div>
    </div>

    <div class="tbl-wrap">
      <table>
        <thead>
          <tr>
            <th>Employee</th><th>Annual Gross (₹)</th><th>Std. Deduction (₹)</th>
            <th>Declaration (₹)</th><th>Taxable Income (₹)</th>
            <th>Annual TDS (₹)</th><th>Monthly TDS (₹)</th><th>Regime</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="t in tdsRows" :key="t.id">
            <td>
              <div style="font-weight:600">{{ t.name }}</div>
              <div style="font-size:11px;color:#888780">{{ t.id }}</div>
            </td>
            <td>{{ t.gross }}</td>
            <td>{{ t.stdDed }}</td>
            <td>{{ t.decl }}</td>
            <td>{{ t.taxable }}</td>
            <td>{{ t.annualTds }}</td>
            <td style="font-weight:600">{{ t.monthlyTds }}</td>
            <td><span :class="['badge', t.regime === 'Old' ? 'b-blue' : 'b-purple']">{{ t.regime }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const tdsRows = [
  { id:'EMP-001', name:'Alpesh Kothari',  gross:'8,16,000',  stdDed:'50,000', decl:'2,20,000', taxable:'5,46,000',  annualTds:'24,200',   monthlyTds:'2,017',  regime:'Old' },
  { id:'EMP-004', name:'Manish Vekariya', gross:'12,96,000', stdDed:'50,000', decl:'1,50,000', taxable:'10,96,000', annualTds:'1,38,200', monthlyTds:'11,517', regime:'Old' },
  { id:'EMP-018', name:'Rahul Joshi',     gross:'5,70,000',  stdDed:'75,000', decl:'1,12,000', taxable:'3,83,000',  annualTds:'6,850',    monthlyTds:'571',    regime:'New' },
]
</script>
