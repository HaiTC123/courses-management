import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';
import { BaseDto } from './base.dto';
import { CategoryDocumentDto } from './categoryDocument.dto';

export class DocumentDto extends BaseDto{
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty({ required: false })
  @AutoMap()
  courseId?: number;

  @ApiProperty()
  @AutoMap()
  categoryId: number;

  @ApiProperty()
  @AutoMap()
  documentName: string;

  @ApiProperty({ required: false })
  @AutoMap()
  description?: string;

  @ApiProperty()
  @AutoMap()
  accessUrl: string;

  @ApiProperty()
  @AutoMap()
  fileType: string;

  @ApiProperty()
  @AutoMap()
  backgroundUrl: string;

  category: CategoryDocumentDto;

}
