.PHONY: clean all test publish

hyphy:
	echo "installing hyphy"
	@if ! test -d ./.hyphy-2_3_14; then git clone http://github.com/veg/hyphy.git ./.hyphy-2_3_14/; fi
	@cd ./.hyphy-2_3_14 && git checkout master && git pull && git checkout 2.3.14 && cmake . && make HYPHYMP && cd ../
	@if ! test -d ./.hyphy; then git clone http://github.com/veg/hyphy.git ./.hyphy/; fi
	@cd ./.hyphy && git checkout master && git pull && git checkout 2.5.0 && cmake . && make hyphy && cd ../
	
yarn:
	yarn
	webpack --config webpack.dev.js

all: hyphy yarn

clean:
	rm -rf node_modules
	rm -rf .hyphy
	rm -rf .hyphy-2_3_14
	rm -rf hyphy-vision
	rm .appstate.json
	rm .data/*
