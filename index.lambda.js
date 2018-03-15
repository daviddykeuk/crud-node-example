// Basic node.js CRUD implementation

'use strict'

console.log('Loading function')
const contactsRepo = require('./src/contacts/repositoryDynamo')
const ContactsLogic = require('./src/contacts');

var contactsLogic = ContactsLogic(contactsRepo);

// All the request info in event
// "handler" is defined on the function creation
exports.handler = (event, context, callback) => {

    // Callback to finish response
    const done = (err, res) => callback(null, {
            statusCode: err ? '400' : '200',
            body: err ? err.message : JSON.stringify(res),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        // To support mock testing, accept object not just strings
    if (typeof event.body == 'string')
        event.body = JSON.parse(event.body)
    switch (event.httpMethod) {
        // Table name and key are in payload
        case 'DELETE':
            break
        case 'GET':
            break
        case 'POST':
            contactsLogic.create(event.body, context.user.id)
                .then((res) => {
                    done(null, res);
                })
                .catch((err) => {
                    done(err);
                });
            break
        case 'PUT':
            break
        default:
            done(new Error(`Unsupported method "${event.httpMethod}"`))
    }
}