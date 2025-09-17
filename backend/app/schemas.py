from pydantic import BaseModel, EmailStr
from typing import Optional

# Base schema (shared attributes)
class EmployeeBase(BaseModel):
    name: str
    email: EmailStr
    role: str
    department: Optional[str] = None

# For creating an employee (no ID yet)
class EmployeeCreate(EmployeeBase):
    pass

# For updating (all optional, so you can update only one field)
class EmployeeUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    department: Optional[str] = None

# Response schema (includes ID)
class Employee(EmployeeBase):
    id: int

    class Config:
        orm_mode = True  # ✅ Important so SQLAlchemy models can be returned directly
