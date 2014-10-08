var calendar = $('#calendar').calendar({
    tmpl_path: "bower_components/bootstrap-calendar/tmpls/",
    view: 'week',
    events_source: function() { return []; }
});
