-- AlterTable
ALTER TABLE `Course` ADD COLUMN `score` INTEGER NULL;

-- AlterTable
ALTER TABLE `Exam` ADD COLUMN `coefficient` INTEGER NOT NULL DEFAULT 1;
