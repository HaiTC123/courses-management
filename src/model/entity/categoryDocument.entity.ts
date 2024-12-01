import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';

export class CategoryDocumentEntity extends BaseEntity{
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  description?: string;

}
