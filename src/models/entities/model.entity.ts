import { BaseEntity } from "../../common";
import { Brand } from "../../brands/entities/brand.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Resource } from "src/resources/entities/resource.entity";

@Entity()
export class Model extends BaseEntity {
  @Column()
  name: string
  @ManyToOne(() => Brand, (brand) => brand.models)
  brand: Brand
  @OneToMany(() => Resource, (resource) => resource.model)
  resource: Resource[]
 }
