import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Report } from "./report";

@Entity()
export class ReportImage extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  report_id: number;

  @Column()
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Report, (report) => report.reportImages)
  @JoinColumn({ name: 'report_id' })
  report: Report;
}
