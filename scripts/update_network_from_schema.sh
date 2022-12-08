node ../frontend/node_modules/openapi-typescript-codegen/bin/index.js -i http://localhost:8000/openapi.json -o network --indent 2
cp OpenAPIBackup.ts.backup network/core/OpenAPI.ts
cp requestBackup.ts.backup network/core/request.ts
rm -r ../frontend/src/network
mv network ../frontend/src/network
git add ../frontend/src/network
echo "Finished generating new schema"
