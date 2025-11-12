/*
  Warnings:

  - You are about to alter the column `clientInformation` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Json`.

*/
-- AlterTable
ALTER TABLE `Invoice` MODIFY `clientInformation` JSON NOT NULL;
