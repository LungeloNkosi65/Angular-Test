import { Component, OnInit } from '@angular/core';
import{Employee} from '../../Models/employee';
import {EmployeeService} from '../../services/employee.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees:Employee[];
  employee:Employee;
  employeeForm:any;
  employeeId:number=null;
  constructor(private employeeService:EmployeeService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getAllEmployees();
  }


  getAllEmployees(){
    this.employeeService.getEmployees().subscribe((data:any)=>{
      this.employees=data;
      console.log(this.employees);
    });
  }

  getSingleEmployee(employeeId:number){
    this.employeeService.getSingleEmployee(employeeId).subscribe((data:any)=>{
      this.employee=data;
    });
  }

  addEmployee(employee:Employee){
    if (this.employeeId = null) {
        this.employeeService.addEmployee(employee).subscribe((data:any)=>{
          this.getAllEmployees();
        });
    }
    else {

    }
  }

  initializeForm(){
    this.employeeForm=this.formBuilder.group({
      name:['',Validators.required],
      department:['',Validators.required],
      age:['',Validators.required],
      city:['',Validators.nullValidator],
      country:['',Validators.required],
      gender:['',Validators.required]
    });
  }

}
