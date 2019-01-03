let fs = require("fs");
let path = require("path");
let $ = require("jquery");

let root_path = path.join(process.cwd(), "pics");

let files = fs.readdirSync(root_path)

for(let file_name of files) {
  // only if image file
  let url = path.join(root_path, file_name);
  $("#slideshow").append(`<div class="slide"><img src="${ url }" /></div>`);
}

$(document).on("keydown", (event) => {
  let sh = $(".slide").height();
  // let maxh = $("#slideshow").height() - sh;
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    let st = $("#slideshow").scrollTop();
    // st = Math.min(maxh, st + sh);
    st = st + sh;
    $("#slideshow").scrollTop(st);
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    let st = $("#slideshow").scrollTop();
    st = Math.max(0, st - sh);
    $("#slideshow").scrollTop(st);
  }
})
