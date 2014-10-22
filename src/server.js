//SRC

var temp_defaults = JSON.stringify({
    "symbols" : {
        "med" : {
            "label" : "Meditation",
            "minutes" : 30
        },
        "assemble"  : {
            "label" : "Assembly",
            "minutes" : 30
        },
  "advise" : {
      "label" : "Advising",
      "minutes" : 30
  },
        "dept" : {
            "label" : "Department Meeting",
            "minutes" : 50
        },
        "faculty" : {
            "label" : "Faculty Meeting",
            "minutes" : 50
        },
        "break" : {
            "label" : "Break",
            "minutes" : 20
        },
        "uni" : {
            "label" : "Uni Free",
            "minutes" : 30
        },
        "lunch" : {
            "label" : "Lunch",
            "minutes" : 50
        },
        "dinner" : {
            "label" : "Dinner",
            "minutes" : 45
        },
        "sports" : {
            "label" : "JV/V Sports",
            "minutes" : 255
        },
        "pass" : {
            "label" : "Passing",
            "minutes" : 5
        },
  "pass2" : {
      "label" : "Passing",
      "minutes" : 10
  },
        "i" : {
            "label" : "I",
            "minutes" : 90
        },
        "I" : {
            "label" : "I",
            "minutes" : 150
        },
        "noclass" : {
            "label" : "No Class",
            "minutes" : 180
        },
        "format" : {
            "lowercase" : 50,
            "uppercase" : 70,
            "default" : 50
        }
    },
    "days" : {
        "start" : "08:00",
        "6" : {
            "label" : "Saturday",
      "day" : "Saturday",
            "events" : [
                "noclass", "sports"
            ],
            "allday" : [
                "noclass"
            ]
        },
        "7" : {
            "label" : "Sunday",
      "day" : "Sunday", 
            "events" : [
                "noclass"
            ],
            "allday" : [
                "noclass"
            ]
        }
    }
}); 

var temp_week = JSON.stringify({
    "name" : "Week 1",
    "label" : "Standard Week 1 with Advising Block",
    "symbols" : {
      "sports" : {
        "label" : "JV/V Sports",
        "minutes" : 235
      }
    },
    "days" : {
        "1" : {
            "label" : "Monday",
      "day" : "Monday",
            "events" : [
                "t","pass","b","pass","faculty","pass","c","pass","D","lunch",
                "E","pass","f","uni","g","pass","q","dinner","i"
            ]
        },
        "2" : {
            "label" : "Tuesday",
      "day" : "Tuesday",
            "events" : [
                "u","pass","a","pass","assemble","break","pass","d","pass","C","lunch",
                "e","pass","F","uni","z","pass","h","dinner","i"
            ]
        },
        "3" : {
            "label" : "Wednesday",
      "day" : "Wednesday",
            "events" : [
                "c","pass","b","pass","med","pass2","advise","pass","e","pass","g","lunch",
                "pass","sports","pass","I"
            ]
        },
        "4" : {
            "label" : "Thursday",
      "day" : "Thursday",
            "events" : [
                "v","pass","d","pass","dept","pass","a","pass","B","lunch",
                "x","pass","f","uni","g","pass","H","dinner","i"
            ]
        },
        "5" : {
            "label" : "Friday",
      "day" : "Friday",
            "events" : [
                "w","pass","c","pass","assemble","break","pass","b","pass","A","lunch",
                "e","pass","y","uni","G","pass","h","dinner"
            ]
        }
    }
});

var temp_year = JSON.stringify({
    "year" : 2014,
    "terms" : {
        "0" : {
            "label" : "Fall Term",
            "abbr" : "FA/14",
            "start" : "09.06.2014",
            "end" : "11.22.2014"
        },
        "1" : {
            "label" : "Winter Term",
            "abbr" : "WI/15",
            "start" : "12.02.2014",
            "end" : "03.06.2015"
        },
        "2" : {
            "label" : "Spring Term",
            "abbr" : "SP/15",
            "start" : "03.22.2015",
            "end" : "06.04.2015"
        }
    },
    "schedules" : {
        "06.17.2014" : {
            "end" : "08.24.2014",
            "calendar" : "vacation"
        },
        "08.25.2014" : {
            "end" : "08.31.2014",
            "calendar" : "facultyweek"
        },
        "09.01.2014" : {
            "end" : "09.07.2014",
            "calendar" : "introweek"
        },
        "09.08.2014" : {
            "end" : "09.14.2014",
            "calendar" : "week1"
        },
        "09.15.2014" : {
            "end" : "09.21.2014",
            "calendar" : "week2"
        },
        "09.22.2014" : {
            "end" : "09.28.2014",
            "calendar" : "week1",
            "overlays" : [
                    "ALD"
                ]
        },
        "09.29.2014" : {
            "end" : "10.05.2014",
            "calendar" : "week2"
        },
        "10.06.2014" : {
            "end" : "10.12.2014",
            "calendar" : "week1",
      "overlays" : [
        "planning"
      ]
        },
  "10.13.2014" : {
      "end"  : "10.16.2014",
      "calendar" : "week2"
  },
  "10.17.2014" : {
    "end" : "10.20.2014",
    "calendar" : "week2",
    "overlays" : [
      "familyweekend","week2sat"
    ]
  },
        "10.21.2014" : {
            "end" : "10.26.2014",
            "calendar" : "week1",
        "overlays" : [
          "week1deptmed"
        ]
        },
        "10.27.2014" : {
            "end" : "11.02.2014",
            "calendar" : "week2",
      "overlays" : [
        "planning"
      ]
        },
        "11.03.2014" : { 
            "end" : "11.09.2014",
            "calendar" : "week1"
        },
        "11.10.2014" : { 
            "end" : "11.16.2014",
            "calendar" : "week2"
        },
        "11.17.2014" : {
            "end" : "11.23.2014",
            "calendar" : "week1",
      "overlays" : [
        "finalweek_fall"
      ]
        },
        "11.24.2014" : {
            "end" : "12.01.2014",
            "calendar" : "vacation"
        },
        "12.02.2014" : {
            "end" : "12.07.2014",
            "calendar" : "week1",
      "overlays" : [
        "firstweek_winter"
      ]
        },
        "12.08.2014" : {
            "end" : "12.14.2014",
            "calendar" : "week2"
        },
        "12.15.2014" : {
            "end" : "12.21.2014",
            "calendar" : "week1",
      "overlays" : [
        "winter_break"
      ]
        },
        "12.22.2014" : {
            "end" : "01.04.2015",
            "calendar" : "vacation"
        },
        "01.05.2015" : {
            "end" : "01.11.2015",
            "calendar" : "week1",
      "overlays" : [
        "firstweek_year"
      ]
        },
        "01.12.2015" : {
            "end" : "01.18.2015",
            "calendar" : "week2",
            "overlays" : [
                "MLK"
            ]
        },
        "01.19.2015" : {
            "end" : "01.25.2015",
            "calendar" : "week1",
      "overlays" : [
        "week1deptmed"
      ]
        },
        "01.26.2015" : {
            "end" : "02.01.2015",
            "calendar" : "week2"
        },
        "02.02.2015" : {
            "end" : "02.08.2015",
            "calendar" : "week1"
        },
        "02.09.2015" : {
            "end" : "02.15.2015",
            "calendar" : "week2"
        },
        "02.16.2015" : {
            "end" : "02.22.2015",
            "calendar" : "week1"
        },
        "02.23.2015" : {
            "end" : "03.01.2015",
            "calendar" : "week2"
        },
        "03.02.2015" : {
            "end" : "03.06.2015",
      "calendar" : "week1",
      "overlays" : [
              "finalweek_winter"
      ]
        },
        "03.07.2015" : {
            "end" : "03.23.2015",
            "calendar" : "vacation"
        },
        "03.24.2015" : {
            "end" : "03.29.2015",
            "calendar" : "week1"
        },
        "03.30.2015" : {
            "end" : "04.05.2015",
            "calendar" : "week2",
            "overlays" : [
                "experience_exeter"
            ]
        },
        "04.06.2015" : {
            "end" : "04.12.2015",
            "calendar" : "week1",
      "overlays" : [
        "week1sat"
      ]
        },
        "04.13.2015" : {
            "end" : "04.19.2015",
            "calendar" : "week2"
        },
        "04.20.2015" : {
            "end" : "04.26.2015",
            "calendar" : "week1",
            "overlays" : [
                "week1sat"
            ]
        },
        "04.27.2015" : {
            "end" : "05.03.2015",
            "calendar" : "week2",
      "overlays" : [
        "week2sat"
      ]
        },
        "05.04.2015" : {
            "end" : "05.10.2015",
            "calendar" : "week1"
        },
        "05.11.2015" : {
            "end" : "05.17.2015",
            "calendar" : "week2",
      "overlays" : [
        "week2sat"
      ]
        },
        "05.18.2015" : {
            "end" : "05.24.2015",
            "calendar" : "week1"
        },
        "05.25.2015" : {
            "end" : "05.31.2015",
            "calendar" : "week2",
            "overlays" : [
                "week2memorial"
            ]
        },
        "06.01.2015" : {
            "end" : "06.07.2015",
            "calendar" : "finalweek_spring"
        },
        "06.08.2015" : {
            "end" : "06.23.2015",
            "calendar" : "vacation"
        }
    }
}); 


var express = require('express'),
    fs = require('fs'),
    url = require('url');

var app = express();

var year_obj = JSON.parse(temp_year); 
var week_obj = JSON.parse(temp_week); 
var defaults_obj = JSON.parse(temp_defaults); 
var ms_in_min = 60000;

function toEvent (year_obj) {
  for (var key in year_obj.schedules)
    //console.log("Calendar: " + JSON.stringify(year_obj.schedules[key].calendar));
//console.log("Calendar: " + year_obj.schedules[key].calendar);
	
	if (year_obj.schedules[key].calendar == "week1" || year_obj.schedules[key].calendar == "week2") {
		for (var day in week_obj.days) {
            console.log(week_obj.days[day].label);
			var start_time = 0; //edit later
			//console.log("events: " + JSON.stringify(week_obj.days[day].events));
			for(var i = 0; i < week_obj.days[day].events.length; i++) {
				var event = week_obj.days[day].events[i];
				console.log(event);
				if (event.length == 1) {
					if (event.charAt(0) == event.charAt(0).toLowerCase()) {
						console.log(start_time);
						start_time += defaults_obj.symbols.format.lowercase * ms_in_min;
					} else {
						console.log(start_time);
						start_time += defaults_obj.symbols.format.uppercase * ms_in_min;
					}
					//console.log(JSON.stringify(defaults_obj.symbols.format.lowercase));
				} else  {
					console.log(start_time);
					start_time += defaults_obj.symbols[event].minutes * ms_in_min;
				}	
                console.log("..."); 		
			}
		}
	}
} 

toEvent(year_obj); 

REGULAR_EVENTS = [
  {
    id: 0,
    name: 'Daily Event',
    color: '#A6B9C4',
    start: 1412809833621,
    duration: 3600000,
    frequency: 86400000
  },
  {
    id: 1,
    name: 'Odd-Hours Event',
    color: '#EDF393',
    start: 1412802633621,
    duration: 7200000,
    frequency: 172800000
  },
  {
    id: 2,
    name: 'Morning Class',
    color: '#EDF393',
    start: 1412799033621,
    duration: 3600000,
    frequency: 172800000
  }
];

app.use('/bower_components', express.static('bower_components'));

app.get('/events', function(req, res, next) {
  var from = Number(req.query.from),
      to = Number(req.query.to), ev, st,
      events = [];
  for (var i = 0; i < REGULAR_EVENTS.length; i++) {
    ev = REGULAR_EVENTS[i];
    st = Math.floor((from - ev.start) / ev.frequency); startTime = 0;
    while (startTime < to) {
      startTime = ev.start + ev.frequency * st;
      events.push({
        id: ev.id.toString() + '@' + startTime,
        title: ev.name,
        color: ev.color,
        start: startTime,
        end: startTime + ev.duration
      });
      st += 1;
    }
  }
  res.send(JSON.stringify({
    success: 1,
    result: events
  }));
});

app.use('/', express.static('.'));

app.listen(process.env.PORT, function() {
  console.log('Listening on port', process.env.PORT);
});
