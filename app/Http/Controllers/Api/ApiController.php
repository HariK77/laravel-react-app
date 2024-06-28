<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class ApiController extends Controller
{
    use ApiResponse;

    public function processResult(array $data): JsonResponse
    {
        if (!$data['status']) {
            return $this->errorResponse(
                $data['message'],
                $data['code'],
            );
        }

        if (isset($data['data'])) {
            return $this->dataResponse(
                $data['data'],
                $data['code'],
                $data['message']
            );
        }

        return $this->successResponse(
            $data['message'],
            $data['code'],
        );
    }
}
