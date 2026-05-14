<template>
  <div>
    <div class="info-nests">Group Insurance Scheme (GIS) — mandatory for all EMRS central govt. employees. Premium deducted monthly. Coverage = Savings + Risk components.</div>
    <div class="stat-grid g4" style="margin-bottom:13px">
      <div class="stat-card"><div class="stat-label">Total Enrolled</div><div class="stat-val">9,266</div></div>
      <div class="stat-card"><div class="stat-label">Apr 2026 Deductions</div><div class="stat-val" style="font-size:16px">₹18.4L</div></div>
      <div class="stat-card"><div class="stat-label">Pending Enrollment</div><div class="stat-val" style="color:#e24b4a">12</div></div>
      <div class="stat-card"><div class="stat-label">Claims This FY</div><div class="stat-val" style="color:#185FA5">3</div></div>
    </div>
    <div class="card">
      <div class="card-title">GIS Premium Slabs (Level-based)</div>
      <table>
        <thead><tr><th>Group</th><th>Pay Level</th><th>Monthly Premium (₹)</th><th>Risk Cover (₹)</th><th>Savings (₹)</th><th>Enrolled Employees</th></tr></thead>
        <tbody>
          <tr v-for="slab in slabs" :key="slab.group">
            <td><strong>{{ slab.group }}</strong></td>
            <td>{{ slab.level }}</td><td>{{ slab.premium }}</td>
            <td>{{ slab.risk }}</td><td>{{ slab.savings }}</td><td>{{ slab.enrolled }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const slabs = [
  { group:'Group D', level:'1–2',   premium:'30',  risk:'15,000',  savings:'15,000', enrolled:1820 },
  { group:'Group C', level:'3–8',   premium:'60',  risk:'30,000',  savings:'30,000', enrolled:5948 },
  { group:'Group B', level:'9–13',  premium:'120', risk:'60,000',  savings:'60,000', enrolled:1498 },
]
</script>
