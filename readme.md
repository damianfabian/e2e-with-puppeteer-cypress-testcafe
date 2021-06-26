# E2E Testing Demos

I was trying to compare different frameworks for e2e testins and instead of using google. I end up doing this repo with a simple test case of checking a video camera using 3 different frameworks. I also tried WebDriver.io but at the end It gave me too much throubles to configure the fake video device that I remove it. All the test are located in the folder *tests* and all of them use the *index.html* file located in the folder *web*. 

## Frameworks

For this demo I use 3 frameworks:

1. Puppeteer
2. Cypress
3. TestCafe

Let's check what differences I found between then.

### Puppeteer

So far It was the must easy one to implement and also the must modular, you can configure in each test all the browser specifications you want, which make it really easy to change between scenarios. Also, as it uses Chromium it has some benefits for testing fake devices like in this demo.

To run this demo you just need the test located in *tests* and run the command *serve* which is going to give you the app ready to test. 

### Cypress

I personally didn't like the "App" concept to run the tests, it's more like a suite to improve your workflow base on testings, but in case you need multiple Tabs, you won't be able to do it with Cypress. Apart from that if you want to change a browser configuration you have to make a plugin and change it there, this means that configuration will be a global configuration. I guess if you need different browser configurations you will need to create 2 commands, where each command has a different config file to load different plugins. I din't try it, but I guess that will be the way to go.

In the good things, It has a lot of helpers already provided by the framework.

Also, it requires a configuration file if you want to change some behaviours, you can find this file in the root *cypress.json"

### TestCafe

This one has really good reviews, just because of that I did all the configurations to make it work. This one needs to run over HTTPS to be able to change the browser configurations to allow fake devices. Which require to create a local certificate and then use it to create a HTPPS server with Koa. Down below you will find the commands to create the certificate, if you want to try it locally. 

Also, you will need a configuration file *.testcaferc.json* where you can change different behaviours from the framework. A really nice thing they made is the *appCommand* which allow you to pass a NPM command to run the app you want to test. 

### Overview

I think all of them are really good tools, but depending on the specific scenario your application is running into, you will find one better than the others. all of them support screenshots and allow you to change the expect language by choosing or just direct in the coding. Just because I like the control that Puppeteer offers, I think is the one that wins this comparison.

## Some Puppeteer Links

- https://github.com/checkly/headless-recorder
- https://github.com/anishkny/webgif
- https://github.com/transitive-bullshit/awesome-puppeteer


## How to create a certificate for localhost

1. ``openssl genrsa -out CA.key -des3 2048``

2. ``openssl req -x509 -sha256 -new -nodes -days 3650 -key CA.key -out CA.pem``

3. ``openssl genrsa -out localhost.key -des3 2048``
``openssl req -new -key localhost.key -out localhost.csr``

4. ``openssl x509 -req -in localhost.csr -CA ./CA.-pem -CAkey ./CA.key -CAcreateserial -days 3650 -sha256 -extfile localhost.ext -out localhost.crt`` 