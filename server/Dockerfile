FROM python:3.9-alpine

WORKDIR /app

COPY server/requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY server/ /app/

# Use Gunicorn to run the Flask app with 4 workers
ENTRYPOINT ["gunicorn"]

CMD ["-w", "4", "app:app", "--bind", "0.0.0.0:8000"]
