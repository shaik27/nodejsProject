const express = require('express')
const app = express()
app.use(express.json());

const userDetails = [
    { id: 1, firstName: 'Meharaj', lastName: 'Shaik' },
    { id: 2, firstName: 'John', lastName: 'Doe' },
    { id: 3, firstName: 'James', lastName: 'Alex' }
]

app.get('/user', (req, res) => {
    res.send(userDetails)
})

app.get('/user/:id', (req, res) => {
    const user = userDetails?.find(data => data?.id === +req?.params?.id)
    user? res.send(user) : res.send('User not found')
})

app.post('/user', (req, res) => {
    const newUser = {
        ...req.body,
        id: userDetails?.length+1
    }
    userDetails.push(newUser)
    res.send('User saved successfully with id: '+ userDetails?.length)
})

app.put('/user/:updateId', (req, res) => {
    const id = +req?.params?.updateId - 1
    const updatedUser = req?.body
    userDetails[id] = {
        ...userDetails[id],
        ...updatedUser
    }
    res.send('User updated successfully for id: '+ (id+1))
})

app.delete('/user/:id', (req, res) => {
    let id = +req?.params?.id
    console.log(id)
    userDetails.splice(id-1, 1)
    res.send("User deleted successfully "+ id)
})

app.use(('/test'), (req, res) => {
    res.send('hello world testing')
})

app.use(('/'), (req, res) => {
    res.send('root navigation')
})

app.listen(3200, () => {
    console.log('server is successfully listening');
})