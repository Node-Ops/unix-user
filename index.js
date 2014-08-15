// Requirements
var util = require('util'),
	child = require('child_process');

// The namespace
var user = module.exports;

// Checks if a user exists
user.exists = function(username, done) {
	// Spawn id command
	// ex: $ id -u <username>
	return child.spawn('id', ['-u', username])
		.on('close', function(code) {
			done(!code);
		});
};

// Creates a user
user.create = function(username, pass, done) {
	if (typeof pass === 'function') {
		done = pass;
		pass = null;
	}

	// Spawn useradd command
	// ex: $ useradd <user>
	return child.spawn('useradd', [username])
		.on('close', function(code) {
			if (code) {
				return done('Failed to create user. Exit code: ' + code);
			}

			if (!pass) {
				return done();
			}

			// Set the user password
			user.passwd(username, pass, done);
		});
};

// Sets a password for a user
user.passwd = function(username, pass, done) {
	return child.exec(util.format('echo %s:%s | chpasswd', username, pass))
		.on('close', function(code) {
			if (code) {
				return done('Failed to set password for user. Exit code: ' + code);
			}
			done();
		});
};
