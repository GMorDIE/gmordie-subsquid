set -e
npx squid-substrate-typegen typegen.json
npx sqd codegen
npm run build
npx sqd db drop
npx sqd db create
npx sqd db migrate