-- DropForeignKey
ALTER TABLE `StudentAppointment` DROP FOREIGN KEY `StudentAppointment_appointmentId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentAppointment` DROP FOREIGN KEY `StudentAppointment_studentId_fkey`;

-- AddForeignKey
ALTER TABLE `StudentAppointment` ADD CONSTRAINT `StudentAppointment_appointmentId_fkey` FOREIGN KEY (`appointmentId`) REFERENCES `Appointment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentAppointment` ADD CONSTRAINT `StudentAppointment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
