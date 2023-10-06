import React, { useEffect, useState } from 'react';
import { usePackageContext } from '../context/PackageContext';

const ContactEnquiryList = () => {
  const context = usePackageContext();
  const { contactData, updateContactData } = context;
  const [contactArray, setContactArray] = useState([]);
  useEffect(() => {
    updateContactData();
    setContactArray(contactData.reverse());
  }, []);
  return (
    <div className="container-xxl py-5">
      <table className="table">
        <thead className="thead text-center">
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Emial</th>
            <th scope="col">Mobile No.</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {contactData?.map((contact, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.mobile}</td>
                <td>{contact?.message ? contact.message : '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ContactEnquiryList;
