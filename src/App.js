import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import Footer from "./components/Footer/Footer";
function App(props) {
  return (
    <>
      <div className="app-container">
        <header>
          <Header />
        </header>
        <div className="app-content">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
      {/* <footer>
        <Footer />
      </footer> */}
    </>
  );
}

export default App;
