.PHONY: clean all test publish

hyphy:
	echo "installing hyphy"
	@rm -rf .hyphy && wget http://github.com/veg/hyphy/archive/2.2.6.tar.gz && tar xvzf 2.2.6.tar.gz && mv hyphy-2.2.6 .hyphy;
	@cd ./.hyphy/ && cmake . && make HYPHYMP && cd ../

yarn:
	yarn
	webpack --config webpack.dev.js

all: hyphy yarn

clean:
	rm -rf node_modules
	rm -rf .hyphy

