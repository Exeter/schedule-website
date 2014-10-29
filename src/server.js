// Dependencies
var fs = require('fs'),
    express = require('express'),
    url = require('url');

// Static data
var year_obj = JSON.parse(fs.readFileSync('year.json')),
    week1_obj = JSON.parse(fs.readFileSync('week1.json')),
    week2_obj = JSON.parse(fs.readFileSync('week2.json')),
    weeks = {
        week1: week1_obj,
        week2: week2_obj
    },
    defaults_obj = JSON.parse(fs.readFileSync('defaults.json'));

function padTwo(n) {
    var str = n.toString();
    if (str.length === 1) return '0' + str;
    else return str;
}

// Maps lowercase formats to colors
var format_to_color = {
    "a": "#F7FE2E",
    "t": "#F7FE2E",
    "b": "#58FA58",
    "u": "#58FA58",
    "c": "#2ECCFA",
    "v": "#2ECCFA",
    "d": "#CC2EFA",
    "w": "#CC2EFA",
    "e": "#FE2E2E",
    "x": "#FE2E2E",
    "f": "#088A08",
    "y": "#088A08",
    "g": "#FF8000",
    "z": "#FF8000",
    "h": "#045FB4",
    "q": "#045FB4",
    "*": "#BDBDBD"
};

// Adds uppercase blocks
for (var key in format_to_color) {
    format_to_color[key.toUpperCase()] = format_to_color[key];
}

// Convenience constants
var MS_PER_MIN = 60000;

// Convenience function for converting period-delimited time representation to epoch time.
function time_to_ms(year, month, day, hour, minute) {
    return (new Date(year, month, day, hour, minute, 0, 0)).getTime();
}

function ms_to_date(ms) {
    var d = new Date(0);
    d.setUTCSeconds(ms / 1000);
    return d;
}

function getMonDate(ms) {
    var d = ms_to_date(ms),
        day = d.getDay(),
        diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    if (d.getDay() !== 1) {
        throw new Error('WRONG');
    }
    return d;
}

function getMonDay(ms) {
    var d = getMonDate(ms);
    return padTwo(d.getMonth() + 1) + '.' + padTwo(d.getDate()) + '.' + d.getFullYear();
}

function getMonTime(ms) {
    var d = getMonDate(ms);
    return d.getTime();
}

function getWeekDay(ms) {
    var d = ms_to_date(ms);
    return d.getDay();
}

/*
 * Generate all events for the entire year.
 */

var all_events = {};

function getDuration(event) {

    // Lowercase letter denotes regular block
    if (event.match(/^[abcdefghituvwxyzq]$/) !== null) {
        return defaults_obj.symbols.format.lowercase * MS_PER_MIN;

    // Uppercase letter denotes fat block
    } else if (event.match(/^[ABCDEFGHI]$/) !== null) {
        return defaults_obj.symbols.format.uppercase * MS_PER_MIN;

    // All other events have their own times
    } else {
        return defaults_obj.symbols[event].minutes * MS_PER_MIN;
    }
}

function getColor(event) {
    if (event in format_to_color) {
        return format_to_color[event];
    } else {
        return format_to_color['*'];
    }
}

function generateEvents(start, week) {
    var i, event, duration,
        weekEvents = ((week.days[getWeekDay(start)] || {}).events || []),

        // On regular days, start time is 08:00
        startTime = start + 1000 * 60 * 60 * 8,
        generatedEvents = [];
    for (i = 0; i < weekEvents.length; i++) {
        event = weekEvents[i];
        duration = getDuration(event);
        generatedEvents.push({
            // (FIX) Hopefully random numbers do not collide
            id: Math.random(),
            title: event,
            color: getColor(event),
            start: startTime,
            end: startTime + duration
        });
        startTime += duration;
    }
    return generatedEvents;
}

//console.log(year_obj.schedules['10.13.2014']);

var app = express();

app.use('/bower_components', express.static('bower_components'));

app.get('/events', function(req, res, next) {
    var from = Number(req.query.from),
        to = Number(req.query.to),
        mon = getMonDay(from),
        // asdf = console.log('looking up', mon, year_obj.schedules[mon]),
        events = generateEvents(from, weeks[year_obj.schedules[getMonDay(from)].calendar]);
    res.send(JSON.stringify({
        success: true,
        result: events
    }));
});

app.use('/', express.static('.'));

app.listen(process.env.PORT, function() {
    console.log('Listening on port', process.env.PORT);
});