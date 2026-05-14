<template>
  <div class="two-col">
    <div class="card">
      <div class="card-title">Create / Edit Shift</div>
      <div class="form-grid fg-2">
        <div class="form-group" style="grid-column:1/-1"><label class="form-label">Shift Title <span class="req">*</span></label><input class="form-input" placeholder="e.g. Morning Shift"/></div>
        <div class="form-group"><label class="form-label">Start Time <span class="req">*</span></label><input type="time" class="form-input" value="09:30"/></div>
        <div class="form-group"><label class="form-label">End Time <span class="req">*</span></label><input type="time" class="form-input" value="18:30"/></div>
        <div class="form-group" style="grid-column:1/-1"><label class="form-label">Grace Duration (minutes)</label><input type="number" class="form-input" value="15" min="0" max="60"/></div>
      </div>
      <div class="section-title">Week Off Days</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:11px">
        <label v-for="day in days" :key="day.id" style="font-size:11px;display:flex;align-items:center;gap:4px">
          <input type="checkbox" :checked="day.checked"/> {{ day.label }}
        </label>
      </div>
      <div class="info-banner info-amber" style="font-size:10px">Cross-midnight shifts supported: if End Time is earlier than Start Time, system treats it as next-day end.</div>
      <div style="display:flex;justify-content:flex-end;gap:7px"><button class="btn btn-sm">Cancel</button><button class="btn btn-primary btn-sm">Save Shift</button></div>
    </div>
    <div class="card">
      <div class="card-title">Configured Shifts</div>
      <table>
        <thead><tr><th>Title</th><th>Start</th><th>End</th><th>Grace</th><th>Week Off</th><th>Employees</th><th></th></tr></thead>
        <tbody>
          <tr v-for="s in shifts" :key="s.title">
            <td style="font-weight:600">{{ s.title }}</td><td>{{ s.start }}</td><td>{{ s.end }}</td>
            <td>{{ s.grace }}</td><td>{{ s.weekOff }}</td><td>{{ s.employees }}</td>
            <td><div style="display:flex;gap:3px"><button class="btn btn-sm btn-icon">✏️</button><button class="btn btn-sm btn-icon btn-danger">🗑</button></div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const days = [
  { id:'mon', label:'Mon', checked:false }, { id:'tue', label:'Tue', checked:false },
  { id:'wed', label:'Wed', checked:false }, { id:'thu', label:'Thu', checked:false },
  { id:'fri', label:'Fri', checked:false }, { id:'sat1', label:'Sat (1st)', checked:false },
  { id:'sat2', label:'Sat (2nd)', checked:false }, { id:'sat3', label:'Sat (3rd)', checked:false },
  { id:'sat4', label:'Sat (4th)', checked:false }, { id:'sun', label:'Sun', checked:true },
]
const shifts = [
  { title:'Shift 1 (Support)', start:'09:30', end:'18:30', grace:'15 min', weekOff:'Sunday', employees:18 },
  { title:'Shift 2 (Support)', start:'10:00', end:'19:00', grace:'15 min', weekOff:'Sunday', employees:14 },
  { title:'Shift 3 (Dev)',     start:'10:00', end:'19:00', grace:'15 min', weekOff:'Sun, Sat', employees:22 },
]
</script>
