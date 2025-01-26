import React from 'react';
import { useLocation } from 'react-router-dom';

function Navbar() {
  // Get the current location from the router
  const location = useLocation();  
  // Get job name from state or default to "Careers"
  const jobName = location.state?.jobName || "Careers";  

  return (
    <nav style={styles.navbar}>
      <h2 style={styles.title}>{`JobTarget - ${jobName}`}</h2>  {/* Dynamically display job name */}
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '15px',
    textAlign: 'center',
  },
  title: {
    margin: 0,
    fontSize: '24px',
  }
};

export default Navbar;
