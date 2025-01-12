/*
  Warnings:

  - You are about to drop the column `certificateUrl` on the `Certificate` table. All the data in the column will be lost.
  - Added the required column `isCourse` to the `Certificate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Certificate` DROP COLUMN `certificateUrl`,
    ADD COLUMN `courseName` VARCHAR(191) NULL,
    ADD COLUMN `isCourse` BOOLEAN NOT NULL,
    ADD COLUMN `learningPathName` VARCHAR(191) NULL;
