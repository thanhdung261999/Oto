import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import "./App.scss";
import PerfectScrollbar from "react-perfect-scrollbar";
import Footer from "./components/Footer/Footer";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import { useState } from "react";
function App(props) {
  const scrollToTop = () => {
    document.body.scrollTo(0, 0);
  };
  return (
    <>
      <div className="app-container">
        <header>
          <Header />
        </header>
        <div className="app-content">
          {/* <PerfectScrollbar> */}
          <Outlet />
          <div className="app-footer">
            <Footer />
          </div>
          {/* </PerfectScrollbar> */}
        </div>
      </div>
      <div className="up">
        <span onClick={scrollToTop}>
          <BsFillArrowUpSquareFill className="icon" />
        </span>
      </div>
    </>
  );
}

export default App;
