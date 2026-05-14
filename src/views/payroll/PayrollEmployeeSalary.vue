<template>
  <div>
    <div style="display:flex;gap:8px;margin-bottom:13px">
      <input class="form-input" placeholder="Search employee…" style="max-width:260px"/>
      <select class="form-input" style="width:auto">
        <option>All Grades</option><option>Software</option><option>Support</option><option>Leadership</option>
      </select>
    </div>

    <div class="tbl-wrap">
      <table>
        <thead>
          <tr><th>Employee</th><th>Grade</th><th>Basic (₹)</th><th>Gross CTC (₹)</th><th>Bank Account</th><th>PF No.</th><th>ESIC No.</th><th>PAN</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="e in employees" :key="e.id" :style="e.noGrade ? 'background:#fdf5f0' : ''">
            <td>
              <div style="font-weight:600">{{ e.name }}</div>
              <div style="font-size:11px;color:#888780">{{ e.id }}</div>
            </td>
            <td>
              <span v-if="e.noGrade" style="font-size:12px;color:#e24b4a">⚠ Not assigned</span>
              <span v-else class="chip">{{ e.grade }}</span>
            </td>
            <td>{{ e.basic || '—' }}</td>
            <td>{{ e.ctc || '—' }}</td>
            <td style="font-size:12px;color:#888780">{{ e.bank }}</td>
            <td style="font-size:12px;color:#888780">{{ e.pf }}</td>
            <td style="font-size:12px;color:#888780">{{ e.esic }}</td>
            <td style="font-size:12px;color:#888780">{{ e.pan }}</td>
            <td>
              <button v-if="e.noGrade" class="btn btn-sm btn-primary">Set Grade</button>
              <button v-else class="btn btn-sm btn-icon">✏️</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="info-banner info-blue">
      Sensitive fields (PAN, Bank Account) are masked in display. Full values are only visible to users with
      <strong>HR Admin</strong> or <strong>Finance</strong> role, and are encrypted at rest.
    </div>
  </div>
</template>

<script setup>
const employees = [
  { id:'EMP-001', name:'Alpesh Kothari',  grade:'Software 02', basic:'50,000',  ctc:'68,000',   bank:'••••••8421 (HDFC)',  pf:'MH/49201', esic:'31001234', pan:'AB•••7891K', noGrade:false },
  { id:'EMP-002', name:'Priya Mehta',     grade:'Support 01',  basic:'18,000',  ctc:'24,500',   bank:'••••••3310 (SBI)',   pf:'MH/49202', esic:'31001235', pan:'CD•••4512M', noGrade:false },
  { id:'EMP-004', name:'Manish Vekariya', grade:'Leadership',  basic:'80,000',  ctc:'1,08,000', bank:'••••••9920 (ICICI)', pf:'—',        esic:'—',        pan:'EF•••6723P', noGrade:false },
  { id:'EMP-031', name:'Deepa Shah',      grade:'',            basic:'',        ctc:'',         bank:'Not configured',    pf:'—',        esic:'—',        pan:'—',         noGrade:true  },
]
</script>
