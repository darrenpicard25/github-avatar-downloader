const request = require('request');

function getRepoContributors(repoOwner, repoName, cb) {
  let options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}








getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});








