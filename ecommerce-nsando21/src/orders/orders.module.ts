import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { User } from 'src/users/entities/user.entity';
import { OrderDetail } from './entities/order-detail.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, OrderDetail, Product])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
