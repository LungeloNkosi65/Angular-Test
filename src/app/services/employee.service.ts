import { Injectable } from '@angular/core';
import {Employee} from '../Models/employee';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ErrorhandlerService } from './errorhandler.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  rootUrl=environment.rootUrl;
  rootParam='hooks';
  paramId="/"

  constructor(private http:HttpClient,private errorHandlerService:ErrorhandlerService) { }

getEmployees():Observable<Employee[]>{
  return this .http.get<Employee[]>(`${this.rootUrl}${this.rootParam}`)
  .pipe(catchError(this.errorHandlerService.handleError));
}

getSingleEmployee(employeeId:number):Observable<Employee>{
  return this.http.get<Employee>(`${this.rootUrl}${this.rootParam}${this.paramId}${employeeId}`);
}

addEmployee(employee:Employee){
  return this.http.post(`${this.rootUrl}${this.rootParam}`,employee)
  .pipe(catchError(this.errorHandlerService.handleCrudError));
}

updateEmployee(employee:Employee){
  return this.http.put(`${this.rootUrl}${this.rootParam}`,employee)
  .pipe(catchError(this.errorHandlerService.handleCrudError));
}

deleteEmployee(employeeId:number){
  return this.http.delete(`${this.rootUrl}${this.rootParam}${this.paramId}${employeeId}`);
}
}
