import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import PerfectScrollbar from 'react-perfect-scrollbar';
import './Manage.scss';
import nProgress from 'nprogress';
import { useEffect } from 'react';
const Manage = () => {
  useEffect(() => {
    nProgress.start();
    setTimeout(() => {
      nProgress.done();
    }, 1000);
  }, []);
  return (
    <div className="managecar-container">
      <Sidebar />
      <div className="managecar-content">
        <PerfectScrollbar>
          <Outlet />
        </PerfectScrollbar>
      </div>
    </div>
  );
};
export default Manage;
