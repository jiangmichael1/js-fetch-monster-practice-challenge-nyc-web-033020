
const monsterContainer = document.querySelector('#monster-container')
const createMonster = document.querySelector('#create-monster')
const url = 'http://localhost:3000/monsters'
const urlHeader = {
    "Content-Type": "application/json",
    "Accept": "application/json"
}

fetch(url + `?_limit=50&_page`)
.then(resp => resp.json())
.then(monsters => {
    monsters.forEach(monster => {
        const monst = createMonsterCard(monster)
        monsterContainer.appendChild(monst)
    })
    
})

function createMonsterCard(monsterObj){
    const monsterInfo = document.createElement('div')
    monsterInfo.innerHTML = `
        <h2>${monsterObj.name}</h2>
        <h4>Age: ${monsterObj.age}</h4>
        <p>${monsterObj.description}</p>
        `
    return monsterInfo
}

function createMonsterForm(){
    const form = document.createElement('form')
    form.innerHTML = `
    <label> Name: </label>
    <input type="text" name="name"
    <label> Age: </label>
    <input type="text" name="age"
    <label> Description: </label>
    <input type="text" name="description"
    <br>
    <input type="submit" value="Add Monster">
    `
    return form
}

document.addEventListener('submit', event => {
    
    const form = event.target
    console.log(form)

    const name = form.name.value
    const age = form.age.value
    const description = form.description.value 

    const monsterObj = {
        name: name,
        age: age,
        description: description
    }

    const monst = createMonsterCard(monsterObj)
    monsterContainer.appendChild(monst)

    fetch(url,{
        method: "POST",
        headers: urlHeader,
        data: JSON.stringify(monsterObj)
    })
    .then(resp => resp.json())
    .then(console.log)
    
    event.preventDefault()
})

createMonster.insertAdjacentElement("afterend", createMonsterForm())



    
    
    


