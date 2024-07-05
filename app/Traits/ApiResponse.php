<?php

namespace App\Traits;

use App\Helpers\ApiResponseHelper;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

trait ApiResponse
{
    public function sendResponse(
        mixed $result = [],
        string $message = 'Request Successful.',
        int $code = Response::HTTP_OK
    ): JsonResponse {
        return ApiResponseHelper::sendResponse($result, $message, $code);
    }

    public function sendError(
        string $message = 'Request Failed.',
        int $code = Response::HTTP_INTERNAL_SERVER_ERROR,
        array $errors = []
    ): JsonResponse {
        return ApiResponseHelper::sendError($message, $code, $errors);
    }
}
