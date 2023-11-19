from sqlalchemy.orm import Session

from schemas import MemberCreate
from models import Member
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password):
    return pwd_context.hash(password)


def get_member_without_pw(db: Session, member_id: int):
    member = db.query(Member).filter(Member.id == member_id).first()

    if not member:
        return None
    else:
        delattr(member, 'password')
        return member


def get_member_by_email(db: Session, email: str):
    return db.query(Member).filter(Member.email == email).first()


def get_member_by_email_and_name(db: Session, email: str, name: str):
    return db.query(Member).filter(Member.email == email).filter(Member.name == name).first()


def get_members(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Member).offset(skip).limit(limit).all()


def create_member(db: Session, member: MemberCreate):
    hashed_password = get_password_hash(member.password)
    db_member = Member(
        email=member.email, name=member.name, password=hashed_password)
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member
