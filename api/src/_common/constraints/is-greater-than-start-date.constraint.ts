import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ async: false })
export class IsGreaterThanStartDateConstraint implements ValidatorConstraintInterface {
    validate(value: string, validationArguments?: ValidationArguments) {
        const args = validationArguments.object
        return new Date(value).valueOf() >= new Date(args['startDate']).valueOf()
    }

    defaultMessage() {
        return 'The end date must be greater than the start date'
    }
}

export function IsGreaterThanStartDate(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsGreaterThanStartDateConstraint,
        })
    }
}
