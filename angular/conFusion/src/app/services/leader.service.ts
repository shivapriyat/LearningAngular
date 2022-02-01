import { Injectable } from '@angular/core';
import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  
  constructor() { }
  /*getLeaders(): Promise<Leader[]> {
    return new Promise(resolve =>
      setTimeout(()=> resolve(LEADERS),2000)
    );
  }
  getFeaturedLeader(): Promise<Leader> {
    return new Promise( resolve => {
      setTimeout(()=> {
        resolve(LEADERS.filter(lead => lead.featured)[0]);
      },2000);      
    });
  }
  getLeader(id: string): Promise<Leader> {
    return new Promise(resolve => {
      setTimeout(()=> {resolve(LEADERS.filter(lead => lead.id === id)[0])},5000)
    });
  }*/
  /*getLeaders(): Promise<Leader[]> {
    return of(LEADERS).pipe(delay(2000)).toPromise();
  }
  getFeaturedLeader(): Promise<Leader> {
    return of(LEADERS.filter(lead => lead.featured)[0]).pipe(delay(2000)).toPromise();
  }
  getLeader(id: string): Promise<Leader> {
    return of(LEADERS.filter(lead => lead.id === id)[0]).pipe(delay(2000)).toPromise();
  }*/
  getLeaders(): Observable<Leader[]> {
    return of(LEADERS).pipe(delay(2000));
  }
  getFeaturedLeader(): Observable<Leader> {
    return of(LEADERS.filter(lead => lead.featured)[0]).pipe(delay(2000));
  }
  getLeader(id: string): Observable<Leader> {
    return of(LEADERS.filter(lead => lead.id === id)[0]).pipe(delay(2000));
  }
}
