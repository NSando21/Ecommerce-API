import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { User as Users } from 'src/users/entities/user.entity';
import { OrderDetail } from './entities/order-detail.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepository: Repository<OrderDetail>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}
  async create(userId: string, products: Partial<Product[]>) {
    // Pasamos un String el cual se toma de referencia para la instancia de Users
    const user: Users | null = await this.usersRepository.findOneBy({
      id: userId,
    }); //Users
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Esta es una instancia de que se dicta dada la entidad de Orders
    const order = new Order();
    order.user = user;
    order.date = new Date();

    const newOrder = await this.orderRepository.save(order);

    let total = 0;

    // Product = [{id:"strings"},{id:"strings"}]
    const productsArray: Product[] = await Promise.all(
      products.map(async (element) => {
        const product: Product | null = await this.productsRepository.findOneBy(
          {
            id: element?.id,
          },
        );

        if (!product) {
          throw new NotFoundException('Product not Found');
        }

        total += Number(product.price);

        if (product.stock <= 0) {
          throw new BadRequestException(`Product ${product.name} has no stock`);
        }
        // ACTUALIZAMOS EL STOCK
        await this.productsRepository.update(
          { id: element?.id },
          { stock: product.stock - 1 },
        );

        return product;
      }),
    );

    // productsArray = [ Products {id, price, imgUrl, category, stock: -1}, Products {id, price, imgUrl, category, stock: -1}]
    const orderDetail = new OrderDetail();
    orderDetail.order = newOrder; // Order{}
    orderDetail.price = Number(total.toFixed(2)); //99.50
    orderDetail.products = productsArray;
    // Se almacena toda la orden con toda la estructura
    await this.orderDetailsRepository.save(orderDetail);

    // Ahora, asigna el orderDetail a la orden y guarda la orden de nuevo
    newOrder.orderDetails = orderDetail;
    await this.orderRepository.save(newOrder);
    // Buscamos la orden de compra por id para
    return this.orderRepository.find({
      where: { id: newOrder.id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    }); // Order{}
  }

  async getOrder(id: string) {
    const order: Order | null = await this.orderRepository.findOne({
      where: { id },
      relations: {
        orderDetails: {
          products: true,
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }
}
