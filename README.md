# Firn

Firn, wrapper for Roya image diffing library

[![npm version](https://badge.fury.io/js/firn.svg)](https://badge.fury.io/js/firn)
[![Coverage Status](https://coveralls.io/repos/github/smartfrog-oss/firn/badge.svg?branch=master)](https://coveralls.io/github/smartfrog-oss/firn?branch=master)
[![Build Status](https://api.travis-ci.org/smartfrog-oss/firn.svg?branch=master)](https://travis-ci.org/smartfrog-oss/firn#)

## Installation

using yarn

```bash
yarn add firn
```

using npm

```bash
npm i -S firn
```

### API

```
firn(url, [,config])
```

`url` — a valid URL to the page you want to take screenshot from

`config` — optional config

## Usage

### Cli

```bash
firn http://example.com/
```

### Node

```js
const firn = require('firn')

firn('http://example.com/')
```
