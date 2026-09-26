CREATE TABLE "artisan_categories" (
	"artisan_id" uuid NOT NULL,
	"category_id" uuid NOT NULL,
	CONSTRAINT "artisan_categories_artisan_id_category_id_pk" PRIMARY KEY("artisan_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "artisan_profiles" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"business_name" varchar(160) NOT NULL,
	"bio" text,
	"city" varchar(100) NOT NULL,
	"state" varchar(100),
	"profile_image_url" text,
	"is_verified" boolean DEFAULT false NOT NULL,
	"average_rating" real DEFAULT 0 NOT NULL,
	"review_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"slug" varchar(120) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "categories_name_unique" UNIQUE("name"),
	CONSTRAINT "categories_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "artisan_categories" ADD CONSTRAINT "artisan_categories_artisan_id_artisan_profiles_user_id_fk" FOREIGN KEY ("artisan_id") REFERENCES "public"."artisan_profiles"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artisan_categories" ADD CONSTRAINT "artisan_categories_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "artisan_profiles" ADD CONSTRAINT "artisan_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;