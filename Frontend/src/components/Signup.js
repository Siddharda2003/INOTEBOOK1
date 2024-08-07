import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [emailExists, setEmailExists] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null); // To store user details
  const navigate = useNavigate();

  const checkEmailExists = async (email) => {
    const response = await fetch(`http://localhost:5000/routes/auth/checkemail?email=${encodeURIComponent(email)}`);
    const json = await response.json();
    return json.exists;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (credentials.password !== credentials.cpassword) {
      setPasswordMismatch(true);
      return;
    }

    // Check if email is already registered
    setLoading(true);
    const emailAlreadyExists = await checkEmailExists(credentials.email);
    if (emailAlreadyExists) {
      setEmailExists(true);
      setPasswordMismatch(false); // Reset password mismatch flag
      setLoading(false);
      props.showAlert("Email is already registered", "danger");
      return;
    }

    // Proceed with signup
    const response = await fetch("http://localhost:5000/routes/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    setLoading(false);
    if (json.success) {
      localStorage.setItem('token', json['auth-token']); // Save token

      // Fetch user details
      const userResponse = await fetch("http://localhost:5000/routes/auth/getUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': json['auth-token'] // Use 'auth-token' header
        }
      });

      if (userResponse.ok) {
        const userJson = await userResponse.json();
        setUser(userJson.user); // Save user details
        props.showAlert("Sign up successful", "success");
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
    if (e.target.name === 'email') {
      setEmailExists(false); // Reset email existence flag on email change
    }
    if (e.target.name === 'cpassword') {
      setPasswordMismatch(false); // Reset password mismatch flag on change
    }
  };

  return (
    <div style={{color:(props.mode==='light')?'black':'white'}}>
      <div className="row align-items-center g-lg-5 py-5">
        <div className="col-lg-7 text-center text-lg-start">
          <h1 className="display-4 fw-bold lh-1  mb-3">Welcome to iNotebook!</h1>
          <p className="col-lg-10 fs-4">Sign Up to access all your notes in one place. By signing up, you're taking the first step towards organizing your thoughts, ideas, and tasks in one convenient place.</p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" style={{color:'black'}} className="form-label">Name</label>
              <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} required aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
              <label htmlFor="email" style={{color:'black'}} className="form-label">Email address</label>
              <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} required aria-describedby="emailHelp" />
              {emailExists && <p style={{color: 'red'}}>Email is already registered.</p>}
              <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" style={{color:'black'}} className="form-label">Password</label>
              <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} required minLength={5} name="password" />
              <small id="descriptionHelp" className="form-text text-muted">
                <p style={{color:'black'}}>Minimum length is 5 characters.</p>
              </small>
            </div>
            <div className="mb-3">
              <label htmlFor="cpassword" style={{color:'black'}} className="form-label">Confirm Password</label>
              <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} onChange={onChange} required minLength={5} name="cpassword" />
              {passwordMismatch && <p style={{color: 'red'}}>Passwords do not match.</p>}
              <small id="descriptionHelp" className="form-text text-muted">
                <p style={{color:'black'}}>Minimum length is 5 characters.</p>
              </small>
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
