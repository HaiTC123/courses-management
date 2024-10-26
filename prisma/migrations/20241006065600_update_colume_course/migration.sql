/*
  Warnings:

  - You are about to drop the column `materialGroup` on the `CourseMaterial` table. All the data in the column will be lost.
  - You are about to drop the column `materialGroupTitle` on the `CourseMaterial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `CourseMaterial` DROP COLUMN `materialGroup`,
    DROP COLUMN `materialGroupTitle`;
