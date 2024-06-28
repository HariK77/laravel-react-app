<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ApiResponseHelper
{
    public static function successResponse(string $message, ?int $statusCode = Response::HTTP_OK): JsonResponse
    {
        return response()->json(
            [
                'message' => $message,
                'code' => $statusCode
            ],
            $statusCode
        );
    }

    public static function dataResponse(mixed $data, ?int $statusCode = Response::HTTP_OK, ?string $message = null): JsonResponse
    {
        $response = [];
        if ($message) {
            $response['message'] = $message;
        }
        $response['data'] = $data;
        $response['code'] = $statusCode;

        return response()->json(
            $response,
            $statusCode
        );
    }

    public static function errorResponse(string $message, ?int $statusCode = Response::HTTP_INTERNAL_SERVER_ERROR, ?array $errors = []): JsonResponse
    {
        $response = [
            'message' => $message,
            'code' => $statusCode
        ];

        if (count($errors)) {
            $response['errors'] = $errors;
        }
        return response()->json(
            $response,
            $statusCode
        );
    }
}
