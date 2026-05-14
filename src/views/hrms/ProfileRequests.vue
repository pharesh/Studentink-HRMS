<template>
  <div>
    <div class="info-banner info-blue">Employees submit profile change requests via the self-service portal. HR Admin reviews and approves or rejects with a mandatory reason.</div>
    <div class="tab-bar">
      <div v-for="tab in tabs" :key="tab.id" class="tab" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
        {{ tab.label }}
      </div>
    </div>
    <div class="tbl-wrap">
      <table>
        <thead>
          <tr><th>Employee</th><th>Field Changed</th><th>Old Value</th><th>New Value</th><th>Requested On</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="req in requests" :key="req.id">
            <td style="font-weight:600">{{ req.name }}</td>
            <td>{{ req.field }}</td>
            <td>{{ req.oldVal }}</td>
            <td>{{ req.newVal }}</td>
            <td style="font-size:10px;color:#888780">{{ req.date }}</td>
            <td><span class="badge b-amber">Pending</span></td>
            <td>
              <div style="display:flex;gap:4px">
                <button class="btn btn-sm btn-success">Approve</button>
                <button class="btn btn-sm btn-danger" @click="modalStore.openModal('modal-reject-reason')">Reject</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useModalStore } from '@/stores/useModalStore'

const modalStore = useModalStore()
const activeTab  = ref('pending')
const tabs = [
  { id: 'pending',  label: 'Pending (3)' },
  { id: 'approved', label: 'Approved (12)' },
  { id: 'rejected', label: 'Rejected (4)' },
]
const requests = [
  { id:1, name:'Priya Mehta',  field:'Mobile Number',    oldVal:'98XXXXX002', newVal:'97XXXXX099', date:'01 May 2026, 10:22 AM' },
  { id:2, name:'Rahul Joshi',  field:'Bank Account No.', oldVal:'••••3310',   newVal:'••••7821',   date:'30 Apr 2026, 4:15 PM' },
  { id:3, name:'Sunita Rao',   field:'Emergency Contact',oldVal:'Rajesh Rao · 97XXX', newVal:'Anita Rao · 96XXX', date:'29 Apr 2026, 2:00 PM' },
]
</script>
