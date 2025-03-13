import { Schema } from "mongoose";


export const TrackedBugSchema = new Schema({
  accountId: { type: Schema.ObjectId, required: true, ref: 'Account' },
  bugId: { type: Schema.ObjectId, required: true, ref: 'Bug' }
},
  {
    timestamps: true, toJSON: { virtuals: true }
  }
)

// TrackedBugSchema.virtual('tracker', {
//   ref: 'Bug',
//   localField:'bugId',
//   foreignField: "_id",
//   justOne: true
// })

// TrackedBugSchema.virtual('bug', {
//   ref: 'Bug',
//   localField:'bugId',
//   foreignField: "_id",
//   justOne: true
// })