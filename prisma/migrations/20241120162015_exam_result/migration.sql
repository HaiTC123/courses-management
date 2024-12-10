/*
  Warnings:

  - Added the required column `result` to the `ExamResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ExamResult` ADD COLUMN `result` JSON NOT NULL;
