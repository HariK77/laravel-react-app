<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Profile\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use App\Services\Profile\ProfileUpdateService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ProfileController extends ApiController
{
    public function index(Request $request): JsonResponse
    {
        return $this->sendResponse(new UserResource($request->user()));
    }

    public function update(ProfileUpdateRequest $request, ProfileUpdateService $service): JsonResponse
    {
        return $this->processResult($service->setRequest($request)->actOn());
    }
}
