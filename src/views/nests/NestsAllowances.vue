<template>
  <div>
    <div class="info-nests">
      Special allowances for NESTS/EMRS employees are school-location based. PRAN is mandatory for all central govt. employees.
    </div>
    <div class="card">
      <div class="card-title">
        PRAN (Permanent Retirement Account Number) Configuration
        <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-pran')">+ Assign PRAN</button>
      </div>
      <table>
        <thead><tr><th>Employee</th><th>School</th><th>PRAN Number</th><th>Employee NPS %</th><th>Employer NPS %</th><th>Monthly Deduction</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr><td style="font-weight:600">Dr. Ramesh Kumar</td><td>EMRS-JH-001</td><td>●●●●●●●6742 <span style="font-size:9px;color:#888">🔒AES</span></td><td>10%</td><td>14%</td><td>₹8,870</td><td><span class="badge b-green">Active</span></td><td><button class="btn btn-sm">View</button></td></tr>
          <tr><td style="font-weight:600">Mrs. Sunita Nair</td><td>EMRS-CG-018</td><td>●●●●●●●5819 <span style="font-size:9px;color:#888">🔒AES</span></td><td>10%</td><td>14%</td><td>₹7,240</td><td><span class="badge b-green">Active</span></td><td><button class="btn btn-sm">View</button></td></tr>
          <tr><td style="font-weight:600">Mr. Dipak Roy</td><td>EMRS-WB-009</td><td style="color:#e24b4a">⚠ Not Assigned</td><td>—</td><td>—</td><td>—</td><td><span class="badge b-red">Missing</span></td><td><button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-pran')">Assign</button></td></tr>
        </tbody>
      </table>
    </div>
    <div class="card">
      <div class="card-title">
        Location-based Special Allowances
        <button class="btn btn-sm" @click="modalStore.openModal('modal-special-allowance')">Configure</button>
      </div>
      <table>
        <thead><tr><th>Allowance Type</th><th>Applicable Area</th><th>Rate</th><th>Basis</th><th>Schools</th><th>Employees</th><th>Active</th></tr></thead>
        <tbody>
          <tr v-for="a in allowances" :key="a.type">
            <td><strong>{{ a.type }}</strong></td>
            <td>{{ a.area }}</td><td>{{ a.rate }}</td><td>{{ a.basis }}</td>
            <td>{{ a.schools }}</td><td>{{ a.employees }}</td>
            <td><label class="toggle-wrap"><input type="checkbox" checked/><span class="toggle"></span></label></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
const allowances = [
  { type:'Tribal Area Allowance',  area:'Schedule V / VI tribal regions',     rate:'₹1,600–₹3,000/mo',  basis:'Fixed (Grade-based)', schools:574, employees:7248 },
  { type:'Bad Climate Allowance',  area:'DoPT-notified difficult terrain',    rate:'₹800–₹2,100/mo',    basis:'Fixed (Level-based)', schools:94,  employees:1182 },
  { type:'Special Duty Allowance', area:'North-East schools (7 states)',       rate:'12.5% of Basic+DA', basis:'% of Basic',          schools:88,  employees:1109 },
  { type:'Sunderban Allowance',    area:'WB Sunderban zone',                   rate:'₹2,700/mo',         basis:'Fixed',               schools:11,  employees:138  },
]
</script>
