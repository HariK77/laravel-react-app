<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Auth\RegisterRequest;
use App\Services\Auth\RegisterService;

class RegisterController extends ApiController
{
    public function index(RegisterRequest $request, RegisterService $service): JsonResponse
    {
        return $this->processResult($service->setRequest($request)->process());
    }
}
