/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Coin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Coin_userId_key` ON `Coin`(`userId`);
