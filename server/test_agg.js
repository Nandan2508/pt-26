const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb+srv://nandanv012_db_user:kMDoErHnTrEcPXw5@pt-26.t4pfny9.mongodb.net/thapar_placement');
  
  const Company = require('./src/models/Company');
  const Notice = require('./src/models/Notice');
  
  const query = {};
  const limit = 10;
  const skip = 0;

  const companies = await Company.aggregate([
    { $match: query },
    {
      $lookup: {
        from: 'notices',
        localField: '_id',
        foreignField: 'companyId',
        as: 'notices'
      }
    },
    {
      $addFields: {
        hasNotice: { $gt: [{ $size: "$notices" }, 0] },
        latestNoticeDate: {
          $cond: {
            if: { $gt: [{ $size: "$notices" }, 0] },
            then: { $add: [ { $max: "$notices.noticeDate" }, 86399000 ] },
            else: "$createdAt"
          }
        }
      }
    },
    { $sort: { hasNotice: -1, latestNoticeDate: -1, _id: -1 } },
    { $skip: skip },
    { $limit: Number(limit) },
    { $project: { notices: 0 } }
  ]);
  
  console.log('--- Top 10 Companies ---');
  companies.forEach(c => {
    console.log(c.name + ' | hasNotice: ' + c.hasNotice + ' | latestNoticeDate: ' + c.latestNoticeDate);
  });
  
  process.exit(0);
}

run().catch(console.error);
