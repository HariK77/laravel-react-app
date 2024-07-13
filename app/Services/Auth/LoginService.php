<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Services\BaseService;
use Symfony\Component\HttpFoundation\Response;

class LoginService extends BaseService
{
    /**
     * @var LoginRequest $request
     */
    protected LoginRequest $request;

    public function __construct(
        protected User $user
    ) {
    }

    /**
     * @param LoginRequest $request
     * @return self
     */
    public function setRequest(LoginRequest $request): self
    {
        $this->request = $request;
        return $this;
    }

    public function actOn(): array
    {
        if (!Auth::attempt($this->request->validated())) {
            $this->message = 'Invalid credentials';
            $this->code = Response::HTTP_UNAUTHORIZED;
        } else {
            $user = $this->user->firstWhere('email', $this->request->validated('email'));

            $this->status = true;
            $this->data = [
                'token' => $this->createToken($user),
                'user' => new UserResource($user)
            ];
            $this->message = 'Authenticated';
            $this->code = Response::HTTP_OK;
        }

        return $this->sendData();
    }

    protected function createToken(User $user): string
    {
        return $user->createToken(
            'API token for ' . $user->email,
            ['*'],
        )->plainTextToken;
    }
}
