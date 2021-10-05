import express from 'express'
import fetch  from 'node-fetch'

const app = express()
const PORT = process.env.PORT || 3000

var pokemons = [{}]
var pokemon

fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
    .then((resp) => {
        return resp.json()
    }).then((content) => {
        pokemons = content
    })

function getPokemon(id){
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
        .then((resp) => {
            return resp.json()
        }).then((content) => {
            pokemon = content
        })
    
    return pokemon
}

app.get('/', (request, response) => {
    response.send('<h1>API Pokemon</h1>')
})

app.get('/api/pokemons', (request, response) => {
    response.json(pokemons)
})

app.get('/api/pokemons/:id', (request, response) => {
    const id = Number(request.params.id)

    var resp = getPokemon(id)

    if(resp){
        response.json(resp)
    }else{
        response.status(404).end()
    }
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
