import { ApiProperty } from '@nestjs/swagger';

import { IsDate, IsNotEmpty } from 'class-validator';

import { Type } from 'class-transformer';
import { LessThen3Days } from '../validations/LessThen3Days';
import { CheckoutAfterCheckin } from '../validations/CheckoutAfterCheckin';
import { IsNotPast } from '../validations/IsNotPast';

export default  class SearchDateRequestDTO {
	@IsNotEmpty()
	@ApiProperty({ type: Date })
	@Type(() => Date)
	@IsDate()
	@IsNotPast()
	@CheckoutAfterCheckin()
	checkout: string;
	
  @IsNotEmpty()
  @ApiProperty({ type: Date })
  @Type(() => Date)
  @IsDate()
	@IsNotPast()
	@LessThen3Days()
  checkin: string;
}
