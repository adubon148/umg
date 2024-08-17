
module.exports = (sequelize, Sequelize) => {
	const cancion = sequelize.define('cancion', {	
	  id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
    },
	  nombre: {
			type: Sequelize.STRING
	  },
	  descripcion: {
			type: Sequelize.STRING
  	},
	  artista: {
			type: Sequelize.STRING
	  },
	  duracion: {
			type: Sequelize.INTEGER
    },
	extension: {
		type: Sequelize.STRING
},
album: {
	type: Sequelize.STRING
},
año: {
	type: Sequelize.INTEGER
}
	});
	
	return cancion;
}