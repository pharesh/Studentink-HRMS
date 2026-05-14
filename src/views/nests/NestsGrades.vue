<template>
  <div>
    <div class="info-nests">
      7th Pay Commission Grade Levels for EMRS. Basic Pay = Pay Matrix cell for Level × Stage. Fitment factor <strong>2.57×</strong>. DA updated quarterly by DoPT.
    </div>
    <div class="toolbar">
      <select class="form-input" style="width:auto"><option>All Levels</option><option>Level 1–5 (Support)</option><option>Level 6–10 (Teaching)</option><option>Level 11–15 (Admin)</option></select>
      <label style="display:flex;align-items:center;gap:5px;font-size:11px"><input type="checkbox"/>Show PWD Variants</label>
      <div class="toolbar-right">
        <button class="btn btn-sm">Sync from NIC</button>
        <button class="btn btn-primary btn-sm" @click="modalStore.openModal('modal-add-grade')">+ Add Grade</button>
      </div>
    </div>
    <div class="tbl-wrap">
      <table>
        <thead><tr><th>Grade Level</th><th>Post / Designation</th><th>Basic Pay (₹)</th><th>Stage Range</th><th>DA %</th><th>HRA %</th><th>TA (₹)</th><th>NPS %</th><th>PWD</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr v-for="g in grades" :key="g.level">
            <td><strong>{{ g.level }}</strong></td>
            <td>{{ g.post }}</td><td>{{ g.basic }}</td><td>{{ g.stage }}</td>
            <td>{{ g.da }}</td><td>{{ g.hra }}</td><td>{{ g.ta }}</td><td>{{ g.nps }}</td>
            <td><span class="badge" :class="g.pwd ? 'b-green' : 'b-gray'">{{ g.pwd ? 'Yes' : '—' }}</span></td>
            <td><span class="badge b-green">Active</span></td>
            <td><button class="btn btn-sm">Edit</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()
const grades = [
  { level:'Level 1',  post:'MTS / Peon',       basic:'18,000',   stage:'1–40', da:50, hra:8,  ta:'1,350', nps:10, pwd:false },
  { level:'Level 2',  post:'LDC / Junior Clerk',basic:'19,900',   stage:'1–40', da:50, hra:8,  ta:'1,800', nps:10, pwd:false },
  { level:'Level 4',  post:'UDC / Senior Clerk',basic:'25,500',   stage:'1–40', da:50, hra:8,  ta:'3,600', nps:10, pwd:false },
  { level:'Level 6',  post:'TGT / PRT',         basic:'35,400',   stage:'1–40', da:50, hra:16, ta:'3,600', nps:10, pwd:true  },
  { level:'Level 7',  post:'Assistant Teacher',  basic:'44,900',   stage:'1–40', da:50, hra:16, ta:'3,600', nps:10, pwd:true  },
  { level:'Level 8',  post:'PGT / Librarian',   basic:'47,600',   stage:'1–40', da:50, hra:16, ta:'3,600', nps:10, pwd:true  },
  { level:'Level 10', post:'Vice Principal',     basic:'56,100',   stage:'1–40', da:50, hra:24, ta:'7,200', nps:10, pwd:false },
  { level:'Level 12', post:'Principal (EMRS)',   basic:'78,800',   stage:'1–40', da:50, hra:24, ta:'7,200', nps:10, pwd:false },
  { level:'Level 13', post:'Regional Director',  basic:'1,23,100', stage:'1–40', da:50, hra:27, ta:'7,200', nps:10, pwd:false },
]
</script>
