import { Component, OnInit } from '@angular/core';
import { HeroesServices } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{
  public hero?:Hero;


  constructor(
    private heroService:HeroesServices,
    //para obtener el id de la ruta
    private activatedRoute: ActivatedRoute,
    private router:Router
    ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id})=>this.heroService.getHeroesById(id))
    ).subscribe(hero=>{
      if(!hero) return this.router.navigate(['/heroes/list'])
      this.hero=hero
      return;
    }
    )
  }

  goBack():void{
    this.router.navigateByUrl('heroes/list')
  }

}
