python -m uvicorn main:app --reload

docker build . -t auth
docker run -d --name auth_con -p 81:81 auth
