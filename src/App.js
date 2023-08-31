import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header';
import './App.scss';
// import PerfectScrollbar from "react-perfect-scrollbar";
import Footer from './components/Footer/Footer';
import { FaReact } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import ScrollTop from './components/ScrollTop/ScrollTop';
function App(props) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      {isLoading && (
        <div className="loading-wrapper">
          <span>
            <FaReact className="icon-react" />
          </span>
        </div>
      )}
      {isLoading === false && (
        <div className="app-container">
          <header>
            <Header setIsLoading={setIsLoading} />
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
      )}
      <ScrollTop />
    </>
  );
}

export default App;
