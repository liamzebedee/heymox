module.exports = function(Forward) {
	Forward.getCurrentMos = function(userId, sinceTime) {
		return Forward.find({
			fields: ['id', 'dateCreated', 'dateReveal', 'revealInterval', 'isRemo', 'fromUserId', 'momentId', 'toUserIds'],
			include: 
			[
				{
					relation: 'toUsers',
					fields: ['id', 'username']
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
			scope: {
				toUsers: {
					where: { id: userId }
				},
				where: {
					dateCreated: { gte: sinceTime }
				}
			},
			order: 'dateReveal DESC'
		});
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
