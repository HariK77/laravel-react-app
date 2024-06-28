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
        return $this->errorResponse(
            'Valdation failed',
            Response::HTTP_UNPROCESSABLE_ENTITY,
            $this->transformErrors(),
            // $this->validator->errors()->getMessages(),
        );
    }

    private function transformErrors(): array
    {
        $errors = [];
        foreach ($this->validator->errors()->getMessages() as $field => $message) {
            // $split = explode('.', $field);
            // if (count($split) === 3) {
            //     $errors[$split[0]][$split[1]][$split[2]] = str_replace($field, $split[2], $message);
            // } else {
            //     $errors[$field] = $message[0];
            // }
            $errors[$field] = $message[0];
        }
        return $errors;
    }
}
