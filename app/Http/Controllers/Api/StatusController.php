<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\JsonResponse;

class StatusController extends ApiController
{
    public function index(): JsonResponse
    {
        return $this->successResponse("Api is Working !!!");
    }
}
