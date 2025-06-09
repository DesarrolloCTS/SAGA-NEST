import { BaseEntity } from "../../common";
import { Resource } from "../../resources/entities/resource.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Clasification extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Resource, (resource) => resource.clasification)
  resources: Resource[];
}
