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

    @Column({ name: "auth0sub", unique : true, nullable: true })
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
    nullable: true
    })
    address: string;

    @Column({
    nullable: true  
    })
    phone: string;

    @Column({
        nullable: false
    })
    isRegistered: boolean;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER
    })
    role: Role;

    @OneToOne(() => Credential, {nullable: true})
    @JoinColumn({ name: "credentialid" })
    credential: Credential;

    @OneToMany(() => Order, order => order.user)
    orders: Order[];
}

