import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './../styles/PackageDetail.css';
import { usePackageContext } from '../context/PackageContext';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import Breadcrumb from '../components/Breadcrumb';
import BookNowForm from '../components/BookNowForm';
import Loading from '../components/Loading';

const PackageDetail = () => {
  const params = useParams();
  const { BookingCode } = params;
  const packageContext = usePackageContext();
  const { packageData, updatePackageData, openBookNow, setLoading } =
    packageContext;
  const [Package, setPackage] = useState({});

  useEffect(() => {
    const temp = packageData.filter((el) => el.code === BookingCode)[0];
    updatePackage(temp);
  }, [BookingCode, packageData]);

  useEffect(() => {
    updatePackageData();
  }, [packageData]);
  // console.log(Package);
  // console.log(Object.keys(Package?.hotels[0]));

  const updatePackage = (temp) => {
    setPackage(temp);
  };
  return (
    <>
      <BookNowForm />
      {!Package && setLoading(true)}
      {Package && setLoading(false)}
      {Package && (
        <div className="package-detail-page w-100">
          <div className="domestic-page-header">
            <OwlCarousel
              items={1}
              dots={false}
              autoplay={true}
              autoplayTimeout={2000}
              // loop={true }
              navigation={true}
            >
              {Package?.image?.map((el, i) => {
                return (
                  <div className="banner" key={i}>
                    <img className="banner-img" src={el} alt={i} />
                    <div className="banner-content"></div>
                  </div>
                );
              })}
            </OwlCarousel>
            <div className="header-content">
              <h1>
                {Package.name} <span>Package</span>
              </h1>
              <p>Booking Code: {Package.code}</p>
            </div>
          </div>
          <Breadcrumb
            list={[
              { key: 'Home', value: '/' },
              {
                key: `${Package.name} Packages`,
                value: -1,
              },
            ]}
            last={`${Package.code}`}
          />
          <div className="package-detail-container mt-5">
            <table className="table">
              <thead className="thead text-center">
                <tr>
                  <th scope="col">No.of Night</th>
                  <th scope="col">Destination</th>
                  <th scope="col">Hotel Name</th>
                  <th scope="col">Room Type</th>
                  <th scope="col">Meal Plan</th>
                  <th scope="col">Similar Hotels</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {Package?.hotels?.map((hotel, index) => {
                  return (
                    <tr key={index}>
                      <td>{hotel.nights}</td>
                      <td>{hotel.destination}</td>
                      <td>{hotel.name}</td>
                      <td>{hotel.roomType}</td>
                      <td>{hotel.mealPlan}</td>
                      <td>{hotel.similarHotels.join('|')}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <table className="table">
              <thead className="thead text-center">
                <tr>
                  {Package?.price?.map((el, i) => {
                    return (
                      <th scope="col" key={i}>
                        {el.heading}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="text-center">
                {Package?.price &&
                  Package?.price[0]?.value?.map((el1, pos) => {
                    return (
                      <tr key={pos}>
                        {Package?.price?.map((Price, index) => {
                          return (
                            <>
                              <td key={index}>{Price.value[pos]}</td>
                            </>
                          );
                        })}
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <div className="imp-btn my-3">
              <button className="btn btn-1">customize your packages</button>
              <button className="btn btn-2" onClick={openBookNow}>
                book now
              </button>
              {/* <BookNowForm /> */}
            </div>

            <div className="imp-info my-3">
              <div className="imp-header">
                important <span>package information</span>
              </div>
              <div className="imp-cards">
                <div className="imp-card inclusion">
                  <h1 className="text-center">Package Inclusion</h1>
                  <ul>
                    {Package?.inclusion?.map((el, i) => {
                      return <li key={i}>{el}</li>;
                    })}
                  </ul>
                </div>
                <div className="imp-card exclusion">
                  <h1 className="text-center">Package exclusion</h1>
                  <ul>
                    {Package?.exclusion?.map((el, i) => {
                      return <li key={i}>{el}</li>;
                    })}
                  </ul>
                </div>
                <div className="imp-card impNotes">
                  <h1 className="text-center">Important Note</h1>
                  <ul>
                    {Package?.importantNotes?.map((el, i) => {
                      return <li key={i}>{el}</li>;
                    })}
                  </ul>
                </div>
                {Package?.additional?.length ? (
                  <div className="imp-card additionals">
                    <h1 className="text-center">Additionals </h1>
                    <ul>
                      {Package?.additional?.map((el, i) => {
                        return <li key={i}>{el}</li>;
                      })}
                    </ul>
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>

          <div className="itinerary p-4">
            <h1 className="mb-3">
              FOLLOWING YOUR DAY WISE{' '}
              <span>SCHEDULED ITINERARY FOR THIS TOUR.</span>
            </h1>
            {Package?.itinerary?.map((el, i) => {
              return (
                <div key={i}>
                  <p className="mx-4">
                    Day {el.day}: {el.heading}
                  </p>
                  <h4 className="mx-4 ">{el.description}</h4>
                </div>
              );
            })}
            <p></p>
          </div>

          <div className="container package-payment-policy mt-4">
            <h1>
              BOOKING <span>PAYMENT POLICY</span>
            </h1>
            <ul>
              {Package?.paymentTerm?.map((el, i) => {
                return <li key={i}>{el}</li>;
              })}
            </ul>
          </div>
          <div className="container package-cancellation-policy mt-3 mb-5">
            <h1>
              BOOKING <span>CANCELLATION POLICY</span>
            </h1>
            <ul>
              {Package?.cancellationPolicy?.map((el, i) => {
                return <li key={i}>{el}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageDetail;
