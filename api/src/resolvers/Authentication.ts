import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Main } from "../entity/Main";
import { User } from "../entity/User";

@InputType()
class MainLoginInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@InputType()
class UserLoginInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@InputType()
class UserSignupInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@Resolver()
export class AuthenticationResolver {
    @Query(() => String)
    async main_login(@Arg("login", () => MainLoginInput) login: MainLoginInput) {
        const found = await Main.findOne({
            where: {
                username: login.username,
                password: login.password
            }
        });

        if(found) {
            return "KEY";
        } else {
            return null;
        }
    }

    @Query(() => String)
    async user_login(@Arg("login", () => UserLoginInput) login: UserLoginInput) {
        const found = await User.findOne({
            where: {
                username: login.username
            }
        })
        if(found) {
            if(found.password == login.password) {
                return `${found.id}`;
            } else {
                return "Password Incorrect"
            }
        } else {
            return "User Not Found"
        }
    }

    @Mutation(() => Boolean)
    async user_signup(@Arg("signup", () => UserSignupInput) signup: UserSignupInput) {
        const made = await User.create({
            username: signup.username,
            password: signup.password,
            bought: "",
            current: "",
            favorites: ""
        })
        if(made) {
            return true;
        }
        return false;
    }
}