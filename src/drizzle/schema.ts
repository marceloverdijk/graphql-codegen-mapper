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
