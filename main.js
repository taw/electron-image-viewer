let { app, BrowserWindow } = require("electron")

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({ width: 1200, height: 800 })
  win.maximize();
  // and load the index.html of the app.
  win.loadFile("index.html")
}

app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // On macOS it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

global.sharedObject = {argv: process.argv}