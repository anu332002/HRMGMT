import DashboardIcon from '@material-ui/icons/Dashboard';
import TableChartTwoTone from '@material-ui/icons/TableChartTwoTone';
import DashboardPage from './pages/dashboard';
import Employees from './pages/employeePage';
import CreateUpdateEmployee from './pages/createUpdateEmployee';

const dashboardRoutes = [
  {
      path: '/dashboard',
      name: 'Dashboard',
      icon: DashboardIcon,
      component: Employees,
      layout: '/admin'
  },
  {
      path: '/employees',
      name: 'Employees',
      icon: TableChartTwoTone,
      component: DashboardPage,
      layout: '/admin'
  },
  {
      path: '/create',
      name: '',
      icon: '',
      component: CreateUpdateEmployee,
      layout: '/admin'
  },
  {
      path: '/edit',
      name: '',
      icon: '',
      component: CreateUpdateEmployee,
      layout: '/admin',
  }
];

export default dashboardRoutes;
