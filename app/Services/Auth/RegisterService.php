<?php

namespace App\Services\Auth;

use App\Helpers\UploadHelper;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class RegisterService
{
    public function __construct(
        protected User $user
    ) {
    }
    /**
     * @var RegisterRequest $request
     */
    protected RegisterRequest $request;

    /**
     * @param RegisterRequest $request
     * @return self
     */
    public function setRequest(RegisterRequest $request): self
    {
        $this->request = $request;
        return $this;
    }

    public function process()
    {
        $result = [];
        try {
            $data = [...$this->request->validated()];
            $data['profile_image'] = UploadHelper::fileUpload('uploads/profile', $data['profile_image']);
            $this->user->create($data);

            $result['message'] = 'User registered successfully.';
            $result['code'] = Response::HTTP_CREATED;
            $result['status'] = true;
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            $result['code'] = Response::HTTP_INTERNAL_SERVER_ERROR;
            $result['status'] = false;
        }

        return $result;
    }
}
