
const {conectionMongoose} = require('../config/connection.mongodb')
const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({ //CREAMOS EL ESQUEMA
    titulo:{
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    codigo: {
        type: String,
        required: true,
    }
})
const Product = conectionMongoose.model('Product', productSchema)//ENVIAMOS A LA TABLAPRODUCT LOSVALORES DEL ESQUEMA






const insertarProducto = async ({titulo, descripcion, precio, stock, codigo}) => {
    try{
        const nuevoProducto = new Product({titulo, descripcion, precio, stock, codigo}) //INSTACIAMOS UNA NUEVA CLASE CON LAS PROPIEDADES A PASAR
        await nuevoProducto.save() //METODO QUE GUARDA
        return nuevoProducto._id //MOSTRAMOSLA PROPIEDAD _ID DEL PRODUCTO Q VA A RETORNAR
    }
    catch(error){
        throw {status:500, message: 'Error interno en el servidor'}
    }
}

const seleccionarProductoPorId = async (pid) =>{
    try{
        const producto = await Product.findById(pid) //NOS TRAE UN UNICO ELEMENTO X ID

        if(!producto){ //SINO ESTA
            throw {status: 404, message: 'Producto con id ' + pid + ' no encontrado'}
        }
        else{
            return producto //DE LO CONTRARIO Q RETORNE ESE UNICO ELEMENTO
        }
    }

    catch(error){

        if(error.status === 404){
            throw error
        }
        else{
            throw {status:500, message: 'Error interno en el servidor'}
        }
        
    }
}

const deleteProductoPorId = async(pid) =>{
    try{
        const resultado = await Product.findByIdAndDelete(pid) //LO BUSCA Y LOELIMINA Y LOP GUARDA EN LACONSTANTE PARA VER EL RESULTADO
        if(!resultado){ //SINO HAY O SEA VIENE NULL
            throw {status: 404, message: 'Producto con id ' + pid + ' no existe'}
        }//DE LO CONTRTARIO MUESTRA A QUIEN BORRO
        return {status: 200, message: 'Producto con id ' + pid + ' eliminado correctamente'}   
    }

    catch(error){
        
        if(error.status === 404){
            throw error
        }
        else{ 
            throw {status:500, message: 'Error interno en el servidor'}           
        }      
    }
}

const seleccionarProductos = async () =>{
    try{
        const productos = await Product.find({}) //HACEMOSUN FIND PARA QBUSQUE YLEPASSAMO UN OBJETO VACIO XQ NO QEREMOS PARAMETRO DE BUSQUEDA SINO Q NOS TRAIGA A TODOS
        return productos
    }
    catch(error){
        if(error.status){
            throw error
        }
        else{
            throw {status:500, message: 'Error interno en el servidor'}
        }
    }
}


module.exports = { insertarProducto, seleccionarProductoPorId, deleteProductoPorId, seleccionarProductos}