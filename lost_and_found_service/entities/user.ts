import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Report } from './report'
import { Contact } from "./contact";
// User entity
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  full_name: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  avatar_url: string;

  @CreateDateColumn({ nullable: true })
  created_at: Date;

  @UpdateDateColumn({ nullable: true })
  updated_at: Date;

  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @OneToMany(() => Contact, (contact) => contact.sender)
  contact_sender: Contact[];

  @OneToMany(() => Contact, (contact) => contact.sender)
  contact_receiver: Contact[];
}
