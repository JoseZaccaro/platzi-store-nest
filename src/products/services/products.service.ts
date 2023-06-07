import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreateProductDto,
  UpdateProductDto,
} from 'src/products/dto/products.dto';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 2;
  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'lorem',
      price: 200,
      stock: 10,
      image: '100',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id == id);
    if (!product) {
      throw new NotFoundException('El producto #' + id + ' no existe');
    }
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId = this.counterId + 1;
    const newProd = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProd);
    return newProd;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id);
    if (!product) return null;

    const index = this.products.findIndex((item) => item.id == product.id);

    this.products[index] = {
      ...product,
      ...payload,
    };
    return this.products[index];
  }

  delete(id: number) {
    const filtered = this.products.filter((item) => item.id != id);
    this.products = [...filtered];
    return 'Deleted';
  }
}
