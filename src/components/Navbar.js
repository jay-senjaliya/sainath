import React, { useEffect, useRef, useState } from 'react';
import './../styles/Navbar.css';
import logo from './../img/sainath-logo-removebg-preview.png';
import { Link, useLocation } from 'react-router-dom';
import { usePackageContext } from '../context/PackageContext';

const Navbar = () => {
  const navRef = useRef(null);
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [domesticDestinations, setDomesticDestinations] = useState([]);
  const [internationalDestinations, setInternationalDestinations] = useState(
    []
  );
  const [openDomesticMenu, setOpenDomesticMenu] = useState(false);
  const [openInternationalMenu, setOpenInternationalMenu] = useState(false);
  const context = usePackageContext();
  const { destinationData } = context;

  useEffect(() => {
    setDomesticDestinations(
      destinationData.filter((el) => el.category === 'domestic')
    );
  }, [destinationData]);

  useEffect(() => {
    setInternationalDestinations(
      destinationData.filter((el) => el.category === 'international')
    );
  }, [destinationData]);

  // useEffect(() => {
  //   handleScroll();
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [window.scrollY, window.innerWidth]);

  const handleScroll = () => {
    if (window.innerWidth >= 992) {
      if (window.scrollY > 40) {
        navRef.current.style.backgroundColor = '#fff';
        setScrolling(true);
      } else {
        console.log('trs');
        setScrolling(false);
        navRef.current.style.backgroundColor = 'transparent';
      }
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-lg fixed-top d-block }`}
      ref={navRef}
      id="navbar"
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            className="logo-img"
            src={logo}
            style={{ height: '85px', marginLeft: '2vw' }}
            alt="SAINATH HOLIDAYS"
          ></img>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded={isCollapsed}
          aria-label="Toggle navigation"
        >
          <span
            className="navbar-toggler-icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
          ></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav align-items-lg-center ms-auto me-lg-5">
            {/* <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
                            </li> */}

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/' ? 'active' : ''
                }`}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                onClick={() => setIsCollapsed(false)}
                to="/"
              >
                HOME
              </Link>
            </li>

            <li className="nav-item mb-0" style={{ position: 'relative' }}>
              <Link
                className={`nav-link ${
                  location.pathname === '/domestic' ? 'active' : ''
                }`}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                onClick={() => setIsCollapsed(false)}
                to="/domestic"
                onMouseEnter={() => setOpenDomesticMenu(true)}
                onMouseLeave={() => {
                  setOpenDomesticMenu(false);
                }}
              >
                DOMESTIC
              </Link>
              <div
                className={`option-menu ${openDomesticMenu ? '' : 'd-none'}`}
                // className={`domestic-option-menu`}
                style={{
                  position: 'absolute',
                  backgroundColor: '#fff',
                }}
                onMouseEnter={() => setOpenDomesticMenu(true)}
                onMouseLeave={() => setOpenDomesticMenu(false)}
              >
                <ul
                  className="p-3"
                  style={{
                    listStyleType: 'none',
                    fontSize: 15,
                    fontWeight: 600,
                    textAlign: 'left',
                    textTransform: 'uppercase',
                  }}
                >
                  {domesticDestinations?.map((des, i) => {
                    return (
                      <li className="p-1">
                        <Link
                          style={{
                            textDecoration: 'none',
                            color: 'black',
                          }}
                          to={`/destination/${des.name}`}
                        >
                          {des.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>

            <li
              className="nav-item mega-drop-li" /*onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}*/
            >
              <Link
                className={`nav-link ${
                  location.pathname === '/international' ? 'active' : ''
                }`}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                onClick={() => setIsCollapsed(false)}
                to="/international"
                onMouseEnter={() => setOpenInternationalMenu(true)}
                onMouseLeave={() => {
                  setOpenInternationalMenu(false);
                }}
              >
                INTERNATIONAL
              </Link>
              <div
                className={`option-menu ${
                  openInternationalMenu ? '' : 'd-none'
                }`}
                // className={`domestic-option-menu`}
                style={{
                  position: 'absolute',
                  left: '50%',
                  transform: 'translate(-50%,0)',
                  backgroundColor: '#fff',
                }}
                onMouseEnter={() => setOpenInternationalMenu(true)}
                onMouseLeave={() => setOpenInternationalMenu(false)}
              >
                <ul
                  className="p-3"
                  style={{
                    listStyleType: 'none',
                    fontSize: 15,
                    fontWeight: 600,
                    textAlign: 'left',
                    textTransform: 'uppercase',
                  }}
                >
                  {internationalDestinations?.map((des, i) => {
                    return (
                      <li className="p-1">
                        <Link
                          style={{
                            textDecoration: 'none',
                            color: 'black',
                          }}
                          to={`/international`}
                        >
                          {des.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>

            <li
              className="nav-item mega-drop-li" /*onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}*/
            >
              <Link
                className={`nav-link ${
                  location.pathname === '/hotel' ? 'active' : ''
                }`}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                onClick={() => setIsCollapsed(false)}
                to="/hotel"
              >
                HOTELS
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/vehicle-on-hire' ? 'active' : ''
                }`}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                onClick={() => setIsCollapsed(false)}
                to="/vehicle-on-hire"
              >
                VEHICLE ON HIRE
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/about' ? 'active' : ''
                }`}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                onClick={() => setIsCollapsed(false)}
                to="/about"
              >
                ABOUT
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === '/contactUs' ? 'active' : ''
                }`}
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                onClick={() => setIsCollapsed(false)}
                to="/contactUs"
              >
                CONTACT
              </Link>
            </li>
          </ul>

          {/* <button className="btn custom-btn d-lg-block">VEHICLE ON HIRE</button> */}
        </div>
        {/* <div>
          <button className="btn custom-btn d-lg-block">VEHICLE ON HIRE</button>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
