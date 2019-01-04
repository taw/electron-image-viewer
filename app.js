let fs = require("fs");
let path = require("path");
let $ = require("jquery");
let remote = require('electron').remote;
let argv = remote.getGlobal('sharedObject').argv;

let images_in_folder = (folder_path) => {
  let files = fs.readdirSync(folder_path)
  return (
    files
      .filter(x =>  /\.(png|jpg|jpeg|gif)/i.test(x))
      .map(x => path.join(folder_path, x))
  )
}

let root_path;
if (argv.length >= 3) {
  root_path = argv[2];
} else {
  root_path = process.cwd();
}

let files = images_in_folder(root_path)
let index = 0;

let display_image = () => {
  let url = files[index];
  console.log("URL", url)
  $("#image").css("background-image", `url("${url}")`)
}

display_image();

$(document).on("keydown", (event) => {
  let key = event.key;
  if (key === "ArrowRight" || key === "ArrowDown" || key === ".") {
    if (index !== files.size - 1) index ++;
    display_image();
  }
  if (key === "ArrowLeft" || key === "ArrowUp" || key === ",") {
    if (index !== 0) index --;
    display_image();
  }
  if (key === "r") {
    index = Math.floor(Math.random() * files.length);
    display_image();
  }
  if (key === "Escape" || key === "q") {
    let window = remote.getCurrentWindow();
    window.close();
  }
})
