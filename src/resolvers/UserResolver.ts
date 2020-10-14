import { Resolver, Mutation, ObjectType, Field, Arg, InputType } from 'type-graphql'
import { User } from '../entity/Users'
import bcrypt from 'bcryptjs'
import { validate } from 'class-validator'
import { generateToken } from '../auth'

@ObjectType()
class TokenType {
  @Field(() => String)
  token!: string
}

@InputType()
class SignUpInput {

  @Field(() => String)
  name!: string

  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string  
}

@InputType()
class LoginInput {

  @Field(() => String)
  email!: string

  @Field(() => String)
  password!: string
}

@Resolver()
export class UserResolver {

  @Mutation(() => String)
	async signUp(
    @Arg("variables", () => SignUpInput) variables: SignUpInput 
	) {
    try{
        const newUser = User.create(variables);
        //console.log(newUser);
            await bcrypt.hash(variables.password, 10).then(function(hash){
            newUser.password = hash
        })
        const e = await validate(newUser)
        if(e.length > 0){
            e.forEach((e:unknown) => {
              throw new Error(`User Validation Failed ${e}`)
          })          
        }else {
               await newUser.save();
        }
        return (`Usuario ${(await newUser).name} creado con exito`)
        //const token = generateToken({variables}, "12h")
       // console.log(token)
       // return ({token})
      } catch(error){
        console.log(error);
        throw error;
      }
         

		/*const {name, password, email} = params
		const user = new User()
		user.name = name
        user.email = email
        user.password = password  
		return true*/
    }

    @Mutation(() => TokenType)
    async login(
        @Arg("variables", () => LoginInput) variables: LoginInput
    )  {
      //const {email, password} = variables
      try{
        const user = await User.findOne({
            where: {email: variables.email}
        })
        if(user){
          const validateUser = await bcrypt.compare(variables.password, user.password)
            if(validateUser){
              const token = generateToken({
                name: user.name,
                email: user.email,
                id: user.id}, '12h')
              //console.log(token)
              return ({token})
            }else{
                throw new Error('User or Password INCORRECT, please try again or signup')
          }  
        }else{
            throw new Error('user not found, PLEASE SIGNUP')
            }
      } catch(error){
        console.log(error);
        throw error;
      } 
  }

}

