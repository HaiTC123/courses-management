// base.controller.ts
import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { BaseService } from './base.service';
import { CoreService } from 'src/core/core.service';
import { ServiceResponse } from 'src/model/response/service.response';
import { PageRequest } from 'src/model/request/page.request';

export class BaseController<TEntity extends {id: number}, TModel> {
    protected readonly entityFactory: new () => TEntity
    protected readonly _mapperService;
    protected TEntityClass: any;
    protected TModelClass: any;
    constructor(
        modelName: string,
        coreService: CoreService,
        protected readonly baseService: BaseService<TEntity, TModel>
    ) {
        this.baseService.setRepo(modelName);
        this._mapperService = coreService.getMapperSerivce();
        this.TEntityClass = Reflect.getMetadata('design:type', this, 'entity');
        this.TModelClass = Reflect.getMetadata('design:type', this, 'model')
    }

    @Get('all')
    async getAll() {
        var data = await this.baseService.getMany({});
        return ServiceResponse.onSuccess(this._mapperService.mapListData(data, this.TEntityClass, this.TModelClass));
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<ServiceResponse> {
        var data = await this.baseService.getOne({
            id: id
        });
        const result = this._mapperService.mapData(data, this.TEntityClass, this.TModelClass);
        if (result == null){
            return ServiceResponse.onBadRequest(null, "Not found");
        }
        return ServiceResponse.onSuccess(result);
    }

    @Post(':id/reference')
    async GetDetail(@Param('id') id: number, @Body() includeReferences: { [key: string]: boolean } = {} ): Promise<ServiceResponse> {
        var data = await this.baseService.getOneAndReference({
            id: id
        },includeReferences);
        const result = this._mapperService.mapData(data, this.TEntityClass, this.TModelClass);
        if (result == null){
            return ServiceResponse.onBadRequest(null, "Not found");
        }
        return ServiceResponse.onSuccess(result);
    }

    @Post()
    async create(@Body() param: TEntity) {
        return ServiceResponse.onSuccess(await this.baseService.add(param));
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() model: Partial<TEntity>) {
        const result = await this.baseService.update(id, model);
        return ServiceResponse.onSuccess(id,"Update Success")
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        var data = await this.baseService.getOne({
            id: id
        });
        if (data == null){
            return ServiceResponse.onBadRequest(null, "Entity not exist");
        }
        await this.baseService.remove(id);
        return ServiceResponse.onSuccess(id,"Deleted successfully");
    }

    @Post('paging')
    async paging(@Body() param: PageRequest): Promise<ServiceResponse> {
        var result = await this.baseService.getPaging(param);
        result.data = this._mapperService.mapListData(result.data, this.TEntityClass, this.TModelClass);
        return ServiceResponse.onSuccess(result);
    }
}
