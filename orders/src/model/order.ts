import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface OrderDoc extends mongoose.Document {
      userId: string;
      status: string;
      expiresAt: Date;
      version: number,
      ticket: string;
}
const orderSchema = new mongoose.Schema(
      {
            userId: {
                  type: String,
                  required: true,
            },
            status: {
                  type: String,
                  default:"booked"
            },
            expiresAt: {
                  type: mongoose.Schema.Types.Date,
            },
            ticket: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: 'Ticket',
            },
      },
      {
            toJSON: {
                  transform(doc, ret) {
                        ret.id = ret._id;
                        delete ret._id;
                  },
            },
      }
);

orderSchema.set("versionKey", "version")
orderSchema.plugin(updateIfCurrentPlugin)


const Order = mongoose.model<OrderDoc>('Order', orderSchema);

export { Order };
