import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  country: string;

  @Column({ unique: true, nullable: false })
  phoneNumber: string;

  @Column({ nullable: false })
  fullName: string;

  @Column({ default: new Date() })
  createdAt: Date;
}
