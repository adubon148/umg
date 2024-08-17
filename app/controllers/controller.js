

const db = require('../config/db.config.js');
const Cancion = db.Cancion;

exports.create = (req, res) => {
    let cancion = {};

    try{
        
        cancion.nombre = req.body.nombre;
        cancion.descripcion = req.body.descripcion;
        cancion.artista = req.body.artista;
        cancion.duracion = req.body.duracion;
        cancion.extension = req.body.extension;
        cancion.album = req.body.album;
        cancion.año = req.body.año
    
        
        Cancion.create(cancion).then(result => {    
            
            res.status(200).json({
                message: "Upload Successfully a Song with id = " + result.id,
                cancion: result,
            });
        });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllCustomers = (req, res) => {
    
    Cancion.findAll()
        .then(songInfos => {
            res.status(200).json({
                message: "Get all songs' Infos Successfully!",
                Canciones: songInfos
            });
        })
        . catch(error => {
          
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        });
}

exports.getCustomerById = (req, res) => {
 
  let id = req.params.id;
  Cancion.findByPk(id)
      .then(cancion => {
          res.status(200).json({
              message: " Successfully Get a song with id = " + id,
              Cancione: cancion
          });
      })
      . catch(error => {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
      });
}



exports.updateById = async (req, res) => {
    try{
        let songid = req.params.id;
        let song = await Cancion.findByPk(songid);
    
        if(!song){
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a song with id = " + songid,
                customer: "",
                error: "404"
            });
        } else {    
            // update new change to database
            let updatedObject = {
              nombre: req.body.nombre,
              descripcion: req.body.descripcion,
              artista: req.body.artista,
              duracion: req.body.duracion,
              extension: req.body.extension,
              album: req.body.album,
              año: req.body.año
            }
            let result = await Cancion.update(updatedObject, {returning: true, where: {id: songid}});
            
            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Can not update a song with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a song with id = " + songid,
                cancion: updatedObject,
            });
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Can not update a song with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try{
        let songid = req.params.id;
        let cancion = await Cancion.findByPk(songid);

        if(!cancion){
            res.status(404).json({
                message: "Does Not exist a song with id = " + songid,
                error: "404",
            });
        } else {
            await cancion.destroy();
            res.status(200).json({
                message: "Delete Successfully a song with id = " + songid,
                song: cancion,
            });
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a song with id = " + req.params.id,
            error: error.message,
        });
    }
}