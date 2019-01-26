import { Meteor } from 'meteor/meteor';
import Babies from './babies-collection';

/**
 * If the Babies collection is empty on server start, and you'd like to
 * populate it with some data here is a handy spot.
 *
 * Example:
 * ```
 *  import Trucks from './trucks.jsx'
 *  if (Babies.find().count() === 0) {
 *      const data = JSON.parse(Assets.getText('babies.json')) || [ {} ];
 *      data.forEach((datum) => {
 *          Babies.insert(datum);
 *      });
 *  }
 *
 * ```
 * @memberof Server.Babies
 * @member Fixtures
 */
Meteor.startup(() => {

});
