-- AlterTable
ALTER TABLE `JobConfig` ADD COLUMN `createdBy` VARCHAR(191) NULL,
    ADD COLUMN `relatedId` INTEGER NULL,
    ADD COLUMN `relatedType` VARCHAR(191) NULL,
    ADD COLUMN `updatedBy` VARCHAR(191) NULL;
