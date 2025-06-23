import { IsArray, IsNotEmpty } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  /**
   * @description El ID del usuario que realiza el pedido.
   * @example "12345"
   */
  @IsNotEmpty()
  userId: string;

  /**
   * @description La lista de productos que se incluyen en el pedido.
   * @example [{ id: "1", quantity: 2 }, { id: "2", quantity: 1 }]
   */
  @IsArray()
  products: Partial<Product[]>;
}
