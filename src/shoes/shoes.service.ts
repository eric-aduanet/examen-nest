import { RestockShoeDto } from './dto/restock-shoe.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateShoeDto } from './dto/create-shoe.dto';
import { UpdateShoeDto } from './dto/update-shoe.dto';
import { Shoe } from './entities/shoes.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidGenders } from './interfaces/genders.interface';
import { Repository } from 'typeorm';

@Injectable()
export class ShoesService {
  constructor(
    @InjectRepository(Shoe)
    private readonly shoesRepository: Repository<Shoe>,
  ) {}

  async create(createShoeDto: CreateShoeDto) {
    if (!ValidGenders.includes(createShoeDto.gender))
      throw new BadRequestException(
        `No existe el genero especificado (se envio ${createShoeDto.gender}), los valores aceptados son: [${ValidGenders}] y debe estar capitalizado correctamente.`,
      );
    if (createShoeDto.size % 0.5 !== 0)
      throw new BadRequestException(
        `La talla no forma parte de las medidas americanas (entre 5 y 13 en incrementos de 0.5)`,
      );
    const shoe = await this.shoesRepository.create(createShoeDto);
    await this.shoesRepository.save(shoe);
    return shoe;
  }

  async findAll() {
    return await this.shoesRepository.find({ where: { active: true } });
  }

  async findOne(id: string) {
    const shoe = await this.shoesRepository.findOneBy({ id: id });
    if (!shoe || shoe.active === false)
      throw new NotFoundException(`Zapato con id ${id} no encontrado`);
    return shoe;
  }

  async restock(restockShoeDto: RestockShoeDto) {
    const shoe = await this.findOne(restockShoeDto.id);

    shoe.stock += restockShoeDto.stock;

    const updatedShoe = this.shoesRepository.save(shoe);

    return updatedShoe;
  }

  async update(id: string, updatedShoeDto: UpdateShoeDto) {
    const shoe = { ...(await this.findOne(id)), ...updatedShoeDto };
    const updatedShoe = await this.shoesRepository.save(shoe);
    return updatedShoe;
  }

  async remove(id: string) {
    const shoe = await this.findOne(id);

    const deletedShoe = await this.shoesRepository.save({
      ...shoe,
      active: false,
    });
    return deletedShoe;
  }
}
