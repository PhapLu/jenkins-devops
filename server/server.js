import app from './src/app.js'

const PORT = process.env.PORT || 3052
app.listen(PORT, () => {
    console.log(`Server is starting with Port: ${PORT}`)
})

process.on('SIGINT', () => {
    app.close(() => console.log('Exit Server Express'))
})
