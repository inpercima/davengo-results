import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, toArray } from 'rxjs';
import { Ranking, YearRanking } from './ranking.model';

@Injectable({
  providedIn: 'root',
})
export class DavengoService {
  private urls = [
    'https://www.davengo.com/event/result/6-commerzbank-firmenlauf-2013/',
    'https://www.davengo.com/event/result/7-commerzbank-firmenlauf-2014/',
    'https://www.davengo.com/event/result/commerzbank-firmenlauf-2015/',
    'https://www.davengo.com/event/result/commerzbank-firmenlauf-2016/',
    'https://www.davengo.com/event/result/commerzbank-firmenlauf-2017/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2018/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2019/',
    /** no listing for 2020 */
    //'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2020/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2021/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2022/',
  ];

  constructor(private http: HttpClient) {}

  getRuns(): Observable<YearRanking[]> {
    return forkJoin(this.urls.map((url) => this.fetch(url)));
  }

  private fetch(url: string): Observable<YearRanking> {
    return this.http
      .post<any>(`${url}search/list`, {
        category: 'Einzelwertung',
        offset: 0,
        query: {
          lastName: '',
          firstName: 'Marcel',
        },
        type: 'extended',
      })
      .pipe(
        mergeMap((response) => response.results),
        map((result: any) => {
          return {
            teamName: result.teamName,
            firstName: result.firstName,
            lastName: result.lastName,
            company: result.firma,
            rank: result.rankTotal,
            startNumber: result.startNo,
          } as Ranking;
        }),
        toArray(),
        map((results) => {
          return {
            year: url.slice(url.length - 5, url.length - 1),
            results: results,
          } as YearRanking;
        })
      );
  }
}
