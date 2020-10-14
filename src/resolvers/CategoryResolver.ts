import { Query, Resolver, Mutation, InputType, Field, Arg, Authorized, Int } from 'type-graphql'
import { Category } from '../entity/Category'


@InputType()
class CreateCategoryInput {
	@Field(() => String)
    name!: string
}

@InputType()
class UpdateCategory{
	@Field(() => Int)
	id!: number
	
	@Field(() => String, {nullable: true})
	name!: string
}

@Resolver()
export class CategoryResolver {

    @Authorized()
    @Mutation(() => Category)
	async createCategory(
    @Arg("variables", () => CreateCategoryInput) variables: CreateCategoryInput
	) {
        const newCategory =   Category.create(variables);
        //console.log(newCategory);
        return await newCategory.save();
    } 


    @Authorized()
    @Mutation(() => Category)
    async updateCategory(
        //@Arg("id") id: number,
        @Arg("newDataFields") newDataFields:UpdateCategory){

            const cat = await Category.findOne({                
                where: {
                    id: newDataFields.id                    
                }                
            })            
                if(cat?.name){
                    
                    cat.name = newDataFields.name
                    await Category.save(cat)
                    //await Category.update({id}, newDataFields, );
                    console.log("Category Updated");
                    return cat
                }else{
                    throw new Error("Category does not exist")
                }  


            //return true
    }

    @Authorized()
	@Mutation(() => String)
    async deleteCategory(
        @Arg("id") id: number) {
            const cat = await Category.findOne({
                where: {
                    id                    
                }                
            })
            if(cat?.id){
                await Category.delete(id);
                return `The Category number ${id} was deleted`
            }else{
                throw new Error("Category does not exist")
            }      
        
        }

        @Authorized()
        @Query(() => [Category])
         async getAllCategories(){
             try{
                return Category.find({relations: ["recipe"] })
            }catch(error){
                console.log(error);
                throw error;
              }  
    }

    @Authorized()
    @Query(() => Category)
     async getOneCat(
        @Arg("id") id: number) {
            try{
            const cat = await Category.findOne({
                where: {id}  
            })
            
            if(cat) return cat ; throw new Error("Category does not exist")
        }catch(error){
                console.log(error);
                 throw error;
      }  
        }
}