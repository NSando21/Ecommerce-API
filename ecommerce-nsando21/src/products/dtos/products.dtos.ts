export class CreateProductDto {
  /**
   * @description El nombre del producto.
   * @example "Camiseta"
   */
  name: string;

  /**
   * @description La descripción del producto.
   * @example "Camiseta de algodón 100%"
   */
  description: string;

  /**
   * @description El precio del producto.
   * @example 19.99
   */
  price: number;

  /**
   * @description La cantidad de stock disponible del producto.
   * @example 100
   */
  stock: number;

  /**
   * @description La URL de la imagen del producto.
   * @example "https://example.com/image.jpg"
   */
  imgUrl?: string;
}

export class UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imgUrl?: string;
}
