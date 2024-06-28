<?php

namespace App\Services\Profile;

use App\Helpers\UploadHelper;
use App\Http\Requests\Profile\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use Symfony\Component\HttpFoundation\Response;

class ProfileUpdateService
{
    public function __construct()
    {
    }
    /**
     * @var ProfileUpdateRequest $request
     */
    protected ProfileUpdateRequest $request;

    /**
     * @param ProfileUpdateRequest $request
     * @return self
     */
    public function setRequest(ProfileUpdateRequest $request): self
    {
        $this->request = $request;
        return $this;
    }

    public function process(): array
    {
        $result = [];
        try {
            $data = [...$this->request->validated()];

            $user = auth()->user();
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->gender = $data['gender'];
            $user->speaking_languages = $data['speaking_languages'];

            if ($this->request->has('profile_image')) {
                UploadHelper::fileDelete($user->profile_image);
                $user->profile_image = UploadHelper::fileUpload('uploads/profile', $data['profile_image']);
            }

            $user->save();

            $result['message'] = 'Profile details updated successfully.';
            $result['data'] = new UserResource($user);
            $result['code'] = Response::HTTP_OK;
            $result['status'] = true;
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            $result['code'] = Response::HTTP_INTERNAL_SERVER_ERROR;
            $result['status'] = false;
        }

        return $result;
    }
}
