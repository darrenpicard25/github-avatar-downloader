const request = require('request');

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








getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  for (let person of result) {
    console.log("Person: ", person.login);
    console.log("Avatar : ", person.avatar_url);
  }
});








