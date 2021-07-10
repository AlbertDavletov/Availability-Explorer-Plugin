function DayTimeData() {
	var resultArr =  [
		{id: 0, line: 0, start: new Date(2015,0,1,0,0,0), end: new Date(2015,0,1,15,0,0), class: 'availableType_rect', status: "available", info: "full available"},
		{id: 1, line: 0, start: new Date(2015,0,1,15,0,0), end: new Date(2015,0,1,15,15,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"},
		{id: 3, line: 0, start: new Date(2015,0,1,15,15,0), end: new Date(2015,0,1,15,20,0), class: 'unknownType_rect', status: "unknown", info: "connection failed"},
		{id: 4, line: 0, start: new Date(2015,0,1,15,20,0), end: new Date(2015,0,1,15,30,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"},
		{id: 5, line: 0, start: new Date(2015,0,1,15,30,0), end: new Date(2015,0,1,20,0,0), class: 'availableType_rect', status: "available", info: "full available"},
		{id: 6, line: 0, start: new Date(2015,0,1,20,0,0), end: new Date(2015,0,1,20,30,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"},
		{id: 7, line: 0, start: new Date(2015,0,1,20,30,0), end: new Date(2015,0,1,22,0,0), class: 'availableType_rect', status: "available", info: "full available"},
		{id: 8, line: 0, start: new Date(2015,0,1,22,0,0), end: new Date(2015,0,1,23,0,0), class: 'unknownType_rect', status: "unknown", info: "connection failed"},
		{id: 9, line: 0, start: new Date(2015,0,1,23,0,0), end: new Date(2015,0,1,23,50,0), class: 'availableType_rect', status: "available", info: "full available"},
		{id: 10, line: 0, start: new Date(2015,0,1,23,50,0), end: new Date(2015,0,2,0,0,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"},

		{id: 11, line: 1, start: new Date(2015,0,1,0,0,0), end: new Date(2015,0,1,17,0,0), class: 'availableType_rect', status: "available", info: "full available"},
		{id: 12, line: 1, start: new Date(2015,0,1,17,0,0), end: new Date(2015,0,1,17,15,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"},
		{id: 13, line: 1, start: new Date(2015,0,1,17,15,0), end: new Date(2015,0,1,17,20,0), class: 'unknownType_rect', status: "unknown", info: "connection failed"},
		{id: 14, line: 1, start: new Date(2015,0,1,17,20,0), end: new Date(2015,0,1,17,30,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"},
		{id: 15, line: 1, start: new Date(2015,0,1,17,30,0), end: new Date(2015,0,1,21,0,0), class: 'availableType_rect', status: "available", info: "full available"},
		{id: 16, line: 1, start: new Date(2015,0,1,21,0,0), end: new Date(2015,0,1,21,20,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"},
		{id: 17, line: 1, start: new Date(2015,0,1,21,20,0), end: new Date(2015,0,1,22,0,0), class: 'availableType_rect', status: "available", info: "full available"},
		{id: 18, line: 1, start: new Date(2015,0,1,22,0,0), end: new Date(2015,0,1,23,20,0), class: 'unknownType_rect', status: "unknown", info: "connection failed"},
		{id: 19, line: 1, start: new Date(2015,0,1,23,20,0), end: new Date(2015,0,1,23,50,0), class: 'availableType_rect', status: "available", info: "full available"},
		{id: 20, line: 1, start: new Date(2015,0,1,23,50,0), end: new Date(2015,0,2,0,0,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"}
	]; 
	return resultArr;
}
