const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    jdLink: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      required: true,
    },
    stipend: {
      type: String,
    },
    package: {
      type: String,
    },
    normalCutoff: {
      type: Number,
      required: true,
    },
    internalCutoff: {
      type: Number,
      required: true,
    },
    branches: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

// Slug generation middleware
companySchema.pre('save', function () {
  if (this.isModified('name') || this.isModified('role')) {
    this.slug = (this.name + '-' + this.role)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
