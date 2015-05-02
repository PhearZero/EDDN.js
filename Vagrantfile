# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://atlas.hashicorp.com/search.
  config.vm.box = "ubuntu/trusty64"

  config.vm.network "forwarded_port", guest : 8086, host : 8086
  config.vm.network "forwarded_port", guest : 8083, host : 8080

  #TODO: Cleanup this mess up!!!
  config.vm.provision "shell", inline : <<-SHELL
      if [ ! -f /vagrant/.vagrant/bootstrapped ]
        then
          echo "/var/log/messages exists."
          sudo apt-add-repository ppa:chris-lea/zeromq -y
          sudo apt-get update
          sudo apt-get install -y nodejs nodejs-legacy npm libzmq3-dev
          sudo wget https://s3.amazonaws.com/influxdb/influxdb_latest_amd64.deb
          sudo dpkg -i influxdb_latest_amd64.deb
          touch /vagrant/.vagrant/bootstrapped
          cd /vagrant/
          npm install
      fi
      cd /vagrant/
      npm start
  SHELL
end
