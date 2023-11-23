/*
  Warnings:

  - You are about to drop the column `remaningSlots` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `availableSlots` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `remaningSlots`,
    ADD COLUMN `availableSlots` INTEGER NOT NULL;
