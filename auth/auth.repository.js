const {conectionMongoose} = require('../config/connection.mongodb')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({ // se declara una nuevo esquema
    email: { //columna
        type: String, //requerimientos
        required: true, //q sea obligatorio
        unique: true //q no se puedan repewtir
    },
    password: {
        type: String,
        required: true
    }
})

const User = conectionMongoose.model('User', userSchema) //user (de la tabla demongoo) va a tener los valores de userschema




//si la consulta sql devolvia u8n objeto,mongo tmb  tiene q devolver un objeto(es fundamental que funcione de igualmanera)
const buscarUsuarioPorEmail = async (email) =>{
     
    try {
        const usuario = await User.findOne({email: email}) //el metodo find busca solo unom y le pásamos el mail
        if(!usuario){ //sino existe el usuario
            return null
        }
        return usuario //sino q lo muestre
    }
    catch (error) {
        console.error('MONGODB_Error al seleccionar usuarios por email', error)
        throw {status: 500, message: 'Error interno en el servidor'}
    }
}




const insertarUsuario = async (usuario) =>{
    try{
        const nuevoUsuario = new User(usuario) //instanciamos la clase (User) y le pasamos el pobjeto (usuario)
        await nuevoUsuario.save()
        return true
    }
    catch(error){
        console.log('Error al insertar un usuario: ', error)
        throw {status: 500, message: 'Error interno en el servidor'}
    }
}




module.exports = {buscarUsuarioPorEmail, insertarUsuario}