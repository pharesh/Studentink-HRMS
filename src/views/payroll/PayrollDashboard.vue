<template>
  <div>
    <div class="stat-grid g4">
      <div class="stat-card">
        <div class="stat-label">Total Employees</div>
        <div class="stat-val">56</div>
        <div class="stat-sub">54 active · 2 pre-joining</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Gross Payroll (Apr)</div>
        <div class="stat-val">₹31.4L</div>
        <div class="stat-sub" style="color:#3b6d11">▲ ₹0.8L from Mar</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Net Payable (Apr)</div>
        <div class="stat-val">₹27.2L</div>
        <div class="stat-sub">After PF · ESIC · TDS</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Apr Payroll Status</div>
        <div class="stat-val" style="font-size:17px;margin-top:3px"><span class="badge b-amber" style="font-size:13px;padding:5px 13px">Processing</span></div>
        <div class="stat-sub">Computed · Pending publish</div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">April 2026 Payroll — Run Status</div>
      <div class="lc">
        <div class="lc-step">
          <div class="lc-line done"></div>
          <div class="lc-dot done">✓</div>
          <div class="lc-lbl">Attendance<br>Locked</div>
        </div>
        <div class="lc-step">
          <div class="lc-line done"></div>
          <div class="lc-dot done">✓</div>
          <div class="lc-lbl">Computed</div>
        </div>
        <div class="lc-step">
          <div class="lc-line"></div>
          <div class="lc-dot curr">3</div>
          <div class="lc-lbl curr">HR Review</div>
        </div>
        <div class="lc-step">
          <div class="lc-line"></div>
          <div class="lc-dot pend">4</div>
          <div class="lc-lbl">Published</div>
        </div>
        <div class="lc-step">
          <div class="lc-dot pend">5</div>
          <div class="lc-lbl">Paid</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button class="btn btn-sm">View Anomalies (2)</button>
        <button class="btn btn-sm btn-primary" @click="modalStore.openModal('modal-payroll-publish')">Publish Payroll →</button>
      </div>
    </div>

    <div class="two-col">
      <div class="card">
        <div class="card-title">Recent Payroll Runs</div>
        <table>
          <thead><tr><th>Month</th><th>Employees</th><th>Net Pay</th><th>Status</th></tr></thead>
          <tbody>
            <tr v-for="r in recentRuns" :key="r.month">
              <td>{{ r.month }}</td><td>{{ r.emp }}</td><td>{{ r.net }}</td>
              <td><span :class="['badge', r.status === 'Paid' ? 'b-green' : 'b-amber']">{{ r.status }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="card">
        <div class="card-title">Pending Actions</div>
        <div class="emp-field"><span class="efl">Anomalies to resolve</span><span class="badge b-red">2 employees</span></div>
        <div class="emp-field"><span class="efl">Tax declarations pending review</span><span class="badge b-amber">7 employees</span></div>
        <div class="emp-field"><span class="efl">Salary advance EMIs active</span><span class="badge b-blue">4 loans</span></div>
        <div class="emp-field"><span class="efl">Arrear config active</span><span class="badge b-purple">1 config</span></div>
        <div class="emp-field"><span class="efl">Employees without payroll grade</span><span class="badge b-red">0</span></div>
        <div class="emp-field"><span class="efl">Bank ECS file ready</span><span class="badge b-teal">Ready to export</span></div>
        <hr class="divider"/>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <RouterLink class="btn btn-sm btn-primary" :to="{ name: 'payroll-run-payroll' }">Go to Payroll Run</RouterLink>
          <RouterLink class="btn btn-sm" :to="{ name: 'payroll-tax-declarations' }">Review Declarations</RouterLink>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Earnings vs Deductions — Last 6 Months</div>
      <div style="display:flex;gap:12px;align-items:flex-end;height:90px;padding:0 4px">
        <div v-for="bar in chartBars" :key="bar.label" style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px">
          <div style="display:flex;gap:2px;align-items:flex-end;height:64px">
            <div :style="{ width:'14px', background:'#185FA5', borderRadius:'3px 3px 0 0', height: bar.earn + 'px', opacity: bar.cur ? 0.6 : 1 }"></div>
            <div :style="{ width:'14px', background:'#fac775', borderRadius:'3px 3px 0 0', height: bar.ded + 'px', opacity: bar.cur ? 0.6 : 1 }"></div>
          </div>
          <div :style="{ fontSize:'11px', color: bar.cur ? '#185FA5' : '#888780', fontWeight: bar.cur ? 600 : 400 }">{{ bar.label }}</div>
        </div>
        <div style="margin-left:10px;display:flex;flex-direction:column;gap:5px;justify-content:center">
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:#888780">
            <span style="width:12px;height:12px;background:#185FA5;border-radius:2px;display:inline-block"></span>Gross Earnings
          </div>
          <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:#888780">
            <span style="width:12px;height:12px;background:#fac775;border-radius:2px;display:inline-block"></span>Total Deductions
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useModalStore } from '@/stores/useModalStore'
const modalStore = useModalStore()

const recentRuns = [
  { month:'Apr 2026', emp:54, net:'₹27.2L', status:'Processing' },
  { month:'Mar 2026', emp:54, net:'₹26.4L', status:'Paid' },
  { month:'Feb 2026', emp:53, net:'₹25.9L', status:'Paid' },
  { month:'Jan 2026', emp:53, net:'₹25.9L', status:'Paid' },
  { month:'Dec 2025', emp:52, net:'₹25.1L', status:'Paid' },
]

const chartBars = [
  { label:'Nov', earn:48, ded:15, cur:false },
  { label:'Dec', earn:50, ded:16, cur:false },
  { label:'Jan', earn:52, ded:17, cur:false },
  { label:'Feb', earn:52, ded:17, cur:false },
  { label:'Mar', earn:54, ded:17, cur:false },
  { label:'Apr*', earn:56, ded:18, cur:true  },
]
</script>
