import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
    JoinColumn,
  } from "typeorm";
  import { Order } from "./Order";
  import { Product } from "./Product";
  
  @Entity({ name: "order_products" })
  export class OrderProduct {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Order, (order) => order.orderProducts)
    @JoinColumn({ name: "orderId" })
    order: Order;
  
    @ManyToOne(() => Product, (product) => product.orderProducts)
    @JoinColumn({ name: "productId" })
    product: Product;
  
    @Column()
    quantity: number;
  }
  