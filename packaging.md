### Packaging the Mac OS X Desktop Application

1.  Obtain a copy of the [Electron binaries](https://github.com/electron/electron/releases) (e.g. `electron-vx.x.x-darwin-x64.zip`) and decompress
2.  Rename the Electron binary folder and Electron binary to HyPhyGUI and HyPhyGUI.app, respectively
3.  `cd HyPhyGUI/HyPhyGUI.app/Contents/Resources/`
4.  `mkdir app && cd app`
5.  `git clone https://github.com/veg/hyphy-gui .` (note the `.`; this clones it into the directory without creating a new folder)
6.  Make sure you're on the correct branch.
7.  `make all`
8.  `webpack --config webpack.prod.js`
9.  `rm -rf node_modules`
10. Open `images/app-icon.icns` and copy to clipboard via the edit menu, select HyPhyGUI.app and press &#8984;I to get information, click the icon at the top of the window (a border should show up when you click it) and paste from clipboard via &#8984;v
11. The app should now function. Tar/zip base directory and release
