import { Meteor } from "meteor/meteor";
import Babies from "./babies-collection";

/**
 * Collection publications to the client.  Publications must
 * return a cursor object.
 *
 * @memberof Server.Babies
 * @member Publications
 */
Meteor.publish("babies.public", function babiesPublic() {
  const cursor = Babies.find(
    {
      // userId: { $exists: false },
    },
    {
      fields: Babies.publicFields
    }
  );

  return cursor;
});

Meteor.publish("babies.private", function babiesPrivate() {
  if (!this.userId) {
    return this.ready();
  }

  const cursor = Babies.find(
    {
      userId: this.userId
    },
    {
      fields: Babies.privateFields
    }
  );

  return cursor;
});
