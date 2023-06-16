export interface Ranking {

  teamName: string;

  firstName: string;

  lastName: string;

  company: string;

  rank: string;

  startNumber: number;
}

export interface YearRanking {

  results: Ranking[];

  year: string;
}
