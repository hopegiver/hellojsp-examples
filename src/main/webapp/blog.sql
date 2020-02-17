CREATE TABLE `tb_blog` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`subject` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`content` TEXT NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`att_file_name` VARCHAR(200) NULL DEFAULT NULL COLLATE 'utf8mb4_unicode_ci',
	`att_file_code` VARCHAR(200) NULL DEFAULT NULL,
	`reg_date` VARCHAR(14) NULL DEFAULT NULL,
	`status` INT(11) NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
)