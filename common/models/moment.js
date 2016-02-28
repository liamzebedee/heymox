module.exports = function(Moment) {
	Moment.getCurrentMos = function(userid) {
		return Moment.find({
			fields: ['id', 'dateCreated', 'contentImage', 'contentText'],
			include: [{
				fields: ['id', 'dateCreated', 'dateReveal', 'revealInterval', 'isRemo'],
				relation: 'forwards',
				include: [{
					relation: 'toUsers',
					fields: ['id', 'username'],
					scope: {
						where: { id: userid }
					}
				}, {
					relation: 'fromUser',
					fields: ['id', 'username'],
				}],
				order: 'dateReveal DESC'
			}]
		});
	}

	Moment.remoteMethod(
		'getCurrentMos',
		{
			http: {path: '/getCurrentMos', verb: 'get'},
        	accepts: {arg: 'userid', type: 'number', http: { source: 'query' } },
        	returns: {arg: 'mos', type: 'array'}
		}
	)
};
