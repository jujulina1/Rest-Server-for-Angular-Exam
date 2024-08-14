# Rest Server

## Usage

This is **REST service**, created for educational purposes. To execute it, open a command prompt and run `node index.js`.

```
> cd server
> node index.js
```

## Base URL

The Base URL for the API is: `http://localhost:3000`

The documentation below assumes you are pre-pending the Base URL to the endpoints in order to make requests.

# Endpoints: Users

- `/users` -- get all users;

# Endpoints: Cars

- `/data/cars` -- get all cars;


## Get cars list

Send a `GET` request to `/data/cars`. The service will respond with an array of cars objects.

Success Response:

Code: 200 OK

Content:

```
[
  {
    "_id": string,
    "brand": string,
    "model": string,
    "description": string,
    "year": number,
    "image": string,
    "price": number,
    "userId": string
  }, ...
]
```

## Create a new car

Create a new car by sending a `POST` request to `/data/cars` with properties . The service will respond with an object, containing newly created car.

`Headers`: {
  "X-Authorization": accessToken
}

`Body`:

{
  "
    "brand": string,         (`is Required`)
    "model": string,         (`is Required`)
    "description": string,   (`Description must be min 12 symbols`)
    "year": number,          (`Year must be between 1990 and 2023`)
    "image": string,         (`Image must starts with http or https`)
    "price": number,         (`Price must be possitive number`)
    
}

Success Response:

Code: 200 OK

Content:

```
{
    "brand": "Audi",
    "model": "E1",
    "description": "Diese Urheber- und Lizenzangaben können z.B. direkt am Bild, auf einer Bildbeschreibungsseite oder in einem gesonderten Bildquellenverzeichnis.",
    "year": 2022,
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Audi_e-tron_%28Edit1%29.jpg",
    "price": 200000,
    "userId": "66bc6545461fd8f88c9d311e",
    "_id": "66bca307461fd8f88c9d3146",
    "__v": 0
}
```
## Get car By ID

Getting a car by Id by sending a `GET` request to `/data/cars/{carId}`.

Success Response:

Code: 200 OK

Content:

```
{
    "brand": "Audi",
    "model": "E1",
    "description": "Diese Urheber- und Lizenzangaben können z.B. direkt am Bild, auf einer Bildbeschreibungsseite oder in einem gesonderten Bildquellenverzeichnis.",
    "year": 2022,
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Audi_e-tron_%28Edit1%29.jpg",
    "price": 200000,
    "userId": "66bc6545461fd8f88c9d311e",
    "_id": "66bca307461fd8f88c9d3146",
    "__v": 0
}
```



## Update car by Id



Update an existing car by sending a `PUT` request to `/data/cars/{carId}` with body: 
`Headers` : {

    "X-Authorization": accessToken
}

`Body`:
```
{
  "
    "brand": string,         (is Required)
    "model": string,         (is Required)
    "description": string,   (`Description must be min 12 symbols`)
    "year": number,          ('Year must be between 1990 and 2023')
    "image": string,         ('Image must starts with http or https')
    "price": number,         ('Price must be possitive number')
    
}
```

`Success Response:`

Code: 200 OK

Content:

```
{
    "brand": "Audi",
    "model": "E1",
    "description": "Diese Urheber- und Lizenzangaben können z.B. direkt am Bild, auf einer Bildbeschreibungsseite oder in einem gesonderten Bildquellenverzeichnis.",
    "year": 2022,
    "image": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Audi_e-tron_%28Edit1%29.jpg",
    "price": 200000,
    "userId": "66bc6545461fd8f88c9d311e",
    "_id": "66bca307461fd8f88c9d3146",
    "__v": 0
}
```
### Delete car

For Delete car by id we have to send an authorized `DELETE` request `/data/cars/{carId}`
 `Headers`:
{
  'X-Authorization': accessToken
}
`Success Response:`

Code: 200 OK

Content:

{
    "_id": "66bcd10e461fd8f88c9d3171",
    "brand": "Delete",
    "model": "sdfghh",
    "description": "sfdghjkl;sdgfh",
    "year": 2022,
    "image": "https://free-images.com/md/dc4c/chocolate_coins_coins_gold.jpg",
    "price": 123,
    "userId": "66bcceda461fd8f88c9d3160",
    "__v": 0
}



### Authentication

The service is initialized with three users, which can be used for immediate testing:
* Admin : 123456 (email: admin@abv.bg, userId: 66bc6545461fd8f88c9d311e)
* Tsveti : 123456 (email: tsveti@abv.bg, userId: 66bcce0a461fd8f88c9d315c)
* Dimitar : 123456 (email: pesho@gmail.com userId: 66bcceda461fd8f88c9d3160)

#### Register
Create a new user by sending a `POST` request to `/users/register` with body:

{
    "username": "PROBA",          (username should be at least 5 charachters)
    "email": "proba@abv.bg",      (email should includes @ and .)
    "password": "123456",         (password should be at least 6 symbols)
    "gender": "female"            (gender shoul be male, female or gender)
}  

The service automatically creates a session and returns an authorization token, that can be used for requests.
Success response from server with status 200:
{
    "_id": "66bc64e9461fd8f88c9d311a",
    "username": "PROBA",
    "email": "proba@abv.bg",
    "gender": "female",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmJjNjRlOTQ2MWZkOGY4OGM5ZDMxMWEiLCJ1c2VybmFtZSI6IlBST0JBIiwiZW1haWwiOiJwcm9iYUBhYnYuYmciLCJnZW5kZXIiOiJmZW1hbGUiLCJpYXQiOjE3MjM2MjI2MzN9.bXUSPBHysKU1hyKhMTCrBcw4mJEqtxq7HNAMBK6c17s"
}



#### Login
Login by sending a `POST` request to `/users/login` with body: 
{
    "username": "PROBA",          (username should be at least 5 charachters)
    "password": "123456",         (password should be at least 6 symbols)
}



The service will respond with an object, containing a standard string token, that can be used for requests.
Success response from server with status 200:
{
   
    "_id": "66bc64e9461fd8f88c9d311a",
    "username": "PROBA",
    "email": "proba@abv.bg",
    "gender": "female",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmJjNjRlOTQ2MWZkOGY4OGM5ZDMxMWEiLCJ1c2VybmFtZSI6IlBST0JBIiwiZW1haWwiOiJwcm9iYUBhYnYuYmciLCJnZW5kZXIiOiJmZW1hbGUiLCJpYXQiOjE3MjM2MjU3Mjl9.t5c4oPxizFQmjISdhk3Y-bFXDol1bwaeu1tPXYi7Ku0"

}


#### Logout


Send an authorized `GET` request to `/users/logout`. In Headers should have "X-Authorization": accessToken

Success Response from server with status 204 No Content


#### Get User Details

Send an authorized `GET` request to `/users/profile`.

`Headers`: {

  'X-Authorization': accessToken
}

Success response from server with status 200:
{
    "_id": "66bcceda461fd8f88c9d3160",
    "username": "Dimitar",
    "email": "pesho@gmail.com",
    "gender": "gender",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmJjY2VkYTQ2MWZkOGY4OGM5ZDMxNjAiLCJ1c2VybmFtZSI6IkRpbWl0YXIiLCJlbWFpbCI6InBlc2hvQGdtYWlsLmNvbSIsImdlbmRlciI6ImdlbmRlciIsImlhdCI6MTcyMzY1NTk2NH0.WEo3Tfq7cABpN0g8fJA3KltKuwF1qG5uBxe75gIzivM"
}

#### Edit User Details

Send an authorized `PUT` request to `/users/profile/{userId}` with:
`Headers`: {

  'X-Authorization': accessToken
}
`Body`:

{
  username,
  email, 
  gender
}



#### Authorized Requests
To make an authorized request, add the following header, where `{token}` is the access token, returned by the service upon successful login or registration:
```
X-Authorization: {token}
```
