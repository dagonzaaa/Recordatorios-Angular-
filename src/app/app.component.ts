import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  tareasCompletadas= [];
  tareasNoCompletadas= [];
  tareas= new Array;
  descripcion='';
  anadiendo= false;
  contador=0;
  contadorCompletadas=0;

  
  agregar(){
    console.log("Añadido")
    let tareal={
      descripcion: this.descripcion,
      fecha: new Date(),
      prioridad: 0,
      completada: false,
      tiempo: 0,
    };
    this.tareas.push(tareal); 
    console.log(this.tareas)
    this.descripcion='';
    this.anade()
   };

  anade(){//abre el form para añadir nuevas tareas
    this.anadiendo = !this.anadiendo;
    console.log("Añadiendo")
  };

  DoLocalStorage(){
    localStorage.setItem('Tareas', JSON.stringify(this.tareas));
    localStorage.setItem('Contador', JSON.stringify(this.contador))
    localStorage.setItem('ContadorCompletadas', JSON.stringify(this.contadorCompletadas))
  };

  comparar(a:any, b:any) {
    return (b.prioridad-a.prioridad)
  };

  ordenar(){
    this.tareas.sort(this.comparar);
  };

  eliminar(indice:number){
    this.tareas.splice(indice,1);
    this.ordenar();
    this.DoLocalStorage();
    
  };
  limpiar(){
    this.tareas = [];
    this.contador = 0;
    this.contadorCompletadas = 0;

    this.ordenar();
    this.DoLocalStorage();
      
  };

  completada(tarea:any){
    return !tarea.completada
  };

  eliminarCompletadas(){
    this.tareas = this.tareas.filter(this.completada)

    this.ordenar();
    this.DoLocalStorage();
  };

  prioAlta(indice:number){
    this.tareas[indice].prioridad = 2;

    this.ordenar();
    this.DoLocalStorage();
  };

  prioBaja(indice:number){
    this.tareas[indice].prioridad = 0;

    this.ordenar();
    this.DoLocalStorage();
  };

  prioMedia(indice:number){
    this.tareas[indice].prioridad = 1;

    this.ordenar();
    this.DoLocalStorage();
  };

  completar(indice:number){
    this.tareas[indice].completada =  !this.tareas[indice].completada;
    this.contadorCompletadas++
    console.log('completada');
    this.DoLocalStorage();
  };

   ngOnInit(): void {
    if(localStorage.getItem('Tareas')){
      this.tareas = JSON.parse(localStorage['Tareas'])
      this.ordenar();
    }
    if(localStorage.getItem('Contador')){
      this.contador = JSON.parse(localStorage['Contador'])
    }
    if(localStorage.getItem('ContadorCompletadas')){
      this.contadorCompletadas = JSON.parse(localStorage['ContadorCompletadas'])//lo pongo asi porque quier que se guarde una especie de historial de todas las que se han completado, no solo las actuales
    }
  }
}