import React from 'react';
import './../styles/DestinationCard.css';
import { Link } from 'react-router-dom';
import { usePackageContext } from '../context/PackageContext';

const DestinationCard = ({ destination }) => {
  const packageContext = usePackageContext();
  const { openEnquiryNow } = packageContext;
  return (
    <>
      <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
        <div className="destination-item rounded bg-white">
          <div className="destination-card-img rounded-top">
            <img
              className="img-fluid mx-auto  "
              src={`${destination.image[0]}`}
              alt={destination.code}
            />
          </div>
          <div className="p-2">
            <div className="destination-card-main">
              <p>{destination.name || destination.hotelGroup}</p>
            </div>
            <div className="destination-card-footer">
              {destination?.category === 'international' && (
                <Link className="btn" onClick={() => openEnquiryNow()}>
                  ENQUIRY NOW
                </Link>
              )}
              {destination?.hotelGroup && (
                <Link className="btn" to={`/hotel/${destination.hotelGroup}`}>
                  VIEW MORE
                </Link>
              )}
              {destination?.category === 'domestic' && (
                <Link className="btn" to={`/destination/${destination.name}`}>
                  VIEW MORE
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="destination-card ">
        <div className="destination-card-header">
          <img src={`${destination.image[0]}`} alt={destination.code} />
        </div>
        <div className="destination-card-main">
          <p> {destination.name || destination.hotelGroup}</p>
        </div>
        <div className="destination-card-footer">
          {destination?.category === 'international' && (
            <Link className="btn" onClick={() => openEnquiryNow()}>
              ENQUIRY NOW
            </Link>
          )}
          {destination?.hotelGroup && (
            <Link className="btn" to={`/hotel/${destination.hotelGroup}`}>
              VIEW MORE
            </Link>
          )}
          {destination?.category === 'domestic' && (
            <Link className="btn" to={`/destination/${destination.name}`}>
              VIEW MORE
            </Link>
          )}
        </div>
      </div> */}
    </>
  );
};

export default DestinationCard;
