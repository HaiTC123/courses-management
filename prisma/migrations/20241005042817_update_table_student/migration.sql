/*
  Warnings:

  - The primary key for the `Admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `adminId` on the `Admin` table. All the data in the column will be lost.
  - The primary key for the `Instructor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `instructorId` on the `Instructor` table. All the data in the column will be lost.
  - The primary key for the `Student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `studentId` on the `Student` table. All the data in the column will be lost.
  - Added the required column `id` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Instructor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Admin` DROP PRIMARY KEY,
    DROP COLUMN `adminId`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Instructor` DROP PRIMARY KEY,
    DROP COLUMN `instructorId`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Student` DROP PRIMARY KEY,
    DROP COLUMN `studentId`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);
