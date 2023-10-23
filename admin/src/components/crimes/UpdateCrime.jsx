"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const UpdateCrime = (props) => {
  const [nameCrime, setNameCrime] = useState("");
  const [typeCrime, setTypeCrime] = useState("");
  const [location, setLocation] = useState("");
  const [incidentDate, setIncedentDate] = useState("");
  const id = props.id;

  const [modal, setModal] = useState(false);

  useEffect(() => {
    getCrimes();
  }, []);

  const getCrimes = async () => {
    // const token = localStorage.getItem("token");
    // const id = parseInt(crimeId.id);
    const data = await axios.get(`http://localhost:5000/api/crime-report/${id}`, 
    // {
    //   headers: {
    //     Authorization: `${token}`,
    //   },
    // }
    );
    const date = new Date(data.data.data.incident_date)
      .toISOString()
      .substr(0, 10);

    setNameCrime(data.data.data.name_crime);
    setTypeCrime(data.data.data.type_crime);
    setLocation(data.data.data.location);
    setIncedentDate(date);
  };

  const handleUpdate = async () => {
    // const token = localStorage.getItem("token");
    // const id = parseInt(crimeId.id);
    await axios.put(
      `http://localhost:5000/api/crime-report/${id}`,
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
    );
    setModal(false);
  };

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm text-white" onClick={handleChange}>
        Update
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal text-white text-center ">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Update Data Kejahataan</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold text-sm">Kejahaatan</label>
              <input
                type="text"
                value={nameCrime}
                onChange={(e) => setNameCrime(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Kejahataan"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Tipe Kejahaatan</label>
              <input
                type="text"
                value={typeCrime}
                onChange={(e) => setTypeCrime(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Tipe Kejahataan"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Lokasi</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Lokasi"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Waktu</label>
              <input
                type="date"
                value={incidentDate}
                onChange={(e) => setIncedentDate(e.target.value)}
                className="input w-full input-bordered"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Close
              </button>

              <button className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCrime;
