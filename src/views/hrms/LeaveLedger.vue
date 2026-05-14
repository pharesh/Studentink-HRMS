<template>
  <div>
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:11px;flex-wrap:wrap">
      <div style="width:34px;height:34px;border-radius:50%;background:#e6f1fb;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#185FA5">AK</div>
      <div>
        <div style="font-size:13px;font-weight:600">Alpesh Kothari</div>
        <div style="font-size:10px;color:#888780">EMP-001 · Development</div>
      </div>
      <div style="margin-left:auto;display:flex;gap:7px;align-items:center;flex-wrap:wrap">
        <span style="font-size:11px;color:#888780">Balance: <strong style="color:#3b6d11">18.0 PL</strong></span>
        <select class="form-input" style="width:auto;padding:4px 8px;font-size:10px"><option>2026</option><option>2025</option></select>
        <select class="form-input" style="width:auto;padding:4px 8px;font-size:10px"><option>All Types</option><option>Paid Leave</option><option>Statutory Holiday</option><option>WFH</option></select>
        <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-assign-leave')">+ Assign Leave</button>
      </div>
    </div>
    <div class="tbl-wrap">
      <table>
        <thead><tr><th>#</th><th>Leave Type</th><th>Leave On</th><th>Half Day</th><th>Applied On</th><th>Source</th><th>Status</th><th>Processed By</th><th></th></tr></thead>
        <tbody>
          <tr v-for="entry in ledger" :key="entry.id">
            <td style="color:#888780">{{ entry.id }}</td>
            <td><span class="badge" :class="entry.badgeClass">{{ entry.type }}</span></td>
            <td>{{ entry.leaveOn }}</td>
            <td>{{ entry.halfDay }}</td>
            <td>{{ entry.appliedOn }}</td>
            <td><span class="chip">{{ entry.source }}</span></td>
            <td><span class="badge" :class="entry.statusClass">{{ entry.status }}</span></td>
            <td>{{ entry.processedBy }}</td>
            <td><button v-if="entry.canCancel" class="btn btn-sm btn-danger btn-sm">Cancel</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
const ledger = [
  { id:1, type:'SH – Statutory Holiday', badgeClass:'b-gold',  leaveOn:'14 Jan 2026', halfDay:'No', appliedOn:'15 Jan 2026 05:56 PM', source:'Holiday-Auto', status:'Approved',  statusClass:'b-green', processedBy:'System',          canCancel:false },
  { id:2, type:'SH – Statutory Holiday', badgeClass:'b-gold',  leaveOn:'26 Jan 2026', halfDay:'No', appliedOn:'15 Jan 2026 05:57 PM', source:'Holiday-Auto', status:'Approved',  statusClass:'b-green', processedBy:'System',          canCancel:false },
  { id:3, type:'AF – Absent Without Pay',badgeClass:'b-red',   leaveOn:'05 Feb 2026', halfDay:'No', appliedOn:'02 Feb 2026 10:00 AM', source:'Computation',  status:'Approved',  statusClass:'b-green', processedBy:'Manish Vekariya', canCancel:true },
  { id:4, type:'PL – Paid Leave',        badgeClass:'b-blue',  leaveOn:'15 Mar 2026', halfDay:'No', appliedOn:'12 Mar 2026 09:00 AM', source:'Application',  status:'Approved',  statusClass:'b-green', processedBy:'Manish Vekariya', canCancel:true },
  { id:5, type:'SH – Statutory Holiday', badgeClass:'b-gold',  leaveOn:'15 Aug 2026', halfDay:'No', appliedOn:'15 Jan 2026 05:58 PM', source:'Holiday-Auto', status:'Cancelled', statusClass:'b-gray',  processedBy:'Nihar Sheth',     canCancel:false },
  { id:6, type:'WFH – Work From Home',   badgeClass:'b-teal',  leaveOn:'22 Apr 2026', halfDay:'No', appliedOn:'20 Apr 2026 11:30 AM', source:'Application',  status:'Approved',  statusClass:'b-green', processedBy:'Manish Vekariya', canCancel:true },
]
</script>
