import { IsString } from 'class-validator';
import { Flavor } from 'src/coffees/models/Flavor.model.ts';

export class CreateCoffeeDto {

  @IsString()
  readonly type: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly flavor: string;
}
