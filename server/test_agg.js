const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb+srv://nandanv012_db_user:kMDoErHnTrEcPXw5@pt-26.t4pfny9.mongodb.net/thapar_placement');
  
  const Company = require('./src/models/Company');
  const Notice = require('./src/models/Notice');
  
  const companies = await Company.aggregate([
    { $lookup: { from: 'notices', localField: '_id', foreignField: 'companyId', as: 'notices' } },
    { $addFields: { latestNoticeDate: { $max: { $concatArrays: [ { $map: { input: "$notices", as: "n", in: "$$n.noticeDate" } }, ["$createdAt"] ] } } } },
    { $sort: { latestNoticeDate: -1, _id: -1 } },
    { $limit: 20 },
    { $project: { name: 1, latestNoticeDate: 1, createdAt: 1, hasNotice: { $gt: [{ $size: "$notices" }, 0] } } }
  ]);
  
  console.log(companies.map(c => c.name + ' - hasNotice: ' + c.hasNotice + ' latestNoticeDate: ' + c.latestNoticeDate + ' createdAt: ' + c.createdAt));
  process.exit(0);
}

run().catch(console.error);
