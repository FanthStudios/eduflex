/*
  Warnings:

  - You are about to drop the column `topics` on the `StudentAppointment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentId]` on the table `StudentAppointment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `StudentAppointment` DROP COLUMN `topics`,
    ADD COLUMN `topic` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `StudentAppointment_studentId_key` ON `StudentAppointment`(`studentId`);
