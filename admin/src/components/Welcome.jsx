import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const Welcome = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [accidentData, setAccidentData] = useState([]);
  useEffect(() => {
    getUser();
    getCrimes()
    getAccidents()
  }, []);

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/user`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const users = response.data.data.name;
      setName(users);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getCrimes = () => {
    axios.get(`http://localhost:5000/api/crime-report`)
      .then(result => {
        setCrimeData(result.data)
      })
      .catch(err => console.log(err));
  };

  const getAccidents = () => {
    axios.get(`http://localhost:5000/api/accident-report`)
      .then(result => {
        setAccidentData(result.data)
      })
      .catch(err => console.log(err));
  };
  return (
    <main className='main-container'>
      <div className='main-title font-semibold'>
        <h3>Welcome to the Crime and Accident Data Admin Dashboard</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-lg font-bold">Total Crime Reported</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1 className="text-2xl font-bold">{crimeData.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-lg font-bold">Total Accident Reported</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1 className="text-2xl font-bold">{accidentData.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-lg font-bold">Total Crime Solved</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1 className="text-2xl font-bold">159</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-lg font-bold">Ongoing Crimes</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1 className="text-2xl font-bold">42</h1>
        </div>
      </div>
      <div className=" mt-4 justify-center text-4x text-white">
        <h5 className="mt-4 text-2xl">
        We are proud to present a platform specifically designed to provide up-to-date information on crime and accident data. Our goal is to provide easy and transparent access to relevant data, so you can understand and explore trends, patterns and statistics related to crime and accidents.
        </h5>
        <h5 className="mt-4 text-2xl">
        Through this website, you can explore various types of crime, including street crime, robbery, theft, and more. We also provide information regarding traffic accidents, road incidents, and other accident data that can help you understand the factors that contribute to accidents and take appropriate preventive measures. 
        </h5>
        <h5 className="mt-4 text-2xl">
          We collect data from various reliable sources and we continuously update the information to keep it accurate and useful. We hope that through easy access to this data, the public can raise awareness of the problem of crime and accidents and contribute to creating a safer and better environment for all.

        </h5>
      </div>
  
    </main>
  );
};

export default Welcome;
