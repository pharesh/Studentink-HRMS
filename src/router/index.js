import { createRouter, createWebHashHistory } from 'vue-router'

// HRMS views
import HrmsDashboard    from '@/views/hrms/HrmsDashboard.vue'
import StaffList        from '@/views/hrms/StaffList.vue'
import StaffDetail      from '@/views/hrms/StaffDetail.vue'
import ProfileRequests  from '@/views/hrms/ProfileRequests.vue'
import HolidayMaster    from '@/views/hrms/HolidayMaster.vue'
import LeaveCalendar    from '@/views/hrms/LeaveCalendar.vue'
import LeaveTypes       from '@/views/hrms/LeaveTypes.vue'
import EmployeeLeave    from '@/views/hrms/EmployeeLeave.vue'
import LeaveLedger      from '@/views/hrms/LeaveLedger.vue'
import ShiftMaster      from '@/views/hrms/ShiftMaster.vue'
import ShiftAssign      from '@/views/hrms/ShiftAssign.vue'
import AttComputation   from '@/views/hrms/AttComputation.vue'
import AttReports       from '@/views/hrms/AttReports.vue'
import Evaluation         from '@/views/hrms/Evaluation.vue'
import AcademyDepartment  from '@/views/hrms/AcademyDepartment.vue'
import AcademyDesignation from '@/views/hrms/AcademyDesignation.vue'
import EmploymentType     from '@/views/hrms/EmploymentType.vue'
import EmployeeType      from '@/views/hrms/EmployeeType.vue'
import DocumentType     from '@/views/hrms/DocumentType.vue'

// NESTS views
import NestsDashboard   from '@/views/nests/NestsDashboard.vue'
import NestsSchools     from '@/views/nests/NestsSchools.vue'
import NestsGrades      from '@/views/nests/NestsGrades.vue'
import NestsAllowances  from '@/views/nests/NestsAllowances.vue'
import NestsHeaderPerms from '@/views/nests/NestsHeaderPerms.vue'
import NestsIncrement   from '@/views/nests/NestsIncrement.vue'
import NestsGis         from '@/views/nests/NestsGis.vue'
import NestsReports     from '@/views/nests/NestsReports.vue'

// ESS views
import EssDashboard     from '@/views/ess/EssDashboard.vue'
import EssLeave         from '@/views/ess/EssLeave.vue'
import EssLeaveApproval from '@/views/ess/EssLeaveApproval.vue'
import EssAttendance    from '@/views/ess/EssAttendance.vue'
import EssPayslip       from '@/views/ess/EssPayslip.vue'
import EssTax           from '@/views/ess/EssTax.vue'
import EssProfile       from '@/views/ess/EssProfile.vue'

// Payroll views
import PayrollDashboard       from '@/views/payroll/PayrollDashboard.vue'
import PayrollFinancialYear   from '@/views/payroll/PayrollFinancialYear.vue'
import PayrollPeriod          from '@/views/payroll/PayrollPeriod.vue'
import PayrollHeaders         from '@/views/payroll/PayrollHeaders.vue'
import PayrollGradePay        from '@/views/payroll/PayrollGradePay.vue'
import PayrollRunPayroll      from '@/views/payroll/PayrollRunPayroll.vue'
import PayrollArrears         from '@/views/payroll/PayrollArrears.vue'
import PayrollAdvances        from '@/views/payroll/PayrollAdvances.vue'
import PayrollPayslips        from '@/views/payroll/PayrollPayslips.vue'
import PayrollEmployeeSalary  from '@/views/payroll/PayrollEmployeeSalary.vue'
import PayrollTaxDeclarations from '@/views/payroll/PayrollTaxDeclarations.vue'
import PayrollTds             from '@/views/payroll/PayrollTds.vue'
import PayrollReports         from '@/views/payroll/PayrollReports.vue'

const routes = [
  { path: '/', redirect: '/hrms/dashboard' },

  // HRMS
  { path: '/hrms/dashboard',        name: 'hrms-dashboard',        component: HrmsDashboard },
  { path: '/hrms/staff',            name: 'hrms-staff',            component: StaffList },
  { path: '/hrms/staff/:id',         name: 'hrms-staff-detail',     component: StaffDetail },
  { path: '/hrms/profile-requests', name: 'hrms-profile-requests', component: ProfileRequests },
  { path: '/hrms/holiday',          name: 'hrms-holiday',          component: HolidayMaster },
  { path: '/hrms/leave-calendar',   name: 'hrms-leave-calendar',   component: LeaveCalendar },
  { path: '/hrms/leave-types',      name: 'hrms-leave-types',      component: LeaveTypes },
  { path: '/hrms/employee-leave',   name: 'hrms-employee-leave',   component: EmployeeLeave },
  { path: '/hrms/leave-ledger/:staffId?', name: 'hrms-leave-ledger', component: LeaveLedger },
  { path: '/hrms/shift-master',     name: 'hrms-shift-master',     component: ShiftMaster },
  { path: '/hrms/shift-assign',     name: 'hrms-shift-assign',     component: ShiftAssign },
  { path: '/hrms/att-computation',  name: 'hrms-att-computation',  component: AttComputation },
  { path: '/hrms/att-reports',      name: 'hrms-att-reports',      component: AttReports },
  { path: '/hrms/evaluation',        name: 'hrms-evaluation',        component: Evaluation },
  { path: '/hrms/departments',        name: 'hrms-departments',        component: AcademyDepartment },
  { path: '/hrms/designations',        name: 'hrms-designations',        component: AcademyDesignation },
  { path: '/hrms/employment-types',    name: 'hrms-employment-types',    component: EmploymentType },
  { path: '/hrms/employee-types',      name: 'hrms-employee-types',      component: EmployeeType },
  { path: '/hrms/document-types',      name: 'hrms-document-types',      component: DocumentType },

  // NESTS
  { path: '/nests/dashboard',       name: 'nests-dashboard',       component: NestsDashboard },
  { path: '/nests/schools',         name: 'nests-schools',         component: NestsSchools },
  { path: '/nests/grades',          name: 'nests-grades',          component: NestsGrades },
  { path: '/nests/allowances',      name: 'nests-allowances',      component: NestsAllowances },
  { path: '/nests/header-perms',    name: 'nests-header-perms',    component: NestsHeaderPerms },
  { path: '/nests/increment',       name: 'nests-increment',       component: NestsIncrement },
  { path: '/nests/gis',             name: 'nests-gis',             component: NestsGis },
  { path: '/nests/reports',         name: 'nests-reports',         component: NestsReports },

  // ESS
  { path: '/ess/dashboard',         name: 'ess-dashboard',         component: EssDashboard },
  { path: '/ess/leave',             name: 'ess-leave',             component: EssLeave },
  { path: '/ess/leave-approval',    name: 'ess-leave-approval',    component: EssLeaveApproval },
  { path: '/ess/attendance',        name: 'ess-attendance',        component: EssAttendance },
  { path: '/ess/payslip',           name: 'ess-payslip',           component: EssPayslip },
  { path: '/ess/tax',               name: 'ess-tax',               component: EssTax },
  { path: '/ess/profile',           name: 'ess-profile',           component: EssProfile },

  // Payroll
  { path: '/payroll/dashboard',       name: 'payroll-dashboard',       component: PayrollDashboard },
  { path: '/payroll/financial-year',  name: 'payroll-financial-year',  component: PayrollFinancialYear },
  { path: '/payroll/period',          name: 'payroll-period',          component: PayrollPeriod },
  { path: '/payroll/headers',         name: 'payroll-headers',         component: PayrollHeaders },
  { path: '/payroll/grade-pay',       name: 'payroll-grade-pay',       component: PayrollGradePay },
  { path: '/payroll/run-payroll',     name: 'payroll-run-payroll',     component: PayrollRunPayroll },
  { path: '/payroll/arrears',         name: 'payroll-arrears',         component: PayrollArrears },
  { path: '/payroll/advances',        name: 'payroll-advances',        component: PayrollAdvances },
  { path: '/payroll/payslips',        name: 'payroll-payslips',        component: PayrollPayslips },
  { path: '/payroll/employee-salary', name: 'payroll-employee-salary', component: PayrollEmployeeSalary },
  { path: '/payroll/tax-declarations',name: 'payroll-tax-declarations',component: PayrollTaxDeclarations },
  { path: '/payroll/tds',             name: 'payroll-tds',             component: PayrollTds },
  { path: '/payroll/reports',         name: 'payroll-reports',         component: PayrollReports },

  {
    path: '/auth/callback',
    name: 'auth-callback',
    component: () => import('@/views/AuthCallback.vue'),
  },
  {
    path: '/auth/error',
    name: 'auth-error',
    component: () => import('@/views/AuthError.vue'),
  },
]

const PUBLIC_ROUTES = ['auth-callback', 'auth-error']

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// Navigation guard — redirect to error page if no token
router.beforeEach((to) => {
  if (PUBLIC_ROUTES.includes(to.name)) return true
  const token = localStorage.getItem('auth_token')
  if (!token) return { name: 'auth-error' }
  return true
})

export default router
