// Container object
var db = {
	mod: {}
}

// Set up sql
var Sequelize = require( 'sequelize' )
db.conn = new Sequelize('github', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: 'localhost',
	dialect: 'postgres'
});


//// Models
// Users
db.user = db.conn.define( 'user', {
	ghid: Sequelize.BIGINT,
	username: Sequelize.STRING,
	reposurl: Sequelize.STRING
})

// Events
db.repo = db.conn.define( 'repo', {
	name: Sequelize.STRING,
	ghrepoid: Sequelize.BIGINT,
	owner: Sequelize.STRING
})


/// Declaring the relationships between tables
db.user.hasMany(db.repo);
db.repo.belongsTo(db.user);

// Synchronise with database
db.conn.sync( {'force': true} ).then( 
	() => { 
		console.log ( 'Sync succeeded' )
	},
	( err ) => { console.log('sync failed: ' + err) } 
	)

module.exports = db
