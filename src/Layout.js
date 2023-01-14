import { Route, Routes } from "react-router-dom";
import App from "./App";
import Cardforsale from "./components/Cardforsale/Cardforsale";
import Home from "./components/Home/Home";
import Introduce from "./components/Introduce/Introduce";
import Manage from "./components/Manage/Manage";
import ManageCar from "./components/Manage/ManageCar";
import ManageUser from "./components/Manage/ManageUser";
function Layout(props) {
  return (
    <>
      <Routes>
        <Route element={<App />} path="/">
          <Route index element={<Home />} />
          <Route path="/introduce" element={<Introduce />} />
          <Route path="/card-for-sale" element={<Cardforsale />} />
          <Route path="/manage" element={<Manage />}>
            <Route index element={<ManageCar />} />
            <Route path="users" element={<ManageUser />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default Layout;
