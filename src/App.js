import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react'
require('dotenv').config();

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dbuser, setDbuser] = useState('');
  const [dbemail, setDbemail] = useState('');
  const [id, setId] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleupdateUser = (e) => {
    setDbuser(e.target.value)
  }

  const handleupdateEmail = (e) => {
    setDbemail(e.target.value)
  }

  //Add function
  const handleAdd = () => {
    if (!username) {
      alert('Username is required');
      return;
    }
    if (!email) {
      alert('Email is required');
      return;
    } else if (!validateEmail(email)) {
      alert('Please enter a valid email');
      return;
    }
    // Data to be sent to the backend
    const userData = {
      username: username,
      email: email
    };
    // POST request to backend endpoint
    axios.post(`${process.env.REACT_APP_BASE_URL}/credentials`, userData)
      .then(response => {
        console.log(response.data); // Log the response from the backend
        alert('Data successfully sent to the backend');
        setId(response.data._id)
      })
      .catch(error => {
        console.error('Error sending data to the backend:', error);
        alert('An error occurred while sending data to the backend');
      });
    setUsername("")
    setEmail("")
    setDbuser(username)
    setDbemail(email)
  };

  // Function to fetch credentials from backend
  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/cred`)
      .then(response => {
        const credentials = response.data;
        if (credentials.length > 0) {
          const { username, email, _id } = credentials[0];
          setDbuser(username);
          setDbemail(email);
          setId(_id)
        }
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
      });
  };

  // useEffect hook to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // For Update the data
  const credentialUpdate = () => {
    if (!dbuser) {
      alert('Username is required');
      return;
    }
    if (!dbemail) {
      alert('Email is required');
      return;
    } else if (!validateEmail(dbemail)) {
      alert('Please enter a valid email');
      return;
    }
    // Data to be sent to the backend
    const userData = {
      username: dbuser,
      email: dbemail
    };
    //PUT request to backend endpoint
    axios.put(`${process.env.REACT_APP_BASE_URL}/credentials/${id}`, userData)
      .then(response => {
        console.log(response.data); // Log the response from the backend
        alert('Data successfully updated to the backend');
      })
      .catch(error => {
        console.error('Error updating data to the backend:', error);
        alert('An error occurred while updating data to the backend');
      });
  };

  //For validation of email
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className="App">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex" }}>
          <div style={{ margin: "40px", display: "flex", flexDirection: "column", width: "250px" }}>
            <input
              type="text"
              placeholder="Enter the Username"
              value={username}
              onChange={handleUsernameChange}
              style={{ marginBottom: "20px", fontSize: "20px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter the Email"
              style={{ marginBottom: "20px", padding: "10px", borderRadius: "5px", fontSize: "20px", border: "1px solid #ccc" }}
            />
            <button onClick={handleAdd} style={{ marginBottom: "20px", padding: "10px", borderRadius: "5px", fontSize: "20px", border: "1px solid #ccc", backgroundColor: "green" }}>Add</button>
          </div>
          <div style={{ margin: "40px", display: "flex", flexDirection: "column", width: "250px" }}>
            <input
              placeholder='user'
              type="text"
              onChange={handleupdateUser}
              value={dbuser}
              style={{ marginBottom: "20px", fontSize: "20px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input
              placeholder='e'
              type="email"
              value={dbemail}
              onChange={handleupdateEmail}
              style={{ marginBottom: "20px", padding: "10px", borderRadius: "5px", fontSize: "20px", border: "1px solid #ccc" }}
            />
            <button onClick={credentialUpdate} style={{ marginBottom: "20px", padding: "10px", backgroundColor: "gray", borderRadius: "5px", fontSize: "20px", border: "1px solid #ccc" }}>Update</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
