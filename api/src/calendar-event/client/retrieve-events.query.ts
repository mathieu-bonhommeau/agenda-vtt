import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator'

export class RetrieveEventsQuery {
    @ApiProperty({ example: '2024-07-16T06:56:15.151' })
    @IsOptional()
    @IsDateString()
    start?: string

    @ApiProperty({ example: '2024-07-16T06:56:15.151' })
    @IsOptional()
    @IsDateString()
    end?: string

    @ApiProperty({ example: '2.25,45.63,2.36,48.88' })
    @IsOptional()
    @IsString()
    bbox?: string

    @ApiProperty({ example: 'search word' })
    @IsOptional()
    @IsString()
    keyWord?: string

    @ApiProperty({ example: '40' })
    @IsOptional()
    @IsString()
    distanceMax?: string

    @ApiProperty({ example: '40' })
    @IsOptional()
    @IsString()
    distanceMin?: string

    @ApiProperty({ example: 'date' })
    @IsOptional()
    @IsIn(['date', 'location'])
    sortBy?: string
}
