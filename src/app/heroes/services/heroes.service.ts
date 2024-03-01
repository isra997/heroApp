import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesServices {

    private _baseUrl: string = environments.baseUrl;
    constructor(private http: HttpClient) { }

    getHeroes():Observable<Hero[]>{
        return this.http.get<Hero[]>(`${this._baseUrl}/heroes`);
    }
    
    getHeroesById(id:string):Observable<Hero|undefined>{
        return  this.http.get<Hero>(`${this._baseUrl}/heroes/${id}`)
        .pipe(
            //con of devuelvo un observable y puedo mandar el undefined
            catchError(error=>of(undefined))
        )
    }
}