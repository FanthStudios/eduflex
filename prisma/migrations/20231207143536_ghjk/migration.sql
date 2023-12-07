-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_locationAddress_fkey`;

-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `Appointment` DROP FOREIGN KEY `Appointment_teacherId_fkey`;

-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_classId_fkey`;

-- DropForeignKey
ALTER TABLE `Student` DROP FOREIGN KEY `Student_userId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentAppointment` DROP FOREIGN KEY `StudentAppointment_appointmentId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentAppointment` DROP FOREIGN KEY `StudentAppointment_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `Teacher` DROP FOREIGN KEY `Teacher_userId_fkey`;

-- CreateTable
CREATE TABLE `ActivationCode` (
    `value` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,
    `date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ActivationCode_value_key`(`value`),
    UNIQUE INDEX `ActivationCode_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `StudentAppointment_studentId_key` ON `StudentAppointment`(`studentId`);

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teacher` ADD CONSTRAINT `Teacher_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivationCode` ADD CONSTRAINT `ActivationCode_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_locationAddress_fkey` FOREIGN KEY (`locationAddress`) REFERENCES `Location`(`address`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_teacherId_fkey` FOREIGN KEY (`teacherId`) REFERENCES `Teacher`(`userId`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAppointment` ADD CONSTRAINT `StudentAppointment_appointmentId_fkey` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAppointment` ADD CONSTRAINT `StudentAppointment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE NO ACTION ON UPDATE CASCADE;
