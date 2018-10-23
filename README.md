# Sample application that help upload and download file into IPFS and store hashes on Ethereum blockchain

## Install
- Node v8.x.x or higher
- npm 6.4.x
- Go to root folder /ipfs-blockchain and perform the command:
```
npm install -g truffle ganache-cli

npm install

cd app

npm install
```

## Run
- Start the application with
```
cd app

npm run compile

npm start
```

- Deploy smart contract 
```
truffle migrate --reset
```

- Test smart contract
```
truffle test .\test\testipfshash.js
```

- Open your browser with the link [http://127.0.0.1:12345](http://127.0.0.1:12345)
## Features
- Allow upload and download a single file onto IPFS
- Calculate the time for uploading and downloading

## TODO
- Upload the hash onto the blockchain contract
- Allow upload multiple files at once
- Allow upload folder