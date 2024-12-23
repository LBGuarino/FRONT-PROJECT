import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Credential } from "./Credential";
import { Order } from "./Order";

enum Role {
    ADMIN = "admin",
    USER = "user"
}

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique : true, nullable: true })
    auth0Sub: string;

    @Column({
    nullable: false
    })
    name: string;

    @Column({
    unique: true,
    nullable: false
    })
    email: string;

    @Column({
    nullable: false
    })
    address: string;

    @Column({
    nullable: false  
    })
    phone: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role;

    @OneToOne(() => Credential, {nullable: true})
    @JoinColumn()
    credential: Credential;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}

