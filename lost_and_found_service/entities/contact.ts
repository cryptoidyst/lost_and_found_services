import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user";

@Entity()
export class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  receiver_id: number;

  @Column()
  sender_id: number;

  @Column()
  conversation_no: string;

  @Column()
  message: string;

  @Column()
  sent_date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.contact_sender, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sender_id' })
  sender: User;


  @ManyToOne(() => User, (user) => user.contact_receiver, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receiver_id' })
  receiver: User;
}