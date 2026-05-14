<template>
  <div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:13px">
      <div style="font-size:13px;color:#888780">{{ grades.length }} grades configured</div>
      <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-payroll-add-grade')">+ Add Grade</button>
    </div>

    <div class="tbl-wrap">
      <table>
        <thead>
          <tr>
            <th>Grade Code</th><th>Grade Name</th><th>Group</th>
            <th>Basic Pay (₹/mo)</th><th>Gross CTC (₹/mo)</th>
            <th>ESI</th><th>PF</th><th>Employees</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="g in grades" :key="g.code">
            <td style="color:#888780;font-size:12px">{{ g.code }}</td>
            <td style="font-weight:600">{{ g.name }}</td>
            <td><span :class="['badge', g.groupBadge]">{{ g.group }}</span></td>
            <td>{{ g.basic }}</td>
            <td>{{ g.ctc }}</td>
            <td><span :class="['badge', g.esi ? 'b-green' : 'b-gray']">{{ g.esi ? 'Yes' : 'No' }}</span></td>
            <td><span :class="['badge', g.pf  ? 'b-green' : 'b-gray']">{{ g.pf  ? 'Yes' : 'No' }}</span></td>
            <td>{{ g.emp }}</td>
            <td><span class="badge b-green">Active</span></td>
            <td>
              <div style="display:flex;gap:4px">
                <button class="btn btn-sm btn-icon">✏️</button>
                <button class="btn btn-sm btn-icon btn-danger" :style="g.locked ? 'opacity:.4' : ''" :title="g.locked ? 'Cannot delete — employee assigned' : ''">🗑</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="info-banner info-amber">
      A grade cannot be deleted if any active employee is assigned to it. You can deactivate it instead.
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()

const grades = [
  { code:'GR-001', name:'Support 01',  group:'Support',    groupBadge:'b-gray',   basic:'₹18,000', ctc:'₹24,500',   esi:true,  pf:true,  emp:8,  locked:false },
  { code:'GR-002', name:'Support 02',  group:'Support',    groupBadge:'b-gray',   basic:'₹22,000', ctc:'₹29,800',   esi:true,  pf:true,  emp:6,  locked:false },
  { code:'GR-003', name:'Software 01', group:'Development',groupBadge:'b-blue',   basic:'₹35,000', ctc:'₹47,500',   esi:true,  pf:true,  emp:12, locked:false },
  { code:'GR-004', name:'Software 02', group:'Development',groupBadge:'b-blue',   basic:'₹50,000', ctc:'₹68,000',   esi:false, pf:true,  emp:9,  locked:false },
  { code:'GR-005', name:'Leadership',  group:'Leadership', groupBadge:'b-purple', basic:'₹80,000', ctc:'₹1,08,000', esi:false, pf:true,  emp:5,  locked:false },
  { code:'GR-006', name:'CEO',         group:'Leadership', groupBadge:'b-purple', basic:'₹1,50,000',ctc:'₹2,00,000',esi:false, pf:false, emp:1,  locked:true  },
]
</script>
