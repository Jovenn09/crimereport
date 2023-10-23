"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const DeleteCrime = (props) => {
  const [nameCrime, setNameCrime] = useState("");
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

    setNameCrime(data.data.data.name_crime);
  };

  const handleDelete = async () => {
    // const token = localStorage.getItem("token");
    // const id = parseInt(crimeId.id);
    await axios.delete(`http://localhost:5000/api/crime-report/${id}`, 
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
        Delete
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
            Are sure to delete {nameCrime} ?
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

export default DeleteCrime;
