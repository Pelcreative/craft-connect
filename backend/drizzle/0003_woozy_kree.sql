CREATE TYPE "public"."service_request_status" AS ENUM('pending', 'accepted', 'declined', 'completed', 'cancelled');--> statement-breakpoint
CREATE TABLE "service_requests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"client_id" uuid NOT NULL,
	"artisan_id" uuid NOT NULL,
	"title" varchar(160) NOT NULL,
	"message" text NOT NULL,
	"status" "service_request_status" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_client_id_users_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "service_requests" ADD CONSTRAINT "service_requests_artisan_id_artisan_profiles_user_id_fk" FOREIGN KEY ("artisan_id") REFERENCES "public"."artisan_profiles"("user_id") ON DELETE cascade ON UPDATE no action;