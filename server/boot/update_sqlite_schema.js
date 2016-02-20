  module.exports = function(app) {
    app.dataSources.actualdb.isActual(function(err, actual){
      if (!actual) {
        app.dataSources.actualdb.autoupdate();
      }
    });
  };