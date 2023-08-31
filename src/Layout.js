import { Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Cardforsale from './components/Cardforsale/Cardforsale';
import DetailsCar from './components/DetailsCar/DetailsCar';
import Home from './components/Home/Home';
import Manage from './components/Manage/Manage';
import ManageCar from './components/Manage/ManageCar';
import ManageUser from './components/Manage/ManageUser';
import { PrivateRoute } from './components/PrivareRoute/PrivareRoute';
function Layout(props) {
  return (
    <>
      <Routes>ư
        <Route element={<App />} path="/">
          <Route index element={<Home />} />
          <Route path="/card-for-sale">
            <Route index element={<Cardforsale />} />
            <Route path=":id" element={<DetailsCar />} />
          </Route>
          <Route
            path="/manage"
            element={
              <PrivateRoute>
                <Manage />
              </PrivateRoute>
            }
          >
            <Route index element={<ManageCar />} />
            <Route path="users" element={<ManageUser />} />
          </Route>
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </>
  );
}

export default Layout;
