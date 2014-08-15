# Unix User Utilities

```
$ npm install unix-user
```

A small set of utilities for managing users in unix systems.

Example:

```javascript
var user = require('unix-user');

user.exists('nick', function(exists) {
	if (!exists) {
		user.create('nick', 'pass', function(err) {
			if (err) {
				return console.log('Error creating user');
			}
			console.log('User created');
		});
	} else {
		user.passwd('nick', 'pass', function(err) {
			if (err) {
				return console.log('Error setting user password');
			}
			console.log('User password updated');
		});
	}
});

```
