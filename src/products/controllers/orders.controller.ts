import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  @Get()
  get(@Query('limit') limit = 10, @Query('offset') offset = 4) {
    return {
      message: `users limit=${limit} and offset=${offset}`,
    };
  }
  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Create',
      payload,
    };
  }
  @Put(':id')
  update(@Param() id: number, @Body() payload: any) {
    return {
      message: 'update',
      payload,
      id,
    };
  }

  @Delete(':id')
  deleteProduct(@Param() id: number) {
    return {
      message: 'Delete',
      id,
    };
  }
}
