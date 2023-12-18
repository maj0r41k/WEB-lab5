"""create_tables

Revision ID: b9724bb9e773
Revises: 
Create Date: 2023-12-14 00:00:34.609369

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b9724bb9e773'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('user_email', sa.String(), nullable=False),
    sa.Column('user_firstname', sa.String(), nullable=False),
    sa.Column('user_lastname', sa.String(), nullable=False),
    sa.Column('user_avatar', sa.String(), nullable=True),
    sa.Column('user_status', sa.String(), nullable=True),
    sa.Column('user_city', sa.String(), nullable=True),
    sa.Column('user_phone', sa.Integer(), nullable=True),
    sa.Column('user_password', sa.String(), nullable=False),
    sa.Column('is_superuser', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('user_id')
    )
    op.create_table('user_links',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('link', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.user_id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_links')
    op.drop_table('users')
    # ### end Alembic commands ###
