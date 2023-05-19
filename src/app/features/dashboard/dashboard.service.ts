import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private urls = [
    'https://www.davengo.com/event/result/6-commerzbank-firmenlauf-2013/',
    'https://www.davengo.com/event/result/7-commerzbank-firmenlauf-2014/',
    'https://www.davengo.com/event/result/commerzbank-firmenlauf-2015/',
    'https://www.davengo.com/event/result/commerzbank-firmenlauf-2016/',
    'https://www.davengo.com/event/result/commerzbank-firmenlauf-2017/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2018/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2019/',
    // 2020 no listing
    //'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2020/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2021/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2022/',
  ];

  constructor(private http: HttpClient) {}

  getX(): Observable<any> {
    return forkJoin(this.urls.map((url) => this.fetch(url))).pipe(map((response) => response));
  }

  private fetch(url: string): Observable<any> {
    return this.http.post<any>(`${url}search/list`, {
      category: 'Einzelwertung',
      offset: 0,
      query: {
        lastName: '',
      },
      type: 'extended',
    });
  }
}
