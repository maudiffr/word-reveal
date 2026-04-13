/*
  Warnings:

  - You are about to drop the column `gamesWin` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "gamesWin",
ADD COLUMN     "gamesWon" INTEGER NOT NULL DEFAULT 0;
