-- AlterTable
ALTER TABLE `Exam` ADD COLUMN `status` ENUM('DRAFT', 'PUBLISHED', 'CLOSED') NOT NULL DEFAULT 'DRAFT';
