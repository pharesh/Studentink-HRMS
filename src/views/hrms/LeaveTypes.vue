<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:11px">
      <div style="font-size:11px;color:#888780">15 leave/attendance types configured</div>
      <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-add-leave-type')">+ Add Leave Type</button>
    </div>
    <div class="tbl-wrap">
      <table>
        <thead>
          <tr>
            <th>System Name</th><th>Code</th><th>Custom Name</th><th>Unit</th>
            <th>Present Count</th><th>Max/Month</th><th>Max/Year</th>
            <th>Is Leave</th><th>Approval</th><th>Active</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="lt in leaveTypes" :key="lt.code">
            <td>{{ lt.name }}</td>
            <td><span class="chip">{{ lt.code }}</span></td>
            <td>{{ lt.customName }}</td>
            <td>{{ lt.unit }}</td>
            <td>{{ lt.presentCount }}</td>
            <td>{{ lt.maxMonth }}</td>
            <td>{{ lt.maxYear }}</td>
            <td>{{ lt.isLeave }}</td>
            <td>{{ lt.approval }}</td>
            <td><span class="badge" :class="lt.active ? 'b-green' : 'b-red'">{{ lt.active ? 'Active' : 'Inactive' }}</span></td>
            <td><button class="btn btn-sm btn-icon">✏️</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()

const leaveTypes = [
  { name:'Present',            code:'P',   customName:'Present',                    unit:'Days',    presentCount:'1.0', maxMonth:'—', maxYear:'—',  isLeave:'No',  approval:'No',  active:true },
  { name:'Late Present',       code:'LP',  customName:'Late Present',               unit:'Days',    presentCount:'1.0', maxMonth:'—', maxYear:'—',  isLeave:'No',  approval:'No',  active:true },
  { name:'Paid Leave',         code:'PL',  customName:'Paid Leave',                 unit:'Days',    presentCount:'1.0', maxMonth:'0', maxYear:'0',  isLeave:'Yes', approval:'Yes', active:true },
  { name:'Absent Without Pay', code:'AF',  customName:'Absent – Without Pay',       unit:'Days',    presentCount:'0.0', maxMonth:'—', maxYear:'—',  isLeave:'Yes', approval:'No',  active:true },
  { name:'Absent Half Day',    code:'AH',  customName:'Absent – Half Day (No Pay)', unit:'Days',    presentCount:'0.5', maxMonth:'—', maxYear:'—',  isLeave:'No',  approval:'No',  active:true },
  { name:'Statutory Holiday',  code:'SH',  customName:'Statutory Holiday',          unit:'Days',    presentCount:'1.0', maxMonth:'—', maxYear:'—',  isLeave:'Yes', approval:'No',  active:true },
  { name:'Work From Home',     code:'WFH', customName:'Work From Home',             unit:'Days',    presentCount:'1.0', maxMonth:'—', maxYear:'24', isLeave:'No',  approval:'Yes', active:true },
  { name:'Weekly Off',         code:'W',   customName:'Weekly Off',                 unit:'Days',    presentCount:'1.0', maxMonth:'—', maxYear:'—',  isLeave:'No',  approval:'No',  active:true },
  { name:'Outdoor Duty',       code:'OD',  customName:'Outdoor Duty',               unit:'Days',    presentCount:'1.0', maxMonth:'—', maxYear:'—',  isLeave:'No',  approval:'Yes', active:true },
  { name:'Worked on Week Off', code:'WWF', customName:'Worked Full Day on Week Off',unit:'Days',    presentCount:'2.0', maxMonth:'—', maxYear:'—',  isLeave:'No',  approval:'No',  active:false },
  { name:'Grace Time',         code:'GT',  customName:'Grace Time',                 unit:'Minutes', presentCount:'0.0', maxMonth:'—', maxYear:'—',  isLeave:'No',  approval:'No',  active:true },
]
</script>
