import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { Dish } from '../shared/dish';
import { Observable,of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient) { }

  /*getDishes() : Promise<Dish[]> {
    return new Promise( resolve => 
      setTimeout(() => resolve(DISHES), 2000)
      );
  }
  getDish(id: string): Promise<Dish> {
    return new Promise(resolve => 
      setTimeout(() => resolve(DISHES.filter(dish => dish.id === id)[0]),2000));
  }
  getFeaturedDish() : Promise<Dish> {
    return new Promise( resolve => {
      setTimeout(()=> resolve(DISHES.filter(dish => dish.featured)[0]),2000);
    })
    
  }*/
  /*getDishes(): Promise<Dish[]> {
    return of(DISHES).pipe(delay(2000)).toPromise();
  }

  getDish(id: string): Promise<Dish> {
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
  }

  getFeaturedDish(): Promise<Dish> {
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
  }*/
  getDishes(): Observable<Dish[]> {
    //return of(DISHES).pipe(delay(2000));
    return this.http.get<Dish[]>(baseURL+'dishes');
  }

  getDish(id: string): Observable<Dish> {
    //return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    return this.http.get<Dish>(baseURL+'dishes/'+id)
  }
  getDishIds(): Observable<string[] | any> {
    //return of(DISHES.map(dish => dish.id ));
    return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
  }

  getFeaturedDish(): Observable<Dish> {
    //return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
    return this.http.get<Dish>(baseURL+'dishes?featured=true').pipe(map(dishes => dishes[0]));
  }
}
