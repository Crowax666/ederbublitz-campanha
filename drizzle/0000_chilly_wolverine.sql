CREATE TABLE `consent_events` (
	`id` text PRIMARY KEY NOT NULL,
	`supporter_id` text NOT NULL,
	`purpose` text NOT NULL,
	`privacy_version` text NOT NULL,
	`granted` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`supporter_id`) REFERENCES `supporters`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `consent_supporter_idx` ON `consent_events` (`supporter_id`);--> statement-breakpoint
CREATE TABLE `news` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`excerpt` text NOT NULL,
	`body` text NOT NULL,
	`status` text DEFAULT 'rascunho' NOT NULL,
	`published_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `news_slug_idx` ON `news` (`slug`);--> statement-breakpoint
CREATE TABLE `proposals` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`summary` text NOT NULL,
	`category` text NOT NULL,
	`position` integer DEFAULT 0 NOT NULL,
	`published` integer DEFAULT false NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `proposals_slug_idx` ON `proposals` (`slug`);--> statement-breakpoint
CREATE TABLE `site_content` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`section` text NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`status` text DEFAULT 'rascunho' NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `site_content_slug_idx` ON `site_content` (`slug`);--> statement-breakpoint
CREATE TABLE `supporters` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`phone` text NOT NULL,
	`city` text NOT NULL,
	`neighborhood` text,
	`interest` text DEFAULT 'participar' NOT NULL,
	`source` text DEFAULT 'site-home' NOT NULL,
	`status` text DEFAULT 'novo' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `supporters_phone_idx` ON `supporters` (`phone`);--> statement-breakpoint
CREATE INDEX `supporters_city_idx` ON `supporters` (`city`);--> statement-breakpoint
CREATE INDEX `supporters_created_at_idx` ON `supporters` (`created_at`);