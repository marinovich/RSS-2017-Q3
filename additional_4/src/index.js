module.exports = function multiply(a, b) {
	if (b.length == 0) return 0;
	if (b.length == 1) {
		let s = '';
		for (let i = 0; i < +b; i++) 	
			s = sum (s, a);
		return s;
	}
	return sum(multiply(a, b[b.length - 1]), multiply(a + '0', b.slice(0,-1)));
}
let sum = function sum(a, b) {
	let ost = 0;
	let sumI = '';
	a = a.split('').reverse().join('');
	b = b.split('').reverse().join('');
	for (let i = 0; i < Math.max(a.length, b.length); i++) {
		sumI += ((+a[i] || 0) + (+b[i] || 0) + ost) % 10;
		ost = Math.floor(((+a[i] || 0) + (+b[i] || 0) + ost) / 10);
	}
	if (ost > 0) sumI += ost;
	return sumI.split('').reverse().join('');	
}
