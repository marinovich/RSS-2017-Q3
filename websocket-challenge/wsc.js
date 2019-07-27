socket = new WebSocket('ws://188.166.46.38/');
socket.binaryType = "arraybuffer";
socket.onopen = function() {
	let sendObj = {name: "Marinovich Alexander", command: "challenge accepted"};
	socket.send(JSON.stringify(sendObj));
}

let getResult = function getResult (acc, item, sign) {
	switch (sign) {
		case '+': return acc + item;
		case '-': return acc - item;
		case '*': return acc * item;
		break;
	}
}

socket.onmessage = function(event) {
	let sendObj = {};
	if (typeof event.data === 'string') {
		let obj = JSON.parse(event.data);
		let nextTask = obj.next || obj.nextTask;
		let taskName = obj.name;
		
		socket.token = socket.token || obj.token;
		sendObj.token = socket.token;
		sendObj.command = taskName;

		if (nextTask) {
			socket.send(JSON.stringify({'token': sendObj.token , 'command': nextTask}));			
		}

		else if (taskName === 'arithmetic') {			
			sendObj.answer = obj.task.values.reduce((acc, item) => getResult(acc, item, obj.task.sign));
			socket.send(JSON.stringify(sendObj));
		}
		else if (taskName === 'binary_arithmetic') {
			socket.bits = obj.task.bits;
		}
		else if (taskName === 'win') {
			sendObj.token = socket.token;
			socket.send(JSON.stringify(sendObj))
		}
		console.log(obj);
	}
	if (typeof event.data === 'object') {
		sendObj.token = socket.token;
		sendObj.command = 'binary_arithmetic';
		if (socket.bits == 8) { sendObj.answer = [].reduce.call(new Uint8Array(event.data), (sum,item) => sum + item, 0); } 
		if (socket.bits == 16) { sendObj.answer = [].reduce.call(new Uint16Array(event.data), (sum,item) => sum + item, 0); } 
		socket.send(JSON.stringify(sendObj))
	}
}