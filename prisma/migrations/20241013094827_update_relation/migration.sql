/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Instructor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Admin_userId_key` ON `Admin`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Instructor_userId_key` ON `Instructor`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_userId_key` ON `Student`(`userId`);
