/*
  Warnings:

  - You are about to alter the column `shippingPrice` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `totalPrice` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Invoice` MODIFY `shippingPrice` INTEGER NOT NULL,
    MODIFY `totalPrice` INTEGER NOT NULL;
