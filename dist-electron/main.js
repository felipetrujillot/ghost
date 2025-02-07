import { app as n, BrowserWindow as o } from "electron";
n.whenReady().then(() => {
  const e = new o({
    frame: !1
  });
  e.maximize(), e.loadURL(process.env.VITE_DEV_SERVER_URL);
});
