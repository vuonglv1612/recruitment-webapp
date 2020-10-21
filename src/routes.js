import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import RegisterView from 'src/views/auth/RegisterView';
import Home from 'src/views/home';
import JobDetail from 'src/components/job/JobDetail';
import UpgradeToEmployerView from 'src/views/upgrade/UpgradeToEmployer';
import UpgradeToEmployeeView from 'src/views/upgrade/UpgradeToEmployee';
import AddJobView from 'src/views/jobs/AddJob';
import RecruitingJobsNew from 'src/views/recruiting_jobs/RecruitingJobsView';


const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '/upgrade/employer', element: <UpgradeToEmployerView /> },
      { path: '/upgrade/employee', element: <UpgradeToEmployeeView /> },
      { path: '/newjob', element: <AddJobView /> },
      { path: '/recruiting', element: <RecruitingJobsNew /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/jobs/:slug', element: <JobDetail /> },
      { path: '/', element: <Home /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
