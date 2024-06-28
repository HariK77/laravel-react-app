<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StatusController extends ApiController
{
    public function index(): JsonResponse
    {
        return $this->successResponse("Api is Working !!!");
    }
}
