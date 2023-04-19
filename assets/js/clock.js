let clock = document.querySelector(".clock-text");
let calendar = document.querySelector(".date-text");

const yearlySeconds = 31536000;
const leapyearlySeconds = 31622400;
const normalDailySeconds = 1000 * 60 * 60 * 24; // 1000 for milliseconds


/*
NOTES

Newtime starts at year 0
10 seconds in a minute
10 minutes in an hour
10 hours in a day
10 days in a week
10 weeks in a month
10 months in a year

I'm gonna need new day names
    Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday, Someday, Finday

New month names
    Primary, Secondary, Terch, Quatal, Quintay, Senune, Septuly, Octust, Nonember, Denember 
*/

function currentTime() {
    let date = new Date();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";

    let DD = date.getDate();
    let MM = date.getMonth();
    let YY = date.getFullYear();


    if (hh == 0) {
        hh = 12;
    }

    if (hh > 12) {
        hh = hh - 12;
        session = "PM";
    }

    hh = (hh < 10) ? "0" + hh : hh;
    mm = (mm < 10) ? "0" + mm : mm;
    ss = (ss < 10) ? "0" + ss : ss;

    // let time = hh + ":" + mm + ":" + ss + " " + session;
    let time = `${hh}:${mm}:${ss} ${session}`;
    let day = `${DD}/${MM}/${YY}`;

    // clock.innerText = time;
    clock.innerText = new Date().getTime() / 1000;
    calendar.innerText = day;
    let t = setTimeout(function(){ currentTime() }, 1000);
}

function newTime() {
    let date = new Date();
    let hh = date.getHours();
    console.log(hh + " hours")
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let session = "AM";

    let DD = date.getDate();
    let MM = date.getMonth();
    let YY = date.getFullYear();

    // Number of leap years since year 0
    let leapYearCount = Math.floor(YY / 4) // This divides the current year by 4 and rounds down to calculate the number of leap years
    console.log(leapYearCount + " leap count");

    // Number of normal years since year 0
    let normalYearCount = YY - leapYearCount;
    console.log(normalYearCount + " normal count");

    // Current number of days gone by this year
    let start = new Date(date.getFullYear(), 0, 0); // Gets beginning of the year
    let diff = date - start; // Subtract start of the year from todays date
    console.log(diff + " diff")
    let dayCount = Math.floor(diff / normalDailySeconds); // Round down and divide by seconds in a day
    console.log(dayCount + " day count")

    // Current number of hours today is the same as hh above
    // Same for minutes and seconds

    let totalSeconds = (normalYearCount * yearlySeconds) + (leapYearCount * leapyearlySeconds) + (dayCount * 86400 /* Seconds in a day */) + (hh * 3600 /* Seconds in an hour*/) + (mm * 60 /* Seconds in minute */) + ss;
    console.log(totalSeconds + " total")

    // Start of conversion to new time from total seconds
    let ntYear = Math.floor(totalSeconds / 1000000); // total seconds divided by seconds in a newtime year
    let yearRemainder = totalSeconds % 1000000; // gets the seconds remaining
    console.log(ntYear + " nt year")
    console.log(yearRemainder + " y remainder")

    let ntMonth = Math.floor(yearRemainder / 100000); // seconds this year divided by seconds in a month
    let monthRemainder = yearRemainder % 100000; // seconds remaining
    console.log(ntMonth + " nt month");
    console.log(monthRemainder + " m remainder")
    
    // Skipping week because we don't use that

    let ntDay = Math.floor(monthRemainder / 1000); // seconds this month divided by seconds in a day
    let dayRemainder = monthRemainder % 1000; // seconds remaining
    console.log(ntDay + " nt day");
    console.log(dayRemainder + " d remainder");

    let ntHour = Math.floor(dayRemainder / 100); // seconds today divided by seconds in an hour
    let hourRemainder = dayRemainder % 100; // seconds remaining
    console.log(ntHour + " nt hour");
    console.log(hourRemainder + " h remainder");

    let ntMin = Math.floor(hourRemainder / 10); // seconds this hour divided by seconds in a minute
    let ntSec = hourRemainder % 10; // Minute remainder is the same as seconds
    console.log(ntMin + " nt min");
    console.log(ntSec + " nt sec")




    // if (hh == 0) {
    //     hh = 12;
    // }

    // if (hh > 12) {
    //     hh = hh - 12;
    //     session = "PM";
    // }

    ntHour = (ntHour < 10) ? "0" + ntHour : ntHour;
    ntMin = (ntMin < 10) ? "0" + ntMin : ntMin;
    ntSec = (ntSec < 10) ? "0" + ntSec : ntSec;

    // let time = hh + ":" + mm + ":" + ss + " " + session;
    let time = `${ntHour}:${ntMin}:${ntSec}`;
    let day = `${ntMonth}/${ntDay}/${ntYear}`;

    // clock.innerText = time;
    clock.innerText = time;
    calendar.innerText = day;
    let t = setTimeout(function(){ newTime() }, 1000);
}

newTime();