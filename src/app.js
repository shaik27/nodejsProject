const express = require('express')
const connectDb = require('./congif/database')
const cors = require('cors')
const app = express()

//To parse the body data from the postman
app.use(express.json());
//To allow the api data to the cross browsers
app.use(cors())

//DB Schema
const User = require('./models/user')

const PORT = 3200


app.post('/signup', async (req, res) => {
    //pass this data in th postman in the body to make it dynamic
    // const userData = {
    //     firstName: 'James',
    //     lastName: 'Smith',
    //     emailId: 'smith@gmail.com',
    //     password: '12345'
    // }
    const user = new User(req.body)
    try {
        await user.save()
        res.json({
            message:'user added successfully',
            data: user
        })
    }
    catch (err) {
        res.status(400).send('Error saving the user ' + err.message)
    }
})

app.get('/user', async (req, res) => {
    try {
        const users = await User.find({ emailId: req.body.emailId })
        if (users.length) {
            res.send(users)
        }
        else {
            res.status(404).send('user not found')
        }
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

app.delete('/user', async (req, res) => {
    const userId = req.body.userId
    try {
        const user = await User.findByIdAndDelete(userId)
        if (user) {
            res.send('user deleted successfully ' + user)
        }
        else {
            res.send('no user to delete')
        }
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

app.put('/user', async (req, res) => {
    const userId = req.body.userId
    const userData = req.body
    try {
        const user = await User.findByIdAndUpdate({ _id: userId }, userData, { returnDocument: 'after' })
        res.send(`user ${user} updated successfully`)

    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

connectDb().then(() => {
    console.log('connected to db successfully');
    app.listen(PORT, () => {
        console.log('server is successfully listening to port ' + PORT);
    })
})
    .catch(() => {
        console.log('failed to connect to db');
    })




// const userDetails = [
//     { id: 1, firstName: 'Meharaj', lastName: 'Shaik' },
//     { id: 2, firstName: 'John', lastName: 'Doe' },
//     { id: 3, firstName: 'James', lastName: 'Alex' }
// ]

// app.get('/user', (req, res) => {
//     res.send(userDetails)
// })

// app.get('/user/:id', (req, res) => {
//     const user = userDetails?.find(data => data?.id === +req?.params?.id)
//     user? res.send(user) : res.send('User not found')
// })

// app.post('/user', (req, res) => {
//     const newUser = {
//         ...req.body,
//         id: userDetails?.length+1
//     }
//     userDetails.push(newUser)
//     res.send('User saved successfully with id: '+ userDetails?.length)
// })

// app.put('/user/:updateId', (req, res) => {
//     const id = +req?.params?.updateId - 1
//     const updatedUser = req?.body
//     userDetails[id] = {
//         ...userDetails[id],
//         ...updatedUser
//     }
//     res.send('User updated successfully for id: '+ (id+1))
// })

// app.delete('/user/:id', (req, res) => {
//     let id = +req?.params?.id
//     console.log(id)
//     userDetails.splice(id-1, 1)
//     res.send("User deleted successfully "+ id)
// })

// app.use(('/test'), (req, res) => {
//     res.send('hello world testing')
// })

// app.use(('/'), (req, res) => {
//     res.send('root navigation')
// })


