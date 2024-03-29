import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import {v4 as uuidV4} from "uuid";
import {Category} from "./Category";
import {Specification} from "./Specification";

@Entity("cars")
export class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  avaliable: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  category_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({name: "category_id"})
  category: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications _cars",
    joinColumns: [{name: "car_id"}],
    inverseJoinColumns: [{name: "specification_id"}],
  })
  specifications: Specification[];

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.avaliable = true;
    }
  }
}
