import mongoose, { Schema } from "mongoose";
import validate from "mongoose-validator";
import { hashSync, compareSync } from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import uniqueValidator from "mongoose-unique-validator";

const emailValidator = [
  validate({
    validator: "isEmpty",
    message: "Email is required",
  }),
  validate({
    validator: "isEmail",
    passIfEmpty: false,
    message: "Email must be a valid email address",
  }),
];

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required!"],
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      validate: emailValidator,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      trim: true,
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, {
  message: "{VALUE} already taken!",
});

UserSchema.methods = {
  authenticateUser(password) {
    return compareSync(password, this.password);
  },

  _hashPassword(password) {
    return hashSync(password);
  },

  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.JWT_TOKEN_SECRET,
      {
        expiresIn: "1h",
      }
    );
  },

  toAuthJSON() {
    return {
      _id: this._id,
      token: `JWT ${this.createToken()}`,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
  },

  toJSON() {
    return {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    };
  },
};

let User;

try {
  User = mongoose.model("User");
} catch (e) {
  User = mongoose.model("User", UserSchema);
}

export default User;
