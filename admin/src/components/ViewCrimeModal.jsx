import React, { useState, useEffect } from "react";
import "./ViewCrimeModal.css";

const ViewCrimeModal = ({ crimeData, onClose }) => {
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
    <div className={`view-crime-modal ${showModal ? "active" : ""}`}>
      <div className="modal-content">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>Crime Details</h2>
        <div className="modal-body">
          <p><strong>Crime:</strong> {crimeData.name_crime}</p>
          <p><strong>Crime Type:</strong> {crimeData.type_crime}</p>
          <p><strong>Location:</strong> {crimeData.location}</p>
          <p><strong>Time:</strong> {new Date(crimeData.incident_date).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewCrimeModal;