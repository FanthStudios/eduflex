/*
  Warnings:

  - You are about to alter the column `avatar` on the `User` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `User` MODIFY `avatar` VARCHAR(191) NOT NULL DEFAULT '';
