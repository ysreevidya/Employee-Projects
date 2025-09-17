# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from . import schemas, crud, database

# router = APIRouter()

# # Dependency: get DB session
# def get_db():
#     db = database.SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # CREATE employee
# @router.post("/employees", response_model=schemas.Employee)
# def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
#     return crud.create_employee(db=db, employee=employee)

# # GET all employees
# @router.get("/employees", response_model=list[schemas.Employee])
# def read_employees(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
#     return crud.get_employees(db, skip=skip, limit=limit)

# # GET one employee
# @router.get("/employees/{employee_id}", response_model=schemas.Employee)
# def read_employee(employee_id: int, db: Session = Depends(get_db)):
#     db_employee = crud.get_employee(db, employee_id=employee_id)
#     if db_employee is None:
#         raise HTTPException(status_code=404, detail="Employee not found")
#     return db_employee

# # UPDATE employee
# @router.put("/employees/{employee_id}", response_model=schemas.Employee)
# def update_employee(employee_id: int, employee: schemas.EmployeeUpdate, db: Session = Depends(get_db)):
#     db_employee = crud.update_employee(db, employee_id=employee_id, employee=employee)
#     if db_employee is None:
#         raise HTTPException(status_code=404, detail="Employee not found")
#     return db_employee

# # DELETE employee
# @router.delete("/employees/{employee_id}", response_model=schemas.Employee)
# def delete_employee(employee_id: int, db: Session = Depends(get_db)):
#     db_employee = crud.delete_employee(db, employee_id=employee_id)
#     if db_employee is None:
#         raise HTTPException(status_code=404, detail="Employee not found")
#     return db_employee

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import crud, schemas, database

router = APIRouter()

# Dependency to get DB session
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/employees", response_model=schemas.Employee)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    return crud.create_employee(db, employee)

@router.get("/employees", response_model=list[schemas.Employee])
def read_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)

@router.get("/employees/{employee_id}", response_model=schemas.Employee)
def read_employee(employee_id: int, db: Session = Depends(get_db)):
    db_employee = crud.get_employee(db, employee_id)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee

@router.put("/employees/{employee_id}", response_model=schemas.Employee)
def update_employee(employee_id: int, employee: schemas.EmployeeUpdate, db: Session = Depends(get_db)):
    db_employee = crud.update_employee(db, employee_id, employee)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee

@router.delete("/employees/{employee_id}", response_model=schemas.Employee)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    db_employee = crud.delete_employee(db, employee_id)
    if db_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return db_employee
