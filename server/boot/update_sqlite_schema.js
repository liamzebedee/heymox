  module.exports = function(app) {
    app.dataSources.mongo.isActual(function(err, actual){
      if(err) { console.err(err) }
      if (!actual) {
      	app.dataSources.mongo.autoupdate();
      }
    });
  };