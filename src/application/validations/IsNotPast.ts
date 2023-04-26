import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import * as moment from 'moment';

@ValidatorConstraint({ name: 'IsNotPast' })
class IsNotPastValidator implements ValidatorConstraintInterface {
	validate(date: string) {
		const today = moment().startOf('day');
    const formattedDate = moment(date, 'YYYY-MM-DD');
    return formattedDate.isSameOrAfter(today);
  }
}

export function IsNotPast(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `The ${propertyName} cannot be before today`,
        ...validationOptions,
      }, 
      validator: IsNotPastValidator,
    });
  };
}
