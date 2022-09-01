
var timeDiff = 15


// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}


// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}



// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);


// Create a new list item when clicking on the "Add" button
function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var parkno = document.getElementById("parkno").value;
    var eta = document.getElementById("eta").value;
    var str = inputValue + " " + parkno + " "+ eta;
    
    console.log(str)
    var t = document.createTextNode(str.toUpperCase());
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
}

function readNumber(num){    
    var a = num%10;
    var b = Math.floor(num/10);
    var sa = new Audio("./sounds/"+a+".mp3");
    var sb = new Audio("./sounds/"+b+".mp3");
    sb.play();
    setTimeout(() => {
        sa.play();
    }, 700);
}

function readPark(str){
  var ch = str.split("");
  var sec = 500;
  for (let index = 0; index < ch.length; index++) {
      
      setTimeout(()=>{
          var s = new Audio("./sounds/"+ch[index]+".mp3");
          console.log(ch[index]);
          s.play();
      }, sec);
      sec += 500;
  }  
}

function readWarningFor(str){
  var sa = new Audio("./sounds/warning.mp3");
  var sb = new Audio("./sounds/conflict.mp3");
  sa.play();
  setTimeout(() => {
      sb.play();
  }, 1000);
  setTimeout(() => {
     readPark(str);
  }, 3000);
}

function myTime(){
    var d = new Date();
    var n = d.toLocaleTimeString();
    document.getElementById("p1").textContent = n;

}

function blinkRow(ele,col) {
  var tmpColCheck = ele.style.backgroundColor;
  
    if (tmpColCheck === 'silver') {
      ele.style.backgroundColor = col;
    } else {
      ele.style.backgroundColor = 'silver';
    }
} 

//--------------------------INTERVALS---------------------------

setInterval(myTime, 1000);

const gen = setInterval(function(){
  
  var l = document.getElementById("myUL").getElementsByTagName("li");
  
  for(var i = 0; i < l.length; i++){
    var hour = l[i].textContent.split(" ")[2].substring(0,5).split(":")[0];
    var min = l[i].textContent.split(" ")[2].substring(0,5).split(":")[1];
    var w = new Date();
    w.setHours(parseInt(hour))
    w.setMinutes(parseInt(min) + timeDiff)
    w.setSeconds(00)
    var diff =Math.abs(new Date() > w) 
    console.log(diff);
    if(!timeDiff){
      // l[i].style.backgroundColor = red
      blinkRow(l[i], "red")
    }
  }
}, 400) 





