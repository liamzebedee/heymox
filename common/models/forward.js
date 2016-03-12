module.exports = function(Forward) {
	Forward.getCurrentMos = function(userId, sinceTime) {
		var params = {
			fields: ['id', 'dateCreated', 'dateReveal', 'revealInterval', 'isRemo', 'fromUserId', 'momentId', 'toUserIds'],
			include: 
			[
				{
					relation: 'toUsers',
					fields: ['id', 'username'],
					where: { id: userId }
				},
				{
					relation: 'fromUser',
					fields: ['id', 'username']
				},
				{
					relation: 'moment',
					fields: ['dateCreated', 'contentText', 'contentImage']
				}
			],
			where: {
			},
			order: 'dateReveal DESC'
		}
		if(sinceTime) {
			params.where.dateCreated = { gt: sinceTime }
		}

		return Forward.find(params);
	}

	Forward.remoteMethod(
		'getCurrentMos',
		{
			http: {path: '/getCurrentMos', verb: 'get'},
        	accepts: [
        		{arg: 'userId', type: 'string', http: { source: 'query' } },
        		{arg: 'sinceTime', type: 'Date', http: { source: 'query' } }
        	],
        	returns: {arg: 'mos', type: 'array'}
		}
	)
};
