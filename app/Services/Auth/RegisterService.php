<?php

namespace App\Services\Auth;

use App\Helpers\FileHelper;
use App\Http\Requests\Auth\RegisterRequest;
use App\Models\User;
use App\Services\BaseService;
use Symfony\Component\HttpFoundation\Response;

class RegisterService extends BaseService
{
    /**
     * @var RegisterRequest $request
     */
    protected RegisterRequest $request;

    public function __construct(
        protected User $user
    ) {
    }

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
        try {
            $data = $this->request->validated();
            $data['profile_image'] = FileHelper::fileUpload(config('paths.profile'), $data['profile_image']);
            $this->user->create($data);

            $this->message = 'User registered successfully.';
            $this->code = Response::HTTP_CREATED;
            $this->status = true;
        } catch (\Throwable $th) {
            $this->message = $th->getMessage();
        }

        return $this->sendData();
    }
}
