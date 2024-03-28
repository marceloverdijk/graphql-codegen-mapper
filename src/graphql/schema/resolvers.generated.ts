/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
    import type   { Resolvers } from './types.generated';
    import    { Continent } from './Continent';
import    { Country } from './Country';
import    { continent as Query_continent } from './Query/continent';
import    { continents as Query_continents } from './Query/continents';
import    { countries as Query_countries } from './Query/countries';
import    { country as Query_country } from './Query/country';
import    { CountryCodeResolver } from 'graphql-scalars';
    export const resolvers: Resolvers = {
      Query: { continent: Query_continent,continents: Query_continents,countries: Query_countries,country: Query_country },
      
      
      Continent: Continent,
Country: Country,
CountryCode: CountryCodeResolver
    }