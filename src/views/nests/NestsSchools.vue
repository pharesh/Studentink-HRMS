<template>
  <div>
    <div class="toolbar">
      <input class="form-input" style="width:190px" placeholder="Search school / code / region…"/>
      <select class="form-input" style="width:auto"><option>All Regions</option><option>North</option><option>South</option><option>East</option><option>West</option><option>Central</option></select>
      <select class="form-input" style="width:auto"><option>All States</option><option>Chhattisgarh</option><option>Jharkhand</option><option>Odisha</option><option>MP</option></select>
      <div class="toolbar-right">
        <button class="btn btn-sm">Export</button>
        <button class="btn btn-primary btn-sm">+ Add School</button>
      </div>
    </div>
    <div class="tbl-wrap">
      <table>
        <thead><tr><th>EMRS Code</th><th>School Name</th><th>State</th><th>Region</th><th>Principal</th><th>Employees</th><th>Special Allowances</th><th>Payroll Status</th><th></th></tr></thead>
        <tbody>
          <tr v-for="s in schools" :key="s.code">
            <td style="font-weight:600;color:#185FA5">{{ s.code }}</td>
            <td>{{ s.name }}</td><td>{{ s.state }}</td><td>{{ s.region }}</td>
            <td>{{ s.principal }}</td><td>{{ s.employees }}</td>
            <td><span v-for="a in s.allowances" :key="a" class="chip" style="margin-right:3px">{{ a }}</span></td>
            <td><span class="badge" :class="s.payrollClass">{{ s.payrollStatus }}</span></td>
            <td><button class="btn btn-sm">Configure</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const schools = [
  { code:'EMRS-JH-001', name:'EMRS Khunti',         state:'Jharkhand',    region:'East',    principal:'Dr. Ramesh Kumar',  employees:72, allowances:['Tribal Area'],                      payrollStatus:'Published',  payrollClass:'b-green' },
  { code:'EMRS-CG-018', name:'EMRS Bastar',          state:'Chhattisgarh', region:'Central', principal:'Mrs. Sunita Nair',  employees:68, allowances:['Tribal Area','Bad Climate'],         payrollStatus:'Published',  payrollClass:'b-green' },
  { code:'EMRS-WB-009', name:'EMRS Sunderban Zone A',state:'West Bengal',  region:'East',    principal:'Mr. Dipak Roy',     employees:54, allowances:['Sunderban','Tribal Area'],           payrollStatus:'Processing', payrollClass:'b-amber' },
  { code:'EMRS-AS-024', name:'EMRS Bodoland',        state:'Assam',        region:'East',    principal:'Mrs. Rima Bora',    employees:61, allowances:['Special Duty'],                      payrollStatus:'Pending',    payrollClass:'b-amber' },
  { code:'EMRS-MH-033', name:'EMRS Palghar',         state:'Maharashtra',  region:'West',    principal:'Mr. Vivek Sawant',  employees:49, allowances:['Tribal Area'],                      payrollStatus:'Published',  payrollClass:'b-green' },
]
</script>
