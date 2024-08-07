import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [user, setUser] = useState(null); // To store user details
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://inotebook-backend-virid.vercel.app/routes/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();

    if (json.success) {
      localStorage.setItem('token', json.authToken); // Save token

      // Fetch user details
      const userResponse = await fetch("https://inotebook-backend-virid.vercel.app/routes/auth/getUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': json.authToken // Use 'auth-token' header
        }
      });

      if (userResponse.ok) {
        const userJson = await userResponse.json();
        setUser(userJson.user); // Save user details
        props.showAlert("Login successful", "success");
        navigate("/", { state: { user: userJson.user } }); // Pass user data to the home page
      } else {
        const errorText = await userResponse.text(); // Read the response as text
        console.error('Error fetching user:', errorText);
        props.showAlert("Failed to fetch user details", "danger");
      }
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
   <div style={{color:(props.mode==='light')?'black':'white'}}>
     <div>
      <div className="row align-items-center g-lg-5 py-5">
        <div  className="col-lg-7 text-center text-lg-start">
          <h1  className="display-4 fw-bold lh-1  mb-3">Welcome back to iNotebook!</h1>
          <p className="col-lg-10 fs-4">Dive back into your notes and pick up right where you left off. With your return, you’re all set to:
            <ul>
              <li>Continue Your Work</li>
              <li>Explore New Features:</li>
              <li>Stay Organized</li>
            </ul>
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" style={{color:'black'}} className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" />
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label style={{color:'black'}} htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name="password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        </div>
      </div>
    </div>
   </div>
  );
}

export default Login;
