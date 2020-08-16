const time = document.getElementById("time")
const date = document.getElementById("date")
const Daynumber = {0:"Sun", 1:"Mon", 2:"Tue", 3:"Wed", 4:"Thu", 5:"Fri", 6:"Sat"}
const Monnumber = {0:"Jan", 1:"Feb", 2:"Mar", 3:"Apr", 4:"May", 5:"Jun", 6:"Jul", 7:"Aug", 8:"Sep", 9:"Oct", 10:"Nov", 11:"Dec"}

function getNow() {
    const myname = localStorage.getItem("name");
    const nowTime = new Date();
    const hour = nowTime.getHours();
    const minute = nowTime.getMinutes();
    const Day = nowTime.getDay();
    const Dates = nowTime.getDate();
    const Mon = nowTime.getMonth();
    time.innerText = `${hour>=10? hour: `0${hour}`}:${minute>=10? minute: `0${minute}`}`;
    date.innerText = `Hi ${myname}, Today is ${Daynumber[Day]}, ${Dates} ${Monnumber[Mon]}`;
};

function init() {
   setInterval(getNow, 1000)
};

init();
