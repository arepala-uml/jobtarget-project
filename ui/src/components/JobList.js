import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const apiUrl = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/jobs`;

    // Fetch all jobs from the Flask API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));
  }, []);

  // Hover effects for job card
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
  };

  return (
    <div style={styles.container}>
      <h2>Job Listings</h2>
      <div style={styles.jobList}>
        {jobs.map((job) => (
          <div
            key={job.id}
            style={styles.jobCard}
            onMouseEnter={handleMouseEnter}  
            onMouseLeave={handleMouseLeave} 
          >
            <Link to={`/job/${job.id}`} style={styles.jobLink}>
              <h3>{job.req_name}</h3>
            </Link>
            <p>{job.location.city}, {job.location.state}</p>
            <p>Status: <span style={job.status === 'Active' ? styles.active : styles.inactive}>{job.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
    padding: '10px',
  },
  jobList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
    gap: '20px',
  },
  jobCard: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '25px', 
    textAlign: 'left',
    border: '1px solid #ddd',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  jobLink: {
    textDecoration: 'none',
    color: '#3498db',
  },
  active: {
    color: '#27ae60',
  },
  inactive: {
    color: '#e74c3c',
  },
};

export default JobList;
