"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom'

const UpdateAccident = (props) => {
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [fatalities, setFatalities] = useState("")
  const [injured, setInjured] = useState("")
  const [vehicleType, setVehicleType] = useState("")

  const [modal, setModal] = useState(false);
  const id = props.id

  useEffect(() => {
    getAccident();
  }, []);

  const getAccident = async () => {
    // const token = localStorage.getItem("token");
    const data = await axios.get(`http://localhost:5000/api/accident-report/${id}`
    //  + id, {
    //   headers: {
    //     Authorization: `${token}`,
    //   },
    // }
    );
    const date = new Date(data.data.data.date).toISOString().substr(0, 10);

    setLocation(data.data.data.location);
    setDescription(data.data.data.description);
    setFatalities(data.data.data.fatalities);
    setInjured(data.data.data.injured);
    setVehicleType(data.data.data.vehicle_type);
    setDate(date);
  };

  const handleUpdate = async () => {
    // const token = localStorage.getItem("token");
    // const id = parseInt(crimeId.id);
    await axios.put(
      `http://localhost:5000/api/accident-report/${id}`,
      {
        location: location,
        description: description,
        fatalities: fatalities,
        injured: injured,
        vehicle_type: vehicleType,
        date: date,
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
          <h3 className="font-bold text-lg">Update Data</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold text-sm">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Lokasi"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Deskripsi"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Death</label>
              <input
                type="text"
                value={fatalities}
                onChange={(e) => setFatalities(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Kematiaan"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Wounded</label>
              <input
                type="text"
                value={injured}
                onChange={(e) => setInjured(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Terluka"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Type of Vechicle</label>
              <input
                type="text"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Tipe Kedaraan"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold text-sm">Time</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Waktu"
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

export default UpdateAccident;
