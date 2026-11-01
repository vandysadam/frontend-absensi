import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import RequireAuth from './RequireAuth';
import LoginPage from '../src/pages/login';
// import UserEdit from '../src/pages/users/edit';
// import UserTopup from '../src/pages/users/user-topup';
import 'react-toastify/dist/ReactToastify.css'; // Pastikan CSS diimpor

// import { ToastContainer } from 'react-toastify';
import DashboardLoaderPage from '../src/pages/dashboard-loader-page';
import { ToastContainer } from 'react-toastify';
import UserEdit from '@/pages/user-manage/edit';
// import ActivityDetails from '../src/pages/activities/activity-details';

const Dashboard = React.lazy(() => import('../src/pages/dashboard/dashboard-page'));
const UserPage = React.lazy(() => import('../src/pages/user-manage/user-list'))
const UserAdd = React.lazy(() => import('../src/pages/user-manage/add-user'));
const BlogPostPage = React.lazy(() => import('../src/pages/blog-post/main-page'));
const ManageUserPage = React.lazy(
  () => import('../src/pages/manage-user/manage-user-page'),
);
// const ActivityAdd = React.lazy(() => import('../src/pages/activities/activity-add'));
// const ReportPage = React.lazy(() => import('../src/pages/activities/report-page'));
// const ReportPagePengeluaran = React.lazy(() => import('../src/pages/activities/report-page-pengeluaran'));
// const ReportPageTotal = React.lazy(() => import('../src/pages/activities/report-page-total'));

const AppRouter: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    document.querySelector('html')!.style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html')!.style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<DashboardLoaderPage />}>
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            </React.Suspense>
          }
        />
        {/* User Group  */}
        <Route
          path="/users/*"
          element={
            <React.Suspense fallback={<DashboardLoaderPage />}>
              <RequireAuth>
                <Routes>
                  <Route path="/userpage" element={<UserPage />}></Route>
                  <Route path="/adduser" element={<UserAdd />}></Route>
                  <Route path="/edit/:id" element={<UserEdit />}></Route>
                  {/* <Route path="/topup/:id" element={<UserTopup />}></Route> */}
                </Routes>
              </RequireAuth>
            </React.Suspense>
          }
        ></Route>

        <Route
          path="/manage-user/*"
          element={
            <React.Suspense fallback={<DashboardLoaderPage />}>
              <RequireAuth>
                <Routes>
                  <Route path="/" element={<ManageUserPage />}></Route>
                </Routes>
              </RequireAuth>
            </React.Suspense>
          }
        ></Route>

        <Route
          path="/blogpost/*"
          element={
            <React.Suspense fallback={<DashboardLoaderPage />}>
              <RequireAuth>
                <Routes>
                  <Route path="/mainpage" element={<BlogPostPage/>}></Route>
                  {/* <Route path="/details/:id" element={<ActivityDetails />}></Route>
                  <Route path="/add" element={<ActivityAdd />}></Route>
                  <Route path='/report/:year' element={<ReportPage />}></Route>
                  <Route path='/report-pengeluaran/:year' element={<ReportPagePengeluaran />}></Route>
                  <Route path='/report-total/:year' element={<ReportPageTotal />}></Route> */}
                  {/* <Route path="/edit/:id" element={<UserEdit />}></Route> */}
                </Routes>
              </RequireAuth>
            </React.Suspense>
          }
        ></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        {/*
        <Route path="/admin/signin" element={<SigninUser />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        */}
      </Routes>
      {/* <Toaster /> */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default AppRouter;
