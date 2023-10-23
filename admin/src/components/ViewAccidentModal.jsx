import React, { useState, useEffect } from "react";
import "./ViewAccidentModal.css";

const ViewAccidentModal = ({ accidentData, onClose }) => {
  const [showModal, setShowModal] = useState(true);

  const closeModal = () => {
    setShowModal(false);
    onClose();
  };

  
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

   
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  return (
    <div className={`view-accident-modal ${showModal ? "active" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Accident Details</h2>
        <div className="modal-body">
          <p><strong>Location:</strong> {accidentData.location}</p>
          <p><strong>Description:</strong> {accidentData.description}</p>
          <p><strong>Injured:</strong> {accidentData.injured}</p>
          <p><strong>Wounded:</strong> {accidentData.wounded}</p>
          <p><strong>Fatalities:</strong> {accidentData.fatalities}</p>
          <p><strong>Vehicle Type:</strong> {accidentData.vehicle_type}</p>
          <p><strong>Date:</strong> {new Date(accidentData.date).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
          
        </div>
      </div>
    </div>
  );
};

export default ViewAccidentModal;