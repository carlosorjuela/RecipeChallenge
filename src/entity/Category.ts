import {Entity,	PrimaryGeneratedColumn,	Column,	BaseEntity,	OneToMany} from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { Receta } from './Receta'

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field(() => [Receta], {nullable: true})
  @OneToMany(() => Receta, (rec: Receta) => rec.category)
  recipe!: Receta[];
}