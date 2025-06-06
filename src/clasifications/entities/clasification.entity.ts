import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { IClasifications } from "../../interfaces/clasifications.interface";
import { BaseEntity } from "../../common/config/base.entity";
//import { Assets } from "./assets.entity";

@Entity()
export class Classifications extends BaseEntity implements IClasifications {

  @Column()
  name: string = "";

 /*  @OneToMany(
    () => Assets,
    (asset) => asset.classifications
  )
  assets?: Assets[];*/
} 
