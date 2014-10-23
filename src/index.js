// Generated by CoffeeScript 1.8.0
(function() {
    var BUSINESS_DURATION, BUSINESS_END, BUSINESS_START, COL_WIDTH, Calendar, DAY, calendar, dayNames, loginElement, loginForm, monthNames, toTransparentRGBA;

    DAY = 1000 * 60 * 60 * 24;

    BUSINESS_START = 1000 * 60 * 60 * 7;

    BUSINESS_END = 1000 * 60 * 60 * 19;

    BUSINESS_DURATION = BUSINESS_END - BUSINESS_START;

    COL_WIDTH = 150;

    Date.fromEpoch = function(s) {
        var d;
        d = new Date(0);
        d.setUTCSeconds(s / 1000);
        return d;
    };

    toTransparentRGBA = function(hex) {
        var b, g, r;
        r = parseInt(hex.slice(1, 3), 16);
        g = parseInt(hex.slice(3, 5), 16);
        b = parseInt(hex.slice(5, 7), 16);
        return "rgba(" + r + ", " + g + ", " + b + ", 0.5)";
    };

    dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    Calendar = (function() {
        function Calendar(wrapper, data) {
            var draggingEl, draggingOffset, _i, _j;
            this.wrapper = wrapper;
            this.data = data;
            this.tableHeight = this.wrapper.height();
            this.wrapper.append(this.el = $('<div>')).css({
                'overflow': 'hidden',
                'position': 'absolute',
                'top': '0',
                'bottom': '0',
                'left': '0',
                'right': '0'
            });
            this.el.css({
                'position': 'absolute',
                'top': '0',
                'bottom': '0'
            });
            draggingEl = false;
            draggingOffset = null;
            this.el.on('mousedown touchstart', (function(_this) {
                return function(ev) {
                    var x, _ref;
                    draggingEl = true;
                    x = (_ref = ev.pageX) !== null ? _ref : ev.originalEvent.touches[0].pageX;
                    draggingOffset = _this.el.offset().left - x;
                    return ev.originalEvent.preventDefault();
                };
            })(this));
            this.el.on('mousemove touchmove', (function(_this) {
                return function(ev) {
                    var destination, x, _ref;
                    if (draggingEl) {
                        x = (_ref = ev.pageX) !== null ? _ref : ev.originalEvent.touches[0].pageX;
                        destination = x + draggingOffset;
                        _this.el.css('left', destination + 'px');
                        if (-destination + _this.wrapper.width() > _this.rightmost * 150) {
                            console.log('ADDING RIGHT');
                            return _this.addColumnRight();
                        } else if (-destination < _this.leftmost * 150) {
                            return _this.addColumnLeft();
                        } else {

                        }
                    }
                };
            })(this));
            this.el.on('mouseup touchend', (function(_this) {
                return function(ev) {
                    return draggingEl === false;
                };
            })(this));
            this.leftmost = this.rightmost = 0;
            this.data(this.today(), this.today() + DAY, (function(_this) {
                return function(data) {
                    return _this.el.append(_this.renderColumn(Date.fromEpoch(_this.today()), data));
                };
            })(this));
            for (_i = 1; _i <= 7; _i++) {
                this.addColumnRight();
            }
            for (_j = 1; _j <= 7; _j++) {
                this.addColumnLeft();
            }
        }

        Calendar.prototype.addColumnRight = function() {
            var begin;
            this.rightmost = this.rightmost + 1;
            begin = Date.fromEpoch(this.today() + this.rightmost * DAY);
            return this.data(begin.getTime(), begin.getTime() + DAY, (function(_this) {
                return function(data) {
                    return _this.el.append(_this.renderColumn(begin, data));
                };
            })(this));
        };

        Calendar.prototype.addColumnLeft = function() {
            var begin;
            this.leftmost = this.leftmost - 1;
            begin = Date.fromEpoch(this.today() + this.leftmost * DAY);
            return this.data(begin.getTime(), begin.getTime() + DAY, (function(_this) {
                return function(data) {
                    return _this.el.append(_this.renderColumn(begin, data));
                };
            })(this));
        };

        Calendar.prototype.today = function() {
            var today;
            today = new Date();
            today.setHours(0, 0, 0, 0);
            return today.getTime();
        };

        Calendar.prototype.renderColumn = function(begin, data) {
            var column, event, relativeEnd, relativeStart, _i, _len, _ref;
            column = $('<div>').css({
                'position': 'absolute',
                'display': 'block',
                'top': '0px',
                'bottom': '0px',
                'left': Math.round((begin.getTime() - this.today()) / DAY) * COL_WIDTH + 'px',
                'width': COL_WIDTH + 'px',
                'padding': '2px',
                'text-align': 'center',
                'background': begin.getTime() === this.today() ? '#FFD' : Math.floor(begin / DAY) % 2 === 1 ? '#FFF' : '#EEE'
            });
            column.append($('<div>').css({
                'position': 'absolute',
                'top': '0px',
                'left': '0px',
                'right': '0px'
            }).html("<div>" + dayNames[begin.getDay()] + "</div>\n<div>" + monthNames[begin.getMonth()].slice(0, 3) + " " + (begin.getDate()) + "</div>"));
            for (_i = 0, _len = data.length; _i < _len; _i++) {
                event = data[_i];
                if (!((_ref = event.title) !== 'pass' && _ref !== 'pass2')) {
                    continue;
                }
                relativeStart = event.start - begin.getTime() - BUSINESS_START;
                relativeEnd = begin.getTime() + BUSINESS_END - event.end;
                if ((0 < relativeStart && relativeStart < BUSINESS_DURATION) && (0 < relativeEnd && relativeEnd < BUSINESS_DURATION)) {
                    column.append($('<div>').css({
                        'position': 'absolute',
                        'width': '100%',
                        'top': (relativeStart * this.tableHeight / BUSINESS_DURATION) + 'px',
                        'left': '0',
                        'right': '0',
                        'bottom': (relativeEnd * this.tableHeight / BUSINESS_DURATION) + 'px',
                        'background-color': toTransparentRGBA(event.color)
                    }).html("<div class='begin-time'>" + ((Date.fromEpoch(event.start)).getHours()) + ":" + ((Date.fromEpoch(event.start)).getMinutes()) + "</div>\n<div>" + event.title + "</div>\n<div class='end-time'>" + ((Date.fromEpoch(event.end)).getHours()) + ":" + ((Date.fromEpoch(event.end)).getMinutes()) + "</div>"));
                }
            }
            return column;
        };

        return Calendar;

    })();

    calendar = new Calendar($('#calendar'), function(start, end, cb) {
        return $.ajax({
            url: '/events',
            data: {
                from: start,
                to: end
            },
            dataType: 'json',
            success: function(data) {
                return cb(data.result);
            }
        });
    });

    loginElement = $('#login-btn-wrap');

    loginForm = $('#login-form');

}).call(this);