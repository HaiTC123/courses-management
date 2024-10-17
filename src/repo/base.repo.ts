// core/repositories/base.repository.ts
import { PrismaClient, Prisma } from '@prisma/client';
import { validateInputs } from 'src/utils/common.utils';
import { PageRequest } from 'src/model/request/page.request';
import { PageResult } from 'src/model/response/page.response';

export class BaseRepository<T extends { id: number }, U> {
    protected prisma: PrismaClient;
    protected model: any;

    constructor(prisma: PrismaClient, model: any) {
        this.prisma = prisma;
        this.model = model;
    }


    //#region  Get

    // Lấy tất cả bản ghi
    async getAll(): Promise<T[]> {
        return this.model.findMany();
    }

    // Lấy bản ghi theo ID
    async getById(id: number): Promise<T | null> {
        return this.model.findUnique({
            where: { id },
        });
    }

    async findUnique(where: any, options?: any): Promise<T | null>{
        return this.model.findUnique({
            where,
            select: {
                ...options
            }
        })
    }

    // Tìm kiếm nhiều bản ghi theo một trường nhất định
    async findByField(fieldName: string, value: any): Promise<T[]> {
        return this.model.findMany({
            where: {
                [fieldName]: value,
            },
        });
    }

    // Tìm kiếm một bản ghi theo một trường nhất định
    async findOneByField(fieldName: string, value: any): Promise<T | null> {
        return this.model.findFirst({
            where: {
                [fieldName]: value,
            },
        });
    }

    // Tìm kiếm nhiều bản ghi theo danh sách trường với một giá trị
    async findByFields(fields: string[], value: any): Promise<T[]> {
        const whereCondition = fields.reduce((acc, field) => {
            acc[field] = value;
            return acc;
        }, {});
        return this.model.findMany({
            where: whereCondition,
        });
    }

    // Tìm kiếm một bản ghi theo danh sách trường với một giá trị
    async findOneByFields(fields: string[], value: any): Promise<T | null> {
        const whereCondition = fields.reduce((acc, field) => {
            acc[field] = value;
            return acc;
        }, {});
        return this.model.findFirst({
            where: whereCondition,
        });
    }

    // Tìm kiếm nhiều bản ghi theo danh sách trường truyền vào và giá trị tương ứng
    async findByFieldList(fieldList: { [key: string]: any }): Promise<T[]> {
        return this.model.findMany({
            where: fieldList,
        });
    }

    // Tìm kiếm một bản ghi theo danh sách trường truyền vào và giá trị tương ứng
    async findOneByFieldList(fieldList: { [key: string]: any }): Promise<T | null> {
        return this.model.findFirst({
            where: fieldList,
        });
    }

    // Tìm kiếm một bản ghi theo điều kiện phức tạp
    async findOneWithCondition(conditions: { [key: string]: any }): Promise<T | null> {
        return this.model.findFirst({
            where: conditions
        });
    }

    // Tìm kiếm nhiều bản ghi theo điều kiện phức tạp
    async findManyWithCondition(conditions: { [key: string]: any }): Promise<T[] | null> {
        return this.model.findMany({
            where: conditions
        });
    }
    //#endregion

    // Tạo mới bản ghi
    async create(data: any, option?: any): Promise<T> {
        const createOption: any = { data };
        if (option && Object.keys(option).length > 0) {
            createOption.select = option;
        }
        return this.model.create(createOption);
    }

    // Cập nhật bản ghi theo ID
    async update(id: number, data: Partial<T>): Promise<T> {
        return this.model.update({
            where: { id },
            data,
        });
    }

    // Xóa bản ghi theo ID
    async delete(id: number): Promise<T> {
        return this.model.delete({
            where: { id },
        });
    }

    async getPaging(pageRequest: PageRequest, isIgnoreFilter: boolean = false): Promise<PageResult<T>> {
        validateInputs(pageRequest.pageNumber, pageRequest.pageSize);
        
        let query: any = {}; // Prisma `findMany` không dùng IQueryable mà dùng object filter

        if (pageRequest.filter) {
            query = {
                where: {
                    ...JSON.parse(pageRequest.filter), // Bạn có thể parse filter từ chuỗi JSON nếu cần
                },
            };
        }

        if (pageRequest.sortOrder) {
            query.orderBy = { [pageRequest.sortOrder]: 'asc' }; // Hoặc 'desc' nếu cần
        }

        // Lấy tổng số items
        const totalItems = await this.model.count({ where: query.where });

        // Thêm logic bỏ qua filter nếu cần
        if (isIgnoreFilter) {
            // Nếu không muốn dùng filter, có thể set lại query
            query.where = {};
        }

        // Thực hiện phân trang
        const data = await this.model.findMany({
            ...query,
            skip: (pageRequest.pageNumber - 1) * pageRequest.pageSize,
            take: pageRequest.pageSize,
        });

        return {
            data,
            totalCount: totalItems,
        };
    }
}
