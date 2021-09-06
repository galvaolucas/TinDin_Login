import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ClassesModel } from './classes-dashboard.model';
@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})

export class ClassesComponent implements OnInit {

  formValue !: FormGroup;
  classesModelObj : ClassesModel = new ClassesModel();
  classesData !: any;
  showAdd !: boolean;
  showEditar !: boolean;
  
  constructor(private formBuilber: FormBuilder,
    private api : ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilber.group({
      Disciplina: [''],
      Titulo : [''],
      Professor: [''],
      Descricao : [''],
      Data : ['']
  
    })
    this.getAllClasses();
  }

  clickAddClasses(){
    this.formValue.reset();
    this.showAdd = true;
    this.showEditar = false;
  }

  postClassesDetails(){
    this.classesModelObj.Disciplina = this.formValue.value.Disciplina;
    this.classesModelObj.Titulo = this.formValue.value.Titulo;
    this.classesModelObj.Descricao = this.formValue.value.Descricao;
    this.classesModelObj.Professor = this.formValue.value.Professor;
    this.classesModelObj.Data = this.formValue.value.Data;

    this.api.postClasses(this.classesModelObj)
.subscribe(res=>{
      console.log(res);
      alert('Aula Salva Com Sucesso!')
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllClasses();
    },
    err=>{
      alert('Alguns Dados Estão Faltando')
    })
}
  getAllClasses(){
    this.api.getClasses().subscribe(res=>{
        this.classesData = res;
      })
  }

  deleteClasses(row : any){
    this.api.deleteClasses(row.id)
    .subscribe(res=>{
      alert('Aula Deletada!')
      this.getAllClasses();
    })
}
  onEdit(row : any){

    this.showAdd = false;
    this.showEditar = true;

    this.classesModelObj.id = row.id;
    this.formValue.controls['Disciplina'].setValue(row.Disciplina);
    this.formValue.controls['Titulo'].setValue(row.Titulo);
    this.formValue.controls['Descricao'].setValue(row.Descricao);
    this.formValue.controls['Professor'].setValue(row.Professor);
    this.formValue.controls['Data'].setValue(row.Data);

  }

  updateClassesDetails(){
    this.classesModelObj.Disciplina = this.formValue.value.Disciplina;
    this.classesModelObj.Titulo = this.formValue.value.Titulo;
    this.classesModelObj.Descricao = this.formValue.value.Descricao;
    this.classesModelObj.Professor = this.formValue.value.Professor;
    this.classesModelObj.Data = this.formValue.value.Data;

    this.api.updateClasses(this.classesModelObj,this.classesModelObj.id)
    .subscribe(res=>{
      alert("Aula Alterada com Sucesso!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllClasses();
    })
}

}
