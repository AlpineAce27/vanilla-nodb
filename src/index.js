
console.log('javascript connected')

const drinkDisplay = document.querySelector('#drinkDisplay')

const displayAllDrinks = (arr) => {
    //clear out whats on the page
    drinkDisplay.innerHTML = ``

    arr.forEach((el) => {
        const drinkCard = document.createElement('section')

        drinkCard.innerHTML = `
        <img src=${el.imageUrl} alt='drink picture'/>
        <p>${el.name}</p>

        <section>
            <button>-</button>
            Popularity: ${el.popularity}
            <button>+</button>
        </section>

        <br/>
        <br/>

        <button onclick="deleteDrink(${el.id})">Delete Me</button>

        <br/>
        <br/>
    `
    drinkDisplay.appendChild(drinkCard)
    })
}

const allDrinks = () => {
    axios.get('http://localhost:2727/drinks').then((response) => {
        console.log(response.data)

        displayAllDrinks(response.data)
    })
}

const handleSubmit = (event) => {
    event.preventDefault()

    const drinkName = document.querySelector('#drinkName')
    const drinkPicture = document.querySelector('#drinkPicture')

    const bodyObj = {
        name: drinkName.value,
        imageUrl: drinkPicture.value
    }

    axios.post('http://localhost:2727/newDrink', bodyObj).then((response) => {
        console.log(response.data)
        displayAllDrinks(response.data)
    })
}

document.querySelector('form').addEventListener('submit', handleSubmit)

const deleteDrink = ((id) => {
    axios.delete(`http://localhost:2727/drink/${id}`).then((response) => {
        console.log(response.data)
        displayAllDrinks(response.data)
    })
})

allDrinks()