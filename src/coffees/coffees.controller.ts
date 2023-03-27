import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, NotFoundException, Param, Post } from '@nestjs/common';
import { Patch, Res } from '@nestjs/common/decorators';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { PatchCoffeeDto } from './dto/patch-coffee.dto/patch-coffee.dto';


@Controller('coffees')
export class CoffeesController {

  constructor(private readonly coffeeService: CoffeesService) {};

  @Get()
  findALl() {
    return this.coffeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeeService.findById(id);
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  createCoffee(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeeService.create(createCoffeeDto)
  }

  @Patch(':id')
  patchCoffee(@Param('id') id: string, @Body() patchCoffeeDto: PatchCoffeeDto) {

    return this.coffeeService.updateItem(id, patchCoffeeDto);

  }
}