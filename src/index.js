import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './Layout';
import './index.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import * as firebase from 'firebase/app';
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});
const firebaseConfig = {
  apiKey: 'AIzaSyByNtiMQ5kQ_LU7QIbpJRwsLcSmkpDSXSs',
  authDomain: 'bussan-7db9f.firebaseapp.com',
  projectId: 'bussan-7db9f',
  storageBucket: 'bussan-7db9f.appspot.com',
  messagingSenderId: '109471247707',
  appId: '1:109471247707:web:2a4191d3742cef05c9fe7e',
  measurementId: 'G-TQVGHLTV57',
};
firebase.initializeApp(firebaseConfig);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Layout />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </Router>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
