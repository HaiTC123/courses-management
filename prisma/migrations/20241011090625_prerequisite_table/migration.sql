-- CreateTable
CREATE TABLE `Prerequisite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `prerequisiteCourseId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Prerequisite` ADD CONSTRAINT `Prerequisite_prerequisiteCourseId_fkey` FOREIGN KEY (`prerequisiteCourseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
