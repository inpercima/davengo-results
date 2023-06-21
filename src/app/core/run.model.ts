export interface Run {

  mode: string;

  fields: RunField[];

  results: RunResult[];
}

export interface RunField {

  textAlignment: string;

  id: string;

  title: string;

  priority: boolean;
}

export interface RunResult {

  /** 2012-2021 */
  teamName: string;

  /** 2022 */
  team: string;

  firstName: string;

  lastName: string;

  nettoTime: string;

  rankMale: string;

  startNo: number;

  combined: string;

  rankTotal: string;

  rankFemale: string;

  firma: string;

  hash: string;
}
