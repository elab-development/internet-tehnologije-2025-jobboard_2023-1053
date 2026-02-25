<?php

namespace App\Swagger;

use OpenApi\Annotations as OA;

/**
 * @OA\OpenApi(
 *   @OA\Info(
 *     title="ServisHub API",
 *     version="1.0.0"
 *   ),
 *   @OA\Server(
 *     url="/api",
 *     description="API base"
 *   )
 * )
 *
 * @OA\SecurityScheme(
 *   securityScheme="sanctum",
 *   type="apiKey",
 *   in="header",
 *   name="Authorization",
 *   description="Bearer {token}"
 * )
 */
class OpenApi {}