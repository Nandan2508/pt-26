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
        roleNoticeDate: {
          $cond: {
            if: { $gt: [{ $size: "$notices" }, 0] },
            then: { $add: [ { $max: "$notices.noticeDate" }, 86399000 ] }, // Boost to end of day
            else: "$createdAt"
          }
        }
      }
    },
    {
      $group: {
        _id: "$name",
        roles: { $push: "$$ROOT" },
        latestNoticeDate: { $max: "$roleNoticeDate" },
        createdAt: { $max: "$createdAt" }
      }
    },
    { $sort: { latestNoticeDate: -1, _id: -1 } },
    { $skip: skip },
    { $limit: Number(limit) },
    { $unwind: "$roles" },
    { $replaceRoot: { newRoot: "$roles" } },
    { $project: { notices: 0, roleNoticeDate: 0 } }
  ]);
  
  console.log('--- Top Roles ---');
  let currentGroup = '';
  companies.forEach(c => {
    if (currentGroup !== c.name) {
      console.log(`\n=== ${c.name} ===`);
      currentGroup = c.name;
    }
    console.log(`  Role: ${c.role} | createdAt: ${c.createdAt}`);
  });
  
  process.exit(0);
}

run().catch(console.error);
