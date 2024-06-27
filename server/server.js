//import packages and files
import express, { response } from "express"
import cors from "cors"
import handlerFunctions from "./controller.js"

//setting up express instance
const app = express() //creates an app object using express, which will inherit all kinds of useful functions/methods

//setting up middleware
app.use(express.json()) //lets our app use and interpret json files
app.use(cors()) //
app.use(express.static('src')) //this lets the app talk to the front-end (src is our folder that contains all the front end files)

//endpoints

//app.get retreives information (all of the handler functions are in the controller file)
app.get('/drinks', handlerFunctions.GetDrinks)

//app.post creates new information
app.post('/newDrink', handlerFunctions.AddDrink)

//app.delete removes information
app.delete('/drink/:id', handlerFunctions.DeleteDrink)

//app.put changes/edits information
app.put('/drink/:id', handlerFunctions.EditDrink

)
// Open server using app.listen
app.listen(2727, () => console.log("Server running on at http://localhost:2727"))