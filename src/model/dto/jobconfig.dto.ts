import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';

export class JobConfigDto extends BaseDto {
    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    status: string;

    @ApiProperty()
    @AutoMap()
    startTime?: Date;

    @ApiProperty()
    @AutoMap()
    endTime?: Date;

    @ApiProperty()
    @AutoMap()
    cronJob?: string;

    @ApiProperty()
    @AutoMap()
    typeJob: string;

    @ApiProperty()
    @AutoMap()
    rawData?: string;

    @ApiProperty()
    @AutoMap()
    key: string;

    @ApiProperty()
    @AutoMap()
    typeBusiness: string;

    @ApiProperty()
    @AutoMap()
    relatedId?: number;

    @ApiProperty()
    @AutoMap()
    relatedType?: string;

    @AutoMap()
    jobDetail: string;

    @AutoMap()
    description: string;
}
