CREATE TABLE `users`
(
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
	`email` VARCHAR(128) UNIQUE NOT NULL,
	`encodedYatoken` VARCHAR(128) UNIQUE NOT NULL
) ENGINE = InnoDB;
