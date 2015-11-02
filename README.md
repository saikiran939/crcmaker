# CRC Maker

A simple CRC card generator. Check it out live [here](http://echeung.me/crcmaker/).

If you're running into some sort of parsing issue due to changes in how the data is stored/parsed but you have old data left over from before, execute the following in your JavaScript console:

```JavaScript
localStorage.clear()
```


## Development

### Prerequisites
- [Node.js and npm](https://nodejs.org/)

### Dependencies

To install the required dependencies, simply run the following commands in the root directory of the project.

```shell
$ npm install
```

You'll also need to install [Gulp](http://gulpjs.com/) globally:

```shell
$ npm install -g gulp
```

### Development tasks

To compile the assets, run:

```shell
$ gulp
```

If you want to automatically recompile on file changes, run:

```shell
$ gulp watch
```

The built files will be located in `crcmaker/build/`.