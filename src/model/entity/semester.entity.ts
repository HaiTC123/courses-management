import { AutoMap } from '@automapper/classes';
import { BaseEntity } from '../entity/base.entity';

export class SemesterEntity extends BaseEntity {
  @AutoMap()
  id: number; // Khóa chính tự động tăng

  @AutoMap()
  name: string; // Tên học kỳ

  @AutoMap()
  startDate: Date; // Ngày bắt đầu học kỳ

  @AutoMap()
  endDate: Date; // Ngày kết thúc học kỳ

  @AutoMap()
  isCurrent: boolean; // Xác định nếu học kỳ hiện tại

}
