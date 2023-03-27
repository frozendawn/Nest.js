import { IsString } from 'class-validator';

export class CreateCoffeeDto {

  @IsString()
  readonly type: string;

  @IsString()
  readonly description: string;
}
