"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const DeleteAccident = ({id}) => {
  const [description, setDescription] = useState("");
  const crimeId = id;

  console.log(id)

  const [modal, setModal] = useState(false);

  useEffect(() => {
    getAccident();
  }, []);

  const getAccident = async () => {
    // const token = localStorage.getItem("token");
    console.log('id: ', crimeId)
    const data = await axios.get(`http://localhost:5000/api/accident-report/${crimeId}`, 
    // {
    //   headers: {
    //     Authorization: `${token}`,
    //   },
    // }
    );

    setDescription(data.data.data.description);
  };

  const handleDelete = async () => {
    // const token = localStorage.getItem("token");
    console.log('id: ', crimeId)
    await axios.delete(`http://localhost:5000/api/accident-report/${crimeId}`, 
    // {
    //   headers: {
    //     Authorization: `${token}`,
    //   },
    // }
    );
    setModal(false);
    window.location.reload();
  };

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        {props.id}
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are sure to delete {description} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Close
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-primary"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccident;
