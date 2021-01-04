# First off you need to download the wallet, Raven Core
https://github.com/RavenProject/Ravencoin/releases
It will take overs to sync the block chain, and you have to configure and rei-index.

# Configure your wallet
You need to configure your wallet to index addresses and transactions and to run as a server.  
Your configuration file is called raven.conf,    
Here is a good example of a raven.conf file https://github.com/RavenDevKit/ravencore/blob/master/examples/raven.conf

server=1  
whitelist=127.0.0.1  
txindex=1  
addressindex=1  
assetindex=1  
timestampindex=1  
spentindex=1  
rpcuser=supermegasecret  
rpcpassword=supermegasecret  


# Use nodejs to connect to your wallet via RPC
See index.js for example

# How to run the example code
npm index configfile=c\myconfig.json  
Where myconfig.json should be something like  
{  
    "rpcUsername":"your username",  
    "rpcPassword":"your password",  
    "asset":"BEER_TOKEN"  
 }  
