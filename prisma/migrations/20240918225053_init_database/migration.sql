-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `role` ENUM('Student', 'Instructor', 'Admin') NOT NULL,
    `gender` ENUM('Male', 'Female', 'Other') NOT NULL DEFAULT 'Other',
    `dateOfBirth` DATETIME(3) NULL,
    `phoneNumber` VARCHAR(20) NULL,
    `addressLine1` VARCHAR(255) NULL,
    `addressLine2` VARCHAR(255) NULL,
    `city` VARCHAR(100) NULL,
    `state` VARCHAR(100) NULL,
    `postalCode` VARCHAR(20) NULL,
    `country` VARCHAR(100) NULL,
    `accountStatus` ENUM('Active', 'Suspended', 'Deactivated') NOT NULL DEFAULT 'Active',
    `lastLogin` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `profilePictureURL` VARCHAR(255) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
