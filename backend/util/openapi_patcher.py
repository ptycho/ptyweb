from fastapi.openapi import utils, constants
import fastapi


def patch_openapi(app: fastapi.FastAPI, **kwargs) -> None:
    # Generating custom open api schema which includes schemas for message pack

    # Links the model python object to the location in the openapi spec where each endpoint is linked to a model
    path_model_schema_location_map = {}

    # Populating the path_model_schema_location_map
    for route in app.routes:
        if not isinstance(route, fastapi.routing.APIRoute):
            continue
        for response_status_code in route.responses:
            response_status_code_data = route.responses[response_status_code]
            if "content" not in response_status_code_data:
                continue

            possible_content_types = response_status_code_data["content"]
            if "application/msgpack" in possible_content_types or "application/x-msgpack" in possible_content_types:
                if "application/msgpack" in possible_content_types:
                    schema_location = possible_content_types["application/msgpack"]
                else:
                    schema_location = possible_content_types["application/x-msgpack"]

                # We have found an endpoint which uses message pack
                response_model = route.response_model
                if response_model is not None:
                    if response_model not in path_model_schema_location_map:
                        path_model_schema_location_map[response_model] = []

                    # Add this endpoint to the list of endpoints which use this model
                    path_model_schema_location_map[response_model].append(schema_location)

    # We can now get the names of each of our models which are used when generating the openapi spec
    flat_models = set(path_model_schema_location_map.keys())
    model_name_map = fastapi.openapi.utils.get_model_name_map(flat_models)
    for model, schema_locations in path_model_schema_location_map.items():
        model_name = model_name_map[model]

        for schema_location in schema_locations:
            schema_location.update({
                "schema": {
                    # Since endpoint is defined using the response model, the schema is already inserted into the
                    # openapi spec so the reference is valid
                    "$ref": f"{constants.REF_PREFIX}{model_name}"
                }
            })

    custom_schema = fastapi.openapi.utils.get_openapi(routes=app.routes, **kwargs)
    app.openapi_schema = custom_schema
