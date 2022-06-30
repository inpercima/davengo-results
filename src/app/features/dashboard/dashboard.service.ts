import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getX(): Observable<any> {
    return this.http.post<any>('https://www.davengo.com/event/result/schnellestellede-firmenlauf-2022/search/list', {
      category:	"Einzelwertung",
      offset:	0,
      query: {
        team:	"e2m",
      },
      type:	"extended"
    });
  }
}
