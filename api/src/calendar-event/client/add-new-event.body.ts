import { ApiProperty } from '@nestjs/swagger'
import {
    IsArray,
    IsDateString,
    IsEmail,
    IsIn,
    IsLatitude,
    IsLongitude,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    IsUrl,
    IsUUID,
    Length,
    ValidateNested,
} from 'class-validator'
import { Type } from 'class-transformer'
import { Contact, EventLocation, EventOrganizer, LatLon, Trace, TraceColor } from '../business/models/calendar.event'
import { IsGreaterThanStartDate } from '../../_common/constraints/is-greater-than-start-date.constraint'

export class AddNewEventBody {
    @ApiProperty({ example: '07e46831-5247-45a0-bc6f-f5e075d963c9' })
    @IsUUID()
    id: string

    @ApiProperty({ example: 'my title' })
    @IsNotEmpty()
    @IsString()
    title: string

    @ApiProperty({ example: 'my description' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    description?: string

    @ApiProperty({ example: '2024-07-16T06:56:15.151' })
    @IsDateString()
    startDate: string

    @ApiProperty({ example: '2024-07-16T06:56:15.151' })
    @IsDateString()
    @IsGreaterThanStartDate()
    endDate: string

    @ApiProperty({ type: 'json' })
    @ValidateNested({ each: true })
    @Type(() => EventLocationBody)
    eventLocation: EventLocation

    @ApiProperty({ type: 'json' })
    @ValidateNested({ each: true })
    @Type(() => TraceBody)
    traces: Trace[]

    @ApiProperty({ example: '25' })
    @IsOptional()
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    price?: string[]

    @ApiProperty({ example: '25' })
    @IsOptional()
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    services?: string[]

    @ApiProperty({ type: 'json' })
    @ValidateNested({ each: true })
    @Type(() => OrganizerBody)
    organizer: EventOrganizer
}

export class EventLocationBody {
    @ApiProperty({ example: '07e46831-5247-45a0-bc6f-f5e075d963c9' })
    @IsUUID()
    id: string

    @ApiProperty({ example: 'FR' })
    @IsString()
    @Length(2, 2)
    country: string

    @ApiProperty({ example: 'Nouvelle Aquitaine' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    region?: string

    @ApiProperty({ example: 'Les Landes' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    county?: string

    @ApiProperty({ example: 'Paris' })
    @IsNotEmpty()
    @IsString()
    city: string

    @ApiProperty({ example: '75000' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    postcode?: string

    @ApiProperty({ example: '25' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    housenumber?: string

    @ApiProperty({ example: '155 allee des chasseurs' })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    address: string

    @ApiProperty({ type: 'json' })
    @ValidateNested({ each: true })
    @Type(() => LatLonBody)
    latLon: LatLon
}

export class LatLonBody {
    @ApiProperty({ example: 1.12515645455 })
    @IsLatitude()
    @Type(() => Number)
    lat: number

    @ApiProperty({ example: 1.12515645455 })
    @IsLongitude()
    @Type(() => Number)
    lon: number
}

export class TraceBody {
    @ApiProperty({ example: '07e46831-5247-45a0-bc6f-f5e075d963c9' })
    @IsUUID()
    id: string

    @ApiProperty({ example: 524 })
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    utagawaId?: number

    @ApiProperty({ example: 'https://utagawavtt.com/trace-546' })
    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    link?: string

    @ApiProperty({ example: 25 })
    @IsNumber()
    @IsPositive()
    distance: number

    @ApiProperty({ example: 350 })
    @IsOptional()
    @IsNumber()
    @IsPositive()
    positiveElevation?: number

    @ApiProperty({ example: 'green' })
    @IsOptional()
    @IsNotEmpty()
    @IsIn(['green', 'blue', 'red', 'black'])
    traceColor?: TraceColor
}

export class OrganizerBody {
    @ApiProperty({ example: '07e46831-5247-45a0-bc6f-f5e075d963c9' })
    @IsUUID()
    id: string

    @ApiProperty({ example: 'my name' })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ example: 'email@email.com' })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({ example: 'https://example.com' })
    @IsOptional()
    @IsNotEmpty()
    @IsUrl()
    website?: string

    @ApiProperty({ type: 'json' })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ContactBody)
    contacts?: Contact[]
}

export class ContactBody {
    @ApiProperty({ example: 'John Doe' })
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty({ example: '0654854578' })
    @IsNotEmpty()
    @IsString()
    phone: string
}
