/*
  Warnings:

  - You are about to drop the column `description` on the `StudentAppointment` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `StudentAppointment` table. All the data in the column will be lost.
  - Added the required column `subject` to the `StudentAppointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `StudentAppointment` DROP COLUMN `description`,
    DROP COLUMN `topic`,
    ADD COLUMN `subject` VARCHAR(191) NOT NULL;
