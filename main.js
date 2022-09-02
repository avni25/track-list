
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
//--------------------------AUTOCOMPLETE--------------------------------------------

// function autocomplete(inp, arr) {
//   /*the autocomplete function takes two arguments,
//   the text field element and an array of possible autocompleted values:*/
//   var currentFocus;
//   /*execute a function when someone writes in the text field:*/
//   inp.addEventListener("input", function(e) {
//       var a, b, i, val = this.value;
//       /*close any already open lists of autocompleted values*/
//       closeAllLists();
//       if (!val) { return false;}
//       currentFocus = -1;
//       /*create a DIV element that will contain the items (values):*/
//       a = document.createElement("DIV");
//       a.setAttribute("id", this.id + "autocomplete-list");
//       a.setAttribute("class", "autocomplete-items");
//       /*append the DIV element as a child of the autocomplete container:*/
//       this.parentNode.appendChild(a);
//       /*for each item in the array...*/
//       for (i = 0; i < arr.length; i++) {
//         /*check if the item starts with the same letters as the text field value:*/
//         if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
//           /*create a DIV element for each matching element:*/
//           b = document.createElement("DIV");
//           /*make the matching letters bold:*/
//           b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//           b.innerHTML += arr[i].substr(val.length);
//           /*insert a input field that will hold the current array item's value:*/
//           b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//           /*execute a function when someone clicks on the item value (DIV element):*/
//               b.addEventListener("click", function(e) {
//               /*insert the value for the autocomplete text field:*/
//               inp.value = this.getElementsByTagName("input")[0].value;
//               /*close the list of autocompleted values,
//               (or any other open lists of autocompleted values:*/
//               closeAllLists();
//           });
//           a.appendChild(b);
//         }
//       }
//   });
//   /*execute a function presses a key on the keyboard:*/
//   inp.addEventListener("keydown", function(e) {
//       var x = document.getElementById(this.id + "autocomplete-list");
//       if (x) x = x.getElementsByTagName("div");
//       if (e.keyCode == 40) {
//         /*If the arrow DOWN key is pressed,
//         increase the currentFocus variable:*/
//         currentFocus++;
//         /*and and make the current item more visible:*/
//         addActive(x);
//       } else if (e.keyCode == 38) { //up
//         /*If the arrow UP key is pressed,
//         decrease the currentFocus variable:*/
//         currentFocus--;
//         /*and and make the current item more visible:*/
//         addActive(x);
//       } else if (e.keyCode == 13) {
//         /*If the ENTER key is pressed, prevent the form from being submitted,*/
//         e.preventDefault();
//         if (currentFocus > -1) {
//           /*and simulate a click on the "active" item:*/
//           if (x) x[currentFocus].click();
//         }
//       }
//   });
//   function addActive(x) {
//     /*a function to classify an item as "active":*/
//     if (!x) return false;
//     /*start by removing the "active" class on all items:*/
//     removeActive(x);
//     if (currentFocus >= x.length) currentFocus = 0;
//     if (currentFocus < 0) currentFocus = (x.length - 1);
//     /*add class "autocomplete-active":*/
//     x[currentFocus].classList.add("autocomplete-active");
//   }
//   function removeActive(x) {
//     /*a function to remove the "active" class from all autocomplete items:*/
//     for (var i = 0; i < x.length; i++) {
//       x[i].classList.remove("autocomplete-active");
//     }
//   }
//   function closeAllLists(elmnt) {
//     /*close all autocomplete lists in the document,
//     except the one passed as an argument:*/
//     var x = document.getElementsByClassName("autocomplete-items");
//     for (var i = 0; i < x.length; i++) {
//       if (elmnt != x[i] && elmnt != inp) {
//       x[i].parentNode.removeChild(x[i]);
//     }
//   }
// }
// /*execute a function when someone clicks in the document:*/
// document.addEventListener("click", function (e) {
//     closeAllLists(e.target);
// });
// }

// autocomplete(document.getElementById("parkno"), parks);










