# Play Together

![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/notalexross/72db2b6d509ae164dda3e99713864021/raw/360220967__badge__tests.json)
![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/notalexross/72db2b6d509ae164dda3e99713864021/raw/360220967__badge__coverage.json)
![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/notalexross/72db2b6d509ae164dda3e99713864021/raw/360220967__badge__lint.json)
![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/notalexross/72db2b6d509ae164dda3e99713864021/raw/360220967__badge__build.json)
![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/notalexross/72db2b6d509ae164dda3e99713864021/raw/360220967__badge__deploy.json)
![badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/notalexross/72db2b6d509ae164dda3e99713864021/raw/360220967__badge__commit.json)

## Description

An online multiplayer tabletop games simulator, with live messaging, user presence tracking, and an interesting troll element. Any connected user can switch out the playing board, move pieces around, and change the size and/or colour of pieces. Even players not involved in the current game can join in and start interfering if they so desire. All that is needed is a link to the game room, easily copied by clicking the shareable link at the top of the page, and they can start trolling immediately—no login required.

Demo: https://play.rossdaniel.com \
Portfolio Entry: https://rossdaniel.com/projects/play-together

## Prerequisites

Requires [Node.js](https://nodejs.org).

## Installation

To clone the repository and install any dependencies, run the following commands:

```sh
git clone https://github.com/notalexross/play-together.git
cd play-together
cp .env.example .env
npm install
```

Be sure to substitute your own values for the variables defined in `.env`.

## Development

To run the app in development mode, run the following command and open http://localhost:3000 to view it in the browser.

```sh
npm run start
```

## Production

To build the app for production to the `build` folder, run the following command:

```sh
npm run build
```

## Permission

You may freely clone this work and experiment with it in your local development environment, but please do not reproduce, redistribute, or present it as your own.

Copyright &copy; Daniel Ross
