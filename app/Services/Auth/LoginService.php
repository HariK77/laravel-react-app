<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use Symfony\Component\HttpFoundation\Response;

class LoginService
{
    public function __construct(
        protected User $user
    ) {
    }
    /**
     * @var LoginRequest $request
     */
    protected LoginRequest $request;

    /**
     * @param LoginRequest $request
     * @return self
     */
    public function setRequest(LoginRequest $request): self
    {
        $this->request = $request;
        return $this;
    }

    /**
     * @return LoginRequest
     */
    public function LoginRequest(): LoginRequest
    {
        return $this->request;
    }

    public function process(): array
    {
        $result = [];

        if (!Auth::attempt([...$this->request->validated()])) {
            $result['status'] = false;
            $result['message'] = 'Invalid credentials';
            $result['code'] = Response::HTTP_UNAUTHORIZED;
        } else {
            $user = $this->user->firstWhere('email', $this->request->validated('email'));

            $result['status'] = true;
            $result['data'] = [
                'token' => $user->createToken(
                    'API token for ' . $user->email,
                    ['*'],
                )->plainTextToken,
                'user' => new UserResource($user)
            ];
            $result['message'] = 'Authenticated';
            $result['code'] = Response::HTTP_OK;
        }
        return $result;
    }
}
