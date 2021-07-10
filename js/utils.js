// get svg position by item
function getPosition(chartSettings, items) {
	var chSet = chartSettings;

	var positions = {}, d, offset = .5 * chSet.y2(1) + 0.5, result = [];

	for (var i = 0; i < items.length; i++) {

	  d = items[i];

	  if (!positions[d.class]) positions[d.class] = ''; 

	  positions[d.class] += ['M', chSet.x(d.start),(chSet.y2(d.line) + offset),'H',chSet.x(d.end)].join(' ');

	}

	for (var className in positions) {

	  result.push({class: className, path: positions[className]});

	}

	return result;
}

// get test date with input hour parameter
function setHour(hour) {
	var date = new Date(2015,0,1, hour, 0, 0);
	return date;
}
