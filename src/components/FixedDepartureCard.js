import React from 'react';
import './../styles/FixedDepartureCard.css';
import { Link } from 'react-router-dom';

const FixedDepartureCard = ({ fixedDeparture }) => {
  console.log(fixedDeparture);
  return (
    <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
      <div className="fixed-departure-item rounded bg-white">
        <Link to={`/package/${fixedDeparture.package.code}`}>
          <div
            className="fixed-departure-card-img rounded"
            style={{ position: 'relative' }}
          >
            <img
              className="img-fluid mx-auto  "
              src={`${fixedDeparture.package.image[0]}`}
              alt={fixedDeparture._id}
            />
            <p className="fixed-departure-days p-2 mb-0">{`${fixedDeparture.package.itinerary.length} Days`}</p>
            <p className="fixed-departure-nights p-2 mb-0">{`${
              fixedDeparture.package.itinerary.length - 1
            } Nights`}</p>
            <p className="fixed-departure-name p-2 mb-0">
              {fixedDeparture.package.name}
            </p>
            <p className="fixed-departure-price p-2 mb-0">
              &#8377;{fixedDeparture.price}
            </p>
          </div>
        </Link>
        {/* <div className="p-2"> */}
        {/* <div className="fixed-departure-card-main">
            <p>{fixedDeparture.package.name}</p>
          </div> */}
        {/* <div className="fixed-departure-card-footer">
            <Link
              className="btn"
              to={`/package/${fixedDeparture.package.code}`}
            >
              VIEW MORE
            </Link>
          </div> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default FixedDepartureCard;
