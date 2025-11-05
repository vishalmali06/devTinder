# DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId

- POST /reauest/review/accepted/:requestId
- POST /reauest/review/rejected/:requestId

## userRouter
- GET /connections
- GET /request/received
- GET /feed - Gets you the profiles of the others 

Status: ingnore, intrested, accepted, rejected
