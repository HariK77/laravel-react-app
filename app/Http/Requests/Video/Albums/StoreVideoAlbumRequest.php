<?php

namespace App\Http\Requests\Video\Albums;

use App\Enums\ImageType;
use Illuminate\Foundation\Http\FormRequest;

class StoreVideoAlbumRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'thumbnail' => ['required', 'file', 'mimes:' . ImageType::commaSeperatedString()],
            'released_at' => ['required', 'date_format:Y-m-d'],
        ];
    }
}
