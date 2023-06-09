import { Suspense, lazy, Children } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import ReceptionistSideBar from 'src/content/receptionist/component/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import path from 'path';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Overview = Loader(lazy(() => import('src/content/overview')));

//Patient
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

const InventoryManagement = Loader(
  lazy(() => import('src/content/receptionist/views/InventoryManagement'))
);

const MachineIntegration = Loader(
  lazy(() => import('src/content/receptionist/views/MachineIntegration'))
);

const Notification = Loader(
  lazy(() => import('src/content/receptionist/views/Notification'))
);

const PatientManagement = Loader(
  lazy(() => import('src/content/receptionist/views/PatientManagement'))
);

const Reservation = Loader(
  lazy(() => import('src/content/receptionist/views/Reservation'))
);

const ResultsManagement = Loader(
  lazy(() => import('src/content/receptionist/views/ResultsManagement'))
);

const SalesManagement = Loader(
  lazy(() => import('src/content/receptionist/views/SalesManagement'))
);

const LaboratoryTestManagement = Loader(
  lazy(() => import('src/content/receptionist/views/LaboratoryTestManagement'))
);

const RequestManagement = Loader(
  lazy(() => import('src/content/receptionist/views/RequestManagement'))
);

const AddLabTestByRequest = Loader(
  lazy(() => import('src/content/receptionist/content/RequestFormLabTest'))
);

const AddRequest = Loader(
  lazy(() => import('src/content/receptionist/content/AddRequest'))
);

const ViewRequest = Loader(
  lazy(() => import('src/content/receptionist/content/ViewRequest'))
);

const PaymentPage = Loader(
  lazy(() => import('src/content/receptionist/content/PaymentPage'))
);

const CategoryManagement = Loader(
  lazy(() => import('src/content/receptionist/views/CategoryManagement'))
);

//Patient Pages
const PatientDashboard = Loader(
  lazy(() => import('src/content/patient/views/dashboard'))
);
const PatientForm = Loader(
  lazy(() => import('src/content/patient/views/requestForm'))
);
const Payment = Loader(lazy(() => import('src/content/patient/views/payment')));
const PatientProfile = Loader(
  lazy(() => import('src/content/patient/views/profile'))
);
const PatientAccountSettings = Loader(
  lazy(() => import('src/content/patient/views/accountSettings'))
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
        element: <Navigate to="/receptionist/login" replace />
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
      },
      {
        path: 'payment',
        element: <Payment />
      },
      {
        path: 'profile',
        element: <PatientProfile />
      },
      {
        path: 'account_settings',
        element: <PatientAccountSettings />
      }
    ]
  },
  {
    path: 'receptionist',
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
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <ReceptionistDashboard />
          }
        ]
      },
      {
        path: 'inventory_management',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <InventoryManagement />
          }
        ]
      },
      {
        path: 'machine_integration',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <MachineIntegration />
          }
        ]
      },
      {
        path: 'notification',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <Notification />
          }
        ]
      },
      {
        path: 'patient_management',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <PatientManagement />
          }
        ]
      },
      {
        path: 'reservation',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <Reservation />
          }
        ]
      },
      {
        path: 'results_management',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <ResultsManagement />
          }
        ]
      },
      {
        path: 'sales_management',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <SalesManagement />
          }
        ]
      },
      {
        path: 'laboratory_tests',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <LaboratoryTestManagement />
          }
        ]
      },
      {
        path: 'request_management',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <RequestManagement />
          }
        ]
      },
      {
        path: 'add_lab_test_request_form',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <AddLabTestByRequest />
          }
        ]
      },
      {
        path: 'add_new_request',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <AddRequest />
          }
        ]
      },
      {
        path: 'view_request',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <ViewRequest />
          }
        ]
      },
      {
        path: 'payment',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <PaymentPage />
          }
        ]
      },
      {
        path: 'category_management',
        element: <ReceptionistSideBar />,
        children: [
          {
            path: '',
            element: <CategoryManagement />
          }
        ]
      }
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
