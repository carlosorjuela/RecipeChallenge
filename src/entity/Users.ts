import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm'
import { Field, Int, ObjectType } from 'type-graphql'
import { IsEmail, MinLength } from 'class-validator'
import {Receta} from './Receta'

@ObjectType()
@Entity()
export class User extends BaseEntity {

  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Column({unique: true})
  @Field()
  @IsEmail()
  email!: string;

  @Column()
  @MinLength(5)
  password!: string;

 @Field(() => [Receta])
  @OneToMany(() => Receta, (rec: Receta) => rec.user)
  recipe!: Receta[]; 

}