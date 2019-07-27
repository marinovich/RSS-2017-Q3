module.exports = function check(str, brConf) {
  let stack = [];
  if (str.length % 2) return false; 
  for (let i = 0; i < str.length; i++)
  	for (let j = 0; j < brConf.length; j++) {
  		if (str[i] == stack[stack.length - 1] && brConf[j][0] == brConf[j][1]) {
  			stack.pop();
  			break;
  		}
  		if (str[i] == brConf[j][0]) {
  			stack.push(brConf[j][1]);
  			break;
  		}
  		else if (str[i] == brConf[j][1]) {
  			if (str[i] == stack[stack.length - 1]){
  				stack.pop();
  				break;
  			}
  			else return false;
  		}
  	}

  return (!stack.length) ? true : false;
}
