import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../assets/login.png';
import logo from '../assets/crimee.jpg';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirtday] = useState('')
  const [sex, setSex] = useState('')
  const [address, setAddress] = useState('')
  const [contact_no, setContact] = useState('')
  const [msg, setMsg] = useState('');
  const history = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/user', {
        name: name,
        email: email,
        password: password,
        birthday,
        sex,
        address,
        contact_no
      })
      .then(result => {
        console.log(result)
        history('/')
      })
      .catch(err => console.log(err))
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.errors);
      }
    }
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const containerStyle = {
    border: '2px solid #ccc',
    borderRadius: '20px',
    padding: '40px',
    maxWidth: '800px',
    height: '500px',
    width: '100%',
    display: 'flex',
  };

  const logoStyle = {
    width: '350px',
    height: 'auto',
    marginRight: '20px',
  };

  const formStyle = {
    flex: 1,
    borderRadius: '20px',
  };

  return (
    <div className="h-screen" style={backgroundStyle}>
      <div style={containerStyle} className="bg-[#0e0e0e] overflow-y-auto	">
        <form onSubmit={handleSubmit} style={formStyle}>
          <h2 className="text-4xl font-bold">Create an account</h2>
          <p className="text-red-500 mt-4">{msg}</p>
          <div className="flex flex-col py-2">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="border-2 rounded py-2 px-3 mt-2"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="border-2 rounded py-2 px-3 mt-2"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Birthday</label>
            <input
              value={birthday}
              onChange={(e) => setBirtday(e.target.value)}
              type="date"
              className="border-2 rounded py-2 px-3 mt-2"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Sex</label>
            <input
              value={sex}
              onChange={(e) => setSex(e.target.value)}
              type="text"
              className="border-2 rounded py-2 px-3 mt-2"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="border-2 rounded py-2 px-3 mt-2"
            />
          </div>
          <div className="flex flex-col py-2">
            <label >Contact Number</label>
            <input
              value={contact_no}
              onChange={(e) => setContact(e.target.value)}
              type="text"
              className="border-2 rounded py-2 px-3 mt-2"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border-2 rounded py-2 px-3 mt-2"
            />
          </div>
          <button className="w-full my-3 py-2 bg-blue-500 text-white font-semibold rounded-lg">
            Register
          </button>
          <div className="mt-2 text-center">
            <p>
              Already have an account?{' '}
              <span>
                {' '}
                <a className="text-blue-500 hover:text-white" href="/">
                  Login
                </a>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
