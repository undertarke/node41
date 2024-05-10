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

    type VideoType{
        type_id: Int
        type_name: String
        icon: String
    }

    type Video {
        video_id:      Int            
        video_name:    String        
        thumbnail:     String        
        description:   String         
        views:         Int
        source:       String        
        user_id:       Int
        type_id:       Int
        video_type: VideoType
    }

    type Query {
        getUser: User
        getDemo: String

        getVideo: [Video]
    }

    type Mutation {
        createUser: String
    }

`);

import { PrismaClient } from '@prisma/client'
let prisma = new PrismaClient()

let resolver = {
    getUser: () => {
        return {
            id: 1,
            name: "abc",
            phone: "090909"
        }
    },

    getVideo: async () => {

        let data = await prisma.video.findMany({
            include: {
                video_type: true
            }
        });

        console.log(data)

        return data
    }

}


app.use("/grap", graphqlHTTP({
    schema: schema, // nơi khai báo các đối tượng và tên hàm
    rootValue: resolver, // nơi truyền (đổ data ) vào các hàm của schema
    graphiql: true
}))

// Viết query trả về danh sách table Video

// B1: yarn add prisma @prisma/client
// B2: yarn prisma init
// B3: update lại chuỗi CSDL ở file .env và schema.prisma => provider
// B4: yarn prisma db pull
// B5: yarn prisma generate




const axios = require("axios");

const endpoint = "https://sweeping-reindeer-45.hasura.app/v1/graphql";
const headers = {
	"content-type": "application/json",
    "Authorization": "<token>"
};


const graphqlQuery = {
    "operationName": "fetchAuthor",
   
    "query": `query{
        getVideo {
          video_id
          video_name
          thumbnail
        }
      }`,
   
    "variables": {}
};

const response = axios({
  url: "localhost:8080/grap",
  method: 'post',
  headers: headers,
  data: graphqlQuery
});

console.log(response.data); // data
console.log(response.errors); // errors if any
