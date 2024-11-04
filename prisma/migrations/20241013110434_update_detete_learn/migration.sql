-- DropForeignKey
ALTER TABLE `LearningPathCourse` DROP FOREIGN KEY `LearningPathCourse_learningPathId_fkey`;

-- AddForeignKey
ALTER TABLE `LearningPathCourse` ADD CONSTRAINT `LearningPathCourse_learningPathId_fkey` FOREIGN KEY (`learningPathId`) REFERENCES `LearningPath`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
