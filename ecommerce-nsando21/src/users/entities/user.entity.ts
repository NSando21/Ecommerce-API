import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from '../../orders/entities/order.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  password: string;

  @Column('bigint')
  phone: number;

  @Column({ type: 'varchar', length: 50 })
  country: string;

  @Column('text')
  address: string;

  @Column({ type: 'varchar', length: 50 })
  city: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({
    type: 'boolean',
    default: false,
    nullable: true,
  })
  isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
