import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useNavigate } from 'react-router-dom';
import { usePackageContext } from '../context/PackageContext';

const Admin = () => {
  const navigate = useNavigate();
  const context = usePackageContext();
  const { hotelData, fixedDepartureData, destinationData, packageData } =
    context;
  console.log(hotelData);
  return (
    <>
      <div className="admin container-xxl pt-5">
        <div className="admin-title text-center">
          <SectionTitle
            mainTitle="Activity"
            description="Destinstion | Tour Packages | Hotel | Fixed Departure"
          />
        </div>
        <div className="container pt-3 pb-5">
          <div className="row g-4">
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.1s"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/destination-list')}
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <div className="service-icon" style={{ color: '#F58634' }}>
                    <p style={{ fontSize: 36, fontWeight: 700 }}>
                      {destinationData.length}
                    </p>
                  </div>
                  <h5>Destination</h5>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.3s"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/package-list')}
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <div className="service-icon" style={{ color: '#F58634' }}>
                    <p style={{ fontSize: 36, fontWeight: 700 }}>
                      {packageData.length}
                    </p>
                  </div>
                  <h5>Tour Packages</h5>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.5s"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/hotel-list')}
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <div className="service-icon" style={{ color: '#F58634' }}>
                    <p style={{ fontSize: 36, fontWeight: 700 }}>
                      {hotelData.length}
                    </p>
                  </div>
                  <h5>Hotels</h5>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay="0.7s"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/fixed-departure-list')}
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  <div className="service-icon" style={{ color: '#F58634' }}>
                    <p style={{ fontSize: 36, fontWeight: 700 }}>
                      {fixedDepartureData.length}
                    </p>
                  </div>
                  <h5>Fixed Diparture</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
