import { useEffect, useState } from "react";
import axios from "axios";
import AddAccident from "./accident/AddAccident.jsx";
import UpdateAccident from "./accident/UpdateAccident.jsx";
import DeleteAccident from "./accident/DeleteAccident.jsx";
import ViewAccidentModal from "./ViewAccidentModal.jsx";
import "./ViewAccidentModal.css";

const Accident = () => {
  const [name, setName] = useState("");
  const [accidents, setAccidents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedAccident, setSelectedAccident] = useState(null);
  const [actionStatus, setActionStatus] = useState([]); 
  const [selectedTab, setSelectedTab] = useState("All");
  const [assignedUsers, setAssignedUsers] = useState(new Array(accidents.length).fill(''));

  

  useEffect(() => {
    getUser();
    getAccidents();
  }, []);

  const getUser = () => {
    axios.get(`http://localhost:5000/api/user`)
      .then((result) => {
        console.log(result);
        setName(result.data);
      })
      .catch((err) => console.log(err));
  };

  const getAccidents = () => {
    axios.get(`http://localhost:5000/api/accident-report`)
      .then((result) => {
        console.log(result);
        setAccidents(result.data);
        const initialActionStatus = result.data.map((accident) => accident.action_status);
        setActionStatus(initialActionStatus); 
      })
      .catch((err) => console.log(err));
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  
  const filteredAccidentsByStatus = () => {
    if (selectedTab === "All") {
      return filteredAccidents;
    } else {
      return filteredAccidents.filter((accident, index) => {
        return actionStatus[index] === selectedTab;
      });
    }
  };
  

  const filteredAccidents = accidents.filter((accident, index) => {
    const searchString = searchQuery.toLowerCase();
    const accidentMonth = new Date(accident.date).toLocaleString("default", { month: "long" });

    return (
      (accident.location.toLowerCase().includes(searchString) ||
        accident.description.toLowerCase().includes(searchString)) &&
      (!selectedVehicleType || accident.vehicle_type === selectedVehicleType) &&
      (!selectedLocation || accident.location === selectedLocation) &&
      (!selectedMonth || accidentMonth === selectedMonth)
    );
  });

  
  const openModal = (accidentData) => {
    setSelectedAccident(accidentData);
  };

 
  const closeModal = () => {
    setSelectedAccident(null);
  };

  const updateActionStatus = (index, newStatus) => {
    const updatedStatus = [...actionStatus];
    updatedStatus[index] = newStatus;
    setActionStatus(updatedStatus);
  
    
    axios.put(`http://localhost:5000/api/accident-report/${accidents[index]._id}/action-status`, {
      actionStatus: newStatus,
    })
    .then((response) => {
      console.log('Action status updated:', response.data);
  
      
      window.alert('Status saved successfully!');
    })
    .catch((error) => {
      console.error('Failed to update action status:', error);
  
      
      window.alert('Failed to save status. Please try again.');
    });
  };

  const updateAssignedUser = (index, assignedUser) => {
    const updatedAssignedUsers = [...assignedUsers];
    updatedAssignedUsers[index] = assignedUser;
    setAssignedUsers(updatedAssignedUsers);
  };

  return (
    <div className="ml-8 justify-center text-4xl">
      <h1 className="font-semibold mt-4 text-white">Accident Reports</h1>
      <div className="flex gap-5 mt-4">
        <select
          value={selectedVehicleType}
          onChange={(e) => setSelectedVehicleType(e.target.value)}
          className="px-5 py-2 fs-5 rounded-lg text-lg"
        >
          <option value="">All Vehicle Types</option>
          <option value="Van">Van</option>
          <option value="Car">Car</option>
          <option value="Motorcycle">Motorcycle</option>
          <option value="Truck">Truck</option>
          <option value="Bus">Bus</option>
          <option value="Jeep">Jeep</option>
          <option value="Bicycle">Bicycle</option>
        </select>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-5 py-2 fs-5 rounded-lg text-lg	"
        >
         <option value="">All Locations</option>
          <option value="Bacayao Norte, Dagupan City">Bacayao Norte, Dagupan City</option>
          <option value="Bacayao Sur, Dagupan City">Bacayao Sur, Dagupan City</option>
          <option value="Bolosan, Dagupan City">Bolosan, Dagupan City</option>
          <option value="Bonuan Binloc, Dagupan City">Bonuan Binloc, Dagupan City</option>
          <option value="Bonuan Boquig, Dagupan City">Bonuan Boquig, Dagupan City</option>
          <option value="Bonuan Gueset, Dagupan City">Bonuan Gueset, Dagupan City</option>
          <option value="Calmay, Dagupan City">Calmay, Dagupan City</option>
          <option value="Carael, Dagupan City">Carael, Dagupan City</option>
          <option value="Caranglaan, Dagupan City">Caranglaan, Dagupan City</option>
          <option value="Herrero, Dagupan City">Herrero, Dagupan City</option>
          <option value="Lasip Chico, Dagupan City">Lasip Chico, Dagupan City</option>
          <option value="Lasip Grande, Dagupan City">Lasip Grande, Dagupan City</option>
          <option value="Lomboy, Dagupan City">Lomboy, Dagupan City</option>
          <option value="Lucao, Dagupan City">Lucao, Dagupan City</option>
          <option value="Malued, Dagupan City">Malued, Dagupan City</option>
          <option value="Mamalingling, Dagupan City">Mamalingling, Dagupan City</option>
          <option value="Mangin, Dagupan City">Mangin, Dagupan City</option>
          <option value="Mayombo, Dagupan City">Mayombo, Dagupan City</option>
          <option value="Pantal, Dagupan City">Pantal, Dagupan City</option>
          <option value="Poblacion Oeste, Dagupan City">Poblacion Oeste, Dagupan City</option>
          <option value="Pogo Chico, Dagupan City">Pogo Chico, Dagupan City</option>
          <option value="Pogo Grande, Dagupan City">Pogo Grande, Dagupan City</option>
          <option value="Pugaro Suit, Dagupan City">Pugaro Suit, Dagupan City</option>
          <option value="Salapingao, Dagupan City">Salapingao, Dagupan City</option>
          <option value="Salisay, Dagupan City">Salisay, Dagupan City</option>
          <option value="Tambac, Dagupan City">Tambac, Dagupan City</option>
          <option value="Tapuac, Dagupan City">Tapuac, Dagupan City</option>
          <option value="Tebeng, Dagupan City">Tebeng, Dagupan City</option>
        </select>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-5 py-2 fs-5 rounded-lg text-lg"
        >
          <option value="">All Months</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>

      <div className="mt-4">
        <div className="flex">
          {["All", "Solved", "Resolved", "Closed Case"].map((status) => (
            <button
              key={status}
              className={`tab ${selectedTab === status ? "active-tab" : ""}`}
              onClick={() => handleTabClick(status)}
            >
              <span className="tab-name">{status}</span>
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-5 py-2 fs-5 rounded-lg text-lg	"
        />
      </div>
      <div className="overflow-x-auto mt-4 justify-center">
        <table className="table justify-center">
          <thead>
            <tr>
              <th className="text-white text-lg font-semibold text-center">
                ID
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Location
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Description
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Injured
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Wounded
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Vehicle Type
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Date
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Action Status
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Assigned
              </th>
              
              <th className="text-white text-lg font-semibold text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAccidentsByStatus().map((accident, index) => (
              <tr key={accident._id}>
                <td className="text-white text-md font-base text-center">
                  {index + 1}
                </td>
                <td className="text-white text-md font-base text-center">
                  {accident.location}
                </td>
                <td className="text-white text-md font-base text-center">
                  {accident.description}
                </td>
                <td className="text-white text-md font-base text-center">
                  {accident.fatalities}
                </td>
                <td className="text-white text-md font-base text-center">
                  {accident.injured}
                </td>
                <td className="text-white text-md font-base text-center">
                  {accident.vehicle_type}
                </td>
                <td className="text-white text-md font-base text-center">
                  {new Date(accident.date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="text-white text-md font-base text-center">
                <select
  value={actionStatus[index] || "InProgress"} 
  onChange={(e) => updateActionStatus(index, e.target.value)}
  className="px-2 py-1 fs-5 rounded-lg text-md"
>
  <option value="InProgress">In Progress</option> 
  <option value="Solved">Solved</option>
  <option value="Resolved">Resolved</option>
  <option value="Closed Case">Closed Case</option>
  
</select>
                </td>
                <td className="text-white text-md font-base text-center">
                <select
  value={assignedUsers[index]}
  onChange={(e) => updateAssignedUser(index, e.target.value)}
  className="px-2 py-1 fs-5 rounded-lg text-md"
>
  <option value="">Unassigned</option>
  <option value="user1">PO1 - Juan Dela Cruz</option>
  <option value="user2">SPO1 - Pedro Penduko</option>
  
</select>
</td>
                <td className="flex items-center">
                  <div className="mr-1">
                    <UpdateAccident id={accident._id} />
                  </div>
                  <div className="mr-1">
                    <DeleteAccident id={accident._id} />
                  </div>
                  <div className="mr-1">
                    <button
                      className="btn btn-primary btn-sm text-white"
                      onClick={() => openModal(accident)}
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {selectedAccident && (
          <ViewAccidentModal accidentData={selectedAccident} onClose={closeModal} />
        )}
      </div>
    </div>
  );
};

export default Accident;
