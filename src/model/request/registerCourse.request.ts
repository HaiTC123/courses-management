import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export class RegisterCourse {
    @ApiProperty()
    @IsInt()
    courseId: number;
  
    @ApiProperty()
    @IsInt()
    semeterId: number;
}


export class BuyCourse {
    @ApiProperty()
    @IsInt()
    courseId: number;
  
    @ApiProperty()
    @IsInt()
    semeterId: number;
}