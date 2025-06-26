import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, forkJoin, map, of, type Observable } from 'rxjs';
import type { AppResult } from './app-result';
import type { DavengoList } from './davengo-list';
import type { DavengoResult } from './davengo-result';

@Injectable({
  providedIn: 'root',
})
export class DavengoService {
  private http = inject(HttpClient);

  #urls = [
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

  private fetch(url: string, firstName: string, lastName: string, differentLastName: string): Observable<DavengoResult> {
    const makeRequest = (lastName: string) => {
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
        .pipe(catchError(() => of(undefined)));
    };

    const fetchBothNames = () => {
      return forkJoin([makeRequest(lastName), makeRequest(differentLastName)]).pipe(
        map(([resA, resB]) => {
          if (resA?.results.length) {
            return resA.results[0];
          } else if (resB?.results.length) {
            return resB.results[0];
          } else {
            return {} as DavengoResult;
          }
        })
      );
    };

    return differentLastName
      ? fetchBothNames()
      : makeRequest(lastName).pipe(map((response) => (response?.results.length ? response.results[0] : ({} as DavengoResult))));
  }

  fetchAll(firstName: string, lastName: string, differentLastName: string): Observable<AppResult[]> {
    return forkJoin(
      this.#urls.map((url) =>
        this.fetch(url, firstName, lastName, differentLastName).pipe(
          map((davengoResult: DavengoResult) => {
            return {
              teamName: davengoResult.teamName ?? davengoResult.team,
              firstName: davengoResult.firstName,
              lastName: davengoResult.lastName,
              company: davengoResult.firma,
              rank: davengoResult.rankTotal,
              startNumber: davengoResult.startNo,
              nettoTime: davengoResult.nettoTime,
              year: url.slice(url.length - 5, url.length - 1),
            } as AppResult;
          })
        )
      )
    ).pipe(map((appResults) => appResults.filter((appResult) => appResult.teamName !== undefined)));
  }
}
