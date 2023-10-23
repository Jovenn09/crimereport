import React, { useState } from "react";
import axios from "axios";
import './ReportForm.css';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReportForm = () => {
  const [reportType, setReportType] = useState("crime");
  const [nameCrime, setNameCrime] = useState("");
  const [typeCrime, setTypeCrime] = useState("");
  const [locationCrime, setLocationCrime] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [dateAccident, setDateAccident] = useState("");
  const [locationAccident, setLocationAccident] = useState("");
  const [description, setDescription] = useState("");
  const [fatalities, setFatalities] = useState("");
  const [injured, setInjured] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [modal, setModal] = useState(false);
  

  const locationOptions = ["Bacayao Norte", "Bacayao Sur", "Bolosan", "Bonuan Binloc", "Bonuan Boquig", "Bonuan Gueset", "Calmay", "Carael", "Caranglaan", "Herrero", "Lasip Chico", "Lasip Grande", "Lomboy", "Lucao", "Malued", "Mamalingling", "Mangin", "Mayombo", "Pantal", "Poblacion Oeste", "Pogo Chico", "Pogo Grande", "Pugaro Suit", "Salapingao", "Salisay", "Tambac", "Tapuac", "Tebeng"];
  const crimeTypeOptions = ["Murder", "Theft", "Drug trafficking", "Kidnapping", "Identity Theft", "Child Abuse", "Rape", "Assault", "Cyber Crime", "Violence", "Sexual Assault", "Fraud", "Burglary"];
  const crimeOptions = ["Nagnakaw siya ng bag", "Pumatay siya ng Bata", "Kumuha siya ng Ballpen"];
  const vehicleTypeOptions = ["Van", "Car", "Motorcycle", "Truck", "Bus", "Jeep", "Bicycle"];
  const descriptionOptions = ["natumba", "Nabunggo", "Nagasgas", "Nagulungan"];

  const [otherCrime, setOtherCrime] = useState(""); 
  const [isOtherCrimeSelected, setIsOtherCrimeSelected] = useState(false);
  const [otherDescription, setOtherDescription] = useState("");
  const [isOtherDescriptionSelected, setIsOtherDescriptionSelected] = useState(false);

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
  };

  const handleCrimeChange = (e) => {
    const selectedCrime = e.target.value;
    if (selectedCrime === "Other") {
      setIsOtherCrimeSelected(true);
    } else {
      setIsOtherCrimeSelected(false);
      setNameCrime(selectedCrime);
    }
  };
  
  const handleDescriptionChange = (e) => {
    const selectedDescription = e.target.value;
    if (selectedDescription === "Other") {
      setIsOtherDescriptionSelected(true);
    } else {
      setIsOtherDescriptionSelected(false);
      setDescription(selectedDescription);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (reportType === "crime") {
      try {
        await axios.post(
          `http://localhost:5000/api/crime-report`,
          {
            name_crime: isOtherCrimeSelected ? otherCrime : nameCrime,
            type_crime: typeCrime,
            location: locationCrime,
            incident_date: incidentDate,
          }
        );
        toast.success("Crime report submitted successfully");
      } catch (error) {
        toast.error("Fill out the form first!");
        console.error(error);
      }
    } else if (reportType === "accident") {
      try {
        await axios.post(
          `http://localhost:5000/api/accident-report`,
          {
            date: dateAccident,
            location: locationAccident,
            description: isOtherDescriptionSelected ? otherDescription : description, 
            fatalities,
            injured,
            vehicle_type: vehicleType,
          }
        );
        toast.success("Accident report submitted successfully");
      } catch (error) {
        toast.error("Fill out the form first!");
        console.error(error);
      }
    }
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <div className="report-button-container">
        <button className="report-button" onClick={handleChange}>
          Report an Incident
        </button>
      </div>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal text-white text-center">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Report an Incident</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold text-sm">Report Type</label>
              <select
                value={reportType}
                onChange={handleReportTypeChange}
                className="input w-full input-bordered"
              >
                <option value="crime">Crime</option>
                <option value="accident">Accident</option>
              </select>
            </div>
            {reportType === "crime" && (
              <div>
                <div className="form-control">
                  <label className="label font-bold text-sm">Crime</label>
                  <select
                    value={isOtherCrimeSelected ? "Other" : nameCrime}
                    onChange={handleCrimeChange}
                    className="input w-full input-bordered"
                  >
                    <option value="">Select a crime</option>
                    {crimeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                  {isOtherCrimeSelected && (
                    <input
                      type="text"
                      value={otherCrime}
                      onChange={(e) => setOtherCrime(e.target.value)}
                      className="input w-full input-bordered"
                      placeholder="Enter a custom crime"
                    />
                  )}
                </div>
                <div className="form-control">
                  <label className="label font-bold text-sm">Crime Type</label>
                  <select
                    value={typeCrime}
                    onChange={(e) => setTypeCrime(e.target.value)}
                    className="input w-full input-bordered"
                  >
                    <option value="">Select a crime type</option>
                    {crimeTypeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label font-bold text-sm">Location</label>
                  <select
                    value={locationCrime}
                    onChange={(e) => setLocationCrime(e.target.value)}
                    className="input w-full input-bordered"
                  >
                    <option value="">Select a location</option>
                    {locationOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label font-bold text-sm">Date</label>
                  <input
                    type="date"
                    value={incidentDate}
                    onChange={(e) => setIncidentDate(e.target.value)}
                    className="input w-full input-bordered"
                    placeholder="Enter a date"
                  />
                </div>
              </div>
            )}
            {reportType === "accident" && (
              <div>
                <div className="form-control">
                  <label className="label font-bold text-sm">Location</label>
                  <select
                    value={locationAccident}
                    onChange={(e) => setLocationAccident(e.target.value)}
                    className="input w-full input-bordered"
                  >
                    <option value="">Select a location</option>
                    {locationOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
            <label className="label font-bold text-sm">Description</label>
            <select
              value={isOtherDescriptionSelected ? "Other" : description}
              onChange={handleDescriptionChange}
              className="input w-full input-bordered"
            >
              <option value="">Select a description</option>
              {descriptionOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
            {isOtherDescriptionSelected && (
              <input
                type="text"
                value={otherDescription}
                onChange={(e) => setOtherDescription(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Enter a custom description"
              />
            )}
          </div>
                <div className="form-control">
                  <label className="label font-bold text-sm">Death</label>
                  <input
                    type="number"
                    value={fatalities}
                    onChange={(e) => setFatalities(e.target.value)}
                    className="input w-full input-bordered"
                    placeholder="Enter a number of death"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-sm">Wounded</label>
                  <input
                    type="number"
                    value={injured}
                    onChange={(e) => setInjured(e.target.value)}
                    className="input w-full input-bordered"
                    placeholder="Enter a number of wounded persons"
                  />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-sm">Vehicle Type</label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="input w-full input-bordered"
                  >
                    <option value="">Select a vehicle type</option>
                    {vehicleTypeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-control">
                  <label className="label font-bold text-sm">Date</label>
                  <input
                    type="date"
                    value={dateAccident}
                    onChange={(e) => setDateAccident(e.target.value)}
                    className="input w-full input-bordered"
                    placeholder="Enter a date"
                  />
                </div>
              </div>
            )}
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReportForm;