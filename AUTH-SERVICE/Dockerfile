FROM python:3.11-slim

RUN apt-get update && apt-get install -y nmap

WORKDIR /app
COPY . /app

RUN pip3 install -r requirements.txt

CMD ["python3", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "81"]
