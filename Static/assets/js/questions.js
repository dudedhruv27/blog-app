// Getting Questions for Showing questions --------------------
function getQuestions() {
	return fetch(`/api/questions/${user.email}`, {
		method: "get",
		headers: {
			"content-type": "application/json; charset=UTF-8"
		}
	}).then(function(data){
		if(data.status == 200){
			return data; // fetching data 
		}
		throw "error while fetching data";
	}).then(function(data){
		return data.json(); // converting data to JSON
	});
}

function showQuestions() {
	document.getElementById("questions").innerHTML = "";
// Loop for showing the questions on frontend -------------
	for (var i = 0; i<questions.length; i++) {
		let el = document.createElement("div");
		// making groups a link for going to particular group page -------------
		el.innerHTML = `<h4 onclick="javascript: window.location = '/#/question/${questions[i]._id}';">${questions[i].name}</h4>`;
		document.getElementById("questions").appendChild(el);
	}
}

function createQuestion(event) {
	event.preventDefault();
	fetch(`/api/questions/create/${user.email}`, {
		method: "post",
		headers: {
			"content-type": "application/json; charset=UTF-8"
		},
		body: `{"title": "${event.target.title.value}"}`
	}).then(function(data){
		if(data.status == 404){
			console.log("API not found");
			return;
		}
		return data; 
	}).then(function(data){
		return data.json();
	})
	.then(function(data){
		questions.push(data); // push data to groups array
		showQuestions(); // showing groups again (no need of refreshing the page)
	})
	.catch(function(err){
		console.log(err);
	});
}

// Empty Groups Page for new groups -----------------
let questions = [];