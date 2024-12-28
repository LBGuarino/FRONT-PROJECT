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
  
    @ManyToOne(() => Order, (order) => order.orderProducts, { onDelete: "CASCADE" })
    @JoinColumn({ name: "orderId" })
    order: Order;
  
    @ManyToOne(() => Product, (product) => product.orderProducts, { onDelete: "CASCADE" })
    @JoinColumn({ name: "productId" })
    product: Product;
  
    @Column()
    quantity: number;
  }
  