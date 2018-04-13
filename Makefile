.PHONY: clean all test publish

hyphy:
	echo "installing hyphy"
	@if ! test -d ./.hyphy; then git clone http://github.com/veg/hyphy.git ./.hyphy/; fi
	@cd ./.hyphy && git checkout master && git pull && git checkout 2.3.10 && cmake . && cd ../

yarn:
	git clone https://github.com/veg/hyphy-vision
	cd hyphy-vision; git checkout develop; yarn; webpack --config webpack.config.library.js; yarn link
	yarn link "hyphy-vision"
	yarn
	webpack --config webpack.dev.js

all: hyphy yarn

clean:
	rm -rf node_modules
	rm -rf .hyphy

