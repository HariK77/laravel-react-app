<?php

namespace App\Http\Requests\Profile;

use App\Models\User;
use App\Enums\Gender;
use App\Enums\ImageType;
use App\Rules\AlphaSpaceRule;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('update', [User::class, ['id' => (int) $this->id]]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', new AlphaSpaceRule, 'min:3', 'max:30'],
            'email' => ['required', 'string', 'min:3', 'unique:users,email,' . $this->id],
            'gender' => ['required', Rule::in(Gender::all())],
            'profile_image' => ['sometimes', 'file', 'mimes:' . ImageType::commaSeperatedString(), 'max:2048'],
            'speaking_languages' => ['required', 'array']
        ];
    }
}
