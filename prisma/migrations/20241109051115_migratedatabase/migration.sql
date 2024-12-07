-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `role` ENUM('Student', 'Instructor', 'Admin') NOT NULL,
    `gender` ENUM('Male', 'Female', 'Other') NOT NULL DEFAULT 'Other',
    `dateOfBirth` DATETIME(3) NULL,
    `phoneNumber` VARCHAR(20) NULL,
    `addressLine1` VARCHAR(255) NULL,
    `addressLine2` VARCHAR(255) NULL,
    `city` VARCHAR(100) NULL,
    `state` VARCHAR(100) NULL,
    `postalCode` VARCHAR(20) NULL,
    `country` VARCHAR(100) NULL,
    `accountStatus` ENUM('Active', 'Suspended', 'Deactivated') NOT NULL DEFAULT 'Active',
    `lastLogin` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `profilePictureURL` VARCHAR(255) NULL,
    `bannerPictureURL` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `inActive` BOOLEAN NOT NULL DEFAULT false,
    `isBlock` BOOLEAN NOT NULL DEFAULT false,
    `createdBy` VARCHAR(100) NULL,
    `updatedBy` VARCHAR(100) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OtpRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `otp` VARCHAR(191) NOT NULL,
    `expiryTime` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `OtpRequest_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Instructor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `department` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(100) NULL,
    `updatedBy` VARCHAR(100) NULL,

    UNIQUE INDEX `Instructor_userId_key`(`userId`),
    INDEX `Instructor_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `major` VARCHAR(255) NOT NULL,
    `yearOfStudy` INTEGER NOT NULL,
    `gpa` DECIMAL(3, 2) NULL,
    `graduationStatus` VARCHAR(191) NOT NULL DEFAULT 'In Progress',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(100) NULL,
    `updatedBy` VARCHAR(100) NULL,

    UNIQUE INDEX `Student_userId_key`(`userId`),
    INDEX `Student_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'Moderator',
    `accessLevel` INTEGER NOT NULL DEFAULT 1,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lastActivity` DATETIME(3) NULL,
    `createdBy` VARCHAR(100) NULL,
    `updatedBy` VARCHAR(100) NULL,

    UNIQUE INDEX `Admin_userId_key`(`userId`),
    INDEX `Admin_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Course` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseCode` VARCHAR(191) NOT NULL,
    `courseName` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `credits` INTEGER NOT NULL DEFAULT 3,
    `instructorId` INTEGER NULL,
    `prerequisiteCourseIds` VARCHAR(191) NULL,
    `durationWeeks` INTEGER NOT NULL DEFAULT 12,
    `category` VARCHAR(191) NULL,
    `isMandatory` BOOLEAN NOT NULL DEFAULT false,
    `semesterOffered` VARCHAR(191) NULL,
    `price` INTEGER NOT NULL,
    `isFree` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `backgroundUrl` VARCHAR(191) NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,
    `status` ENUM('DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'REJECTED') NOT NULL DEFAULT 'DRAFT',

    UNIQUE INDEX `Course_courseCode_key`(`courseCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseChapter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NOT NULL,
    `chapterTitle` VARCHAR(191) NOT NULL,
    `chapterDescription` VARCHAR(191) NULL,
    `chapterOrder` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseLesson` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `chapterId` INTEGER NOT NULL,
    `lessonTitle` VARCHAR(191) NOT NULL,
    `lessonDescription` VARCHAR(191) NULL,
    `durationMinutes` INTEGER NULL,
    `lessonOrder` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseMaterial` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lessonId` INTEGER NOT NULL,
    `materialType` VARCHAR(191) NOT NULL,
    `materialTitle` VARCHAR(191) NOT NULL,
    `materialURL` VARCHAR(191) NOT NULL,
    `materialDescription` VARCHAR(191) NULL,
    `isRequired` BOOLEAN NOT NULL DEFAULT true,
    `durationMinutes` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `File` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fileKey` VARCHAR(191) NOT NULL,
    `fileUrl` VARCHAR(191) NOT NULL,
    `appUrl` VARCHAR(191) NOT NULL,
    `fileName` VARCHAR(191) NOT NULL,
    `fileType` VARCHAR(191) NOT NULL,
    `fileSize` INTEGER NOT NULL,
    `isTemp` BOOLEAN NOT NULL DEFAULT true,
    `associatedTableType` VARCHAR(191) NULL,
    `associatedTableId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    UNIQUE INDEX `File_fileKey_key`(`fileKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Semester` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `isCurrent` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Enrollment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,
    `semesterId` INTEGER NOT NULL,
    `enrollmentStatus` VARCHAR(191) NOT NULL DEFAULT 'In Progress',
    `enrollmentDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `completionDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CourseCompletion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,
    `enrollmentId` INTEGER NOT NULL,
    `semesterId` INTEGER NOT NULL,
    `completionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `finalGrade` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LearningPath` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pathName` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `backgroundUrl` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LearningPathCourse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `learningPathId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,
    `sequenceOrder` INTEGER NOT NULL,
    `isMandatory` BOOLEAN NOT NULL DEFAULT true,
    `description` TEXT NULL,
    `title` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    INDEX `LearningPathCourse_learningPathId_idx`(`learningPathId`),
    INDEX `LearningPathCourse_courseId_idx`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `Grade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enrollmentId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `grade` DECIMAL(65, 30) NOT NULL,
    `gradeDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    UNIQUE INDEX `Grade_enrollmentId_key`(`enrollmentId`),
    INDEX `Grade_enrollmentId_idx`(`enrollmentId`),
    INDEX `Grade_courseId_idx`(`courseId`),
    INDEX `Grade_studentId_idx`(`studentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FailedCourse` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,
    `semesterId` INTEGER NOT NULL,
    `enrollmentId` INTEGER NOT NULL,
    `failureReason` VARCHAR(191) NULL,
    `failedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    INDEX `FailedCourse_studentId_idx`(`studentId`),
    INDEX `FailedCourse_courseId_idx`(`courseId`),
    INDEX `FailedCourse_semesterId_idx`(`semesterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Goal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `courseId` INTEGER NOT NULL,
    `targetCompletionDate` DATETIME(3) NOT NULL,
    `status` ENUM('In_Progress', 'Completed', 'Failed') NOT NULL DEFAULT 'In_Progress',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Goal_studentId_idx`(`studentId`),
    INDEX `Goal_courseId_idx`(`courseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AcademicAdvising` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `studentId` INTEGER NOT NULL,
    `advisorId` INTEGER NOT NULL,
    `advisingDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `topic` VARCHAR(255) NOT NULL,
    `notes` TEXT NULL,
    `status` ENUM('Scheduled', 'Completed', 'Cancelled', 'Rejected', 'Approved') NOT NULL DEFAULT 'Scheduled',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    INDEX `AcademicAdvising_studentId_idx`(`studentId`),
    INDEX `AcademicAdvising_advisorId_idx`(`advisorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobConfig` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,
    `startTime` DATETIME(3) NULL,
    `endTime` DATETIME(3) NULL,
    `cronJob` VARCHAR(191) NULL,
    `typeJob` VARCHAR(191) NOT NULL,
    `rawData` VARCHAR(191) NULL,
    `jobDetail` VARCHAR(191) NULL,
    `key` VARCHAR(191) NOT NULL,
    `typeBusiness` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `relatedId` INTEGER NULL,
    `relatedType` VARCHAR(191) NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    UNIQUE INDEX `JobConfig_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Coin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Coin_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` VARCHAR(191) NOT NULL,
    `infor` VARCHAR(191) NULL,
    `orderId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `description` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,
    `object` VARCHAR(191) NULL,
    `paymentMethod` INTEGER NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Progress` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enrollmentId` INTEGER NOT NULL,
    `materialId` INTEGER NOT NULL,
    `status` ENUM('NotStarted', 'Completed') NOT NULL DEFAULT 'NotStarted',
    `completionDate` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `courseId` INTEGER NOT NULL DEFAULT 0,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    INDEX `enrollment_lesson_unique`(`enrollmentId`, `materialId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AdvisingChat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `advisingId` INTEGER NOT NULL,
    `senderId` INTEGER NOT NULL,
    `message` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    INDEX `AdvisingChat_advisingId_idx`(`advisingId`),
    INDEX `AdvisingChat_senderId_idx`(`senderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CategoryDocument` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Document` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `courseId` INTEGER NULL,
    `categoryId` INTEGER NOT NULL,
    `documentName` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `accessUrl` VARCHAR(255) NOT NULL,
    `fileType` VARCHAR(255) NOT NULL,
    `backgroundUrl` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `createdBy` VARCHAR(191) NULL,
    `updatedBy` VARCHAR(191) NULL,

    INDEX `Document_courseId_idx`(`courseId`),
    INDEX `Document_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Instructor` ADD CONSTRAINT `Instructor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_instructorId_fkey` FOREIGN KEY (`instructorId`) REFERENCES `Instructor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseChapter` ADD CONSTRAINT `CourseChapter_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseLesson` ADD CONSTRAINT `CourseLesson_chapterId_fkey` FOREIGN KEY (`chapterId`) REFERENCES `CourseChapter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseMaterial` ADD CONSTRAINT `CourseMaterial_lessonId_fkey` FOREIGN KEY (`lessonId`) REFERENCES `CourseLesson`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Prerequisite` ADD CONSTRAINT `Prerequisite_prerequisiteCourseId_fkey` FOREIGN KEY (`prerequisiteCourseId`) REFERENCES `Course`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Enrollment` ADD CONSTRAINT `Enrollment_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `Semester`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseCompletion` ADD CONSTRAINT `CourseCompletion_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseCompletion` ADD CONSTRAINT `CourseCompletion_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseCompletion` ADD CONSTRAINT `CourseCompletion_enrollmentId_fkey` FOREIGN KEY (`enrollmentId`) REFERENCES `Enrollment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseCompletion` ADD CONSTRAINT `CourseCompletion_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `Semester`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningPathCourse` ADD CONSTRAINT `LearningPathCourse_learningPathId_fkey` FOREIGN KEY (`learningPathId`) REFERENCES `LearningPath`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LearningPathCourse` ADD CONSTRAINT `LearningPathCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_receiveId_fkey` FOREIGN KEY (`receiveId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_enrollmentId_fkey` FOREIGN KEY (`enrollmentId`) REFERENCES `Enrollment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FailedCourse` ADD CONSTRAINT `FailedCourse_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FailedCourse` ADD CONSTRAINT `FailedCourse_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FailedCourse` ADD CONSTRAINT `FailedCourse_semesterId_fkey` FOREIGN KEY (`semesterId`) REFERENCES `Semester`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FailedCourse` ADD CONSTRAINT `FailedCourse_enrollmentId_fkey` FOREIGN KEY (`enrollmentId`) REFERENCES `Enrollment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Goal` ADD CONSTRAINT `Goal_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Goal` ADD CONSTRAINT `Goal_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademicAdvising` ADD CONSTRAINT `AcademicAdvising_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AcademicAdvising` ADD CONSTRAINT `AcademicAdvising_advisorId_fkey` FOREIGN KEY (`advisorId`) REFERENCES `Instructor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Coin` ADD CONSTRAINT `Coin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_enrollmentId_fkey` FOREIGN KEY (`enrollmentId`) REFERENCES `Enrollment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Progress` ADD CONSTRAINT `Progress_materialId_fkey` FOREIGN KEY (`materialId`) REFERENCES `CourseMaterial`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdvisingChat` ADD CONSTRAINT `AdvisingChat_advisingId_fkey` FOREIGN KEY (`advisingId`) REFERENCES `AcademicAdvising`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AdvisingChat` ADD CONSTRAINT `AdvisingChat_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Document` ADD CONSTRAINT `Document_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `CategoryDocument`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
