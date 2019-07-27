module.exports = function zeros(expression) {
	let exp = expression.split('*');
	let arrSingle = [];
	let arrDouble = [];
	let arrBoth = [];
	let stack2 = 0;
	let stack5 = 0;
	for (let i = 0; i < exp.length; i++) {
		if (exp[i][exp[i].length - 1] == exp[i][exp[i].length - 2])
			arrDouble.push(exp[i].slice(0,-2));
		else
			arrSingle.push(exp[i].slice(0,-1));
	}
	arrDouble.map(
		function(e){
			let i = 0;
			if (e % 2 == 0) i = 2;
			if (e % 2 != 0) i = 1;
			for (; i <= e; i += 2)
				arrBoth.push(i);
		});
	arrSingle.map(
		function(e){
			for (let i = 1; i <= e; i += 1)
				arrBoth.push(i);
		});
	arrBoth.map(
		function(e) {
			while ((e % 2 == 0) || (e % 5 == 0)) {
				if (e % 2 == 0) {
					e /= 2;
					stack2++;
				}
				if (e % 5 == 0) {
					e /= 5;
					stack5++;
				}
			}			
		});
	return Math.min(stack2, stack5);
}
