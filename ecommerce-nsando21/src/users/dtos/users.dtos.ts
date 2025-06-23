import { PickType } from '@nestjs/swagger';

import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /**
   * @description El email del usuario, debe ser un email válido.
   * @example bartolomiau@gmail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * @description El nombre del usuario, debe tener al menos 3 caracteres.
   * @example Bartolomiau
   */
  @IsString()
  @MinLength(3)
  name: string;

  /**
   * @description La contraseña del usuario, debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial.
   * @example Bartolomiau123!
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial (@$!%*?&)',
    },
  )
  password: string;

  /**
   * @description La dirección del usuario, debe tener al menos 5 caracteres.
   * @example Calle Falsa 123
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  address: string;

  /**
   * @description El número de teléfono del usuario, debe ser un número.
   * @example 1234567890
   */
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * @description El país del usuario, debe tener al menos 5 caracteres.
   * @example Colombia
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  /**
   * @description La ciudad del usuario, debe tener al menos 5 caracteres.
   * @example Bogotá
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  /**
   * @description Indica si el usuario es administrador, por defecto es false.
   * @example false
   */
  @IsEmpty()
  isAdmin?: boolean;
}

export class UpdateUserDto extends PickType(CreateUserDto, [
  'name',
  'email',
  'address',
  'phone',
  'country',
  'city',
]) {
  /**
   * @description La contraseña del usuario, debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial.
   * Si no se proporciona, no se actualizará.
   * @example Bartolomiau123!
   */
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'La contraseña debe contener al menos una letra minúscula, una mayúscula, un número y un carácter especial (@$!%*?&)',
    },
  )
  password: string;
}

export class LoginDTO extends PickType(CreateUserDto, ['password', 'email']) {}
