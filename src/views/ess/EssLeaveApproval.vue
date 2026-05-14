<template>
  <div>
    <div class="info-banner info-blue">Team leave requests pending your approval as reporting manager.</div>
    <div class="tab-bar">
      <div v-for="tab in tabs" :key="tab.id" class="tab" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">{{ tab.label }}</div>
    </div>
    <div class="tbl-wrap">
      <table>
        <thead><tr><th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Reason</th><th>Applied</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          <tr v-for="req in filteredRequests" :key="req.id" :style="req.status === 'Pending' ? { background: '#fffbf0' } : {}">
            <td style="font-weight:600">{{ req.employee }}</td>
            <td>{{ req.type }}</td><td>{{ req.from }}</td><td>{{ req.to }}</td><td>{{ req.days }}</td>
            <td>{{ req.reason }}</td><td>{{ req.applied }}</td>
            <td><span class="badge" :class="req.statusClass">{{ req.status }}</span></td>
            <td>
              <div v-if="req.status === 'Pending'" style="display:flex;gap:4px">
                <button class="btn btn-sm btn-success">Approve</button>
                <button class="btn btn-sm btn-danger" @click="modalStore.openModal('modal-reject-reason')">Reject</button>
              </div>
              <span v-else>—</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
const activeTab  = ref('pending')
const tabs = [
  { id: 'pending',  label: 'Pending (2)' },
  { id: 'all',      label: 'All Requests' },
]
const requests = [
  { id:1, employee:'Priya Mehta', type:'CL', from:'5 May', to:'6 May', days:2, reason:'Medical appt.', applied:'1 May',  status:'Pending',  statusClass:'b-amber' },
  { id:2, employee:'Rahul Joshi', type:'AL', from:'12 May',to:'16 May',days:5, reason:'Vacation',     applied:'30 Apr', status:'Pending',  statusClass:'b-amber' },
  { id:3, employee:'Sneha Patel', type:'ML', from:'20 Apr',to:'25 Apr',days:6, reason:'Illness',      applied:'19 Apr', status:'Approved', statusClass:'b-green' },
]
const filteredRequests = computed(() => activeTab.value === 'pending' ? requests.filter(r => r.status === 'Pending') : requests)
</script>
