import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ list, last }) => {
  return (
    <>
      <div
        className="bread-crumb px-5 py-2"
        style={{
          backgroundColor: '#EBEEEF',
          width: '100%',
          marginTop: 0,
          height: 50,
        }}
      >
        <nav className=" " aria-label="breadcrumb">
          <ol className="breadcrumb">
            {list?.map((el, i) => {
              return (
                <li className="breadcrumb-item">
                  <Link
                    to={el.value}
                    style={{
                      textDecoration: 'none',
                      color: '#F58634',
                      fontSize: 18,
                      fontWeight: 500,
                    }}
                  >
                    {el.key}
                  </Link>
                </li>
              );
            })}
            <li className="breadcrumb-item active" aria-current="page">
              {last}
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
};

export default Breadcrumb;
