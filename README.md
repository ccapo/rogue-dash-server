# rogue-dash-server
* Game server for rogue-dash
* Players upload scores, and the server will display the daily ranking

## Installation
* Retrieve public IPv4 address for server
* Create/update DNS `A Record` (e.g. Zone Editor)
  * Point `A Record` to public IPv4 address 

### Download Components
* node.js, npm, pm2 and nginx
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh > nvm_install.sh
chmod +x nvm_install.sh
./nvm_install.sh
nvm install 14.15.5
sudo apt install nginx build-essential make
# Fixes npm build
sudo ln -s /usr/bin/python3 /usr/bin/python
npm install -g pm2
```
* certbot
```
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```
* rogue-dash-server repo
```
git clone https://github.com/ccapo/rogue-dash-server.git
cd ~/rogue-dash-server
npm install
npm audit fix
```

### Setup
* Generate server secret keys and start pm2
```
cd ~/rogue-dash-server
npm run setup
pm2 start index.js
```
* Configure nginx
```
cd ~/rogue-dash-server
sudo cp config/rogue-dash-server.conf /etc/nginx/sites-available
cd /etc/nginx/sites-enabled
sudo rm default
sudo ln -s /etc/nginx/sites-available/rogue-dash-server.conf .
sudo nginx -s reload
```
* Run certbot
```
sudo certbot --nginx
```
