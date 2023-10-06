import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { usePackageContext } from '../context/PackageContext';
import './../styles/DestinationDetail.css';
import Breadcrumb from '../components/Breadcrumb';
import { X } from 'react-bootstrap-icons';
import Loading from '../components/Loading';

const DestinationDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { DestinationName } = params;
  const context = usePackageContext();
  const { destinationData, updateDestinationData, setLoading } = context;
  const [Destination, setDestination] = useState({});

  useEffect(() => {
    // console.log(destinationData);
    const temp = destinationData.filter((el) => el.name === DestinationName)[0];
    // console.log(temp);
    updateDestination(temp);
  }, [DestinationName, destinationData]);

  useEffect(() => {
    updateDestinationData();
  }, [DestinationName]);

  const updateDestination = (updatedDestination) => {
    setDestination(updatedDestination);
  };

  const handleScroll = (id) => {
    let element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 120;
      window.scrollTo({
        top: offset,
        behavior: 'smooth', // You can use 'auto' instead of 'smooth' for instant scrolling
      });
    }
  };

  return (
    <>
      {!Destination && setLoading(true)}
      {Destination && setLoading(false)}
      {Destination && (
        <>
          <div className="destination-detail-page">
            <div className="destination-detail-header">
              {Destination?.image?.map((img, index) => {
                return <img src={img} alt={`${Destination.name}-${index}`} />;
              })}

              <div className="destination-name">
                <h1 style={{ fontWeight: 900 }}>
                  {Destination?.name}{' '}
                  <span style={{ color: '#F58634' }}>Tour Packages</span>
                </h1>
              </div>
            </div>
            <Breadcrumb
              list={[{ key: 'Home', value: '/' }]}
              last={`${Destination?.name} Tour Packages`}
            />

            <div className=" destination-description">
              <h3 className="description-heading">
                {' '}
                About {Destination?.name}
              </h3>
              <h5>{Destination?.description}</h5>
            </div>
            <div className="d-flex mx-4 row">
              <div className="left  col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3">
                <div className="day-night-left">
                  <h3>package types</h3>
                  <ul>
                    {Destination?.packages
                      ?.sort((a, b) => a.day - b.day)
                      ?.map((Item, index) => {
                        return (
                          <li key={index}>
                            {/* <a href={`#${Item.day}-${Item.night}`}> */}
                            <Link
                              onClick={() =>
                                handleScroll(`${Item.day}-${Item.night}`)
                              }
                            >
                              {Item.day} Days {Item.night} Nights
                            </Link>
                          </li>
                        );
                      })}
                  </ul>
                </div>
              </div>
              <div className="right col-12 col-sm-12 col-md-12 col-lg-9 col-xl-9">
                {Destination?.packages?.map((duration, index) => {
                  return (
                    <div key={index} id={`${duration.day}-${duration.night}`}>
                      <h1 className="text-center my-3">
                        {duration.day} Days <span>{duration.night} Nights</span>
                      </h1>
                      <div className="row g-4 p-3">
                        {/* <div className="d-flex justify-content-center aligns-item-center gap-2 flex-wrap"> */}
                        {duration?.package?.map(
                          (packageBasedOnDaysAndNights, index) => {
                            return (
                              <>
                                <div
                                  className="col-lg-4 col-sm-6 wow fadeInUp"
                                  data-wow-delay="0.1s"
                                >
                                  <div className="package-card-destination-page bg-white">
                                    <div className="package-card-destination-page-img position-relative">
                                      <img
                                        className="img-fluid mx-auto  "
                                        src={Destination.image[0]}
                                        alt={`img-${index}`}
                                      />
                                      <h4 className="position-absolute">
                                        {
                                          packageBasedOnDaysAndNights.packageType
                                        }
                                      </h4>
                                    </div>
                                    <div className="p-2">
                                      <div className="card-content">
                                        <h4>
                                          Booking Code:{' '}
                                          {packageBasedOnDaysAndNights.code}
                                        </h4>
                                        <img
                                          className="img-fluid "
                                          src={require('./../img/activity.png')}
                                          alt="activity_img"
                                        />
                                        <h4>Starting Price</h4>
                                        <h2>{`INR ${packageBasedOnDaysAndNights.startingPrice}/-*`}</h2>
                                        <h3>Per Person</h3>
                                        <div
                                          className="card-button mx-auto pt-2"
                                          onClick={() =>
                                            navigate(
                                              `/package/${packageBasedOnDaysAndNights.code}`
                                            )
                                          }
                                        >
                                          VIEW DETAILS
                                        </div>
                                      </div>
                                      {/* <div className="destination-card-main">
                                        <p>Hey</p>
                                      </div>
                                      <div className="destination-card-footer">
                                        <Link className="btn" to={``}>
                                          VIEW MORE
                                        </Link>
                                      </div> */}
                                    </div>
                                  </div>
                                </div>
                                {/* <div
                                  className="package-card-destination-page"
                                  key={index}
                                >
                                  <div className="card-header-package">
                                    <img
                                      src={Destination.image[0]}
                                      alt={`img-${index}`}
                                    />
                                    <h4>
                                      {packageBasedOnDaysAndNights.packageType}
                                    </h4>
                                  </div>
                                  <div className="card-content">
                                    <h4>
                                      Booking Code:{' '}
                                      {packageBasedOnDaysAndNights.code}
                                    </h4>
                                    <img
                                      src={require('./../img/activity.png')}
                                      alt="activity_img"
                                    />
                                    <h4>Starting Price</h4>
                                    <h2>{`INR ${packageBasedOnDaysAndNights.startingPrice}/-*`}</h2>
                                    <h3>Per Person</h3>
                                    <div
                                      className="card-button mx-auto pt-2"
                                      onClick={() =>
                                        navigate(
                                          `/package/${packageBasedOnDaysAndNights.code}`
                                        )
                                      }
                                    >
                                      VIEW DETAILS
                                    </div>
                                  </div>
                                </div> */}
                              </>
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DestinationDetail;
