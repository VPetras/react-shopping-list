# Shopping List

## Description

This is a shopping list app that allows users to record and share things they want to spend money on meeting the needs of keeping track of their shopping lists.

## Features

- Users can create an account and log in.
- Users can create, view, update and delete shopping lists.
- Users can add, update, view or delete items in a shopping list

## Environment example(.env)

> PORT = 3050
>
> JWT_SECRET_KEY = TTuXnYc4AQp5FWJ2SGG7e9EK
> JWT_EXPIRE_TIME = 1h
>
> TOKEN_HEADER_KEY = qs7KiizIQ4vVxrwPY0oPukZZ
>
> MONGO_PROD_URI = mongodb://vpetras:secret_password@0.0.0.0:27017
> MONGO_PROD_DB = ShoppingList
> MONGO_PROD_USERS_COLLECTION = Users
> MONGO_PROD_LISTS_COLLECTION = Lists
>
> MONGO_DEV_URI = mongodb://localhost:27017
> MONGO_DEV_DB = ShoppingList
> MONGO_DEV_USERS_COLLECTION = Users
> MONGO_DEV_LISTS_COLLECTION = Lists

## API Endpoints

| Endpoint          | Functionality                |
| ----------------- | ---------------------------- |
| POST /register    | Register a user              |
| POST /login       | Login a user                 |
| GET /list/:id     | Fetch a single shopping list |
| GET /lists        | Fetch all shopping lists     |
| POST /list/create | Create a shopping list       |
| PUT /list/:id     | Update a shopping list       |
| DELETE /list/:id  | Delete a shopping list       |
| ----------------- | ---------------------------- |

## Test data

- User 1 - VPetras
  - email: vojtechpetrasek@gamil.com
  - password: testtest
- User 2 - Sonic
  - email: vojtech.petrasek@gmail.com
  - password: testtest

## MongoDB

- Database: ShoppingList
- Collections: Users, Lists

## Installation

- Clone the repo
- Import data to mongoDB
  - in the "test_data" folder
- Create .env file
  - in the root folder
  - with the same structure as the example above
- Install dependencies: `npm install`
- Start the server: `npm start`
- And enjoy!
