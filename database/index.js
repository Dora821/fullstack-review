const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/fetcher', { useNewUrlParser: true, useUnifiedTopology: true});
let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: {type: Number, unique : true },
  user_id: Number,
  url: String,
  repo_name: String,
  user_name: String,
  size: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (arr, callback) => {
  Repo.insertMany(arr, (err, doc) => {
    if (err) {
      callback(err);
    } else {
      callback(null, doc);
    }
  });
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
};

let displayData = (callback) => {
  // Repo.find({}, (err, docs)=> {
  //   if (err) {
  //     console.log('databse error', err);
  //     callback(err);
  //   } else {
  //     console.log('all data', docs);
  //     callback(null, docs);
  //   }
  // });
  return Repo.find({}).sort({'size': -1}).limit(25);
};


let updateData = (obj) => {
  let filter = {'repo_id': obj.repo_id};
  let update = {
    'user_id': obj.repo_id,
    'url': obj.user_id,
    'repo_name': obj.url,
    'size': obj.size,
    'user_name': obj.user_name
  };
  return Repo.findOneAndUpdate(filter, update, {new: true, upsert: true});

};
module.exports.save = save;
module.exports.displayData = displayData;
module.exports.updateData = updateData;