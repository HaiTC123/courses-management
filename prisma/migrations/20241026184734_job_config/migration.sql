-- CreateTable
CREATE TABLE `JobConfig` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NULL,
    `endTime` DATETIME(3) NULL,
    `cronJob` VARCHAR(191) NULL,
    `typeJob` VARCHAR(191) NOT NULL,
    `rawData` VARCHAR(191) NULL,
    `key` VARCHAR(191) NOT NULL,
    `typeBusiness` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `JobConfig_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
