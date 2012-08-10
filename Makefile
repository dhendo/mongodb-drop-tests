NODE = node
test:
	clear
#	@echo "\nTesting Remove Each...\n"
	@$(NODE) removeEach.js
#	@echo "*****************************************"
#	@echo "\nTesting Remove All...\n"
	@$(NODE) removeAll.js
#	@echo "*****************************************"
#	@echo "\nTesting Drop Collection...\n"
	@$(NODE) dropCollection.js
#	@echo "*****************************************"
#	@echo "\nTesting Drop DB...\n"
	@$(NODE) dropDB.js

.PHONY: test
