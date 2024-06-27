//import packages and files
import express, { response } from "express"
import cors from "cors"

//mock-database 
let mockData = [
    {
        "id": 1,
        "name": "Vanilla Coke",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiXnNmIsz7RSLJIqBatdRosuERkyzKy0e-Kg&usqp=CAU",
        "popularity": 0
    },
    {
        "id": 2,
        "name": "Dr. Pepper",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrNOB8XuhOZRYsR9ed2T9StxnUSlXSawSssQ&usqp=CAU",
        "popularity": 0
    },
    {
        "id": 3,
        "name": "Sparkling Water",
        "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEXD1BCrfd5zPPHRnv3NjQ0whUwxubKGfqzA&usqp=CAU",
        "popularity": 0
    },
    {
        "id": 4,
        "name": "Ginger Ale",
        "imageUrl": "https://imgs.search.brave.com/0pLLzAVkiR0TG4iKZj3PotRzGXanU7wRmwAp9RPCObE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y2FuYWRhZHJ5LmNv/bS9pbWFnZXMvY2F0/YWxvZy9naW5nZXJf/YWxlLnBuZw",
        "popularity": 0
    }
]

let globalID = 5

//setting up express instance
const app = express() //creates an app object using express, which will inherit all kinds of useful functions/methods

//setting up middleware
app.use(express.json()) //lets our app use and interpret json files
app.use(cors()) //
app.use(express.static('src')) //this lets the app talk to the front-end (src is our folder that contains all the front end files)

//endpoints

//app.get retreives information
app.get('/drinks', (request, response) => {
    response.send(mockData)
})

//app.post creates new information
app.post('/newDrink', (request, response) => {

    const newDrink = {
        id: globalID,
        name: request.body.name,
        imageUrl: request.body.imageUrl,
        popularity: 0
    }

    mockData.push(newDrink)
    globalID++
    response.send(mockData)
})

//app.delete removes information
app.delete('/drink/:id', (request, response) => {


    const idToDelete = Number(request.params.id) //notice the semicolon inthe endpoint definition, this means the url will contain a parameter with the name "id", we refernce this id in this line with "params.id"
    mockData = mockData.filter((el) => el.id !== idToDelete)//delete the object with that id

    console.log("PARAMS:" + request.params)
    //use that parameter to delete an object in the array of drinks
    response.send(mockData)
})

//app.put changes/edits information
app.put('/drink/:id', (request, response) => {

    const type = request.body.type //grabs the input from the user (This will either be a + or a -)

    const idToEdit = Number(request.params.id)

    //search the array of objects for drink that matches the given id
    let index
    mockData.forEach((el, i) => {
        if (el.id === idToEdit) {
            index = i
        }
    })

    //add or subtract from the popularity depending on the input from the user
    if (index) {
        if (type === "+") {
            mockData[index].popularity++
            console.log("added")
            console.log(index, mockData[index])
        }
        else if(type === "-"){
            mockData[index].popularity--
            console.log("failed")
        }
    }

    response.send(mockData)
})
// Open server using app.listen
app.listen(2727, () => console.log("Server running on at http://localhost:2727"))