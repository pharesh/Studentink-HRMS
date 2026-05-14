<template>
  <div>
    <div class="card">
      <div class="card-title">Generate Attendance Report</div>
      <div class="form-grid fg-3">
        <div class="form-group">
          <label class="form-label">Report Type</label>
          <select class="form-input"><option>Individual Attendance</option><option>Multi-Employee</option><option>Monthly Summary</option><option>Detailed (per-day)</option></select>
        </div>
        <div class="form-group">
          <label class="form-label">Employee</label>
          <select class="form-input"><option>All Employees</option><option>Alpesh Kothari</option><option>Priya Mehta</option><option>Rahul Joshi</option></select>
        </div>
        <div class="form-group">
          <label class="form-label">Department</label>
          <select class="form-input"><option>All</option><option>Development</option><option>Support</option><option>Leadership</option></select>
        </div>
        <div class="form-group"><label class="form-label">From Date</label><input type="date" class="form-input" value="2026-04-01"/></div>
        <div class="form-group"><label class="form-label">To Date</label><input type="date" class="form-input" value="2026-04-30"/></div>
        <div class="form-group">
          <label class="form-label">Output Format</label>
          <select class="form-input"><option>On-screen</option><option>Excel</option><option>PDF</option></select>
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end"><button class="btn btn-primary btn-sm">Generate Report</button></div>
    </div>
    <div class="card">
      <div class="card-title">Sample Output — April 2026 Monthly Summary</div>
      <table>
        <thead><tr><th>Employee</th><th>Dept.</th><th>Working Days</th><th>Present</th><th>Absent</th><th>On Leave</th><th>Late</th><th>LOP</th><th>Net Present %</th></tr></thead>
        <tbody>
          <tr v-for="emp in report" :key="emp.name">
            <td style="font-weight:600">{{ emp.name }}</td><td>{{ emp.dept }}</td>
            <td>{{ emp.wd }}</td><td>{{ emp.present }}</td><td>{{ emp.absent }}</td>
            <td>{{ emp.onLeave }}</td><td>{{ emp.late }}</td><td>{{ emp.lop }}</td>
            <td style="font-weight:600" :style="{ color: emp.pct >= 95 ? '#3b6d11' : emp.pct >= 80 ? '#854f0b' : '#e24b4a' }">{{ emp.pct }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const report = [
  { name:'Alpesh Kothari',  dept:'Development', wd:27, present:24, absent:0, onLeave:3, late:0, lop:0, pct:100 },
  { name:'Priya Mehta',     dept:'Support',     wd:27, present:22, absent:2, onLeave:3, late:2, lop:2, pct:93  },
  { name:'Rahul Joshi',     dept:'Development', wd:27, present:20, absent:7, onLeave:0, late:0, lop:7, pct:74  },
  { name:'Manish Vekariya', dept:'Leadership',  wd:27, present:26, absent:0, onLeave:1, late:0, lop:0, pct:100 },
]
</script>
