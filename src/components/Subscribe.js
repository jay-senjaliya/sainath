import React from 'react';
import './../styles/Subscribe.css';
import { Envelope, EnvelopeFill } from 'react-bootstrap-icons';

const Subscribe = () => {
  return (
    <div id="subs" className="subscribe">
      <div className="container">
        <div className="subscribe-title">
          <h2>Join our Subscribers List to Get Regular Update</h2>
          <p>Subscribe Now. We will send you Best offer for your Trip</p>
        </div>
        <div className="inner">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
              <div className="custom-input-group">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your Email Here"
                />
                <button className="appsLand-btn subscribe-btn">
                  Subscribe
                </button>
                <div className="clearfix"></div>
                <EnvelopeFill size={18} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
