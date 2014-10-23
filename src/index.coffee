DAY = 1000 * 60 * 60 * 24
BUSINESS_START = 1000 * 60 * 60 * 7
BUSINESS_END = 1000 * 60 * 60 * 19
BUSINESS_DURATION = BUSINESS_END - BUSINESS_START
COL_WIDTH = 150

Date.fromEpoch = (s) ->
  d = new Date 0
  d.setUTCSeconds s / 1000
  return d

toTransparentRGBA = (hex) ->
  r = parseInt hex[1..2], 16
  g = parseInt hex[3..4], 16
  b = parseInt hex[5..6], 16

  return "rgba(#{r}, #{g}, #{b}, 0.5)"

dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
monthNames = [
  'January'
  'February'
  'March'
  'April'
  'May'
  'June'
  'July'
  'August'
  'September'
  'October'
  'November'
  'December'
]

class Calendar
  constructor: (@wrapper, @data) ->
    @tableHeight = @wrapper.height()
    @wrapper.append(@el = $('<div>')).css {
      'overflow': 'hidden'
      'position': 'absolute'
      'top': '0', 'bottom': '0', 'left': '0', 'right': '0'
    }

    @el.css {
      'position': 'absolute'
      'top': '0', 'bottom': '0'
    }

    draggingEl = false
    draggingOffset = null

    @el.on 'mousedown touchstart', (ev) =>
      draggingEl = true
      x = ev.pageX ? ev.originalEvent.touches[0].pageX
      draggingOffset = @el.offset().left - x

      ev.originalEvent.preventDefault()

    @el.on 'mousemove touchmove', (ev) =>
      if draggingEl
        x = ev.pageX ? ev.originalEvent.touches[0].pageX
        destination = x + draggingOffset
        @el.css 'left', (destination + 'px')

        if -destination + @wrapper.width() > @rightmost * 150
          console.log 'ADDING RIGHT'
          @addColumnRight()
        else if -destination < @leftmost * 150
          @addColumnLeft()
        else

    @el.on 'mouseup touchend', (ev) =>
      draggingEl = false

    @leftmost = @rightmost = 0

    @data @today(), @today() + DAY, (data) =>
      @el.append @renderColumn Date.fromEpoch(@today()), data

    @addColumnRight() for [1..7]
    @addColumnLeft() for [1..7]

  addColumnRight: ->
    @rightmost = @rightmost + 1
    begin = Date.fromEpoch(@today() + @rightmost * DAY)
    @data begin.getTime(), begin.getTime() + DAY, (data) =>
      @el.append @renderColumn begin, data

  addColumnLeft: ->
    @leftmost = @leftmost - 1
    begin = Date.fromEpoch(@today() + @leftmost * DAY)
    @data begin.getTime(), begin.getTime() + DAY, (data) =>
      @el.append @renderColumn begin, data

  today: ->
    today = new Date()
    today.setHours 0, 0, 0, 0
    return today.getTime()

  renderColumn: (begin, data) ->
    column = $('<div>').css({
      'position': 'absolute'
      'display': 'block'
      'top': '0px'
      'bottom': '0px'
      'left': Math.round((begin.getTime() - @today()) / DAY) * COL_WIDTH + 'px'
      'width':  COL_WIDTH + 'px'
      'padding': '2px'
      'text-align': 'center'
      'background': if begin.getTime() is @today() then '#FFD' else if Math.floor(begin / DAY) % 2 is 1 then '#FFF' else '#EEE'
    })
    column.append $('<div>').css({
      'position': 'absolute'
      'top': '0px'
      'left': '0px'
      'right': '0px'
    }).html """
    <div>#{dayNames[begin.getDay()]}</div>
    <div>#{monthNames[begin.getMonth()][..2]} #{begin.getDate()}</div>
    """
    for event in data when event.title not in ['pass', 'pass2']
      relativeStart = event.start - begin.getTime() - BUSINESS_START
      relativeEnd = begin.getTime() + BUSINESS_END - event.end
      if 0 < relativeStart < BUSINESS_DURATION and 0 < relativeEnd < BUSINESS_DURATION
        column.append $('<div>').css({
          'position': 'absolute'
          'width': '100%'
          'top': (relativeStart * @tableHeight / BUSINESS_DURATION) + 'px'
          'left': '0', 'right': '0'
          'bottom': (relativeEnd * @tableHeight / BUSINESS_DURATION) + 'px'
          'background-color': toTransparentRGBA event.color
        }).html """
        <div class='begin-time'>#{(Date.fromEpoch(event.start)).getHours()}:#{(Date.fromEpoch(event.start)).getMinutes()}</div>
        <div>#{event.title}</div>
        <div class='end-time'>#{(Date.fromEpoch(event.end)).getHours()}:#{(Date.fromEpoch(event.end)).getMinutes()}</div>
        """
    return column

calendar = new Calendar $('#calendar'), (start, end, cb) ->
  $.ajax {
    url: '/events',
    data: {
      from: start
      to: end
    }
    dataType: 'json'
    success: (data) ->
      cb data.result
  }

loginElement = $ '#login-btn-wrap'
loginForm = $ '#login-form'
