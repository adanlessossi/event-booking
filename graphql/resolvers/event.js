const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date')
const { transformEvent } = require('./merge');

module.exports = {
    events: async () => {
      try {
        const events = await Event.find();
        return events.map(event => {
          return transformEvent(event);
        })
      } catch (err) {
        throw err;
      }
    },
    createEvent : async args => {
      const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: dateToString(args.eventInput.date),
          creator: '5c3a0067dbb48f62181bea5d'
      });
      let createdEvents;
      try {
        const result = await event.save();
        createdEvents = transformEvent(result);
        const creator = await User.findById('5c3a0067dbb48f62181bea5d');
        if (!creator){
          throw new Error('User not found.');
        }
        creator.createdEvents.push(event);
        await creator.save();
        return createdEvents;
      } catch (err) {
        throw err;
      }
  }
}