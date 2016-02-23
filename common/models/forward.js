module.exports = function(Forward) {
	Forward.createWithTo = function(data, relations) {
		
	}

	Forward.remoteMethod(
		'createWithTo',
		{
			http: {path: '/createWithTo', verb: 'POST'},
        	accepts: [
        		{arg: 'data', type: 'object', http: { source: 'body' } },
        		{arg: 'relations', type: 'object', http: { source: 'body' } },
        	],
        	returns: {arg: 'id', type: 'number'}
		}
	)
};
