import React, { useState } from "react";
import axios from "axios";
import './AddAccident.css';

const AddAccident = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [fatalities, setFatalities] = useState("");
  const [injured, setInjured] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [modal, setModal] = useState(false);
  const locationOptions = ["Bacayao Norte", "Bacayao Sur", "Bolosan", "Bonuan Binloc", "Bonuan Boquig", "Bonuan Gueset", "Calmay", "Carael", "Caranglaan", "Herrero", "Lasip Chico", "Lasip Grande", "Lomboy", "Lucao", "Malued", "Mamalingling", "Mangin", "Mayombo", "Pantal", "Poblacion Oeste", "Pogo Chico", "Pogo Grande", "Pugaro Suit", "Salapingao", "Salisay", "Tambac", "Tapuac", "Tebeng"];
  const vehicleTypeOptions = ["Van", "Car", "Motorcycle", "Truck", "Bus", "Jeep", "Bicycle"];
  const descriptionOptions = ["asdadsad"]; 

  const handleSubmit = (e) => {
    e.preventDefault();
    // const token = localStorage.getItem("token");
    axios.post(
      `http://localhost:5000/api/accident-report`,
      {
        date,
        location,
        description,
        fatalities,
        injured,
        vehicle_type,
      },
      // {
      //   headers: {
      //     Authorization: `${token}`,
      //   },
      // }
    )
      .then(result => {
        console.log(result);
      })
      .catch(err => console.log(err));
    setModal(false);
  };

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="accident-report-button" onClick={handleChange}>
        Report an Accident
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal text-white text-center ">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Data Accident</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold text-sm">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input w-full input-bordered"
              >
                <option value="">Select a description</option>
                {descriptionOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
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
                value={vehicle_type}
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
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Enter a date"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAccident;