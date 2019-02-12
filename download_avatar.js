//Import all files needed
const request = require('request');
const fs = require('fs');
const token = require('./secrets.js');


//Function Declaration
function getRepoContributors(repoOwner, repoName, cb) {
  let options = {
    url: `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`,
    headers: {
      'User-Agent': 'request',
      Authorization: token.GITHUB_TOKEN
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


//Main section of code

//Gets user input
let [owner, repo] = process.argv.slice(2);

//Checks to insure user inputed variables if not a print statement is used
if (owner && repo) {
  getRepoContributors(owner, repo, function(err, result) {
    if (err) {
      console.log('Error : ', err);
    }
    for (let person of result) {
      let path = `./avatars/${person.login}.jpg`;
      let personURL = person.avatar_url;
      downloadImageByURL(personURL, path);
    }
  });
} else {
  console.log("Must enter a owner and repo");
}

