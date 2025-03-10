import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { Shoe } from 'src/shoes/entities/shoes.entity';
import { ShoesService } from 'src/shoes/shoes.service';
import { ShoeDetailsDto } from './dto/shoe-details.dto';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Shoe) private readonly shoeRepository: Repository<Shoe>,
    @Inject() private readonly shoeService: ShoesService,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    const shoe = await this.shoeService.findOne(createPurchaseDto.shoeId);
    const purchase = await this.purchaseRepository.create({
      shoe,
      quantity: createPurchaseDto.quantity,
    });
    const newPurchase = await this.purchaseRepository.save(purchase);
    return newPurchase;
  }

  async findAll() {
    return await this.purchaseRepository.find({});
  }

  async findOne(id: number) {
    const purchase = await this.purchaseRepository.findOneBy({ id: id });
    if (!purchase)
      throw new NotFoundException(`Venta con id ${id} no encontrado`);
    return purchase;
  }

  async findAllWithDetails(shoeDetailsDto: ShoeDetailsDto) {
    if (!shoeDetailsDto) return this.findAll();

    let queryBuilder = this.shoeRepository.createQueryBuilder('shoe');

    if (shoeDetailsDto.brand) {
      queryBuilder = queryBuilder.andWhere('shoe.brand in (:...brand)', {
        brand: shoeDetailsDto.brand,
      });
    }
    if (shoeDetailsDto.gender) {
      queryBuilder = queryBuilder.andWhere('shoe.gender in (:...gender)', {
        gender: shoeDetailsDto.gender,
      });
    }
    if (shoeDetailsDto.category) {
      queryBuilder = queryBuilder.andWhere('shoe.category in (:...category)', {
        category: shoeDetailsDto.category,
      });
    }
    const shoes = await queryBuilder.getMany();

    if (shoes.length === 0) return [];

    const purchases = this.purchaseRepository
      .createQueryBuilder('purchase')
      .where('purchase.shoeId IN (:...shoes)', {
        shoes: shoes.map((shoe) => shoe.id),
      })
      .getMany();

    return purchases;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
