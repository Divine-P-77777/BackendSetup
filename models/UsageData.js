const mongoose = require('mongoose');

const usageDataSchema = new mongoose.Schema({
  time: String,
  cpu: String,
  memory: String,
  disk: String,
  image: String // optional
}, { timestamps: true });

module.exports = mongoose.model('UsageData', usageDataSchema);
