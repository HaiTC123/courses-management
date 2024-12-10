import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../entity/base.entity';

export class SemesterEntity extends BaseEntity {
    @AutoMap()
    id: number;

    @AutoMap()
    name: string;

    @AutoMap()
    startDate: Date;

    @AutoMap()
    endDate: Date;

    @AutoMap()
    isCurrent: boolean;

    @AutoMap()
    isDone: boolean;
}
