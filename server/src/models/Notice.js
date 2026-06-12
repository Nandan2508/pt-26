import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    noticeDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Notice = mongoose.model('Notice', noticeSchema);

export default Notice;
