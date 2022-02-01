import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }
  /*getPromotions(): Promise<Promotion[]> {
    return new Promise( resolve => {
      setTimeout(()=> {resolve(PROMOTIONS)},2000)
    });
  }
  getPromotion(id: string): Promise<Promotion> {
    return new Promise( resolve => {
      setTimeout(()=> {
        resolve(PROMOTIONS.filter(promo => promo.id === id)[0]);
      }, 2000)
    })
  }
  getFeaturedPromotion(): Promise<Promotion> {
    return new Promise(resolve => {
      setTimeout(()=> {resolve(PROMOTIONS.filter(promo => promo.featured)[0]);}, 2000)
    })
  } */
  /*getPromotions(): Promise<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000)).toPromise();
  }
  getPromotion(id: string): Promise<Promotion> {
    return of(PROMOTIONS.filter(promo => promo.id === id)[0]).pipe(delay(2000)).toPromise();
  }
  getFeaturedPromotion(): Promise<Promotion> {
    return of(PROMOTIONS.filter(promo => promo.featured)[0]).pipe(delay(2000)).toPromise();
  }*/
  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
  }
  getPromotion(id: string): Observable<Promotion> {
    return of(PROMOTIONS.filter(promo => promo.id === id)[0]).pipe(delay(2000));
  }
  getFeaturedPromotion(): Observable<Promotion> {
    return of(PROMOTIONS.filter(promo => promo.featured)[0]).pipe(delay(2000));
  }
}
