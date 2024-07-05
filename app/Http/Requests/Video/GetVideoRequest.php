<?php

namespace App\Http\Requests\Video;

use App\Enums\VideoType;
use Illuminate\Foundation\Http\FormRequest;

class GetVideoRequest extends FormRequest
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
            'title' => ['required', 'string', 'min:3', 'max:255'],
            'album' => ['required', 'string', 'min:3', 'max:255'],
            'video' => ['required', 'file', 'mimes:' . implode(',', VideoType::all())],
        ];
    }
}