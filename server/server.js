//import packages and files
import express from "express"
import cors from "cors"

//setting up express instance
const app = express() //creates an app object using express, which will inherit all kinds of useful functions/methods

//setting up middleware
app.use(express.json()) //lets our app use and interpret json files
app.use(cors()) //
app.use(express.static('src')) //this lets the app talk to the front-end (src is our folder that contains all the front end files)

//endpoints


// Open server using app.listen
app.listen(2727, () => console.log("Server running on at http://localhost:2727"))