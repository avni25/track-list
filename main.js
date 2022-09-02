
var timeDiff = 15;
var blinkrate = 300;
var tracks = [];
var soundCheckBox = document.getElementById("soundCheck");


var parks = ["101","102","103","104","105","106","107"];

// Create a "close" button and append it to each list item
// var myNodelist = document.getElementsByTagName("LI");
// var i;
// for (i = 0; i < myNodelist.length; i++) {
//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   myNodelist[i].appendChild(span);
// }


// Click on a close button to hide the current list item
// var close = document.getElementsByClassName("close");
// var i;
// for (i = 0; i < close.length; i++) {
//   close[i].onclick = function() {
//     var div = this.parentElement;
//     div.style.display = "none";   
     
//   }
// }



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
    
    tracks.push(0); 
    var t = document.createTextNode(str.toUpperCase());
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);
    document.getElementById("myInput").value = "";
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    var close = document.getElementsByClassName("close");
    console.log("tracks: "+tracks.length + " : closes: "+ close.length);
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
        
      }
    }
}


function playAudio(audio){
  return new Promise(res=>{
    audio.play()
    audio.onended = res
  })
}

async function readPark(str){
  var ch = str.split("");  
  for (let index = 0; index < ch.length; index++) {
    var s = new Audio("./sounds/"+ch[index]+".mp3");
    await playAudio(s); 
  }  
}

async function readWarningFor(str){
  var sa = new Audio("./sounds/warning.mp3");
  var sb = new Audio("./sounds/conflict.mp3");
  await playAudio(sa);
  await playAudio(sb);
  await readPark(str)
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

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function draft(){
  console.log(tracks);
}

//--------------------------INTERVALS---------------------------

setInterval(myTime, 1000);

const gen = setInterval(async function(){
    var l = document.getElementById("myUL").getElementsByTagName("li");
    timeDiff =parseInt(document.getElementById("difference").value);
    for(var i = 0; i < l.length; i++){
      var hour = l[i].textContent.split(" ")[2].substring(0,5).split(":")[0];
      var min = l[i].textContent.split(" ")[2].substring(0,5).split(":")[1];
      var parkno = l[i].textContent.split(" ")[1];
      var w = new Date();
      var now = new Date();
      now.setMinutes(now.getMinutes()+timeDiff);
      w.setHours(parseInt(hour))
      w.setMinutes(parseInt(min))
      w.setMinutes(w.getMinutes())
      var diff = now >= w
      if(diff && l[i].className != "checked" ){
        blinkRow(l[i], "red");
        if(!soundCheckBox.checked){
          tracks[i] = 1;
        }
        if(tracks[i] == 0 && soundCheckBox.checked){
          readWarningFor(parkno);
          tracks[i] = 1;
        }
        
      }else {
        l[i].style.backgroundColor = "#888"
      }
    }
  
}, blinkrate);

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------






