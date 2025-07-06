import { date, integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const characters = pgTable('characters', {
	id: uuid('id').primaryKey(),
	primaryNameId: integer('primary_name_id'),
	secondaryNameId: integer('secondary_name_id'),
	primarySurnameId: integer('primary_surname_id'),
	description: text('description'),
	birthDate: date('birth_date'),
	deathDate: date('death_date'),
	age: integer('age'),
	avatar: text('avatar'),
	gallery: text('gallery').array(), // PostgreSQL text[]
	updatedAt: timestamp('updatedAt'),
	createdAt: timestamp('createdAt'),
	type: text('type'),
});

export const characterNames = pgTable('character_names', {
	id: serial('id').primaryKey(),
	characterId: uuid('character_id').notNull().references(() => characters.id, { onDelete: 'cascade' }),
	value: text('value').notNull(),
});

export const characterSurnames = pgTable('character_surnames', {
	id: serial('id').primaryKey(),
	characterId: uuid('character_id').notNull().references(() => characters.id, { onDelete: 'cascade' }),
	value: text('value').notNull(),
});

export const characterLabels = pgTable('character_labels', {
	characterId: uuid('character_id').notNull().references(() => characters.id, { onDelete: 'cascade' }),
	label: text('label').notNull(),
});

export const characterSections = pgTable('character_sections', {
	id: serial('id').primaryKey(),
	characterId: uuid('character_id').notNull().references(() => characters.id, { onDelete: 'cascade' }),
	title: text('title').notNull(),
	content: text('content'),
	// możesz dodać np. order, type, etc.
});

export const relations = pgTable('relations', {
	id: serial('id').primaryKey(),
	idChar1: serial('id_char_1').references(() => characters.id),
	idChar2: serial('id_char_2').references(() => characters.id),
	about: text('about').notNull(),
});

// import { sql } from 'drizzle-orm';
// import { boolean, pgTable, text, uuid, varchar } from 'drizzle-orm/pg-core';
//
// // ======= Table of Characters =======
// export const characters = pgTable('characters', {
// 	id: uuid('id').defaultRandom().primaryKey(),
// 	firstName: varchar('first_name', { length: 100 }).notNull(),
// 	lastName: varchar('last_name', { length: 100 }).notNull(),
// 	description: text('description'),
// 	tags1: text('tags1')
// 		.array()
// 		.default(sql`'{}'::text[]`),
// });
//
// // ======= Table of Universes =======
// export const universes = pgTable('universes', {
// 	id: uuid('id').defaultRandom().primaryKey(),
// 	name: varchar('name', { length: 255 }).notNull(),
// 	description: text('description'),
// });
//
// // TODO: ======= Connecting Characters with Universes (Many-to-Many) =======
//
// // ======= Table of Relationships =======
// export const relationships = pgTable('relationships', {
// 	id: uuid('id').defaultRandom().primaryKey(),
// 	sourceId: uuid('source_id')
// 		.references(() => characters.id, { onDelete: 'cascade' })
// 		.notNull(),
// 	targetId: uuid('target_id')
// 		.references(() => characters.id, { onDelete: 'cascade' })
// 		.notNull(),
// 	about: text('about').notNull(),
// 	isBidirectional: boolean('is_bidirectional').default(false),
// });
//
// // ======= Table of Stories =======
// export const stories = pgTable('stories', {
// 	id: uuid('id').defaultRandom().primaryKey(),
// 	title: varchar('title', { length: 255 }).notNull(),
// 	content: text('content').notNull(),
// 	characterId: uuid('character_id')
// 		.references(() => characters.id, { onDelete: 'cascade' })
// 		.notNull(),
// });
