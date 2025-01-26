import logging
import os
from flask import Flask, jsonify, request
import json
from flask_cors import CORS
from dotenv import load_dotenv

# Load environment variables from .env file and get port value
load_dotenv()
port = int(os.getenv("FLASK_APP_PORT", 5000))

# Set up logging configuration
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Initialize Flask app and enable CORS for API
app = Flask(__name__)
CORS(app)

# fetch the data from jobs.json 
base_path = os.path.dirname(os.path.abspath(__file__))
jobs_file_path = os.path.join(base_path, 'jobs.json')
try:
    with open(jobs_file_path, 'r') as file:
        jobs_data = json.load(file)
    logger.info(f"Successfully loaded jobs data from {jobs_file_path}")
except FileNotFoundError:
    logger.error(f"Error: The file {jobs_file_path} was not found.")
    jobs_data = []
except json.JSONDecodeError:
    logger.error(f"Error: Failed to decode JSON data from {jobs_file_path}.")
    jobs_data = []
except Exception as e:
    logger.error(f"Unexpected error occurred while loading jobs data: {str(e)}")
    jobs_data = []

# default route
@app.route('/', methods=['GET'])
def get_root():
    return {}

# Get all jobs 
@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    try:
        logger.info(f"Received request: {request.method} {request.url}")
        # Log the response data
        logger.debug(f"Response Data: {jobs_data}")
        response = jsonify(jobs_data)
        logger.info(f"Sent response: {response.status_code}")
        return response
    except Exception as e:
        logger.error(f"Error handling /api/jobs request: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

# Get jobs by job_id
@app.route('/api/jobs/<int:job_id>', methods=['GET'])
def get_job_by_id(job_id):
    logger.info(f"Received request: {request.method} {request.url}")
    job = next((job for job in jobs_data if job['id'] == job_id), None)
    try:
        if job:
            logger.debug(f"Response Data (Job ID {job_id}): {job}")
            response = jsonify(job)
            logger.info(f"Sent response: {response.status_code}")
            return response
        else:
            error_message = {"error": "Job not found"}
            logger.error(f"Error (Job ID {job_id}): {error_message}")
            response = jsonify(error_message)
            response.status_code = 404
            return response
    except Exception as e:
        logger.error(f"Error handling /api/jobs/{job_id} request: {str(e)}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    try:
        app.run(host='0.0.0.0', port=port)
        logger.info(f"Flask app running on http://0.0.0.0:{port}")
    except Exception as e:
        logger.error(f"Error starting Flask app: {str(e)}")
