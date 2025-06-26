import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, mergeMap, Observable, of, toArray } from 'rxjs';
import { AppResult } from './app-result';
import { AppRow } from './app-row';
import { DavengoList } from './davengo-list';
import { DavengoResult } from './davengo-result';

@Injectable({
  providedIn: 'root',
})
export class DavengoService {
  private http = inject(HttpClient);

  private urls = [
    'https://www.davengo.com/event/result/4-commerzbank-firmenlauf-leipzig-2011/',
    'https://www.davengo.com/event/result/5-commerzbank-firmenlauf-2012/',
    'https://www.davengo.com/event/result/6-commerzbank-firmenlauf-2013/',
    'https://www.davengo.com/event/result/7-commerzbank-firmenlauf-2014/',
    'https://www.davengo.com/event/result/commerzbank-firmenlauf-2015/',
    'https://www.davengo.com/event/result/commerzbank-firmenlauf-2016/',
    'https://www.davengo.com/event/result/commerzbank-firmenlauf-2017/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2018/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2019/',
    /** no listing for 2020 b/c corona */
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2020/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2021/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2022/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2023/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2024/',
    'https://www.davengo.com/event/result/schnellestellede-firmenlauf-2025/',
  ];

  getRuns(firstName: string, lastName: string): Observable<AppRow[]> {
    return forkJoin(this.urls.map((url) => this.fetch(url, firstName, lastName)));
  }

  private fetch(url: string, firstName: string, lastName: string): Observable<AppRow> {
    return this.http
      .post<DavengoList>(`${url}search/list`, {
        category: 'Einzelwertung',
        offset: 0,
        query: {
          firstName: firstName,
          lastName: lastName,
        },
        type: 'extended',
      })
      .pipe(
        catchError(() => of(undefined)),
        mergeMap((response) => (response ? response.results : new Array<DavengoResult>())),
        map((runResult: DavengoResult) => {
          return {
            teamName: runResult.teamName ?? runResult.team,
            firstName: runResult.firstName,
            lastName: runResult.lastName,
            company: runResult.firma,
            rank: runResult.rankTotal,
            startNumber: runResult.startNo,
            nettoTime: runResult.nettoTime,
            year: url.slice(url.length - 5, url.length - 1),
          } as AppResult;
        }),
        toArray(),
        map((rankings) => {
          return {
            year: url.slice(url.length - 5, url.length - 1),
            rankings,
          } as AppRow;
        })
      );
  }
}
