
import { Resolver, Query, Mutation, Arg, Field, InputType, Int, Ctx, Authorized} from 'type-graphql'
import { Receta } from '../entity/Receta'
import { getRepository } from 'typeorm'
import { User } from '../entity/Users'
import { Category } from '../entity/Category'
import { query } from 'express'

@InputType()
class RecetaInput{

    @Field(() => String)
    name!: string

    @Field(() => String)
    description!: string

    @Field(() => String)
    ingredients!: string

    @Field(() => Int)
    categoryId!: number
}

@InputType()
class RecetaUpdate{

    @Field(() => Int)
    id!: number  
    @Field(() => String, {nullable: true})
    name?: string  
    @Field(() => String, {nullable: true})
    description?: string  
    @Field(() => String, {nullable: true})
    ingredients?: string
}

@Resolver()
export class RecetaResolver {

    @Authorized()
    @Mutation(() => String)
    async createReceta(    
        @Arg("variables", () => RecetaInput) variables: RecetaInput,
        @Ctx() context: any
    ) {
/*       const {
            name,
            description,
            ingredients,
            categoryId            
       } = variables */
        
        //const recipeTable = getRepository(Receta)
        //const categoryTable = getRepository(Category)
        const category = await Category.findOne(variables.categoryId)
        const userId = context.user.id        
        //const userTable = getRepository(User)
        const user = await User.findOne(userId)   
        
        if(user && category){
            const newReceta = Receta.create({
                name: variables.name,
                description: variables.description,
                ingredients: variables.ingredients, 
                user: userId,
                category: category
            }).save()
/*             name,
            description,
            ingredients,
            user,
            category */
            
            //await recipeTable.save(newReceta)
            //return await Receta.save(newReceta)
            return (`Receta ${(await newReceta).name} creada con exito`)
        }
        
        //return await newReceta.save(); 
        throw new Error('Error')        
    }


    @Mutation(() => String)
    async updateReceta(
        @Arg("id") id: number,
        @Arg("newDataFields", () => RecetaUpdate) newDataFields:RecetaUpdate,
        @Ctx() context: any
        ){
            //  const {
            //     id,
            //     name,
            //     description,
            //     ingredients
            // } = newDataFields 
            
            try{
                //const prevData = newDataFields.name
                const userId = context.user.id
                const user = await User.findOne(userId) 
                const recipeUpdated = await Receta.findOne({
                    relations: ['user', 'category'],
                    where: {
                        id,
                        user                       
                    }
                })

            if(recipeUpdated) {
                 if(newDataFields.name) recipeUpdated.name = newDataFields.name
                 if(newDataFields.description)  recipeUpdated.description = newDataFields.description
                 if(newDataFields.ingredients)  recipeUpdated.ingredients = newDataFields.ingredients

                return (await Receta.save(recipeUpdated), `The recipe ${recipeUpdated.name} was updated`)            //return (`The recipe ${recipeUpdated.name} was updated by ${newDataFields.name} `)   

               //newDataFields.ingredients= recipeUpdated.ingredients
             // newDataFields.description = recipeUpdated.description
         
            //console.log(id, newDataFields);
            }else {
                throw new Error('The recipe does not match the user')
            
            }

            }catch(error){
                console.log(error);
                throw error;
              } 
    }

    @Authorized()
    @Mutation(() => String)
    async deleteReceta(
        @Arg("id") id: number) {
        try{
        const recipeTable = getRepository(Receta)
        const rec = await recipeTable.findOne(id)
        if(!rec){
            throw new Error(`Recipe with id number ${id} was not found`)
        }else{
        await Receta.delete(id);
            return `The Recipe number ${id} was DELETED`
        }
        }catch(error){
            console.log(error);
            throw error;
          }    
    }

    @Authorized()
    @Query(() => [Receta])
    async getRecetas(){
        try{
            return await Receta.find({relations: ['user', 'category']})
        //return await allRecetas

        }catch(error){
            console.log(error);
            throw error;
          }  
    }

    @Authorized()
    @Query(()=> Receta)
    async getOneReceta(
        @Arg('id', () => Int) id: number
    ){
        try{
        const receta= await Receta.findOne({
            relations: ['user', 'category'],
            where: {id}
        }) 
        if(receta)return receta
        else {throw new Error(`Recipe with id number ${id} was not found`)}

    }catch(error){
        console.log(error);
        throw error;
      }  
    } 
    
    @Authorized()
    @Query(()=> [Receta])

    async getMyReceta(
        //@Arg("id") id: number,
        @Ctx() context: any
    ){
        const userId = context.user.id
        //const user = await User.findOne(userId) 
        const myReceta = await User.findOne({
            //select: ["name", "description", "ingredients" ],
            //relations: ['user', 'category'],
        join: {
                alias: 'user',
                leftJoinAndSelect: {
                    recipe: 'user.recipe'
                    
                }
            },
            where: {
                id: userId                
            }
        })

        return myReceta?.recipe

    }  

}