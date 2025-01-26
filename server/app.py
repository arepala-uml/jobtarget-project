import logging
import os
from flask import Flask, jsonify, request
import json
from flask_cors import CORS
from dotenv import load_dotenv


logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)
port = int(os.getenv("FLASK_APP_PORT", 5000))

base_path = os.path.dirname(os.path.abspath(__file__))
jobs_file_path = os.path.join(base_path, 'jobs.json')
with open(jobs_file_path, 'r') as file:
    jobs_data = json.load(file)

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    logger.info(f"Received request: {request.method} {request.url}")
    
    # Log the response data
    logger.debug(f"Response Data: {jobs_data}")
    
    response = jsonify(jobs_data)
    logger.info(f"Sent response: {response.status_code}")
    
    return response

@app.route('/api/jobs/<int:job_id>', methods=['GET'])
def get_job_by_id(job_id):
    logger.info(f"Received request: {request.method} {request.url}")
    
    job = next((job for job in jobs_data if job['id'] == job_id), None)
    
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

if __name__ == '__main__':
    #app.run(debug=False)
    app.run(host='0.0.0.0', port=port)
