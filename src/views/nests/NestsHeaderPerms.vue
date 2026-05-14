<template>
  <div>
    <div class="info-banner info-blue">Header Permissions allow per-school control over which salary components are active. Toggle a header off to exclude it from future payroll runs for that school.</div>
    <div class="toolbar" style="margin-bottom:10px">
      <select class="form-input" style="width:auto"><option>All Schools</option><option>EMRS-JH-001 – Khunti</option><option>EMRS-CG-018 – Bastar</option><option>EMRS-WB-009 – Sunderban</option></select>
      <select class="form-input" style="width:auto"><option>All Header Types</option><option>Earnings</option><option>Deductions</option></select>
    </div>
    <div class="two-col">
      <div class="card">
        <div class="card-title">Earnings Headers</div>
        <table>
          <thead><tr><th>Header</th><th>Type</th><th>JH-001</th><th>CG-018</th><th>WB-009</th></tr></thead>
          <tbody>
            <tr v-for="h in earningsHeaders" :key="h.name">
              <td>{{ h.name }}</td>
              <td><span class="badge" :class="h.system ? 'b-blue' : 'b-gray'">{{ h.system ? 'System' : 'Custom' }}</span></td>
              <td><label class="toggle-wrap"><input type="checkbox" :checked="h.jh" :disabled="h.system"/><span class="toggle"></span></label></td>
              <td><label class="toggle-wrap"><input type="checkbox" :checked="h.cg" :disabled="h.system"/><span class="toggle"></span></label></td>
              <td><label class="toggle-wrap"><input type="checkbox" :checked="h.wb" :disabled="h.system"/><span class="toggle"></span></label></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title">Deduction Headers</div>
        <table>
          <thead><tr><th>Header</th><th>Type</th><th>JH-001</th><th>CG-018</th><th>WB-009</th></tr></thead>
          <tbody>
            <tr v-for="h in deductionHeaders" :key="h.name">
              <td>{{ h.name }}</td>
              <td><span class="badge" :class="h.system ? 'b-blue' : 'b-gray'">{{ h.system ? 'System' : 'Custom' }}</span></td>
              <td><label class="toggle-wrap"><input type="checkbox" :checked="h.jh" :disabled="h.system"/><span class="toggle"></span></label></td>
              <td><label class="toggle-wrap"><input type="checkbox" :checked="h.cg" :disabled="h.system"/><span class="toggle"></span></label></td>
              <td><label class="toggle-wrap"><input type="checkbox" :checked="h.wb" :disabled="h.system"/><span class="toggle"></span></label></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const earningsHeaders = [
  { name:'Basic Pay',              system:true,  jh:true,  cg:true,  wb:true  },
  { name:'DA',                     system:true,  jh:true,  cg:true,  wb:true  },
  { name:'HRA',                    system:true,  jh:true,  cg:true,  wb:true  },
  { name:'Tribal Area Allowance',  system:false, jh:true,  cg:true,  wb:true  },
  { name:'Bad Climate Allowance',  system:false, jh:false, cg:true,  wb:false },
  { name:'Special Duty Allowance', system:false, jh:false, cg:false, wb:true  },
  { name:'Sunderban Allowance',    system:false, jh:false, cg:false, wb:true  },
]
const deductionHeaders = [
  { name:'Income Tax (TDS)', system:true,  jh:true,  cg:true,  wb:true  },
  { name:'NPS (Employee)',   system:true,  jh:true,  cg:true,  wb:true  },
  { name:'GIS Premium',      system:false, jh:true,  cg:true,  wb:true  },
  { name:'CGHS / CGEIS',     system:false, jh:true,  cg:true,  wb:false },
  { name:'Advance Recovery', system:false, jh:true,  cg:true,  wb:true  },
]
</script>
