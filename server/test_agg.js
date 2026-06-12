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
        roleHasNotice: { $gt: [{ $size: "$notices" }, 0] },
        roleNoticeDate: {
          $cond: {
            if: { $gt: [{ $size: "$notices" }, 0] },
            then: { $max: "$notices.noticeDate" },
            else: "$createdAt"
          }
        }
      }
    },
    // Group by company name
    {
      $group: {
        _id: "$name",
        roles: { $push: "$$ROOT" },
        hasNotice: { $max: "$roleHasNotice" },
        latestNoticeDate: { $max: "$roleNoticeDate" },
        createdAt: { $max: "$createdAt" }
      }
    },
    // Sort the groups
    { $sort: { hasNotice: -1, latestNoticeDate: -1, _id: -1 } },
    { $skip: skip },
    { $limit: Number(limit) },
    // Flatten the roles back into an array of documents
    { $unwind: "$roles" },
    // Replace the root to be the role document itself
    { $replaceRoot: { newRoot: "$roles" } },
    { $project: { notices: 0, roleHasNotice: 0, roleNoticeDate: 0 } }
  ]);
  
  console.log('--- Top Roles ---');
  companies.forEach(c => {
    console.log(c.name + ' | role: ' + c.role + ' | createdAt: ' + c.createdAt);
  });
  
  process.exit(0);
}

run().catch(console.error);
