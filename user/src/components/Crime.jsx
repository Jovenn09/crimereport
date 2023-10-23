import axios from "axios";
import { useEffect, useState } from "react";
import AddCrime from "./crimes/AddCrime.jsx";
import UpdateCrime from "./crimes/UpdateCrime.jsx";
import DeleteCrime from "./crimes/DeleteCrime.jsx";

const Crime = () => {
  const [name, setName] = useState("");
  const [crimes, setCrimes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrimeType, setSelectedCrimeType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  
  useEffect(() => {
    getUser();
    getCrimes();
  }, []);

  const getUser = () => {
    // const token = localStorage.getItem("token");
    axios.get(`http://localhost:5000/api/user`)
    .then(result => {
      console.log(result)
      setName(result.data)
    })
    .catch(err => console.log(err));

    // const user = data.data.data.name;
    // setName(user);
  };

  const getCrimes = () => {
    // const token = localStorage.getItem("token");
    axios.get(`http://localhost:5000/api/crime-report`)
    .then(result => {
      console.log(result)
      setCrimes(result.data)
    })
    .catch(err => console.log(err));
    // console.log(crimes.data.paging.page);
    // const data = crimes.data.data;
    // setCrimes(data);
  };
  const filteredCrimes = crimes.filter((crime) => {
    const searchString = searchQuery.toLowerCase();
    const crimeMonth = new Date(crime.incident_date).toLocaleString("default", { month: "long" });

    return (
      (crime.location.toLowerCase().includes(searchString) ||
      crime.name_crime.toLowerCase().includes(searchString)) &&
      (!selectedCrimeType || crime.type_crime === selectedCrimeType) &&
      (!selectedLocation || crime.location === selectedLocation) &&
      (!selectedMonth || crimeMonth === selectedMonth)
    );
  });

  return (
    <div className="ml-8 justify-center text-4xl">
      <h1 className="font-semibold mt-4 text-white">Crime Reports</h1>
      <div className="flex gap-5 mt-4">
        <select
          value={selectedCrimeType}
          onChange={(e) => setSelectedCrimeType(e.target.value)}
          className="px-5 py-2 fs-5 rounded-lg text-lg"
        >
          <option value="">All Crime Types</option>
          <option value="Murder">Murder</option>
          <option value="Theft">Theft</option>
          <option value="Drug trafficking">Drug trafficking</option>
          <option value="Kidnapping">Kidnapping</option>
          <option value="Identity Theft">Identity Theft</option>
          <option value="Child Abuse">Child Abuse</option>
          <option value="Rape">Rape</option>
          <option value="Assault">Assault</option>
          <option value="Cyber Crime">Cyber Crime</option>
          <option value="Violence">Violence</option>
          <option value="Sexual Assault">Sexual Assault</option>
          <option value="Fraud">Fraud</option>
          <option value="Burglary">Burglary</option>
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
                Crime 
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Crime Type 
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Location 
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Time
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCrimes.map((crime, index) => (
              <tr key={crime.id}>
                <td className="text-white text-md font-base text-center">
                  {index + 1}
                </td>
                <td className="text-white text-md font-base text-center">
                  {crime.name_crime}
                </td>
                <td className="text-white text-md font-base text-center">
                  {crime.type_crime}
                </td>
                <td className="text-white text-md font-base text-center">
                  {crime.location}
                </td>
                <td className="text-white text-md font-base text-center">
                  {new Date(crime.incident_date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="flex">
                  <div className="mr-1">
                    <UpdateCrime id={parseInt(crime.id)} />
                  </div>

                  <DeleteCrime id={parseInt(crime.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Crime;
