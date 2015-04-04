function checkParams(toCheck, req, res, next) {
	check(toCheck, req.params, res, next);
}

function checkBody(toCheck, req, res, next) {
	check(toCheck, req.body, res, next);
}

function check(toCheck, paramsList, res, next) {
	if(typeof toCheck === "string")
		toCheck = [toCheck];

	for(var i in toCheck) {
		if(typeof paramsList[toCheck[i]] === "undefined" || paramsList[toCheck[i]] === "") {
			return res.send(400, {
				error: "Missing param",
				description: "The parameter " + toCheck[i] + " is required."
			});
		}
	}
	next();
}

module.exports = {
	checkParams	: checkParams,
	checkBody	: checkBody
};