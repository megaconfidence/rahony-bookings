import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const Booking = mongoose.Schema(
  {
    ticket: {
      type: String,
      required: true,
    },
    from: {
      trim: true,
      type: String,
      required: true,
      lowercase: true,
    },
    to: {
      trim: true,
      type: String,
      required: true,
      lowercase: true,
    },
    date: {
      type: Date,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'new',
      enum: ['new', 'paid'],
    },
  },
  {timestamps: true}
);

Booking.plugin(mongooseLeanVirtuals);

export default mongoose.model('booking', Booking);
