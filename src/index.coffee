DAY = 1000 * 60 * 60 * 24
BUSINESS_START = 1000 * 60 * 60 * 7
BUSINESS_END = 1000 * 60 * 60 * 21
BUSINESS_DURATION = BUSINESS_END - BUSINESS_START

dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
monthNames = [
  'January'
  'February'
  'March'
  'April'
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
    @wrapper.append @el = $('<div>').css {
      'display': 'table-row'
      'overflow': 'hidden'
      'height': @tableHeight + 'px'
    }
    @render 10

  getColumnForDate: (date) ->
    begin = +(new Date date.getYear() + 1900, date.getMonth(), date.getDay(), 0, 0, 0)

    @data begin, begin + DAY * duration, (events) =>

  addColumnRight: ->

  addColumnLeft: ->

  today: ->
    today = new Date()
    today.setHours 0, 0, 0, 0
    return +today

  renderColumn: (begin, data) ->
    column = $('<div>').css({
      'display': 'table-cell'
      'width':  '150px'
      'padding': '2px'
      'position': 'relative'
      'text-align': 'center'
      'background': if (+begin) is @today() then '#FFD' else if Math.floor(begin / DAY) % 2 is 1 then '#FFF' else '#EEE'
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
    for event in data
      console.log relativeS
      relativeStart = event.start - begin - BUSINESS_START
      relativeEnd = begin + BUSINESS_END - event.end
      column.append $('<div>').css({
        'position': 'absolute'
        'width': '100%'
        'top': relativeStart * @tableHeight / BUSINESS_DURATION + 'px'
        'bottom': relativeEnd * @tableHeight / BUSINESS_DURATION + 'px'
        'background-color': event.color
      }).html """
      <div class='begin-time'>#{(new Date(event.start)).getHours()}:#{(new Date(event.start)).getMinutes()}</div>
      <div>#{event.title}</div>
      <div class='end-time'>#{(new Date(event.end)).getHours()}:#{(new Date(event.end)).getMinutes()}</div>
      """
    return column

  render: (duration = 7, begin)->
    begin = new Date()
    unless begin?
      begin.setDate begin.getDate() - begin.getDay() + if day is 0 then -6 else 1
      begin.setHours 0, 0, 0, 0
    begin = +begin

    @data begin, begin + DAY * duration, (events) =>
      days = ([] for [1..duration])

      for event in events
        days[Math.floor((event.start - begin) / (1000 * 60 * 60 * 24))]?.push event

      columns = []

      for day, i in days
        dayStart = begin + i * DAY
        columns.push @renderColumn new Date(dayStart), day

      @el.html ''
      for column in columns
        @el.append column

calendar = new Calendar $('#calendar'), (start, end, cb) ->
  $.ajax {
    url: '/events',
    data: {
      from: start
      to: end
    }
    dataType: 'json'
    success: (data) ->
      console.log start, end, data
      cb data.result
  }

loginElement = $ '#login-btn-wrap'
loginForm = $ '#login-form'
