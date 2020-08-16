const pending = document.getElementById("pending");
const done = document.getElementById("done");
const formList = document.querySelector("#toDoListinput");
const inputList = formList.querySelector("input");

let pendingList = [];
let doneList = [];

function addtoList(list, status) {
    const li = document.createElement("ul");
    const span = document.createElement("span");
    const deleBtn = document.createElement("button");
    const movingBtn = document.createElement("button");
    deleBtn.innerText = "DEL";
    deleBtn.className = "delbtn";
    movingBtn.className = "movingbtn";    
    span.innerText = list.text;
    li.id = list.id;
    span.className = "element";
    deleBtn.addEventListener("click", deleteList);
    movingBtn.addEventListener("click", movingList);
    li.appendChild(span);
    li.appendChild(deleBtn);
    li.appendChild(movingBtn);
    if (status === 'P') {
        movingBtn.innerText = "Done";
        pending.appendChild(li);
    }else{
        movingBtn.innerText = "Not Yet";
        done.appendChild(li);
    }
    return li
}

const judgeList = (list) => {
    if (list) {
        list.map((obj) => {
          addtoList(obj, "P");
        });
      } else {
        list = [];
      }
      return list
}

const getList = async () => {
  pendingList = await judgeList(JSON.parse(localStorage.getItem("pendingList")));
  doneList = await judgeList(JSON.parse(localStorage.getItem("doneList")));
};

function addList(event) {
  event.preventDefault();
  const newId = String(Date.now());
  const newlist = { text: inputList.value, id: newId };
  addtoList(newlist, "P");
  pendingList.push(newlist);
  localStorage.setItem("pendingList", JSON.stringify(pendingList));
  inputList.value = "";
}

function deleteList(event) {
  const btn = event.target;
  const li = btn.parentNode;
  if (li.parentNode.id === "done"){
    done.removeChild(li);
       doneList = doneList.filter((e) => e.id !== li.id);
       localStorage.setItem("doneList", JSON.stringify(doneList));
  } else{
    pending.removeChild(li);
    pendingList = pendingList.filter((e) => e.id !== li.id);
    localStorage.setItem("pendingList", JSON.stringify(pendingList));
  }
}

const movingList = async (event) => {
  const btn = event.target;
  const li = btn.parentNode;
  const span = li.querySelector("span");
  const moving = li.querySelector(".movingbtn");
  const newlist = { text: span.innerText, id: li.id };
  if (li.parentNode.id === "done"){
      moving.innerText = "Done"
       pending.appendChild(li)
       pendingList.push(newlist);
       doneList = await doneList.filter((e) => e.id !== li.id);
  } else{
    moving.innerText = "Not Yet"
    done.appendChild(li);
    pendingList = await pendingList.filter((e) => e.id !== li.id);
    doneList.push(newlist);
  }
  localStorage.setItem("doneList", JSON.stringify(doneList));
  localStorage.setItem("pendingList", JSON.stringify(pendingList));
};

getList();
formList.addEventListener("submit", addList);
