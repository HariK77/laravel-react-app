<?php

namespace App\Http\Resources\Video;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VideoAlbumResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'thumbnail' => $this->thumbnail,
            'releasedAt' => $this->released_at->format('Y-m-d'),
            'tracks' => $this->when(
                $request->routeIs('videos.albums.show'),
                VideoTrackResource::collection($this->tracks)
            )
        ];
    }
}
