let fs = require("fs");
let path = require("path");
let $ = require("jquery");
let remote = require('electron').remote;
let argv = remote.getGlobal('sharedObject').argv;

let images_in_folder = (folder_path) => {
  let files = fs.readdirSync(folder_path)
  return files.filter(x =>  /\.(png|jpg|jpeg|gif)/i.test(x))
}

let root_path;
if (argv.length >= 3) {
  root_path = argv[2];
} else {
  root_path = process.cwd();
}

let files = images_in_folder(root_path)

for(let file_name of files) {
  let url = path.join(root_path, file_name);
  $("#slideshow").append(`<div class="slide"><img src="${ url }" /></div>`);
}

$(document).on("keydown", (event) => {
  let sh = $(".slide").height();
  // let maxh = $("#slideshow").height() - sh;
  if (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === ".") {
    let st = $("#slideshow").scrollTop();
    // st = Math.min(maxh, st + sh);
    st = st + sh;
    $("#slideshow").scrollTop(st);
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowUp" || event.key === ",") {
    let st = $("#slideshow").scrollTop();
    st = Math.max(0, st - sh);
    $("#slideshow").scrollTop(st);
  }
  if (event.key === "Escape") {
    let window = remote.getCurrentWindow();
    window.close();
  }
})
