import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Item } from "../entity/Item";
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
    @Query(() => String!)
    async main_login(@Arg("login", () => MainLoginInput) login: MainLoginInput) {
        const found = await Main.findOne();
        console.log(found);
        console.log(login);
        if(found) {
            return "KEY";
        } else {
            return null;
        }
    }

    @Mutation(() => Boolean)
    async delete_main() {
        await Main.delete({});
        await Item.delete({});
        return true;
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
        }).save();
        if(made.id) {
            return true;
        }
        return false;
    }

    @Query(() => [User!])
    async all_users() {
        const all = await User.find();
        return all;
    }
}