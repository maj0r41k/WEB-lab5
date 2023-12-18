from datetime import datetime

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.models_user import User, UserResponseModel, UserBase, UserSignUpRequest, \
    GetAllUsers, UserUpdate
from app.utils.utils import get_password_hash


class UserService:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def get_all_users(self, page: int = 1, page_size: int = 10) -> GetAllUsers:
        query = select(User)
        offset = (page - 1) * page_size
        query = query.offset(offset).limit(page_size)

        result = await self.session.execute(query)
        users = result.scalars().all()

        total_users = await self.session.scalar(select(func.count()).select_from(User))
        user_base_models = [
            UserBase(
                user_id=user.user_id,
                user_email=user.user_email,
                user_firstname=user.user_firstname,
                user_lastname=user.user_lastname,
            ) for user in users
        ]
        return GetAllUsers(
            user_list=user_base_models,
            total_users=total_users
        )

    async def get_user_by_id(self, user_id: int) -> User:
        user = await self.session.scalar(
            select(User).where(User.user_id == user_id)
        )
        return user

    async def create_user(self, user_data: UserSignUpRequest) -> UserResponseModel:
        hashed_password = await get_password_hash(password=user_data.user_password)
        user_birthdate = None
        if user_data.user_birthdate:
            user_birthdate = datetime.strptime(user_data.user_birthdate, "%d.%m.%Y")
        user = User(
            user_email=user_data.user_email,
            user_firstname=user_data.user_firstname,
            user_lastname=user_data.user_lastname,
            user_password=hashed_password,
            user_city=user_data.user_city,
            user_department=user_data.user_department,
            user_phone=user_data.user_phone,
            user_birthdate=user_birthdate,
            isSuperUser=user_data.isSuperUser
        )

        self.session.add(user)
        await self.session.flush()
        await self.session.commit()

        return UserResponseModel(
            user_id=user.user_id,
            user_email=user.user_email,
            user_firstname=user.user_firstname,
            user_lastname=user.user_lastname,
            user_password=user.user_password,
            user_city=user.user_city,
            user_department=user.user_department,
            user_phone=user.user_phone,
            user_birthdate=str(user.user_birthdate),
            isSuperUser=user.isSuperUser
        )

    async def delete_user(self, user_id: int) -> int:
        user = await self.get_user_by_id(user_id=user_id)
        if user:
            await self.session.delete(user)
            await self.session.flush()
            await self.session.commit()
        return user.user_id


