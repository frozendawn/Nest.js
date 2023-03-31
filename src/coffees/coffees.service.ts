import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { PatchCoffeeDto } from './dto/patch-coffee.dto/patch-coffee.dto';
import { Coffee } from './models/Coffee.model';
import { Flavor } from './models/Flavor.model.ts';

@Injectable()
export class CoffeesService {

  constructor(
    @InjectRepository(Coffee) private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor) private readonly flavorRepository: Repository<Flavor>
  ) { };

  async findById(id: String) {
    const foundItem = await this.coffeeRepository.findOne({
      where: {
        id: Number(id)
      },
      relations: ['flavor']
    })

    if (!foundItem) {
      throw new NotFoundException(`Coffee with id: ${id} not found.`);
    }

    return foundItem;
  }

  findAll() {
    return this.coffeeRepository.find({
      relations: ['flavor']
    });
  }

  async findOrCreateFlavor(name: string): Promise<Flavor> {
    const foundFlavor = await this.flavorRepository.findOne({
      where: {
        name
      }
    });

    if (foundFlavor) {
      return foundFlavor;
    }
    const newFlavor = this.flavorRepository.create({ name });

    return newFlavor;

  }

  async updateItem(id: string, item: PatchCoffeeDto) {
    let foundItem = await this.findById(id);

    if (!foundItem) {
      throw new NotFoundException(`Coffee with id: ${id} not found.`);
    }

    const flavor = item?.flavor && await this.findOrCreateFlavor(item?.flavor);
    await this.coffeeRepository.preload({
      id: +id,
      ...item,
      flavor
    })
    return item;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto);

    const flavor = await this.findOrCreateFlavor(createCoffeeDto.flavor);
    console.log(flavor);


    const newItem = this.coffeeRepository.create(
      {
        ...createCoffeeDto,
        flavor
      }
    );
    return await this.coffeeRepository.save(newItem);
  }

  async delete(id: string) {
    return this.coffeeRepository.delete(id)
  }
}
