import { Clasification } from "src/clasifications/entities/clasification.entity";
import { BaseEntity } from "src/common";
import { Model } from "src/models/entities/model.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Resource extends BaseEntity {
  @Column()
  name: string;
  @Column()
  serialNumer: string;
  @Column()
  especifications: string;

  @ManyToOne(() => Clasification, (clasification) => clasification.resources)
  clasification: Clasification;
  @ManyToOne(()=>Model,(model)=>model.resource)
  model:Model
}
