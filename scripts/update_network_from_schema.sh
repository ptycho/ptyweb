node ../packages/app/frontend/node_modules/openapi-typescript-codegen/bin/index.js -i http://localhost:8000/openapi.json -o network --indent 2
cp OpenAPIBackup.ts.backup network/core/OpenAPI.ts
cp requestBackup.ts.backup network/core/request.ts
rm -r ../packages/app/frontend/src/network
mv network ../packages/app/frontend/src/network
git add ../packages/app/frontend/src/network
echo "Finished generating new schema"
