<?php

namespace App\Services\Profile;

use App\Helpers\FileUploadHelper;
use App\Http\Requests\Profile\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use App\Services\BaseService;
use Symfony\Component\HttpFoundation\Response;

class ProfileUpdateService extends BaseService
{
    /**
     * @var ProfileUpdateRequest $request
     */
    protected ProfileUpdateRequest $request;

    public function __construct()
    {
    }

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
        try {
            $data = $this->request->validated();

            $user = auth()->user();
            $user->name = $data['name'];
            $user->email = $data['email'];
            $user->gender = $data['gender'];
            $user->speaking_languages = $data['speaking_languages'];

            if ($this->request->has('profile_image')) {
                FileUploadHelper::fileDelete($user->profile_image);
                $user->profile_image = FileUploadHelper::fileUpload(config('paths.profile'), $data['profile_image']);
            }

            $user->save();

            $this->status = true;
            $this->message = 'Profile details updated successfully.';
            $this->code = Response::HTTP_OK;
            $this->data = new UserResource($user);
        } catch (\Throwable $th) {
            $this->message = $th->getMessage();
        }

        return $this->sendData();
    }
}
