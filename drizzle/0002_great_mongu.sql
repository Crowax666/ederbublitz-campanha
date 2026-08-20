CREATE TABLE `page_views` (
	`id` text PRIMARY KEY NOT NULL,
	`visitor_id` text NOT NULL,
	`session_id` text NOT NULL,
	`supporter_id` text,
	`path` text NOT NULL,
	`referrer` text,
	`utm_source` text,
	`utm_medium` text,
	`utm_campaign` text,
	`device_type` text DEFAULT 'desconhecido' NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`supporter_id`) REFERENCES `supporters`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE INDEX `page_views_visitor_idx` ON `page_views` (`visitor_id`);--> statement-breakpoint
CREATE INDEX `page_views_session_idx` ON `page_views` (`session_id`);--> statement-breakpoint
CREATE INDEX `page_views_supporter_idx` ON `page_views` (`supporter_id`);--> statement-breakpoint
CREATE INDEX `page_views_created_at_idx` ON `page_views` (`created_at`);--> statement-breakpoint
CREATE TABLE `visitor_links` (
	`visitor_id` text PRIMARY KEY NOT NULL,
	`supporter_id` text NOT NULL,
	`linked_at` integer NOT NULL,
	FOREIGN KEY (`supporter_id`) REFERENCES `supporters`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `visitor_links_supporter_idx` ON `visitor_links` (`supporter_id`);