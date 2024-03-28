import type   { CountryResolvers } from './types.generated';
    export const Country: CountryResolvers = {
    /* Implement Country resolver logic here */
        code: () => { /* Country.code resolver is required because Country.code exists but CountryMapper.code does not */ },
        continent: () => { /* Country.continent resolver is required because Country.continent exists but CountryMapper.continent does not */ },
        id: () => { /* Country.id resolver is required because Country.id exists but CountryMapper.id does not */ },
        name: () => { /* Country.name resolver is required because Country.name exists but CountryMapper.name does not */ }
    };