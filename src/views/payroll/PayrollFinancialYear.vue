<template>
  <div class="two-col">
    <div class="card">
      <div class="card-title">Create Financial Year</div>
      <div class="form-grid fg-2">
        <div class="form-group">
          <label class="form-label">Title <span class="req">*</span></label>
          <input class="form-input" value="FY 2026–27" placeholder="e.g. FY 2026–27"/>
        </div>
        <div class="form-group">
          <label class="form-label">Type</label>
          <select class="form-input">
            <option>April–March (Jaynik)</option>
            <option>March–February (NESTS)</option>
            <option>Custom</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Start Date <span class="req">*</span></label>
          <input type="date" class="form-input" value="2026-04-01"/>
        </div>
        <div class="form-group">
          <label class="form-label">End Date <span class="req">*</span></label>
          <input type="date" class="form-input" value="2027-03-31"/>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:7px;margin-top:6px;font-size:13px">
        <input type="checkbox" checked id="fy-current"/>
        <label for="fy-current">Set as Current financial year</label>
      </div>
      <div class="info-banner info-amber" style="margin-top:11px">
        Setting a new year as <strong>Current</strong> will automatically deactivate the previous Current year.
      </div>
      <div style="display:flex;justify-content:flex-end;margin-top:11px">
        <button class="btn btn-primary btn-sm">Create Financial Year</button>
      </div>
    </div>

    <div class="card">
      <div class="card-title">Financial Years</div>
      <table>
        <thead><tr><th>Title</th><th>Period</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr v-for="fy in years" :key="fy.title">
            <td style="font-weight:600">{{ fy.title }}</td>
            <td style="font-size:12px;color:#888780">{{ fy.period }}</td>
            <td><span :class="['badge', fy.current ? 'b-blue' : 'b-gray']">{{ fy.current ? 'Current' : 'Inactive' }}</span></td>
            <td><button class="btn btn-sm btn-icon">✏️</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const years = [
  { title:'FY 2026–27', period:'1 Apr 2026 – 31 Mar 2027', current:true },
  { title:'FY 2025–26', period:'1 Apr 2025 – 31 Mar 2026', current:false },
  { title:'FY 2024–25', period:'1 Apr 2024 – 31 Mar 2025', current:false },
  { title:'FY 2023–24', period:'1 Apr 2023 – 31 Mar 2024', current:false },
]
</script>
