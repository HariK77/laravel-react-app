<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;

class ApiController extends Controller
{
    use ApiResponse;

    public function processResult(array $result): JsonResponse
    {
        return match ($result['status']) {
            true => $this->success($result),
            false => $this->error($result),
            default => response()->noContent(),
        };
    }

    protected function success($result)
    {
        if (isset($result['data'])) {
            return $this->sendResponse(
                $result['data'],
                $result['message'],
                $result['code']
            );
        }

        return $this->sendResponse(
            [],
            $result['message'],
            $result['code']
        );
    }

    protected function error($result)
    {
        if (isset($result['errors'])) {
            return $this->sendError(
                $result['message'],
                $result['code'],
                $result['errors'],
            );
        }

        return $this->sendError(
            $result['message'],
            $result['code'],
        );
    }
}
