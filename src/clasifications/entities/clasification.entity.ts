import { BaseEntity } from "src/common";
import { Resource } from "src/resources/entities/resource.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class Clasification extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Resource, (resource) => resource.clasification)
  resources: Resource[];
}
