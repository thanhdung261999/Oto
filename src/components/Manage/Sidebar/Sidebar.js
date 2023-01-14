import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "./Sidebar.scss";
import { FaGem, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
const Sidebar = () => {
  return (
    <>
      <ProSidebar className="sidebar-container">
        <Menu iconShape="square">
          <MenuItem icon={<FaGem />}>
            <Link to="/manage" className="sidabar-navlink" />
            Cars
          </MenuItem>
          <MenuItem icon={<FaHeart />}>
            <Link to="/manage/users" className="sidabar-navlink" />
            Users
          </MenuItem>
        </Menu>
      </ProSidebar>
    </>
  );
};
export default Sidebar;
