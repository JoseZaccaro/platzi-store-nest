import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

// import { Response } from 'express';
import { ParseIntPipe } from 'src/common/parse-int.pipe';
import { ProductsService } from 'src/products/services/products.service';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dto/products.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get('new')
  newEndpoint() {
    return { message: 'Soy el nuevo endpoint' };
  }
  // * Rutas estaticas primero
  @Get()
  @ApiOperation({
    summary: 'List of products',
  })
  getProducts(
    @Query('limit') limit = 10,
    @Query('offset') offset = 4,
    @Query('brand') brand: string,
  ) {
    return this.productsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  // ! Rutas dinamicas último
  // !@Res() response: Response,
  // * (este ultimo va como parametro del controller)👮
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) id: number) {
    /* //! Respuesta directamente con EXPRESS utilizando los decoradores Res y el tipo Response.
     response.status(200).send(
       { message: `producto con ID =>${id}` },
     );*/
    //  * Respuesta con NestJs
    // return { message: `producto con ID =>${id}` };
    return this.productsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.delete(id);
  }
}
