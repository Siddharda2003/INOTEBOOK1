import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar = (props) => {
  let location = useLocation();
  let navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    props.showAlert("Logout successful", "success");
    navigate('/login');
  };

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNoteBook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">AboutUs</Link>
              </li>
            </ul>
            <div className="d-flex align-items-center">
              {!localStorage.getItem('token') ?
                <form className="d-flex">
                  <Link className="btn btn-primary mx-2" to='/login' role="button">Login</Link>
                  <Link className="btn btn-primary mx-2" to='/signup' role="button">SignUp</Link>
                </form> :
                <button className="btn btn-primary mx-2" onClick={handleLogOut}>Logout</button>}
              <div className={`form-check form-switch text-${(props.mode === 'light') ? 'dark' : 'light'} mx-2`}>
                <input 
                  className="form-check-input" 
                  type="checkbox" 
                  onClick={props.toggleMode} 
                  role="switch" 
                  id="flexSwitchCheckDefault" 
                  style={{ width: '3rem', height: '1.5rem' }} // Adjust width and height for switch
                />
                <label 
                  className="form-check-label" 
                  htmlFor="flexSwitchCheckDefault"
                  style={{ marginLeft: '0.5rem'}} // Space between switch and label
                >
                  {props.mode === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}
                </label>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
