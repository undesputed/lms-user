import { Suspense, lazy, Children } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import ReceptionistSideBar from 'src/content/receptionist/component/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Overview = Loader(lazy(() => import('src/content/overview')));

//Patient Auth
const Login = Loader(
  lazy(() => import('src/content/pages/Views/Auth/patientAuth/login'))
);
const Register = Loader(
  lazy(() => import('src/content/pages/Views/Auth/patientAuth/register'))
);

//Receptionist
const ReceptionLogin = Loader(
  lazy(() => import('src/content/pages/Views/Auth/receptionistAuth/login'))
);

const ReceptionRegister = Loader(
  lazy(() => import('src/content/pages/Views/Auth/receptionistAuth/register'))
);

const ReceptionistDashboard = Loader(
  lazy(() => import('src/content/receptionist/views/Dashboard'))
);

//Patient Pgaes
const PatientDashboard = Loader(
  lazy(() => import('src/content/patient/views/dashboard'))
);
const PatientForm = Loader(
  lazy(() => import('src/content/patient/views/requestForm'))
);

// Dashboards

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));

// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/auth/login" replace />
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            element: <Login />
          },
          {
            path: 'register',
            element: <Register />
          }
        ]
      },
      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: 'patient',
    children: [
      {
        path: 'dashboard',
        element: <PatientDashboard />
      },
      {
        path: 'requestForm',
        element: <PatientForm />
      }
    ]
  },
  {
    path: 'receptionist',
    element: <ReceptionistSideBar />,
    children: [
      {
        path: 'login',
        element: <ReceptionLogin />
      },
      {
        path: 'register',
        element: <ReceptionRegister />
      },
      {
        path: 'dashboard',
        element: <ReceptionistDashboard />
      }
      // {
      //   path: 'content_management',
      //   element: <ContentManagement />
      // },
      // {
      //   path: 'data_visualization',
      //   element: <DataVisualization />
      // },
      // {
      //   path: 'email_management',
      //   element: <EmailManagement />
      // },
      // {
      //   path: 'employee_management',
      //   element: <EmployeeManagement />
      // },
      // {
      //   path: 'inventory_management',
      //   element: <InventoryManagement />
      // },
      // {
      //   path: 'machine_integration',
      //   element: <MachineIntegration />
      // },
      // {
      //   path: 'notification',
      //   element: <Notification />
      // },
      // {
      //   path: 'patient_management',
      //   element: <PatientManagement />
      // },
      // {
      //   path: 'payment_integration',
      //   element: <PaymentIntegration />
      // },
      // {
      //   path: 'sales_management',
      //   element: <SalesManagement />
      // },
      // {
      //   path: 'searchAndFiltering',
      //   element: <SearchAndFiltering />
      // },
      // {
      //   path: 'user_management',
      //   element: <UserManagement />
      // }
    ]
  },
  {
    path: 'dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="crypto" replace />
      },
      {
        path: 'crypto',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
      }
    ]
  },
  {
    path: 'management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="transactions" replace />
      },
      {
        path: 'transactions',
        element: <Transactions />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default routes;
