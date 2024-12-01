/*
  Warnings:

  - You are about to drop the column `followUpDate` on the `AcademicAdvising` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `AcademicAdvising` DROP COLUMN `followUpDate`,
    MODIFY `status` ENUM('Scheduled', 'Completed', 'Cancelled', 'Rejected', 'Approved') NOT NULL DEFAULT 'Scheduled';

-- AlterTable
ALTER TABLE `Progress` MODIFY `courseId` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `AdvisingChat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `advisingId` INTEGER NOT NULL,
    `senderId` INTEGER NOT NULL,
    `message` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `AdvisingChat_advisingId_idx`(`advisingId`),
    INDEX `AdvisingChat_senderId_idx`(`senderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AdvisingChat` ADD CONSTRAINT `AdvisingChat_advisingId_fkey` FOREIGN KEY (`advisingId`) REFERENCES `AcademicAdvising`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdvisingChat` ADD CONSTRAINT `AdvisingChat_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
