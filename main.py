from datetime import datetime, timedelta

from typing import Union
from fastapi import Depends, FastAPI, Request, Response
from passlib.context import CryptContext
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from crud import create_member, get_member_by_email, get_member_by_email_and_name

from db import Base, SessionLocal, engine
from schemas import Member, MemberCreate

Base.metadata.create_all(bind=engine)


def get_db():
    db_session = SessionLocal()
    try:
        yield db_session
    finally:
        db_session.close()


SECRET_KEY = "qAweWTHughLYrWwAfz4SdvqAweWTHughLYrWwAfz4SdvUaIAeY3RsHUaIAeY3RsH"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

app = FastAPI()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=60 * 24 * 7)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.post("/login")
async def read_root(request: Request, db: Session = Depends(get_db)):
    request_json = await request.json()
    email = request_json.get("email")
    password = request_json.get("password")

    if not email or not password:
        return Response(status_code=400, content="Email or password is empty")

    db_member = get_member_by_email(db, email=email)
    if not db_member:
        return Response(status_code=400, content="Email not registered")

    if not verify_password(password, db_member.password):
        return Response(status_code=400, content="Invalid password")

    accessToken = create_access_token(
        data={"userId": db_member.id, "userName": db_member.name})

    return {"accessToken": accessToken}


@app.post("/join")
async def post_create_member(user: MemberCreate, db: Session = Depends(get_db)):
    db_member = get_member_by_email_and_name(
        db, email=user.email, name=user.name)
    if db_member:
        return Response(status_code=400, content="Email or Name already registered")

    member = create_member(db=db, member=user)

    if not member:
        return Response(status_code=400, content="Failed to create member")

    else:
        return Response(status_code=200, content="Member created successfully")
