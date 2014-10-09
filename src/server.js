var express = require('express'),
    fs = require('fs'),
    url = require('url');

var app = express();

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
