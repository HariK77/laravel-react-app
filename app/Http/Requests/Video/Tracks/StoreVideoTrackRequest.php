<?php

namespace App\Http\Requests\Video\Tracks;

use App\Enums\ImageType;
use App\Enums\VideoType;
use Illuminate\Foundation\Http\FormRequest;

class StoreVideoTrackRequest extends FormRequest
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
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'video_album_id' => ['required', 'exists:video_albums,id'],
            'video' => ['required', 'file', 'mimes:' . VideoType::commaSeperatedString()],
            'thumbnail' => ['required', 'file', 'mimes:' . ImageType::commaSeperatedString()],
        ];
    }
}
