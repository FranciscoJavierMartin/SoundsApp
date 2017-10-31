import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ANIMALES} from '../../data/data.animales';
import {Animal} from '../../interfaces/animal-interface';

import {Refresher,reorderArray} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales:Animal[]=[];
  audio=new Audio();
  audioTiempo:any;
  ordenando:boolean=false;

  constructor(public navCtrl: NavController) {
    this.animales=ANIMALES.slice(0);
  }

  public reproducir(animal:Animal){

    this.pausarAudio(animal);

    if(animal.reproduciendo){
      animal.reproduciendo=false;
    }else{
      this.audio.src=animal.audio;

      this.audio.load();
      this.audio.play();

      animal.reproduciendo=true;

      this.audioTiempo=setTimeout(()=>{
        animal.reproduciendo=false;
      },animal.duracion*1000);
    }

  }

  private pausarAudio(animalSeleccionado:Animal){
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime=0;

    for(let animal of this.animales){
      if(animal.nombre!=animalSeleccionado.nombre){
        animal.reproduciendo=false;
      }
    }
  }

  public borrar_animal(index:number){
    this.animales.splice(index,1);
  }

  recargar_animales(refresher:Refresher){
    setTimeout(()=>{
      this.animales=ANIMALES.slice(0);
      refresher.complete();
    },1500);
  }

  reordenar_animales(indices:any){
    this.animales=reorderArray(this.animales,indices);
  }

}
