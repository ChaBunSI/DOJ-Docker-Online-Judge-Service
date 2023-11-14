from pydantic import BaseModel


class MemberBase(BaseModel):
    email: str
    name: str


class MemberCreate(MemberBase):
    password: str


class Member(MemberBase):
    id: int

    class Config:
        orm_mode = True
