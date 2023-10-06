import React from 'react';
import './../styles/SectionTitle.css';

const SectionTitle = ({ mainTitle, description }) => {
  return (
    <>
      <h6
        className="section-title bg-white text-center px-3"
        style={{
          color: '#F58634',
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
        }}
      >
        {mainTitle}
      </h6>
      <h1
        className="mb-5"
        style={{
          color: '#5D3830',
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
        }}
      >
        {description}
      </h1>
    </>
  );
};

export default SectionTitle;
