/*
  Warnings:

  - You are about to drop the column `subject` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `subject` on the `Teacher` table. All the data in the column will be lost.
  - Added the required column `subjectId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Appointment` DROP COLUMN `subject`,
    ADD COLUMN `subjectId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Teacher` DROP COLUMN `subject`;

-- CreateTable
CREATE TABLE `Subject` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_TeacherSubjects` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_TeacherSubjects_AB_unique`(`A`, `B`),
    INDEX `_TeacherSubjects_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeacherSubjects` ADD CONSTRAINT `_TeacherSubjects_A_fkey` FOREIGN KEY (`A`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_TeacherSubjects` ADD CONSTRAINT `_TeacherSubjects_B_fkey` FOREIGN KEY (`B`) REFERENCES `Teacher`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
