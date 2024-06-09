import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { IsString, Length, validateOrReject } from "class-validator";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  country: string;

  @Column({ unique: true, nullable: false })
  phoneNumber: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  confirmPassword: string;

  @Column({ nullable: false })
  @IsString()
  transactionPin: string;

  @Column({ nullable: false })
  @IsString()
  confirmTransactionPin: string;

  @Column()
  createdAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}
