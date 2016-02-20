module.exports = function(HeymoUser) {
/*
MyUser.disableRemoteMethod("create", true);
MyUser.disableRemoteMethod("upsert", true);
MyUser.disableRemoteMethod("updateAll", true);
MyUser.disableRemoteMethod("updateAttributes", false);
 
MyUser.disableRemoteMethod("find", true);
MyUser.disableRemoteMethod("findById", true);
MyUser.disableRemoteMethod("findOne", true);
*/

	HeymoUser.addContact = function(userid, contactUsername) {
		HeymoUser.findOne({
			where: { id: userid }
		}, function(err, user) {
			HeymoUser.findOne({
				where: { username: contactUsername }
			}, function(err, contactToAdd) {
				console.log(user.contacts)
				user.contacts.create({ contactId: contactToAdd.id }, function(err, res) {
					if(err) throw new Error(err);
				})
			})
		})
		

		// .contacts.create({ heymoUserId: contactid })
	}

	HeymoUser.remoteMethod('addContact',
		{
			http: {path: '/addContact', verb: 'post'},
        	accepts: [
   	     		{ arg: 'userid', type: 'number', http: { source: 'query' } },
        		{ arg: 'contactUsername', type: 'string', http: { source: 'query' } } 
        	],
        	returns: {arg: 'worked', type: 'boolean'}
		}
	)

};
