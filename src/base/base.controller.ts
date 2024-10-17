// base.controller.ts
import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { BaseService } from './base.service';
import { CoreService } from 'src/core/core.service';
import { ServiceResponse } from 'src/model/response/service.response';


export class BaseController<TEntity extends {id: number}, TModel, TDto> {
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

    @Get(':id')
    async getById(@Param('id') id: number): Promise<ServiceResponse> {
        var data = await this.baseService.getOne({
            id: id
        });
        const result = this._mapperService.mapData(data, this.TEntityClass, this.TModelClass);
        return ServiceResponse.onSuccess(result);
    }

    @Get('all')
    async getAll() {
        var data = await this.baseService.getMany({});
        return ServiceResponse.onSuccess(data);
    }

    @Post()
    async create(@Body() model: TModel) {
        // const entity = new this.entityFactory();
        // Object.assign(entity, model);
        // const result = await this.baseService.create(entity);
        return { data: 1 };
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() model: TModel) {
        // const result = await this.baseService.update(id, model);
        return { data: 1 };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        // const result = await this.baseService.delete(id);
        return { message: 'Deleted successfully', data: 1 };
    }
}
