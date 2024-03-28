// Exported mappers form Drizzle don't work...

// export type { Continent as ContinentMapper } from '@/model/schema';
export type { Country as CountryMapper } from '../drizzle/schema';

// Manual mappers do work though...

export interface ContinentMapper {
  id: string;
  code: string;
};
