


arr = [1,2,3,4,5,6,7,8];
tracks = [{flightno: "qwe", parkno: "116", read: false},
          {flightno: "add", parkno: "111", read: true}]


arr = arr.filter((item)=>{
    return item !== arr[3];
});

console.log(arr);

tracks[1].read = false;
console.log(tracks[1]["read"]);



