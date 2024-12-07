import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';

export class JobConfigEntity extends BaseEntity {
  @AutoMap()
  id: number;

  @AutoMap()
  status: string;

  @AutoMap()
  startTime?: Date;

  @AutoMap()
  endTime?: Date;

  @AutoMap()
  cronJob?: string;

  @AutoMap()
  typeJob: string;

  @AutoMap()
  rawData?: string;

  @AutoMap()
  key: string;

  @AutoMap()
  typeBusiness: string;

  @AutoMap()
  relatedId?: number;

  @AutoMap()
  relatedType?: string;

  @AutoMap()
  jobDetail: string;

  @AutoMap()
  description: string;

}
