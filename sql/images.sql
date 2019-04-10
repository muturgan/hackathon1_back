CREATE TABLE `images`
(
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
	`name` TEXT NOT NULL,
	`tags` JSON,
	`likedUsers` JSON,
	`likes` INT UNSIGNED DEFAULT 0
) ENGINE = InnoDB;
