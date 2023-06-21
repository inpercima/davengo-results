export interface Ranking {

  teamName: string;

  firstName: string;

  lastName: string;

  company: string;

  rank: string;

  startNumber: number;

  year: string;

  nettoTime: string;
}

export interface YearRanking {

  rankings: Ranking[];

  year: string;
}
