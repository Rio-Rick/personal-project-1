# Link deployment
https://server.rio-rick.tech/

# Cuisine API Documentation

## Endpoints :

List of available endpoints:

- `POST /login`
- `POST /register`
- `POST /google-login`

- `GET /foods` 
- `GET /foods/:id` 
- `PUT /foods/:id` 
- `DELETE /foods/:id` 
- `POST /foods`

- `POST /order/:id`
- `GET /orders`

- `GET /payment/midtrans/initiate/:id` 
- `DELETE /payment/midtrans/cancel/:id` 

&nbsp;

## 1. POST /login
Description:
- Login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email / Password"
}
```

&nbsp;

## 2. POST /registers
Description:
- Register

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "id": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email / Password"
}
```

&nbsp;

## 3. POST /google-login
Description:
- Google Login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Email / Password"
}
```

&nbsp;

## 4. POST /foods
Description:
- add a new food

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "name": "string",
  "price": "integer",
  "imageUrl": "string",
}
```

_Response (201 - created)_

```json
{ 
  "msg": "food succesfully created",
  "food": {
      "id": 1,
      "name": "bakso",
      "price": 76,
      "imageUrl": "string",
      "createdAt": "2024-02-01T05:25:33.394Z",
      "updatedAt": "2024-02-01T05:25:33.394Z"
  }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "name can't be null"
}
OR
{
  "message": "name can't be empty"
}
OR
{
  "message": "price can't be null"
}
OR
{
  "message": "price can't be empty"
}
OR
{
  "message": "image Url can't be null"
}
OR
{
  "message": "image Url can't be empty"
}

```

&nbsp;

## 5. GET /foods

Description:
- Get all foods from database with role user right now

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "list": [
        {
            "id": 1,
            "price": 30000,
            "imgUrl": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mcdonalds.co.id%2Fmenu%2Fpanas-2-with-fries&psig=AOvVaw10Umc29HAaLNWAnHrNSwpK&ust=1706676009958000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDepdylhIQDFQAAAAAdAAAAABAE",
            "createdAt": "2024-02-01T05:25:33.637Z",
            "updatedAt": "2024-02-01T05:25:33.637Z",        
        }
  ],
  "role" : "user"
}
```

&nbsp;

## 6. GET /foods/:id

Description:
- Get one food from database with role user right now

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "list": [
        {
            "id": 1,
            "price": 30000,
            "imgUrl": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mcdonalds.co.id%2Fmenu%2Fpanas-2-with-fries&psig=AOvVaw10Umc29HAaLNWAnHrNSwpK&ust=1706676009958000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNDepdylhIQDFQAAAAAdAAAAABAE",
            "createdAt": "2024-02-01T05:25:33.637Z",
            "updatedAt": "2024-02-01T05:25:33.637Z",        
        }
  ],
  "role" : "admin"
}
```
&nbsp;

## 7. PUT /foods/:id

Description:
- Update one food from database with role user right now

Request:

- headers: 

```json
{
  "access_token": "string"
}
```
- body:

```json
{
  "name": "string",
  "price": "integer",
  "imgUrl": "string",
}
```

_Response (201 - created)_


```json
{
  "msg" : "food succesfully updated"
}
```

&nbsp;

## 8. DELETE /foods/:id

Description:
- Delete food by id

Request:

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json
{
  "msg" : "food succesfully deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "not found"
}
```

&nbsp;

## 9. POST /order/id
Description:
- post a new order

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)",
}
```
- loginInfo:

```json
{
  "userId": "integer (required)",
}
```

_Response (201 - created)_

```json
{
  "msg" : "order has been made",
  "dataOrder" : {
    "id" : 1,
    "UserId" : 2,
    "FoodId" : 15,
    "createdAt": "2024-02-01T05:25:33.637Z",
    "updatedAt": "2024-02-01T05:25:33.637Z",  
  }
}
```
## 10. GET /orders
Description:
- get a user orders

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- loginInfo:

```json
{
  "userId": "integer (required)",
}
```

_Response (200 - Ok)_

```json
{
  "msg" : "my order",
  "dataOrder" :[{
    "id" : 1,
    "UserId" : 2,
    "FoodId" : 15,
    "createdAt": "2024-02-01T05:25:33.637Z",
    "updatedAt": "2024-02-01T05:25:33.637Z",  
  },
  {
    "id" : 2,
    "UserId" : 2,
    "FoodId" : 15,
    "createdAt": "2024-02-01T05:25:33.637Z",
    "updatedAt": "2024-02-01T05:25:33.637Z",  
  },
  `````
  ]
}
```


&nbsp;

## 11. GET /payment/midtrans/initiate/:id

Description:
- Get info payment

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (201 - Created)_

```json
{
  "message" : "order created",
  "transactionToken" : "0,83457248352347591",
  "order" : {
    "UserId" : 1,
    "FoodId" : 20
  }
}
```

&nbsp;

## 12. /payment/midtrans/cancel/:id
Description:
- cancel payment

Request:

- headers: 

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - Ok)_

```json
{
  "msg" : "cancel"
}
```

_Response (404 - Bad Request)_

```json
{
  "message" : "Data Not Found"
}
```
