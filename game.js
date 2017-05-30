const x = 0;
const y = 0;

document.addEventListener("DOMContentLoaded", function(){
  const canvas = document.getElementById('mycanvas');
  const canv = canvas.getContext('2d');
  setInterval(update(canv), 1000);
})

function update(canv) {
  canv.fillStyle="#FF0000";
  canv.fillRect=(0,0,30,30);
  console.log("yes");
}
