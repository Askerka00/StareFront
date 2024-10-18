install:
	pnpm install

start:
	pnpm dev

build:
	pnpm build

preview:
	pnpm preview

test:
	pnpm test

types:
	pnpm dlx swagger-typescript-api -p ../spec/storefront/openapi.json -o ./src/shared/api/ -n api.types.ts
