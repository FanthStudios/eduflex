/*
  Warnings:

  - A unique constraint covering the columns `[locationId]` on the table `Appointment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `locationId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recurring` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roomNumber` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointment` ADD COLUMN `locationId` INTEGER NOT NULL,
    ADD COLUMN `recurring` ENUM('NEVER', 'WEEKLY', 'BIWEEKLY', 'MONTHLY') NOT NULL,
    ADD COLUMN `roomNumber` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lat` DOUBLE NOT NULL,
    `lng` DOUBLE NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `postalCode` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Location_lat_key`(`lat`),
    UNIQUE INDEX `Location_lng_key`(`lng`),
    UNIQUE INDEX `Location_address_key`(`address`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Appointment_locationId_key` ON `Appointment`(`locationId`);

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
