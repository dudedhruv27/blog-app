// for getting object ID according to mongoDB
const ObjectId = require("mongodb").ObjectId;

// getting all the questions from DB
function getQuestions(req, res){
	let email = req.params.email;
	req.Db.collection('questions').find({members: email}).toArray()
		.then(function(result){
			if(result == null){
				res.status(501).send("No result");
			}
			res.status(200).send(result);
		}).catch(function(err){
			res.status(500).send("Not found");
		});
}

// taking frontend data and inserting new groups in DB
function createQuestions(req, res){
	let email = req.params.email;
	let newQuestion = {_id: new ObjectId(), title: req.body.title, answers: [], created_at: new Date(), updated_at: new Date(), upvote: 0, downvote: 0, addedBy: email};
	req.Db.collection('questions').insertOne(newQuestion)
		.then(function(result){
			if(result == null){
				res.status(501).send("No result");
			}
			res.status(200).send(newGroup);
		}).catch(function(err){
			res.status(500).send("Not found");
		});
}

module.exports = {
	getQuestions,
	createQuestions
}