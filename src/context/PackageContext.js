import { createContext, useContext, useEffect, useState } from 'react';
import packageService from '../services/packageService';
import destinationService from '../services/destinationService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import hotelService from '../services/hotelService';
import vehicleService from '../services/vehicleService';
import contactService from '../services/contactService';
import fixedDepartureService from '../services/fixedDepartureService';

const initialState = {
  packageData: [],
  destinationData: [],
  hotelData: [],
  vehicleData: [],
  contactData: [],
  fixedDepartureData: [],
  bookNow: false,
  enquiryNow: false,
  loading: false,
  logged: false,

  // setBookNow: () => {},
  updatePackageData: () => {},
  updateDestinationData: () => {},
  updateHotelData: () => {},
  updateVehicleData: () => {},
  updateContactData: () => {},
  updateFixedDepartureData: () => {},
  openBookNow: () => {},
  closeBookNow: () => {},
  setLoading: () => {},
  setLogged: () => {},
};

export const PackageContext = createContext(initialState);

export const PackageWrapper = ({ children }) => {
  const [packageData, setPackageData] = useState([]);
  const [destinationData, setDestinationData] = useState([]);
  const [hotelData, setHotelData] = useState([]);
  const [vehicleData, setVehicleData] = useState([]);
  const [contactData, setContactData] = useState([]);
  const [fixedDepartureData, setFixedDepartureData] = useState([]);
  const [bookNow, setBookNow] = useState(false);
  const [enquiryNow, setEnquiryNow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    packageService
      .GetAllPackage()
      .then((res) => setPackageData(res.data.data))
      .catch((err) =>
        toast.error(err.response.data.errror, { position: 'bottom-right' })
      );
  }, []);

  useEffect(() => {
    setLoading(true);
    destinationService
      .GetAllDestination()
      .then((res) => {
        setLoading(false);
        setDestinationData(res?.data?.data);
      })
      .catch((err) =>
        toast.error(err.response.data.errror, { position: 'bottom-right' })
      );
  }, []);

  useEffect(() => {
    hotelService
      .GetAllHotel()
      .then((res) => setHotelData(res?.data?.data))
      .catch((err) =>
        toast.error(err.response.data.errror, { position: 'bottom-right' })
      );
  }, []);

  const updatePackageData = (updatedPackageData) => {
    if (updatedPackageData) {
      setPackageData(updatedPackageData);
    } else {
      packageService
        .GetAllPackage()
        .then((res) => setPackageData(res.data.data))
        .catch((err) =>
          toast.error(err.response.data.errror, { position: 'bottom-right' })
        );
    }
  };
  const updateDestinationData = (updatedDestinationData) => {
    if (updatedDestinationData) {
      setPackageData(updatedDestinationData);
    } else {
      destinationService
        .GetAllDestination()
        .then((res) => setDestinationData(res.data.data))
        .catch((err) =>
          toast.error(err.response.data.errror, { position: 'bottom-right' })
        );
    }
  };

  const updateHotelData = (updatedHotelData) => {
    if (updatedHotelData) {
      setHotelData(updatedHotelData);
    } else {
      hotelService
        .GetAllHotel()
        .then((res) => setHotelData(res.data.data))
        .catch((err) =>
          toast.error(err.response.data.errror, { position: 'bottom-right' })
        );
    }
  };

  const updateVehicleData = (updatedVehicleData) => {
    if (updatedVehicleData) {
      setVehicleData(updatedVehicleData);
    } else {
      vehicleService
        .GetAllVehicle()
        .then((res) => setVehicleData(res.data.data))
        .catch((err) =>
          toast.error(err.response.data.errror, { position: 'bottom-right' })
        );
    }
  };

  const updateContactData = (updatedContactData) => {
    if (updatedContactData) {
      setContactData(updatedContactData);
    } else {
      contactService
        .GetAllContact()
        .then((res) => setContactData(res.data.data))
        .catch((err) =>
          toast.error(err.response.data.errror, { position: 'bottom-right' })
        );
    }
  };

  const updateFixedDepartureData = (updatedFixedDepartureData) => {
    if (updatedFixedDepartureData) {
      setFixedDepartureData(updatedFixedDepartureData);
    } else {
      fixedDepartureService
        .GetAllFixedDeparture()
        .then((res) => setFixedDepartureData(res.data.data))
        .catch((err) =>
          toast.error(err.response.data.errror, { position: 'bottom-right' })
        );
    }
  };

  const closeBookNow = () => {
    setBookNow(false);
  };

  const openBookNow = () => {
    setBookNow(true);
  };

  const closeEnquiryNow = () => {
    console.log('open..');
    setEnquiryNow(false);
  };

  const openEnquiryNow = () => {
    console.log('close..');
    setEnquiryNow(true);
  };

  // const updateBookNow = (value) => {
  //   // console.log(bookNow);
  //   setBookNow(value);
  // };

  const value = {
    packageData,
    destinationData,
    hotelData,
    vehicleData,
    contactData,
    fixedDepartureData,
    bookNow,
    enquiryNow,
    loading,
    logged,
    updatePackageData,
    updateDestinationData,
    updateHotelData,
    updateVehicleData,
    updateContactData,
    updateFixedDepartureData,
    closeBookNow,
    openBookNow,
    closeEnquiryNow,
    openEnquiryNow,
    setLoading,
    setLogged,
  };
  return (
    <PackageContext.Provider value={value}>{children}</PackageContext.Provider>
  );
};

export const usePackageContext = () => {
  return useContext(PackageContext);
};
