from datetime import datetime
from typing import Optional, List
from sqlalchemy import Column, Integer, String, Boolean, MetaData, DateTime
from sqlalchemy.ext.declarative import declarative_base
from pydantic import BaseModel, Field


Base = declarative_base()
metadata = MetaData()


class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer(), primary_key=True, nullable=False)
    user_email = Column(String, nullable=False)
    user_firstname = Column(String, nullable=False)
    user_lastname = Column(String, nullable=False)
    user_city = Column(String, nullable=True)
    user_department = Column(String, nullable=True)
    user_phone = Column(Integer, nullable=True)
    user_password = Column(String, nullable=False)
    user_birthdate = Column(DateTime, nullable=True)
    isSuperUser = Column(Boolean, nullable=True)


class UserResponseModel(BaseModel):
    user_id: int
    user_email: str
    user_firstname: str
    user_lastname: str
    user_city: Optional[str] = None
    user_department: Optional[str] = None
    user_phone: Optional[int] = None
    user_birthdate: Optional[datetime]
    isSuperUser: Optional[bool] = False


class UserBase(BaseModel):
    user_id: int
    user_email: str
    user_firstname: str
    user_lastname: str


class UserCreate(UserBase):
    user_email: str
    user_firstname: str
    user_lastname: str
    user_password: str


class UserUpdate(UserBase):
    user_avatar: str
    user_status: str
    user_city: str
    user_phone: int


class UserSignUpRequest(BaseModel):
    user_email: str
    user_firstname: str
    user_lastname: str
    user_city: Optional[str] = None
    user_department: Optional[str] = None
    user_phone: Optional[int] = None
    user_birthdate: Optional[str] = None
    user_password: str
    isSuperUser: Optional[bool] = False


class UserId(BaseModel):
    user_id: int


class UserSignInResponse(BaseModel):
    access_token: str
    token_type: str


class FullUserResponse(BaseModel):
    status_code: int
    detail: str
    result: UserResponseModel


class GetAllUsers(BaseModel):
    user_list: list[UserBase]
    total_users: int


class Pagination(BaseModel):
    current_page: int
    total_page: int
    total_results: int


class UserList(BaseModel):
    users: List[UserBase]


class FullUserListResponse(BaseModel):
    status_code: int
    detail: str
    result: UserList
    pagination: Pagination


class DeleteUserResponse(BaseModel):
    status_code: int
    detail: str
    result: UserId
