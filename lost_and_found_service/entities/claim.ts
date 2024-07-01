import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Report } from "./report";
import { User } from "./user";

@Entity()
export class Claim extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  report_id: number;

  @Column()
  claimer_id: number;

  @Column({ nullable: true })
  claimed_date: Date;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Report)
  @JoinColumn({ name: 'report_id' })
  report: Report;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'claimer_id' })
  user: User;
}