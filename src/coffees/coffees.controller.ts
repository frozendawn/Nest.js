import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, NotFoundException, Param, Post } from '@nestjs/common';
import { Delete, Patch, Query, Res } from '@nestjs/common/decorators';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { PatchCoffeeDto } from './dto/patch-coffee.dto/patch-coffee.dto';
import { PaginationQueryDto } from './common/pagination-query.dto/pagination-query.dto';


@Controller('coffees')
export class CoffeesController {

  constructor(private readonly coffeeService: CoffeesService) {};

  @Get()
  findALl(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery);
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

  @Delete(':id')
  async removeCoffee(@Param('id') id: string) {

    const foundItem = await this.findOne(id);

    if(!foundItem) {
      throw new NotFoundException(`Coffee with id: ${id} not found.`)
    }

    await this.coffeeService.delete(id);
    return foundItem;
  }

  @Get('/recommend/:id')
  async recommendCoffee(@Param('id') id) {
    const foundCoffee = await this.coffeeService.findById(id);

    if (!foundCoffee) {
      throw new NotFoundException("Coffee not found");
    }

    try {
      await this.coffeeService.recommendCoffee(foundCoffee);
    } catch (error) {
      throw new InternalServerErrorException("Error occured while trying to add recomendation please try again later!")
    }
    return foundCoffee
    
  }
}
