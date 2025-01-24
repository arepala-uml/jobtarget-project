from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)
with open('jobs.json', 'r') as file:
    jobs_data = json.load(file)

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    return jsonify(jobs_data)

@app.route('/api/jobs/<int:job_id>', methods=['GET'])
def get_job_by_id(job_id):
    job = next((job for job in jobs_data if job['id'] == job_id), None)
    if job:
        return jsonify(job)
    else:
        return jsonify({"error": "Job not found"}), 404

@app.route('/')
def index_page():
    return render_template('index.html', jobs=jobs_data)

@app.route('/job/<int:job_id>')
def job_details(job_id):
    job = next((job for job in jobs_data if job['id'] == job_id), None)
    if job:
        return render_template('details.html', job=job)
    else:
        return "Job not found", 404

if __name__ == '__main__':
    app.run(debug=True)