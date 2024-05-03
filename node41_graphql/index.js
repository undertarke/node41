// yarn init

// yarn add express

// yarn add graphql express-graphql

import express from 'express'

import { graphqlHTTP } from 'express-graphql'

const app = express();

app.listen(8080);

import { buildSchema } from 'graphql';

let schema = buildSchema(`

    type User {
        id: Int
        name: String
        phone: String
    }

    type Query {
        getUser: User
        getVideo: Boolean
        getDemo: String
    }

    type Mutation {
        createUser: String
    }

`);

let resolver = {
    getUser: () => {
        return {
            id: 1,
            name: "abc",
            phone: "090909"
        }
    },

    getVideo: () => {
        return true
    }

}


app.use("/grap", graphqlHTTP({
    schema: schema, // nơi khai báo các đối tượng và tên hàm
    rootValue: resolver, // nơi truyền (đổ data ) vào các hàm của schema
    graphiql: true
}))

