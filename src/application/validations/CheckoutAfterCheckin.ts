import { ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import * as moment from 'moment';

@ValidatorConstraint({ name: 'CheckoutAfterCheckin' })
class CheckoutAfterCheckinValidator implements ValidatorConstraintInterface {
	validate(checkout: string, { object }: any) {
    const checkinDate = moment(object.checkin, 'YYYY-MM-DD');
    const checkoutDate = moment(checkout, 'YYYY-MM-DD');

    return checkoutDate.isSameOrAfter(checkinDate, 'day');
  }
}

export function CheckoutAfterCheckin(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: {
        message: `The ${propertyName} date can not be before than checkin`,
        ...validationOptions,
      }, 
      validator: CheckoutAfterCheckinValidator,
    });
  };
}
