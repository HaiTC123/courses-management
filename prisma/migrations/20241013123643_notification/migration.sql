-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senderId` INTEGER NOT NULL,
    `senderName` VARCHAR(191) NOT NULL,
    `receiveId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `rawData` VARCHAR(191) NOT NULL,
    `isViewed` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_receiveId_fkey` FOREIGN KEY (`receiveId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
