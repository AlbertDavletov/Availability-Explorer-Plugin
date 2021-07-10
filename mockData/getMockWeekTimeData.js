function WeekTimeData() {
	var arr = [
	  {id: 0, line: 0, start: new Date(2015,0,1,0,0,0), end: new Date(2015,0,2,10,0,0), class: 'availableType_rect', status: "available", info: "full available"},
	  {id: 1, line: 0, start: new Date(2015,0,2,10,0,0), end: new Date(2015,0,2,11,0,0), class: 'unknownType_rect', status: "unknown", info: "connection failed"},
	  {id: 2, line: 0, start: new Date(2015,0,2,11,0,0), end: new Date(2015,0,2,13,0,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"},
	  {id: 3, line: 0, start: new Date(2015,0,2,13,0,0), end: new Date(2015,0,2,13,30,0), class: 'unknownType_rect', status: "unknown", info: "connection failed"},
	  {id: 4, line: 0, start: new Date(2015,0,2,13,30,0), end: new Date(2015,0,4,0,0,0), class: 'availableType_rect', status: "available", info: "full available"},
	  {id: 5, line: 0, start: new Date(2015,0,4,0,0,0), end: new Date(2015,0,4,5,0,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"},
	  {id: 6, line: 0, start: new Date(2015,0,4,5,0,0), end: new Date(2015,0,4,6,30,0), class: 'unknownType_rect', status: "unknown", info: "connection failed"},
	  {id: 7, line: 0, start: new Date(2015,0,4,6,30,0), end: new Date(2015,0,5,5,0,0), class: 'availableType_rect', status: "available", info: "full available"},
	  {id: 8, line: 0, start: new Date(2015,0,5,5,0,0), end: new Date(2015,0,5,10,20,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"},
	  {id: 9, line: 0, start: new Date(2015,0,5,10,20,0), end: new Date(2015,0,5,10,50,0), class: 'unknownType_rect', status: "unknown", info: "connection failed"},
	  {id: 10, line: 0, start: new Date(2015,0,5,10,50,0), end: new Date(2015,0,8,0,0,0), class: 'availableType_rect', status: "available", info: "full available"},

	  {id: 11, line: 1, start: new Date(2015,0,1,0,0,0), end: new Date(2015,0,3,11,0,0), class: 'availableType_rect', status: "available", info: "full available"},
	  {id: 12, line: 1, start: new Date(2015,0,3,11,0,0), end: new Date(2015,0,3,12,0,0), class: 'unknownType_rect', status: "unknown", info: "connection failed"},
	  {id: 13, line: 1, start: new Date(2015,0,3,12,0,0), end: new Date(2015,0,3,13,0,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"},
	  {id: 14, line: 1, start: new Date(2015,0,3,13,0,0), end: new Date(2015,0,3,14,30,0), class: 'unknownType_rect', status: "unknown", info: "connection failed"},
	  {id: 15, line: 1, start: new Date(2015,0,3,14,30,0), end: new Date(2015,0,4,0,0,0), class: 'availableType_rect', status: "available", info: "full available"},
	  {id: 16, line: 1, start: new Date(2015,0,4,0,0,0), end: new Date(2015,0,4,7,0,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"},
	  {id: 17, line: 1, start: new Date(2015,0,4,7,0,0), end: new Date(2015,0,4,8,30,0), class: 'unknownType_rect', status: "unknown", info: "connection failed"},
	  {id: 18, line: 1, start: new Date(2015,0,4,8,30,0), end: new Date(2015,0,6,5,0,0), class: 'availableType_rect', status: "available", info: "full available"},
	  {id: 19, line: 1, start: new Date(2015,0,6,5,0,0), end: new Date(2015,0,6,10,20,0), class: 'unavailableType_rect', status: "unavailable", info: "fatal error"},
	  {id: 20, line: 1, start: new Date(2015,0,6,10,20,0), end: new Date(2015,0,6,10,50,0), class: 'unknownType_rect', status: "unknown", info: "connection failed"},
	  {id: 21, line: 1, start: new Date(2015,0,6,10,50,0), end: new Date(2015,0,8,0,0,0), class: 'availableType_rect', status: "available", info: "full available"}        

	];
	return arr;
}
