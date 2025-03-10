import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
} from '@nestjs/common';
import { ShoesService } from './shoes.service';
import { CreateShoeDto } from './dto/create-shoe.dto';
import { UpdateShoeDto } from './dto/update-shoe.dto';
import { RestockShoeDto } from './dto/restock-shoe.dto';

@Controller('zapatos')
export class ShoesController {
  constructor(private readonly shoesService: ShoesService) {}

  @Post()
  create(@Body() createShoeDto: CreateShoeDto) {
    return this.shoesService.create(createShoeDto);
  }

  @Post('restock')
  restock(@Body() restockShoeDto: RestockShoeDto) {
    return this.shoesService.restock(restockShoeDto);
  }

  @Get()
  findAll() {
    return this.shoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.shoesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateShoeDto: UpdateShoeDto,
  ) {
    return this.shoesService.update(id, updateShoeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.shoesService.remove(id);
  }
}
