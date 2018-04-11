# HyPhy-GUI

A desktop application for using HyPhy.

## Installation

Requirements:

* `make`
* `cmake`
* `yarn`

After cloning this repository and installing the above requirements, run

```
make all
```

## Development

The currently released version of hyphy-vision is not compatiable with the GUI so until the new version of hyphy-vision is released you should `yarn link` to the version of hyphy-vision under development:
 
 * Clone `https://github.com/veg/hyphy-vision` 
 * Checkout the `develop` branch
 * Run `yarn` to install the dependinces
 * Run `webpack --config webpack.config.library.js` to bundle hyphy-vision
 * Run `yarn link` to create a link to the bundeled version of hyphy-vision
 * Then from the hyphy-GUI repo, run `yarn link "hyphy-vision"` to have the GUI look for the linked version of hyphy-vision rather than the version specified in `package.json`


Start electron and run webpack in watch mode:

```
yarn run dev
```

Note that you will have to refresh Electron to observe changes.
