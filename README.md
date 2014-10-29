schedule-website
================

<b>Bugs</b>

1. Blocks overlap on small screens (Chrome--Ubuntu)

2. Need to scroll left before scrolling right and displaying future events (Chrome--Ubuntu)

3. Cannot stop scrolling using mouse after start (Chrome--Ubuntu)

4. Zooming deletes colors and labels (Chrome--Ubuntu)


<b>Notes for Beginners</b>

To setup for the first time, install nodejs, heroku-toolbelt, and bower. Run npm install and then bower install to install dependencies of project. To run the project locally, use foreman start.

The project runs the server.js file in the build folder, and any events stored in that file will be written to the page on screen.

To install Grunt, run "sudo npm install  -g grunt-cli", and to use Grunt just type "grunt"

<b>Schedule Notes</b>

yearly.json: Start end dates for terms, all weekly schedules (indicates the type of week ex. week1, week2, ...)
overlays: special dates (high priority), start end dates

week1.json: has data ("a", "b", "C", "pass", "dinner") for blocks for each day of week, capital means fat block, lowercase is regular.

defaults.json contains data for durations of everything, we have letter blocks mapped into durations.
(starttime) is stored in defaults.

todo: generate everything then put overlays replace normal things

don't worry about: (turn "a" into "Physics") exeterconnectdata will handle later.

turn list ("a", "b", "C" ...) into ("a->50", "b->50", "c->70"...)
then just make schedule for 1 day by calculating millisecond times and names.



