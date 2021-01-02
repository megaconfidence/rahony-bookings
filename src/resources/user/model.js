import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const User = mongoose.Schema(
  {
    firstname: {
      trim: true,
      type: String,
      required: true,
      lowercase: true,
    },
    lastname: {
      trim: true,
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      trim: true,
      unique: true,
      type: String,
      required: true,
    },
    phone: {
      trim: true,
      type: String,
      unique: true,
      required: true,
    },
    password: {
      trim: true,
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

User.virtual('name').get((_, __, doc) => {
  return doc.firstname + ' ' + doc.lastname;
});

User.plugin(mongooseLeanVirtuals);

export default mongoose.model('user', User);
