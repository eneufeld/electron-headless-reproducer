const { app, BrowserWindow } = require("electron");
const process = require("process");
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    focusable: true
  });

  win.loadFile("index.html");
};

app.on("window-all-closed", () => {
  app.quit();
});

app.whenReady().then(() => {
  const headless = process.argv[2] === '--headless';
  const lock = app.requestSingleInstanceLock();
  if (!lock) {
    app.quit();
  }
  if (!headless) {
    createWindow();
  }

  app.on("second-instance", (_event, argv, _dir, _addition) => {
      createWindow();
  });
});
