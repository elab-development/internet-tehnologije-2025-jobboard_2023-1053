<?php

namespace App\Swagger;

use OpenApi\Annotations as OA;

/**
 * @OA\OpenApi(
 *   @OA\Info(
 *     title="JobBoard API",
 *     version="1.0.0"
 *   ),
 *   @OA\Server(
 *     url="/api",
 *     description="API Base URL"
 *   )
 * )
 *
 * @OA\SecurityScheme(
 *   securityScheme="sanctum",
 *   type="apiKey",
 *   in="header",
 *   name="Authorization",
 *   description="Enter Bearer token"
 * )
 */
class OpenApi {}
