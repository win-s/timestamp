var express = require('express');
var moment = require('moment');
var app = express();

app.get('/:date',function(req,res){

    var dateString = req.params.date;
    var dateObj = createResponseObj(dateString);
    if(dateObj === null){
        res.write( createJsonOutput(null,null) );
    }else{
        rs.write( createJsonOutput( dateObj.getTime(), moment(dateObj).format("MMMM DD, YYYY") ) );
    }
    rs.end();
});

app.listen(3000,function(){
    console.log('Example app listening on port 3000');
});

function createResponseObj(dateString){
    var unixtime = parseInt(dateString);
    if( !isNaN( unixtime ) )return new Date(unixtime);

    var monthYear = dateString.split(',');
    var dayPart = monthYear[0].split(' ');

    if( monthYear.length>1 && dayPart.length>1){
        var date = dayPart.push(monthYear[1]);
        var month = date[0];
        var day = date[1];
        var year = date[2];

        if( isValidMonth(month) && isValidDay(day) && isValidYear(year)){
            return new Date(dateString);
        }
    }
    return null;
}
function isValidMonth(month){
    month = month.toLowerCase();
    switch (month) {
        case "january":
        case "february":
        case "march":
        case "april":
        case "may":
        case "june":
        case "july":
        case "august":
        case "september":
        case "october":
        case "november":
        case "december": return true;
        default:return false;
    }
}
function isValidDay(dayNumber){
    return 1 <= dayNumber && dayNumber <=31;
}
function isValidYear(year){
    return 1970 <= year;
}
function createJsonOutput(unix,natural){
    return {
        "unix":unix,
        "natural":natural
    };
}
