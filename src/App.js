import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import AddPackage from './pages/AddPackage';
import Home from './pages/Home';
import PackageDetail from './pages/PackageDetail';
import PackageList from './pages/PackageList';
import { ToastContainer } from 'react-toastify';
import AddDestination from './pages/AddDestination';
import DestinationList from './pages/DestinationList';
import DestinationDetail from './pages/DestinationDetail';
import { PackageWrapper, usePackageContext } from './context/PackageContext';
import ContactUs from './pages/ContactUs';
import AddHotel from './pages/AddHotel';
import HotelList from './pages/HotelList';
import Domestic from './pages/Domestic';
import International from './pages/International';
import BookNowForm from './components/BookNowForm';
import VehicleOnHire from './pages/VehicleOnHire';
import EnquiryNow from './components/EnquiryNow';
import AboutUs from './pages/AboutUs';
import Loading from './components/Loading';
import LaunchModal from './components/LaunchModal';
import AddVehicle from './pages/AddVehicle';
import VehicleList from './pages/VehicleList';
import Hotel from './pages/Hotel';
import FAQ from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ContactEnquiryList from './pages/ContactEnquiryList';
import AddFixedDeparture from './pages/AddFixedDeparture';
import FixedDepartureList from './pages/FixedDepartureList';

const App = () => {
  const [modalClick, setModalClick] = useState(false);
  const context = usePackageContext();
  const { destinationData } = context;
  useEffect(() => {
    if (destinationData) {
      setTimeout(() => {
        setModalClick(true);
      }, 3000);
    }
  });
  return (
    <>
      <PackageWrapper>
        <Router>
          <Navbar />
          {/* <Loading /> */}

          <div style={{ marginTop: 110 }}>
            {/* <div> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/domestic" element={<Domestic />} />
              <Route path="/international" element={<International />} />
              <Route path="/hotel" element={<Hotel />} />
              <Route path="/add-package" element={<AddPackage />} />
              <Route path="/add-destination" element={<AddDestination />} />
              <Route path="/add-hotel" element={<AddHotel />} />
              <Route path="/add-vehicle" element={<AddVehicle />} />
              <Route
                path="/add-fixed-departure"
                element={<AddFixedDeparture />}
              />
              <Route path="/edit-package/:id" element={<AddPackage />} />
              <Route path="/edit-hotel/:id" element={<AddHotel />} />
              <Route path="/edit-vehicle/:id" element={<AddVehicle />} />
              <Route
                path="/edit-fixed-departure/:id"
                element={<AddFixedDeparture />}
              />
              <Route
                path="/edit-destination/:id"
                element={<AddDestination />}
              />
              <Route path="/package-list" element={<PackageList />} />
              <Route path="/destination-list" element={<DestinationList />} />
              <Route path="/hotel-list" element={<HotelList />} />
              <Route path="/vehicle-list" element={<VehicleList />} />
              <Route
                path="/fixed-departure-list"
                element={<FixedDepartureList />}
              />
              <Route
                path="/contact-enquiry-list"
                element={<ContactEnquiryList />}
              />
              <Route path="/package/:BookingCode" element={<PackageDetail />} />
              <Route
                path="destination/:DestinationName"
                element={<DestinationDetail />}
              />
              <Route path="/vehicle-on-hire" element={<VehicleOnHire />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            </Routes>
          </div>
          <Loading />
          <EnquiryNow />
          <BookNowForm />
          <ToastContainer />
          <LaunchModal click={modalClick} />
          <Footer />
        </Router>
      </PackageWrapper>
    </>
  );
};

export default App;
