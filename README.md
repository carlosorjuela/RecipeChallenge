## Table of Content
- [What's inside? ](#table-of-contents)
- [Tools](#tools)
- [Mutation and Queries](#mutation-and-queries)
- [Filling the data from graphql API](#filling-the-data-from-graphql-api)
- [Acknowledgements](#acknowledgements)



In this project you will find a CRUD solution managing recipes, categories and users using **mutation** and **queries** with different tools like:

## Tools

- TypeScript
- TypeORM
- Node.js
- Express.js
- Apollo Server
- Graphql
- JWT
- bcrypt
- MySQL

## Installation

You can download the project or clone it, if you download it then open it with your preferred code editor (I used VScode), in the terminal window run the command : **npm install**, this will install all the dependencies needed in the project, now without error you can run the command: **npm run dev**, the server will run on port 3000 (if you are using this port, you can change it in the *index.ts* file and run the project again), then you can go to <http://localhost:3000/graphql> and try the different **mutation** and **queries**

All the mutation and queries you will find and use are:

Mutation and Queries

```
mutation createRec {
  createReceta(
    variables: {
      name: ""
      description: ""
      ingredients: ""
      categoryId: int
    }
  )
}

mutation createCat {
  createCategory(variables: { name: "" }) {
    name
  }
}

mutation updateRec {
  updateReceta(
    id: int
    newDataFields: {
      id: int
      name: ""
      description: ""
      ingredients: ""
    }
  )
}

mutation updateCat {
  updateCategory(newDataFields: { id: int, name: "" }) {
    id
    name
  }
}

mutation borrarRec {
  deleteReceta(id: int)
}

mutation delCat {
  deleteCategory(id: int)
}

mutation createUsr {
  signUp(
    variables: { name: "", email: "", password: "" }
  )
}

mutation logingUser {
  login(variables: { email: "", password: "" }) {
    token
  }
}

query getRec {
  getRecetas {
    name
    ingredients
    description
    user {
      name
    }
    category {
      name
    }
  }
}

query GetOneRec {
  getOneReceta(id: int ) {
    id
    name
    description
    ingredients
    user {
      name
    }
    category {
      name
    }
  }
}

query getAllCat {
  getAllCategories {
    id
    name
  }
}

query getOneCat {
  getOneCat(id: int ) {
    name
  }
}

query myRec {
  getMyReceta {
    name
    description
    ingredients
  }
}
```

## Filling the data from Graphql API

- You can start by crating and user.
- login with the user you just created, save the token generated.
- Place the Token in the **HTTP HEADER** in the bottom part and place it as follows:  \
   {
      "Authorization": "Bearer *here* "
   }
- create as many categories as you want
- create a recipe and fill the categoryId with one known category id.

## Acknowledgements
* [Puzzle](thepuzzle.digital)
* [Puzzle Academy](http://academy.thepuzzle.digital/)


## License
[MIT](https://choosealicense.com/licenses/mit/)# RecipeChallenge

