import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { PatchCoffeeDto } from './dto/patch-coffee.dto/patch-coffee.dto';
import { Coffee } from './models/Coffee.model';

@Injectable()
export class CoffeesService {

  constructor(@InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>) { };

  async findById(id: String) {
    const foundItem = await this.coffeeRepository.findOne({
      where: {
        id: Number(id)
      }
    })

    if (!foundItem) {
      throw new NotFoundException(`Coffee with id: ${id} not found.`);
    }

    return foundItem;
  }

  findAll() {
    return this.coffeeRepository.find();
  }

  async updateItem(id: string, item: PatchCoffeeDto) {
    let foundItem = await this.findById(id);

    if (!foundItem) {
      throw new NotFoundException(`Coffee with id: ${id} not found.`);
    }

    await this.coffeeRepository.update(id, item)

    return item;
  }

  create(createCoffeeDto: CreateCoffeeDto) {

    const newItem = this.coffeeRepository.create(createCoffeeDto);
    return this.coffeeRepository.save(newItem);

  }
}
