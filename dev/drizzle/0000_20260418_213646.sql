CREATE TABLE "characters" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "relations" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_char_1" uuid,
	"id_char_2" uuid,
	"about" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "relations" ADD CONSTRAINT "relations_id_char_1_characters_id_fk" FOREIGN KEY ("id_char_1") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "relations" ADD CONSTRAINT "relations_id_char_2_characters_id_fk" FOREIGN KEY ("id_char_2") REFERENCES "public"."characters"("id") ON DELETE no action ON UPDATE no action;