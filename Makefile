.PHONY: all clean spec stress install

all: release

clean:

configure:
	cp config/config.js.example     config/config.js

start: clean dependencies
	node app.js

dependencies:
	npm prune
	npm install

install:
	npm prune
	npm install

release: configure spec start

spec: dependencies
	node_modules/jasmine-node/bin/jasmine-node --forceexit spec

stress:
	./stress/loadtest.sh
