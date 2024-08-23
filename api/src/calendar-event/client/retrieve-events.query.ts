import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsIn, IsOptional, IsString } from 'class-validator'

export class RetrieveEventsQuery {
    @ApiProperty({ example: '2024-07-16T06:56:15.151' })
    @IsDateString()
    @IsOptional()
    start?: string

    @ApiProperty({ example: '2024-07-16T06:56:15.151' })
    @IsDateString()
    @IsOptional()
    end?: string

    @ApiProperty({ example: '2.25,45.63,2.36,48.88' })
    @IsString()
    @IsOptional()
    bbox?: string

    @ApiProperty({ example: 'search word' })
    @IsString()
    @IsOptional()
    keyWord?: string

    @ApiProperty({ example: '40' })
    @IsString()
    @IsOptional()
    distanceMax?: string

    @ApiProperty({ example: '40' })
    @IsString()
    @IsOptional()
    distanceMin?: string

    @ApiProperty({ example: 'date' })
    @IsIn(['date', 'location'])
    @IsOptional()
    sortBy?: string
}