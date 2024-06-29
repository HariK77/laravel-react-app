<?php

use App\Helpers\ApiResponseHelper;
use App\Http\Middleware\ForceJson;
use Illuminate\Foundation\Application;
use App\Exceptions\CustomValidationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotAcceptableHttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(ForceJson::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->renderable(function (ValidationException $exception, $request) {
            if ($request->wantsJson()) {
                throw CustomValidationException::withMessages(
                    $exception->validator->getMessageBag()->getMessages()
                );
            }
        });

        $exceptions->renderable(function (NotAcceptableHttpException $exception, $request) {
            if ($request->is('api/*')) {
                return ApiResponseHelper::errorResponse(
                    $exception->getMessage(),
                    $exception->getStatusCode()
                );
            }
        });

        $exceptions->renderable(function (AccessDeniedHttpException $exception, $request) {
            if ($request->is('api/*')) {
                return ApiResponseHelper::errorResponse(
                    $exception->getMessage(),
                    $exception->getStatusCode()
                );
            }
        });

        $exceptions->renderable(function (AuthenticationException $exception, $request) {
            if ($request->is('api/*')) {
                return ApiResponseHelper::errorResponse(
                    $exception->getMessage(),
                    Response::HTTP_UNAUTHORIZED
                );
            }
        });

        $exceptions->renderable(function (RouteNotFoundException $exception, $request) {
            if ($request->is('api/*')) {
                return ApiResponseHelper::errorResponse(
                    $exception->getMessage(),
                    Response::HTTP_NOT_FOUND
                );
            }
        });
    })->create();
