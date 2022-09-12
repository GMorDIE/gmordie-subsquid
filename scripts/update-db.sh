set -e
npx squid-typeorm-migration generate
npx squid-typeorm-migration apply

# Revert the last performed migration
npx squid-typeorm-migration revert  