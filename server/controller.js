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
]

let globalID = 4

const handlerFunctions = {
    GetDrinks: (request, response) => {
        response.send(mockData)
    },

    AddDrink: (request, response) => {

        const newDrink = {
            id: globalID,
            name: request.body.name,
            imageUrl: request.body.imageUrl,
            popularity: 0
        }
    
        mockData.push(newDrink)
        globalID++
        response.send(mockData)
    },

    DeleteDrink: (request, response) => {


        const idToDelete = Number(request.params.id) //notice the semicolon inthe endpoint definition, this means the url will contain a parameter with the name "id", we refernce this id in this line with "params.id"
        mockData = mockData.filter((el) => el.id !== idToDelete)//delete the object with that id
    
        console.log("PARAMS:" + request.params)
        //use that parameter to delete an object in the array of drinks
        response.send(mockData)
    },

    EditDrink: (request, response) => {

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
    }
}
export default handlerFunctions