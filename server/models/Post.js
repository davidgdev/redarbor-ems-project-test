import mongoose from "mongoose";

const minAge = new Date();
const maxAge = new Date();
minAge.setFullYear(minAge.getFullYear() - 65);
maxAge.setFullYear(maxAge.getFullYear() - 18);

const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const postSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: 100,
    },
    Surname: {
      type: String,
      required: false,
      trim: true,
      maxLength: 100,
    },
    Email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: [true, "Email already exists"],
      required: [true, "Email address is required"],
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    DateOfBirth: {
      type: Date,
      required: [true, "Birthdate is required"],
      trim: true,
      min: [minAge, "Does not meet the age required"],
      max: [maxAge, "Does not meet the age required"],
    },
    RoleId: {
      type: Number,
      required: true,
      trim: true,
      min: 1,
      max: 3,
    },
  },
  {
    timestamp: true,
    versionKey: false,
  }
);

export default mongoose.model("Post", postSchema);
