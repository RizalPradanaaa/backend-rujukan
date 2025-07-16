-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(20) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `age` SMALLINT NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `token` VARCHAR(100) NULL,

    UNIQUE INDEX `users_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
