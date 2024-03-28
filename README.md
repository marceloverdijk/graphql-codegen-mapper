Repo for issue https://github.com/eddeee888/graphql-code-generator-plugins/issues/245

**Config:**

```
import type { CodegenConfig } from '@graphql-codegen/cli';
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';
 
const config: CodegenConfig = {
  schema: './src/graphql/schema.graphql',
  generates: {
    'src/graphql/schema': defineConfig({
      mode: 'merged',
    }),
  },
};

export default config;
```

**schema.graphql:**

```
scalar CountryCode

type Query {
    continents(first: Int = 10, offset: Int = 0): [Continent!]
    continent(id: ID!): Continent
    countries(first: Int = 10, offset: Int = 0): [Country!]
    country(id: ID!): Country
}

type Continent {
    id: ID!
    code: String!
    name: String!
}

type Country {
    id: ID!
    code: CountryCode!
    name: String!
    continent: Continent!
}
```

**schema.mappers.ts:**

```
// Exported mappers from Drizzle don't work...

// export type { Continent as ContinentMapper } from '@/model/schema';
export type { Country as CountryMapper } from '../drizzle/schema';

// Manual mappers do work though...

export interface ContinentMapper {
  id: string;
  code: string;
};
```

**Drizzle schema.ts:**

```
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const continent = sqliteTable(
  'continent',
  {
	  id: text('id').primaryKey(),
	  name: text('name').notNull(),
  },
);

export type Continent = typeof continent.$inferSelect;

export const country = sqliteTable(
  'country',
  {
	  id: text('id').primaryKey(),
    alpha2Code: text('alpha2_code').notNull(),
	  name: text('name').notNull(),
    continentId: text('continent_id').notNull().references(() => continent.id),
  },
);

export type Country = typeof country.$inferSelect;
```

**Generated Continent.ts:**

```
import type   { ContinentResolvers } from './types.generated';
    export const Continent: ContinentResolvers = {
    /* Implement Continent resolver logic here */
        name: () => { /* Continent.name resolver is required because Continent.name exists but ContinentMapper.name does not */ }
    };
```

This is as expected, as indeed the `ContinentMapper.name` does not exist.

**Generated Country.ts:**

```
import type   { CountryResolvers } from './types.generated';
    export const Country: CountryResolvers = {
    /* Implement Country resolver logic here */
        code: () => { /* Country.code resolver is required because Country.code exists but CountryMapper.code does not */ },
        continent: () => { /* Country.continent resolver is required because Country.continent exists but CountryMapper.continent does not */ },
        id: () => { /* Country.id resolver is required because Country.id exists but CountryMapper.id does not */ },
        name: () => { /* Country.name resolver is required because Country.name exists but CountryMapper.name does not */ }
    };
```

`id` and `name` are part of the `drizzle/schema#Country` type, which is exported in schema.mappers.ts as `CountryMapper`,
yet the generated `CountryResolvers` is not regnosing them, and generated a unwanted resolvers for them.

Note that in types.generated.ts the `CountryMapper` is imported, so at least it seems to have picked up that mapper:

```
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { ContinentMapper, CountryMapper } from './../schema.mappers';
..
```
