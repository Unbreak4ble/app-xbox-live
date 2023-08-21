
const EMPTY_VALUE = "Empty values are not allowed. Check parameters";

function throwError(msg = String){
	throw new Error(msg);
};

function newError(type = String, reason = String, content = {}){
	return {
		type: type,
		reason: reason,
		content: content
	};
}

module.exports = {
	newError,
	EMPTY_VALUE,
	throwError
};
