// core/services/base.service.ts
import { HttpContextService } from "src/common/services/http-context.service";
import { CoreService } from "src/core/core.service";
import { PageRequest } from "src/model/request/page.request";
import { PageResult } from "src/model/response/page.response";
import { BaseRepository } from "src/repo/base.repo";
import { PrismaService } from "src/repo/prisma.service";


export class BaseService<T extends { id: number }, K> {
  protected readonly _mapperService;
  protected readonly _emailService;
  protected readonly _authService: HttpContextService;
  protected repository: any;
  protected readonly entityFactory: new () => K;
  constructor(
    protected readonly prismaService: PrismaService,
    protected readonly coreService: CoreService) {
    this._mapperService = coreService.getMapperSerivce();
    this._emailService = coreService.getEmailService();
    this._authService = coreService.getAuthService();
    
  }

  setRepo(modelName: string){
    this.repository = this.prismaService.createRepo<T, K>(modelName,this.prismaService.getModelByType(modelName));
  }

  // // Tạo mới entity
  async add(entity: T): Promise<number> {
    var result = await this.repository.create(entity, {
      select: {
        id: true
      }
    }, this.getMoreCreateData());
    return Number(result.id);
  }

  // Lấy entity theo filter và các thuộc tính liên quan
  async getOne(conditions: { [key: string]: any }): Promise<T> {
    const data = await this.repository.findOneWithCondition(conditions);
    this.afterGetData(data);
    return data;
  }

  async getOneAndReference(conditions: { [key: string]: any }, includeReferences: { [key: string]: boolean } = {}): Promise<T> {
    const data = await this.repository.findOneWithConditionAndGetReference(conditions, includeReferences);
    this.afterGetData(data);
    return data;
  }

  async getMany(conditions: { [key: string]: any }): Promise<T[]> {
    const data = await this.repository.findManyWithCondition(conditions);
    this.afterGetDatas(data);
    return data;
  }

  // Xóa entity
  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Xóa Danh sách Entity theo IDs
  async removeIDs(ids: number[]): Promise<void> {
    await this.repository.deleteByIds(ids);
  }

  // Cập nhật entity
  async update(id: number, model: Partial<T>): Promise<boolean> {
    await this.repository.update(id, model, this.getMoreUpdateData());
    return true;
  }

  async updateMany(conditions: { [key: string]: any }, data): Promise<boolean>{
    await this.repository.updateMany(conditions, data);
    return true;
  }

  // Lấy dữ liệu phân trang
  async getPaging(pageRequest: PageRequest): Promise<PageResult<T>> {
    const pagingData = await this.repository.getPaging(pageRequest, false);
    this.afterGetDatas(pagingData.data);
    return pagingData;
  }

  protected afterGetDatas(entities: T[]): void {

  }
  protected afterGetData(entity: T): void {
  }

  protected getMoreCreateData() {
    return {
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: this._authService?.getFullname() || 'system', // Nếu không truyền vào thì lấy 'system'
      updatedBy: this._authService?.getFullname() || 'system',
    };
  }

  protected getMoreUpdateData() {
    return {
      updatedAt: new Date(),
      updatedBy: this._authService?.getFullname() || 'system',
    };
  }

}
