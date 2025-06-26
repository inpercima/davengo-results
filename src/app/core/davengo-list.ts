import type { DavengoField } from './davengo-field';
import type { DavengoResult } from './davengo-result';

export interface DavengoList {
  mode: string;
  fields: DavengoField[];
  results: DavengoResult[];
}
