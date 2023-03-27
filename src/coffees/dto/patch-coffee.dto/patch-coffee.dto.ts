import { IsOptional, IsString } from "class-validator";

export class PatchCoffeeDto {
  @IsString()
  @IsOptional()
  readonly type?: string;
  
  @IsString()
  @IsOptional()
  readonly description?: string;
}