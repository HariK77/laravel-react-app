<?php

declare(strict_types=1);

namespace App\Services;


use Symfony\Component\HttpFoundation\Response;

class BaseService
{
    public string $message = 'Request Failed.';
    public bool $status = false;
    public int $code = Response::HTTP_INTERNAL_SERVER_ERROR;
    public mixed $data = null;
    public ?array $errors = null;

    public function sendData(): array
    {
        return match ($this->status) {
            true => $this->success(),
            false => $this->error()
        };
    }

    protected function success()
    {
        $result = [
            'message' => $this->message,
            'code' => $this->code,
            'status' => true,
        ];

        if (!empty($this->data)) {
            $result['data'] = $this->data;
        }

        return $result;
    }

    protected function error()
    {
        $result = [
            'message' => $this->message,
            'code' => $this->code,
            'status' => false,
        ];

        if (!empty($this->errors)) {
            $result['errors'] = $this->errors;
        }

        return $result;
    }
}
