import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PharmaModel } from '../assets/PharmaModel';
import * as data from '../assets/json/Country.json';
import * as writeData from '../assets/json/MedicineDetail.json';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pharmacy';
  countries: any = [];
  pharmaForm: FormGroup;
  pharmaFormTemp: any;
  pharmaList: PharmaModel[] = [];
  table: any;
  edit:boolean = false;
  add:boolean = true;
  displayedDataColumns : string[] = ['name','email','dateOfBirth','medicine','country'];
  constructor(private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.countries = (data as any).default;
    this.initialiseForm();
    
  }
  initialiseForm(){
    this.pharmaForm = this.formBuilder.group({
      firstName: [null],
      lastName: [null],
      email: [null],
      dateOfBirth: [null],
      medicine: [null],
      state: ["0"]
    })
  }
  onSubmit() {
    let temp = new PharmaModel();   
    if(this.edit==true){
      this.onDelete(this.pharmaFormTemp);
    } 
    temp=this.pharmaForm.value;
    temp=this.updateCountry(temp);
    temp.age = this.calculateAge(temp.dateOfBirth);
    this.pharmaList.push(temp);
    this.edit=false;    
    this.initialiseForm();
  }

  calculateAge(dateOfBirth:Date){
    const today = new Date();
    if(dateOfBirth==null){
      return 0;
    }
    let dob =new Date(dateOfBirth);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if(m<0 || (m==0 && today.getDate() < dob.getDate())){
      age--;
    }
    return age;
  }

  updateCountry(temp){
    if(temp.state=="0"){
      temp.state = "Not Selected"
    }
    return temp;
  }

  clear(){
    this.add=true;
    this.edit=false;
    this.initialiseForm();
  }

  onEdit(data){
    this.add=false;
    this.edit=true;
    this.pharmaForm.controls['firstName'].setValue(data.firstName);
    this.pharmaForm.controls['lastName'].setValue(data.lastName);
    this.pharmaForm.controls['email'].setValue(data.email);
    this.pharmaForm.controls['dateOfBirth'].setValue(data.dateOfBirth);
    this.pharmaForm.controls['medicine'].setValue(data.medicine);
    this.pharmaForm.controls['state'].setValue(data.state);
    this.pharmaFormTemp = data;
  }

  onDelete(row){
        let i=0;
        this.pharmaList.forEach(element =>
          {
            if(element.firstName == row.firstName && element.lastName==row.lastName && element.dateOfBirth == row.dateOfBirth && element.email==row.email && element.medicine==row.medicine && element.state==row.state){
              this.pharmaList.splice(i,1);
            }
            i=i+1;
          })
  }

}
