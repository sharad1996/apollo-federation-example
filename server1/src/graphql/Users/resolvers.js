const { GraphQLError } = require("graphql");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { pagination } = require("../../../helpers");
require("dotenv").config();

module.exports = {
  Query: {
    users: async (parent, { page, size, filters }, context, info) => {
      const queryObj = {
        ...filters,
      };

      const { total, results: users } = await pagination(
        User,
        queryObj,
        null,
        page,
        size
      );
      return {
        total,
        page,
        size,
        users,
      };
    },
    myProfile: async (parent, args, context, info) => {
      const myProfile = context?.user;
      const user = await User.findOne({ email: context?.user?.email });
      myProfile._id = user?._id;
      return {
        ...myProfile,
      };
    },
  },
  Mutation: {
    createUser: async (_, { name, email, password }, context) => {
      const namee = name ? name : email.substring(0, email.lastIndexOf("@"));
      const userExists = await User.findOne({ email: email });
      if (userExists) {
        throw new GraphQLError(
          "This email is already in use, Please login or use different email address!",
          {
            extensions: { code: "EMAIL_EXISTS" },
          }
        );
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const register = new User({
        name: namee,
        email: email.toLowerCase(),
        password: hashedPassword,
      });
      const res = await register.save();
      return res;
    },
    updateUser: async (parent, args, context, info) => {
      const { _id, name, email } = args;
      const namee = name ? name : email.substring(0, email.lastIndexOf("@"));
      return await User.findByIdAndUpdate(
        { _id: _id },
        {
          name: namee,
        },
        {
          new: true,
        }
      );
    },
    deleteUser: async (parent, { _id }, context, info) => {
      const _request = await User.findByIdAndDelete({
        _id,
      });
      if (_request) {
        return true;
      }
    },
  },
};
