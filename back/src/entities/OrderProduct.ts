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
    @JoinColumn({ name: "orderid" })
    order: Order;
  
    @ManyToOne(() => Product, (product) => product.orderProducts)
    @JoinColumn({ name: "productid" })
    product: Product;
  
    @Column()
    quantity: number;
  }
  