CREATE TABLE "gf_room" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" serial NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"tags" text NOT NULL,
	"githubRepo" text
);
--> statement-breakpoint
ALTER TABLE "gf_room" ADD CONSTRAINT "gf_room_userId_gf_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."gf_user"("id") ON DELETE cascade ON UPDATE no action;