
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn ,BaseEntity, ManyToOne, OneToOne} from 'typeorm'
import {Field, Int, ObjectType} from 'type-graphql'
import { User } from './Users'
import { Category } from './Category'
import { join } from 'path';

@ObjectType()
@Entity()
export class Receta extends BaseEntity  {
    
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column()
    name!: string;

    @Field(() => String)
    @Column()
    description!: string;

    @Field(() => String)
    @Column()
    ingredients!: string;
  
   @Field(() => User, {nullable: true})   
   @ManyToOne(() => User, user => user.recipe)   
   @JoinColumn({name: "userId"})
   user!: User; 
 
   @Field(() => Category, {nullable: true})
   @ManyToOne(() => Category, (cat: Category) => cat.recipe)
   category!: Category;

}  