import React from 'react';

const About = (props) => {
  let myStyle = {
    color: props.mode === 'dark' ? 'white' : '#042743',
    backgroundColor: props.mode === 'dark' ? 'rgb(36 74 104)' : 'white'
  };

  return (
    <div className="container my-3" style={myStyle}>
      <h2 className='my-2'>About INoteBook</h2>
      <div className="accordion" id="accordionExample" style={myStyle}>
        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header" style={myStyle}>
            <button style={myStyle} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              <strong>Secure Note Management</strong>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body">
            At iNotebook, we prioritize the security of your data. Our platform offers a secure environment for managing your notes, employing user authentication and token-based access to keep your information safe. You have complete control over your notes with features that allow you to create, read, update, and delete them as needed. Your privacy and security are our top priorities
            </div>
          </div>
        </div>
        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header">
            <button style={myStyle} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <strong>User-Friendly Interface</strong>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
            We understand the importance of a simple and intuitive user interface. iNotebook is designed to make note-taking effortless and efficient. Our clean and organized layout helps you focus on what matters most – your content. Whether you're jotting down quick ideas or organizing detailed notes, iNotebook provides a seamless and enjoyable experience.
            </div>
          </div>
        </div>
        <div className="accordion-item" style={myStyle}>
          <h2 className="accordion-header">
            <button style={myStyle} className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <strong>Real-Time Sync and Alerts</strong>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body">
            Stay organized and on top of your tasks with iNotebook's real-time synchronization and customizable alerts. Our application ensures that your notes are updated across all your devices in real time, so you always have access to the latest information. Additionally, you can set alerts to remind you of important tasks or updates, ensuring you never miss a beat.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;
