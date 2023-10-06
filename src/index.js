import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { PackageWrapper } from './context/PackageContext';
// import { DestinationWrapper } from './context/DestinationContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <DestinationWrapper>
      <PackageWrapper> */}
    <App />
    {/* </PackageWrapper>
    </DestinationWrapper> */}
  </React.StrictMode>
);
reportWebVitals();
