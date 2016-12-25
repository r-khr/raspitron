# RASPITRON

This project provides a foundation for controlling Raspberry Pi GPIO using an Electron Application.

There are two pieces to this project:

1. [Flask Server](http://flask.pocoo.org/) - raspi/
    - Provides API endpoints that controll Raspberry Pi Hardware
2. [Electron Desktop Application](http://electron.atom.io/) - app/
    - Provides an electron application that communicates with endpoints


## Raspberry Pi Installation

Server Folder provides the Flask Python server that will run on the Raspberry Pi.

```
// Install Flask
pip install flask

// cd into raspberry pi flask server folder
cd raspi

// run flask server
sudo python index.py
```

## Setup Electron

Electron can be setup on either the raspberry pi or on any computer that is on the same local area network as the raspberry pi.


#### Development Mode
```
npm install

// First time run these two commands one after the other
npm run hot-server
npm run start-hot

// Run python test server
cd raspi
sudo python test.py

// Otherwise
npm run dev
```

#### Production Mode

```
// Build projest using
npm run build
```

## Configurations

app/constants/raspberrypi.js
- change IP to match your raspberry pi

Currently configured for "192.168.2.157"

If running Electron App on Raspberry Pi the IP will need to be changed to "0.0.0.0"
