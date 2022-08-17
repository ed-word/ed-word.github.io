const request = require('request');
const fs = require('fs'); 

fs.closeSync(fs.openSync("projects.json", 'w'));

var options1 = {
  url: "https://api.github.com/users/ed-word/repos",
  headers: {
    'User-Agent': 'request'
  }
};

request.get(options1, function(error1, response1, body1) {
	if (error1) { 
  		console.log(error1);
  	}else if(response1.statusCode !== 200) { 
  		console.log("Error: ", response1.statusCode);
  	}else {
  		jsonResponse = JSON.parse(body1);
  		
  		fs.appendFileSync("projects.json", "[\n");
  		var ending = "";
  		for(let repo of jsonResponse) {
  			var options2 = {
			  url: repo["languages_url"],
			  headers: {
			    'User-Agent': 'request'
			  }
			};
			request.get(options2, function(error2, response2, body2){
		  		if (error2) { 
		  			console.log(error2);
		  		}else if(response2.statusCode !== 200) { 
		  			console.log("Error: ", response2.statusCode);
		  		}else {
		  			languages = Object.keys(JSON.parse(body2));
		  			repositories = {
		  				"name":repo["name"], 
		  				"url":repo["html_url"], 
		  				"description":repo["description"], 
		  				"languages":languages, 
		  				"stars":repo["stargazers_count"], 
		  				"forks":repo["forks_count"]
		  			};
		  			var stringLine = ending + "\t" + JSON.stringify(repositories);
		  			ending = ", \n";
		  			fs.appendFileSync("projects.json", stringLine);
		  		}
			});
		}
        fs.appendFileSync("projects.json", "\n]");
  	}
});
