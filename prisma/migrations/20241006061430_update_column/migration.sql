/*
  Warnings:

  - You are about to drop the column `modifiedBy` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedBy` on the `CourseChapter` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedBy` on the `CourseLesson` table. All the data in the column will be lost.
  - You are about to drop the column `modifiedBy` on the `CourseMaterial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `modifiedBy`,
    ADD COLUMN `updatedBy` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CourseChapter` DROP COLUMN `modifiedBy`,
    ADD COLUMN `updatedBy` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CourseLesson` DROP COLUMN `modifiedBy`,
    ADD COLUMN `updatedBy` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `CourseMaterial` DROP COLUMN `modifiedBy`,
    ADD COLUMN `updatedBy` VARCHAR(191) NULL;
