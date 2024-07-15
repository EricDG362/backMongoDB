


const { crearProducto, obtenerProductoPorId, eliminarProductoPorId, buscarProductos,updateProductos } = require("./products.service")

const postProductController = async (req, res) =>{
 
    /* const {descripcion, titulo, precio, stock, codigo} = req.body */
    try{
        const result = await crearProducto(req.body)
        res.status(200).json(result)
    }
    catch(error){

        res.status(error.status).json(error)
    }
}

const getProductByIdController = async (req, res) => {
    try{
        const {pid} = req.params
       
        const result = await obtenerProductoPorId(pid)
        res.status(200).json(result)
    }
    catch(error){
        res.status(error.status).json(error)
    }
}

const deleteProductByIdController = async (req, res)=>{
    try{
        const{pid} = req.params //obtenemos el producto por id
        
        const result = await eliminarProductoPorId (pid)
        res.status(200).json(result)
    }
    catch(error){
        
        res.status(error.status).json(error)
    }
}

const getAllProducts = async (req, res) => {
    try{
        const result = await buscarProductos()
        res.status(200).json(result)
    }
    catch(error){
        res.status(error.status).json(error)
    }
}

const putProductController = async (req, res) => {
    try{
        const{pid} = req.params //obtenemos el producto por id
        const result = await updateProductos(pid)
        res.status(200).json(result)
    }
    catch(error){
        
        res.status(error.status).json(error)
    }
}




module.exports = {postProductController, getProductByIdController, deleteProductByIdController, getAllProducts, putProductController}