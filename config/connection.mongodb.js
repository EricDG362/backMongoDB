
const conectionMongoose = require('mongoose')

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.priegnm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

conectionMongoose.connect(URI)
.then(
    () => {
        console.log('Conexion exitosa')
    }
)

.catch (
    (error) =>{
        console.error('Error al conectar mongoDB:', error)
    }
)

module.exports = {conectionMongoose}