<?php

namespace App\Http\Controllers\Api\Auth;


use Illuminate\Http\JsonResponse;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Controllers\Api\ApiController;
use App\Services\Auth\LoginService;


class LoginController extends ApiController
{
    public function index(LoginRequest $request, LoginService $service): JsonResponse
    {
        return $this->processResult($service->setRequest($request)->process());
    }
}
