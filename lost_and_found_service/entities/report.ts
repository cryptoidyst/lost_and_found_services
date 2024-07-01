import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { ReportImage } from "./reportImage";
import { User } from "./user";

@Entity()
export class Report extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  item_name: string;

  @Column()
  item_description: string;

  @Column()
  location: string;

  @Column()
  category: string;

  @Column({ nullable: true })
  report_date: Date;

  @Column({ nullable: true })
  report_time: Date;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => ReportImage, (reportImage) => reportImage.report)
  reportImages: ReportImage[];  

  @OneToMany(() => ReportImage, (reportImage) => reportImage.report)
  report_images: ReportImage[];  

  @ManyToOne(() => User, (user) => user.reports, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
