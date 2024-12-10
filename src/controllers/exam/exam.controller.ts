import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AdvisingStatus, Prisma, Role } from '@prisma/client';
import { BaseController } from 'src/base/base.controller';
import { EntityType, ModelType } from 'src/common/reflect.metadata';
import { AuthGuard } from 'src/core/auth.guard';
import { CoreService } from 'src/core/core.service';
import { ExamService } from './exam.service';
import { AcademicAdvisingDto, AdvisingChatDto } from 'src/model/dto/grade.dto';
import { RolesGuard } from 'src/core/roles.guard';
import { QuestionEntity } from 'src/model/entity/question.entity';
import { ExamEntity } from 'src/model/entity/exam.entity';
import { ExamDto } from 'src/model/dto/exam.dto';
import { Roles } from 'src/utils/roles.decorator';
import { ServiceResponse } from 'src/model/response/service.response';


@ApiTags('Exam')
@Controller('api/exam')
@UseGuards(AuthGuard, RolesGuard)
export class ExamController extends BaseController<ExamEntity, Prisma.ExamCreateInput> {
    @EntityType(ExamEntity)
    entity: ExamEntity;

    @ModelType(ExamDto)
    model: ExamDto;
    constructor(private service: ExamService, coreSevice: CoreService) {
        super("exam", coreSevice, service);
    }

    @Post("test")
    @ApiBody({ type: ExamDto })
    async apiTest(@Body() param: ExamDto) {
        return null;
    }

    @Post("publishExam/:examId")
    @Roles(Role.Instructor)
    async publishExam(@Param("examId") examId: number) {
        return ServiceResponse.onSuccess(await this.service.publishExam(examId));
    }

    @Get("detail/:examId")
    @Roles(Role.Student)
    async detailExam(@Param("examId") examId: number) {
        return ServiceResponse.onSuccess( this._mapperService.mapData(await this.service.getExamDetailsForStudent(examId), this.TEntityClass, this.TModelClass));
    }

    // Sinh viên: Xem kết quả bài thi
    @Get(':examId/:studentId/result')
    async getExamResult(@Param('examId') examId: number,
        @Param("studentId") studentId: number) {
        return ServiceResponse.onSuccess(await this.service.getExamResultForStudent(examId, studentId));
    }

    @Roles(Role.Student)
    @Post(':examId/submit')
    async submitExam(
        @Param('examId') examId: number,
        @Body() answers: Record<number, string>
    ) {
        return ServiceResponse.onSuccess(await this.service.submitExam(examId, answers));
    }

}
