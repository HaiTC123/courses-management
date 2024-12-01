// import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

// // course.events.ts
// export class LessonAddedEvent {
//     constructor(public readonly courseId: number, public readonly lessonId: number) { }
// }

// export class LessonUpdatedEvent {
//     constructor(public readonly courseId: number, public readonly lessonId: number) { }
// }

// export class LessonDeletedEvent {
//     constructor(public readonly courseId: number, public readonly lessonId: number) { }
// }



// @EventsHandler(LessonAddedEvent)
// export class LessonAddedHandler implements IEventHandler<LessonAddedEvent> {
//   constructor(private readonly progressService: ProgressService) {}

//   async handle(event: LessonAddedEvent) {
//     const { courseId, lessonId } = event;
//     await this.progressService.addLessonProgressForStudents(courseId, lessonId);
//   }
// }

// @EventsHandler(LessonUpdatedEvent)
// export class LessonUpdatedHandler implements IEventHandler<LessonUpdatedEvent> {
//   constructor(private readonly progressService: ProgressService) {}

//   async handle(event: LessonUpdatedEvent) {
//     const { courseId, lessonId } = event;
//     await this.progressService.updateLessonProgressForStudents(courseId, lessonId);
//   }
// }

// @EventsHandler(LessonDeletedEvent)
// export class LessonDeletedHandler implements IEventHandler<LessonDeletedEvent> {
//   constructor(private readonly progressService: ProgressService) {}

//   async handle(event: LessonDeletedEvent) {
//     const { courseId, lessonId } = event;
//     await this.progressService.removeLessonProgressForStudents(courseId, lessonId);
//   }
// }

