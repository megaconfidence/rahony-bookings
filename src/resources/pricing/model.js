import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';

const Pricing = mongoose.Schema(
  {
    departure: {
      trim: true,
      type: String,
      required: true,
      lowercase: true,
    },
    destination: {
      trim: true,
      type: String,
      required: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {timestamps: true}
);

Pricing.plugin(mongooseLeanVirtuals);

export default mongoose.model('pricing', Pricing);
