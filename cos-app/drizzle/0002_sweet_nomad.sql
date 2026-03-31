CREATE TABLE "temp_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password_hash" text NOT NULL,
	"session_id" text,
	"created_at" timestamp DEFAULT NOW(),
	CONSTRAINT "temp_users_username_unique" UNIQUE("username")
);
