import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/";
import { Model } from "../../models/entities/model.entity";

@Entity()
export class Brand extends BaseEntity{
  @Column()
  name: string

  @OneToMany(() => Model, model => model.brand)
  models: Model[]
}
