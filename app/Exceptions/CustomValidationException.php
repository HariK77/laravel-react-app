<?php

namespace App\Exceptions;

use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;

class CustomValidationException extends ValidationException
{
    use ApiResponse;

    /**
     * Render the exception into an HTTP response.
     */
    public function render($request): JsonResponse
    {
        return $this->sendError(
            'Valdation failed',
            Response::HTTP_UNPROCESSABLE_ENTITY,
            $this->transformErrors(),
        );
    }

    private function transformErrors(): array
    {
        $errors = [];
        foreach ($this->validator->errors()->getMessages() as $field => $message) {
            $errors[$field] = $message[0];
        }
        return $errors;
    }
}
