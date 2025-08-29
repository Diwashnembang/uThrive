-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "currentParticipants" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "maxParticipants" INTEGER NOT NULL DEFAULT 0;
