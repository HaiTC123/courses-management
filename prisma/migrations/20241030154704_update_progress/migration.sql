-- DropForeignKey
ALTER TABLE `Progress` DROP FOREIGN KEY `Progress_lessonId_fkey`;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `CourseLesson`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
