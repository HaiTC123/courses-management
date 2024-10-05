// core/repositories/base.repository.ts
import { PrismaClient, Prisma } from '@prisma/client';

export class BaseRepository<T extends { id: number }> {
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
    //#endregion

    // Tạo mới bản ghi
    async create(data: Prisma.UserCreateInput): Promise<T> {
        return this.model.create({
            data,
        });
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
}
