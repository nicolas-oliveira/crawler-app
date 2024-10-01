import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import * as moment from 'moment';

@ValidatorConstraint({ name: 'LessThen3Days' })
class LessThen3DaysValidator implements ValidatorConstraintInterface {
	validate(checkin: string, { object }: any) {
    const checkinDate = moment(checkin, 'YYYY-MM-DD');
    const checkoutDate = moment(object.checkout, 'YYYY-MM-DD');

    return checkoutDate.diff(checkinDate, 'days') >= 3;
  }
}

export function LessThen3Days(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `The checkin and checkout dates can not be less than 3 days`,
        ...validationOptions,
      }, 
      validator: LessThen3DaysValidator,
    });
  };
}
