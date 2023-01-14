import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import PerfectScrollbar from "react-perfect-scrollbar";
import "./Manage.scss";
const Manage = () => {
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
