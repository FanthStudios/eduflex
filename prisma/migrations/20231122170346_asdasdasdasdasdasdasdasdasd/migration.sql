/*
  Warnings:

  - You are about to drop the column `locationId` on the `Appointment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address]` on the table `Location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationAddress` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_locationId_fkey`;

-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `locationId`,
    ADD COLUMN `locationAddress` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Location_address_key` ON `Location`(`address`);

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_locationAddress_fkey` FOREIGN KEY (`locationAddress`) REFERENCES `Location`(`address`) ON DELETE RESTRICT ON UPDATE CASCADE;
