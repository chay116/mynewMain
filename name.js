const nameoff = document.querySelector(".nameoff");
const nameon = document.querySelector(".nameon");
const form = document.querySelector("#nameinput");
const input = form.querySelector("input");
const date1 = document.getElementById("date");

const nameHandle = async (event) => {
    const nowTime1 = new Date();
    event.preventDefault();
    name = input.value;
    localStorage.setItem("name", name);
    const Day1 = nowTime1.getDay();
    const Dates1 = nowTime1.getDate();
    const Mon1 = nowTime1.getMonth();
    date1.innerText = `Hi ${name}, Today is ${Daynumber[Day1]}, ${Dates1} ${Monnumber[Mon1]}`;
    nameon.style = "";
    nameoff.style = "display:none";
}

let name = localStorage.getItem("name");


if (!name) {
    nameon.style = "display:none";
    console.log("nameoff")
} else{
    nameoff.style = "display:none";
    console.log("nameon");
}

form.addEventListener("submit", nameHandle);

