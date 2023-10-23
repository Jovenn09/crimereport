"use client";
import { useState } from "react";
import axios from "axios";

const AddCrime = () => {
  const [nameCrime, setNameCrime] = useState("");
  const [typeCrime, setTypeCrime] = useState("");
  const [location, setLocation] = useState("");
  const [incidentDate, setIncedentDate] = useState("");
  const [modal, setModal] = useState(false);

  async function handleSubmit() {
    // const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:5000/api/crime-report`,
      {
        name_crime: nameCrime,
        type_crime: typeCrime,
        location: location,
        incident_date: incidentDate,
      },
      // {
      //   headers: {
      //     Authorization: `${token}`,
      //   },
      // }
    )
    .then(result => {
      console.log(result)
    })
    .catch(err => console.log(err))
    setModal(false);

    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-primary text-white" onClick={handleChange}>
        Add New
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal text-white text-center ">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Crime Data</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label font-bold text-sm">Crime</label>
              <input
                type="text"
                value={nameCrime}
                onChange={(e) => setNameCrime(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Enter a crime"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Crime Type</label>
              <input
                type="text"
                value={typeCrime}
                onChange={(e) => setTypeCrime(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Define what type of crime"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Enter a location"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Date</label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncedentDate(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Enter a date"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>

              <button className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCrime;
