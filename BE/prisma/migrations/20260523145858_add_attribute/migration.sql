-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "deleted_by_receiver" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "deleted_by_sender" BOOLEAN NOT NULL DEFAULT false;
