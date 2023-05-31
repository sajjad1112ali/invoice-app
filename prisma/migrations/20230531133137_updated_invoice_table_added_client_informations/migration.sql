/*
  Warnings:

  - You are about to drop the column `customerName` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `clientInformation` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invoice` DROP COLUMN `customerName`,
    ADD COLUMN `clientInformation` TEXT NOT NULL;
