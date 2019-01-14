const bcrypt = require('bcryptjs');
const User = require('../../models/user');


module.exports = {
    users: async () => {
      try {
        const users = await User.find();
        return users.map(user => {
          return { ...user._doc, _id: user.id };
        })
      } catch (err) {
        throw err;
      }
    },
    createUser: async args => {
    try {
      const existingUser = await User.findOne({email: args.userInput.email});
      if (existingUser){
        throw new Error('User already exists.');
      }
      const hashedPassword = await bcrypt.hash( args.userInput.password, 12);
      const creator = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await creator.save();
      console.log(result);
      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  }
};
