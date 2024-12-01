import { AutoMap } from '@automapper/classes';
import { BaseEntity } from './base.entity';
import { CategoryDocumentEntity } from './categoryDocument.entity';

export class DocumentEntity extends BaseEntity{
    @AutoMap()
    id: number;

    @AutoMap()
    courseId?: number;

    @AutoMap()
    categoryId: number;

    @AutoMap()
    documentName: string;

    @AutoMap()
    description?: string;

    @AutoMap()
    accessUrl: string;

    @AutoMap()
    fileType: string;

    @AutoMap()
    backgroundUrl: string;

    category: CategoryDocumentEntity;

}
