-- AlterTable
ALTER TABLE `User` ADD COLUMN `bannerPictureURL` VARCHAR(255) NULL,
    ADD COLUMN `createdBy` VARCHAR(100) NULL,
    ADD COLUMN `description` VARCHAR(255) NULL,
    ADD COLUMN `inActive` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `isBlock` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `updatedBy` VARCHAR(100) NULL;
