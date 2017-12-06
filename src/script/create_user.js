/**
 * Script Usage:
 *   $ node create_user [username] [password]
 * for create a user with given username and password
 */

// Include
const MongoUnitTest = require("../test/lib/mongo_unit_test");

// Initiate user api
var User;

// Get username and password from command line
var username = process.argv[2];
var password = process.argv[3];

// Check if username and password exists
if (username && password) {
    MongoUnitTest({
        begin (next) {
            User = require("../api/user");
            next();
        },
        tests: [
            function (next, error) {
                
                // Start add user using username and password
                User.addUser(username, password, function (userId) {
                    console.log("User " + username + " inserted with id " + userId);
                    next();
                }, error);
            }
        ]
    });
}
else {
    
    // If not, then send error message
    console.error("Please specify username and password: ");
    console.error("\tUsage: node create_user [username] [password]");
}
