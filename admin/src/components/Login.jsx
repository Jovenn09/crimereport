import { useState } from "react";
import axios from "axios";
import backgroundImage from "../assets/login.png";
import logo from "../assets/crimee.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const Auth = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/user/login", {
        email: email,
        password: password,
      }).then((response) => {
        alert("You have successfully loggged in!")
        window.location.href = "/dashboard";
      });
    } catch (error) {
      if (error.response) {
        alert(error.response.data.errors);
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
    border: "2px solid #ccc",
    borderRadius: "20px",
    padding: "40px",
    maxWidth: "800px",
    width: "100%",
    display: "flex",
  };

  const logoStyle = {
    width: "350px",
    height: "auto",
    marginRight: "20px",
  };

  const formStyle = {
    flex: 1,
  };

  return (
    <div className="h-screen" style={backgroundStyle}>
      <div style={containerStyle}  className="bg-[#25383C]">
        <form onSubmit={Auth} style={formStyle}>
          <h2 className="text-4xl font-bold">Login to continue</h2>
          <p className="text-red-500 mt-4">{msg}</p>
          <div className="flex flex-col py-2">
            <label >Username</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className="border-2 rounded py-2 px-3 mt-2" />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="border-2 rounded py-2 px-3 mt-2" />
          </div>
          <button className="w-full my-5 py-2 bg-blue-500 text-white font-semibold rounded-lg">Login</button>
          <div className="text-center">
            <a className="text-blue-500 hover:text-white" href="/register">Create Account?</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
