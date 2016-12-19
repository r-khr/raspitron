#!/bin/bash

# Turn on Wifi Card
# ifconfig wlan0

# Set Up Wifi
# iwconfig wlan0 essid <name> key <password>

# Connect to Wifi Above
# dhclient wlan0

# Set Static Wifi IP
echo 'interface wlan0' >> /etc/dhcpcd.conf

# Set ip_address 10.42.0.10
echo 'static ip_address=10.42.0.10/24' >> /etc/dhcpcd.conf

# Setup router ip as 192.168.2.1
echo 'static routers=192.168.2.1' >> /etc/dhcpcd.conf
echo 'static domain_name_servers=192.168.2.1' >> /etc/dhcpcd.conf

# Reboot
reboot
