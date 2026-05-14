<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:13px;flex-wrap:wrap;gap:8px">
      <select class="form-input" style="width:auto">
        <option>FY 2026–27</option><option>FY 2025–26</option>
      </select>
      <div style="font-size:13px;color:#888780">7 pending review · 42 accepted · 5 not submitted</div>
    </div>

    <div class="tbl-wrap">
      <table>
        <thead>
          <tr>
            <th>Employee</th><th>80C (₹)</th><th>HRA Claimed (₹)</th>
            <th>Other Deductions (₹)</th><th>Total Deductions (₹)</th>
            <th>Tax Regime</th><th>Submitted</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in declarations" :key="d.name" :style="d.notSubmitted ? 'background:#fdf5f0' : ''">
            <td>
              <div style="font-weight:600">{{ d.name }}</div>
              <div style="font-size:11px;color:#888780">{{ d.id }}</div>
            </td>
            <td>{{ d.c80 }}</td>
            <td>{{ d.hra }}</td>
            <td>{{ d.other }}</td>
            <td>{{ d.total }}</td>
            <td>
              <span v-if="d.regime" :class="['badge', d.regime === 'Old Regime' ? 'b-blue' : 'b-purple']">{{ d.regime }}</span>
              <span v-else>—</span>
            </td>
            <td style="font-size:12px;color:#888780">{{ d.submitted || '—' }}</td>
            <td>
              <span v-if="d.notSubmitted" class="badge b-red">Not Submitted</span>
              <span v-else-if="d.pending" class="badge b-amber">Pending Review</span>
              <span v-else class="badge b-green">Accepted</span>
            </td>
            <td>
              <div style="display:flex;gap:4px">
                <button v-if="d.notSubmitted" class="btn btn-sm">Send Reminder</button>
                <template v-else-if="d.pending">
                  <button class="btn btn-sm btn-success">Accept</button>
                  <button class="btn btn-sm btn-danger">Revise</button>
                </template>
                <button v-else class="btn btn-sm">View</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const declarations = [
  { id:'EMP-001', name:'Alpesh Kothari', c80:'1,50,000', hra:'45,000', other:'25,000', total:'2,20,000', regime:'Old Regime', submitted:'12 Feb 2026', pending:false, notSubmitted:false },
  { id:'EMP-018', name:'Rahul Joshi',    c80:'80,000',   hra:'32,000', other:'0',      total:'1,12,000', regime:'New Regime', submitted:'14 Feb 2026', pending:true,  notSubmitted:false },
  { id:'EMP-002', name:'Priya Mehta',    c80:'1,50,000', hra:'0',      other:'10,000', total:'1,60,000', regime:'Old Regime', submitted:'20 Feb 2026', pending:true,  notSubmitted:false },
  { id:'EMP-031', name:'Deepa Shah',     c80:'—',        hra:'—',      other:'—',      total:'—',        regime:null,         submitted:null,         pending:false, notSubmitted:true  },
]
</script>
