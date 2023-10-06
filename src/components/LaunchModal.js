import React, { useRef } from 'react';
import './../styles/LaunchModal.css';
import { CloudSleet, XLg } from 'react-bootstrap-icons';

const LaunchModal = ({ click }) => {
  const ref = useRef(null);
  if (click) {
    ref.current.click();
  }
  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="home-modal-content modal-content">
            {/* <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div> */}
            <div className="home-modal modal-body">
              <img
                src={require('./../img/ACP Board.jpg')}
                alt="bg poster"
                className="img-fluid"
                style={{ objectFit: 'cover', width: '100%' }}
              />
              <div
                className="home-modal-close close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <XLg size={20} />
              </div>
            </div>
            {/* <div className="modal-footer">
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LaunchModal;
