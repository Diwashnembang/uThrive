/*
  Warnings:

  - You are about to drop the column `discription` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT;
