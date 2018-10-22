### Packaging the Mac OS X Desktop Application

1.  Obtain a copy of the [Electron 1.8.2 binaries](https://github.com/electron/electron/releases/tag/v1.8.2) (e.g. `electron-v1.8.2-darwin-x64.zip`) and decompress
2.  Rename the Electron binary folder and Electron binary to HyPhyGUI and HyPhyGUI.app, respectively
3.  `cd HyPhyGUI/HyPhyGUI.app/Contents/Resources/`
4.  `mkdir app && cd app`
5.  `git clone https://github.com/veg/hyphy-gui .` (note the `.`; this clones it into the directory without creating a new folder)
6.  Make sure you're on the correct branch.
7.  `make all`
8.  `webpack --config webpack.prod.js`
9.  `rm -rf node_modules`
10. Select HyPhyGUI.app and press &#8984;I to get information, drag the icon from `images/app-icon.icns` to thei icon at the top left of the information window.
11. The app should now function. Tar/zip base directory and release
