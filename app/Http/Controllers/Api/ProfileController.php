<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Profile\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use App\Services\Profile\ProfileUpdateService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfileController extends ApiController
{
    public function index(Request $request): JsonResource
    {
        return new UserResource($request->user());
    }

    public function update(ProfileUpdateRequest $request, ProfileUpdateService $service): JsonResponse
    {
        return $this->processResult($service->setRequest($request)->process());
    }
}
