<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ApiResponseHelper
{
    public static function sendResponse(
        mixed $result = [],
        string $message = 'Request Successful.',
        int $code = Response::HTTP_OK
    ): JsonResponse {

        $response = [
            'message' => $message,
        ];

        if (!empty($result)) {
            $response['data'] = $result;
        }

        return response()->json(
            $response,
            $code
        );
    }

    public static function sendError(
        string $message = 'Request Failed.',
        int $code = Response::HTTP_INTERNAL_SERVER_ERROR,
        array $errors = []
    ): JsonResponse {
        $response = [
            'message' => $message,
        ];

        if (count($errors)) {
            $response['errors'] = $errors;
        }
        return response()->json(
            $response,
            $code
        );
    }
}
