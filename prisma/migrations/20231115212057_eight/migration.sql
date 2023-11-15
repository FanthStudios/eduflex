/*
  Warnings:

  - You are about to drop the column `date` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `topic` on the `Appointment` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to drop the `_AppointmentToStudent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_StudentToTeacher` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dateTime` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_AppointmentToStudent` DROP FOREIGN KEY `_AppointmentToStudent_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AppointmentToStudent` DROP FOREIGN KEY `_AppointmentToStudent_B_fkey`;

-- DropForeignKey
ALTER TABLE `_StudentToTeacher` DROP FOREIGN KEY `_StudentToTeacher_A_fkey`;

-- DropForeignKey
ALTER TABLE `_StudentToTeacher` DROP FOREIGN KEY `_StudentToTeacher_B_fkey`;

-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `date`,
    DROP COLUMN `description`,
    DROP COLUMN `goal`,
    DROP COLUMN `topic`,
    ADD COLUMN `dateTime` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('STUDENT', 'TEACHER') NOT NULL;

-- DropTable
DROP TABLE `_AppointmentToStudent`;

-- DropTable
DROP TABLE `_StudentToTeacher`;

-- CreateTable
CREATE TABLE `StudentAppointment` (
    `studentId` INTEGER NOT NULL,
    `appointmentId` INTEGER NOT NULL,
    `topic` VARCHAR(191) NOT NULL,
    `goal` ENUM('CORRECT_TEST', 'COREPETITIONS') NOT NULL,
    `description` VARCHAR(191) NULL,

    PRIMARY KEY (`studentId`, `appointmentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FavoriteTeachers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FavoriteTeachers_AB_unique`(`A`, `B`),
    INDEX `_FavoriteTeachers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentAppointment` ADD CONSTRAINT `StudentAppointment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAppointment` ADD CONSTRAINT `StudentAppointment_appointmentId_fkey` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FavoriteTeachers` ADD CONSTRAINT `_FavoriteTeachers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FavoriteTeachers` ADD CONSTRAINT `_FavoriteTeachers_B_fkey` FOREIGN KEY (`B`) REFERENCES `Teacher`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
