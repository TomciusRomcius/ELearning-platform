## Overview

This is a simple course platform, where users can enroll into courses, complete lessons.

## Technologies used:

* NextJS
* Typescript
* MongoDB
* Docker

## Start the app

* Clone this app using git clone
* Create a .env file and set NEXTAUTH_SECRET to a secret value
* If you also want to use oAuth providers you need to set GITHUB_ID, GITHUB_SECRET in the .env file
* Start the app using docker compose up and visit localhost:3000

## Prepolute data

If you'd like to prepopulate course data, visit localhost:3000/api/prepopulate

