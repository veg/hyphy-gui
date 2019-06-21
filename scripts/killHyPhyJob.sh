echo "ps aux | grep hyphy-gui/.hyphy | awk '{print $2}' | xargs kill"
ps aux | grep "hyphy-gui/.hyphy" | awk '{print $2}' | xargs kill
