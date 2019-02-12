const request = require('request');
const fs = require('fs');

function getRepoContributors(repoOwner, repoName, cb) {
  let options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
    }
  };

  request(options, function(err, res, body) {
    let dataObj = JSON.parse(body);
    cb(err, dataObj);
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) { })

       .pipe(fs.createWriteStream(filePath));
}


let [owner, repo] = process.argv.slice(2); //["jquery, jquery"]

if (owner && repo) {
  getRepoContributors(owner, repo, function(err, result) {
    if (err) {
      console.log('Error : ', err);
    }
    for (let person of result) {
      let path = `./avatars/${person.login}.jpg`;
      let personURL= person.avatar_url;
      downloadImageByURL(personURL, path);
    }
  });
} else {
  console.log("Must enter a owner and repo");
}

