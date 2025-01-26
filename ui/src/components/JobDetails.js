import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = `http://${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}/api/jobs/${id}`;

    // Fetch job details from Flask API by job ID
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setJob(data);
        // Pass job name to the Navbar through state
        navigate(`/job/${id}`, { state: { jobName: data.req_name } });
      })
      .catch((error) => console.error('Error fetching job details:', error));
  }, [id, navigate]);

  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{job.req_name}</h2>
      <div style={styles.jobInfo}>
        <p><strong>Location:</strong> {job.location.city}, {job.location.state}</p>
        <p><strong>Status:</strong> <span style={job.status === 'Active' ? styles.active : styles.inactive}>{job.status}</span></p>
        <p><strong>Description:</strong> {job.description}</p>
      </div>

      <h3 style={styles.postingsTitle}>Job Postings</h3>
      <ul style={styles.jobPostings}>
        {job.postings.map((posting, index) => (
          <li key={index} style={styles.jobPostingItem}>
            <strong>{posting.sitename}</strong> - Duration: <span>{posting.duration} days</span>
          </li>
        ))}
      </ul>

      <Link to="/" style={styles.backLink}>Back to Job Listings</Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '20px auto',
    lineHeight: '1.6',
  },
  title: {
    fontSize: '28px',
    marginBottom: '15px',
    color: '#333',
  },
  jobInfo: {
    textAlign: 'left',
    marginBottom: '20px',
  },
  active: {
    color: '#27ae60',
  },
  inactive: {
    color: '#e74c3c',
  },
  postingsTitle: {
    textAlign: 'left',
    fontSize: '22px',
    marginBottom: '10px',
    color: '#333',
  },
  jobPostings: {
    listStyleType: 'none',
    padding: 0,
    marginBottom: '20px',
    textAlign: 'left',
  },
  jobPostingItem: {
    fontSize: '16px',
    marginBottom: '8px',
    color: '#555',
  },
  backLink: {
    color: '#3498db',
    textDecoration: 'underline',
    fontSize: '16px',
    display: 'inline-block',
    marginTop: '20px',
  },
};

export default JobDetails;

