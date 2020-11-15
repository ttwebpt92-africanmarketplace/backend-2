# backend-2

## `https://african-marketplace-ttwebpt-92.herokuapp.com`

## Endpoints

|Method                   |Endpoint                  |Required                                                                   |Description                                                                                                 |
|-------------------------|--------------------------|---------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| [POST] registration     | `/api/register`          |`username`, `password`, `email`                                            |`firstName`, `lastName`, `address`, `owner` are optional. Owner is boolean that defaults to true            |
| [POST] login            | `/api/login`             |`username`, `password`                                                     | Logs user in and returns a cookie containing the token.                                                    |
| [GET] logout            | `/api/logout`            |                                                                           | Clears the cookie from the browser                                                                         |
| [DELETE] deletes user   | `/api/delete`            | UserId                                                                    | Deletes the user by id                                                                                     |
| [GET] Gets Users        | `/api/users`             | Valid token/cookie                                                        | Gets List of all Users                                                                                     |
| [GET] Get User by Id    | `/api/users/:id`         | Valid Token/cookie                                                        | Gets User by Id                                                                                            |
| [GET] Items             | `/api/items`             | No requirements                                                           | Gets a list of all items in the database                                                                   |
| [GET] Items by Id       | `/api/items/:id`         | Item Id                                                                   | Gets an item by Id                                                                                         |
| [POST] Post Item        | `/api/items`             | Valid token/cookie `itemName`, `itemPrice`, `description`, `categoryId`   | `imageUrl` not required, UserId will automatically input from the cookie/token                             |
| [PUT] Update Item       | `/api/item/:id`          | Valid token/cookie `itemName`, `itemPrice`, `description`, `categoryId`   | `imageUrl` not required                                                                                    |
| [DELETE] Deletes Item   | `/api/item/:id`          | Valid token/cookie                                                        | Deletes an Item by Id from the database                                                                    |

<!-- Item categories 
1	fruit
2	vegetable
3	dairy
4	meat
5	seasoning
6	beverage
7	condiment -->

- username, password, email, firstName, lastName, address are all strings
- itemName, imageUrl are strings
- itemPrice is decimal
- description is text
- categoryId is an integer from 1 to 7
