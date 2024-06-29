<?php

namespace App\Http\Requests\Auth;

use App\Enums\Gender;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'alpha', 'min:5', 'max:15'],
            'email' => ['required', 'string', 'min:3', 'unique:users,email'],
            'password' => ['required', 'string', 'confirmed', 'min:8'],
            'password_confirmation' => ['required'],
            'gender' => ['required', Rule::in(Gender::all())],
            'profile_image' => ['required', 'file', 'mimes:jpeg,png,jpg', 'max:2048'],
            'speaking_languages' => ['required', 'array']
        ];
    }
}
