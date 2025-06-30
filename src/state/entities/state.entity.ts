import { BaseEntity } from "src/common";
import { Inventory } from "cts-entities";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class State extends BaseEntity {
  @Column({ unique: true, nullable: false })
  name: string
  @OneToMany(() => Inventory, (inventory) => inventory.id)
  inventory: Inventory[]
}
