import { Injectable } from '@angular/core';
import { resolve } from 'url';
import { Feedback } from '../shared/feedback';
import { Observable,of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';
import { ProcessHttpmsgService } from './process-httpmsg.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient, private processHTTPMsgService: ProcessHttpmsgService) { }
  postFeedback(feedback: Feedback): Observable<Feedback> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Feedback>(baseURL + 'feedback', JSON.stringify(feedback), httpOptions)
      .pipe(catchError(this.processHTTPMsgService.handleError));

  }
}
