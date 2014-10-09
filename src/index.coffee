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
      'height': @tableHeight + 'px'
    }
    @render()

  render: (begin)->
    today = new Date()
    unless begin?
      year = today.getYear() + 1900
      month = today.getMonth()
      begin = +(new Date year, month, (today.getDate() - today.getDay()), 0, 0, 0)

    @data begin, begin + DAY * 7, (events) =>
      days = ([] for [1..7])

      for event in events
        days[Math.floor((event.start - begin) / (1000 * 60 * 60 * 24))]?.push event

      columns = []

      for day, i in days
        dayStart = begin + i * DAY
        columns.push column = $('<div>').css({
          'display': 'table-cell'
          'width':  '100px'
          'padding': '2px'
          'position': 'relative'
          'text-align': 'center'
          'background': if i is today.getDay() then '#FFD' else if i % 2 is 1 then '#FFF' else '#EEE'
        })
        column.append $('<div>').css({
          'position': 'absolute'
          'top': '0px'
          'left': '0px'
          'right': '0px'
        }).html """
        <div>#{dayNames[i]}</div>
        <div>#{monthNames[new Date(begin + DAY * i).getMonth()][..2]} #{new Date(begin + DAY * i).getDate()}</div>
        """
        for event in day
          relativeStart = event.start - dayStart - BUSINESS_START
          relativeEnd = dayStart + BUSINESS_END - event.end
          column.append $('<div>').css({
            'position': 'absolute'
            'width': '100px'
            'top': relativeStart * @tableHeight / BUSINESS_DURATION + 'px'
            'bottom': relativeEnd * @tableHeight / BUSINESS_DURATION + 'px'
            'background-color': event.color
          }).html """
          <div class='begin-time'>#{(new Date(event.start)).getHours()}:#{(new Date(event.start)).getMinutes()}</div>
          <div>#{event.title}</div>
          <div class='end-time'>#{(new Date(event.end)).getHours()}:#{(new Date(event.end)).getMinutes()}</div>
          """

      @el.html ''
      for column in columns
        @el.append column

calendar = new Calendar $('#calendar').css('height', '100%'), (start, end, cb) ->
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
