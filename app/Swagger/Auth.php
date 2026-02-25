<?php

namespace App\Swagger;

use OpenApi\Annotations as OA;

/**
 * @OA\Post(
 *   path="/login",
 *   tags={"Auth"},
 *   summary="Login user",
 *   @OA\RequestBody(
 *     required=true,
 *     @OA\JsonContent(
 *       required={"email","password"},
 *       @OA\Property(property="email", type="string", format="email", example="milan@mail.com"),
 *       @OA\Property(property="password", type="string", format="password", example="secret12345")
 *     )
 *   ),
 *   @OA\Response(response=200, description="Success"),
 *   @OA\Response(response=401, description="Unauthorized")
 * )
 */
class Auth {}
