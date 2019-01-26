import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

import Babies from './babies-collection.jsx';

/**
 * Using ValidatedMethod (maintained by MDG) is the best
 * practice by Meteor Development Group (MDG),
 * and as such is used here to validate that method
 * calls from the client are properly handled.
 *
 */

/**
 * Client side insert method.
 *
 * @memberof Server.Babies
 * @method
 * @property { string }     name        String that defines the method.
 * @property { function }   validate    Is run before the main execution.
 * @property { function }   run         The main action that is executed.
 */
const insertBabies = new ValidatedMethod({
  name: 'babies.insert',
  validate: null,
  run(doc) {
    return Babies.insert(doc);
  },
});

/**
 * Client side update method.
 *
 * @memberof Server.Babies
 * @method
 * @property { string }     name        String that defines the method.
 * @property { function }   validate    Is run before the main execution.
 * @property { function }   run         The main action that is executed.
 */
const updateBabies = new ValidatedMethod({
  name: 'babies.update',
  validate: null,
  run([docId, obj]) {
    return Babies.update(docId, { $set: obj });
  },
});

/**
 * Client side remove method.
 *
 * @memberof Server.Babies
 * @method
 * @property { string }     name        String that defines the method.
 * @property { function }   validate    Is run before the main execution.
 * @property { function }   run         The main action that is executed.
 */
const removeBabies = new ValidatedMethod({
  name: 'babies.remove',
  validate: null,
  run(docId) {
    return Babies.remove(docId);
  },
});

const RATE_LIMITED_METHODS = [
    insertBabies , updateBabies , removeBabies
].map(value => value['name']);

if (Meteor.isServer) {
  const OPERATIONS = 5;
  const PER_SECOND = 1 * 1000; // milliseconds
  // Only allow 5 list operations per connection per second.
  DDPRateLimiter.addRule({
    name(name) {
      return RATE_LIMITED_METHODS.includes(name);
    },

    // Rate limit per connection ID.
    connectionId() { return true; },
  }, OPERATIONS, PER_SECOND);
}
