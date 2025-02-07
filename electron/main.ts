import { app, BrowserWindow } from 'electron'

app.whenReady().then(() => {
  const win = new BrowserWindow({
    frame: false,
  })
  win.maximize()

  win.loadURL(process.env.VITE_DEV_SERVER_URL)
})
