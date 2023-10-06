import React, { useState } from 'react';
import loader from './../img/loader.gif';
import './../styles/Loading.css';
import { usePackageContext } from '../context/PackageContext';

const Loading = () => {
  const context = usePackageContext();
  const { loading, setLoading } = context;
  return (
    <div className={`loader-container ${loading ? '' : 'd-none'}`}>
      {/* <img src={loader} alt="loading" /> */}
      <div className="loadingio-spinner-ripple-2a7clapf2t2">
        <div className="ldio-476mokzquiv">
          <div></div>
          <div></div>
        </div>
      </div>
      {/* <div className="loader"></div> */}
    </div>
  );
};

export default Loading;
