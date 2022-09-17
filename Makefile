process: migrate
	@node -r dotenv/config lib/processor.js


build:
	@npm run build

build-processor-image:
	@docker build . --target processor -t squid-processor

build-query-node-image:
	@docker build . --target query-node -t query-node

build-images: build-processor-image build-query-node-image

serve:
	@npx squid-graphql-server --subscriptions


migrate:
	@npx squid-typeorm-migration apply


codegen:
	@npx squid-typeorm-codegen


typegen:
	@npx squid-substrate-typegen typegen.json


up:
	@docker-compose up -d


down:
	@docker-compose down


.PHONY: build serve process migrate codegen typegen up down

# SAMPLE ONLY type it in terminal, make sure you supply an existing version
# The squid won't be vailable during reset+update
# update-reset-preview:
# 	@npx sqd squid update gmordie-frontend@preview -v -r

# SAMPLE ONLY type it in terminal, make sure you supply a non-existing version
deploy-new-release:
	@npx sqd squid release gmordie-frontend@v2 -v
