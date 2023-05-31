/*
  Warnings:

  - Added the required column `shippingPrice` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `isPaid` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `shippingPrice` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalPrice` VARCHAR(191) NOT NULL;
