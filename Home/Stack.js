/****************************************************************
*																*
* Filename: Stack.js											*
* Authors: Ryan Rodriguez, Josh Wu, David Easley, Chen Long		*
* Purpose: Defines a Stack Constructor.							*
*																*
****************************************************************/

//
//	Stack constructor
//
function Stack() {

	var stack = [];
	
	// adds item to stack
	this.push = function(item) {
		stack[stack.length] = item;
	}
	
	// removes item from top of stack and returns the value
	this.pop = function() {
		if(stack.length > 0) {
			var item = stack[stack.length-1];
			stack.splice(-1, 1);
			return item;
		}
		else {
			throw "Empty Stack";
		}
	}
	
	// returns item from top of stack
	this.peek = function() {
		if(stack.length > 0) {
			return stack[stack.length-1];
		}
		else {
			throw "Empty Stack";
		}
	}	
	
	// returns height of stack
	this.length = function() {
		return stack.length;
	}
}
