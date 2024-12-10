/*
  Warnings:

  - Added the required column `endTime` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Exam` ADD COLUMN `endTime` DATETIME(3) NOT NULL;
