var express=require("express"),fs=require("fs"),url=require("url"),app=express();REGULAR_EVENTS=[{id:0,name:"Daily Event",start:1412809833621,duration:36e5,frequency:864e5}],app.use("/bower_components",express.static("bower_components")),app.get("/events",function(a,b){for(var c,d,e=Number(a.query.from),f=Number(a.query.to),g=[],h=0;h<REGULAR_EVENTS.length;h++)for(c=REGULAR_EVENTS[h],d=Math.floor((e-c.start)/c.frequency),startTime=0;f>startTime;)startTime=c.start+c.frequency*d,g.push({id:c.id.toString()+"@"+startTime,title:c.name,"class":"event-important",start:startTime,end:startTime+c.duration}),d+=1;b.send(JSON.stringify({success:1,result:g}))}),app.use("/",express.static(".")),app.listen(process.env.PORT,function(){console.log("Listening on port",process.env.PORT)});