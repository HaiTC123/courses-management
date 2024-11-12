/*
  Warnings:

  - You are about to drop the column `grade` on the `Enrollment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[enrollmentId]` on the table `Grade` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Grade` DROP FOREIGN KEY `Grade_enrollmentId_fkey`;

-- AlterTable
ALTER TABLE `Enrollment` DROP COLUMN `grade`;

-- CreateIndex
CREATE UNIQUE INDEX `Grade_enrollmentId_key` ON `Grade`(`enrollmentId`);

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_enrollmentId_fkey` FOREIGN KEY (`enrollmentId`) REFERENCES `Enrollment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
