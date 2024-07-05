<?php

namespace App\Services\Video;

use App\Models\SourceVideo;
use Illuminate\Support\Str;
use App\Helpers\FileHelper;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\Video\StoreSourceVideoRequest;

class SourceVideoUploadService
{
    public function __construct(
        protected SourceVideo $sourceVideo
    ) {
    }
    /**
     * @var StoreSourceVideoRequest $request
     */
    protected StoreSourceVideoRequest $request;

    /**
     * @param StoreSourceVideoRequest $request
     * @return self
     */
    public function setRequest(StoreSourceVideoRequest $request): self
    {
        $this->request = $request;
        return $this;
    }

    public function process(): array
    {
        $result = [];
        try {
            $data = [...$this->request->validated()];
            $sourceVideo = $this->sourceVideo->create([
                'title' => $data['title'],
                'title_slug' => Str::of($data['title'])->slug(),
                'album' => $data['album'],
                'album_slug' => Str::of($data['album'])->slug(),
                'video_path' => $data['video']->move(Storage::disk('videos')->path('app/source'), $data['video']->getClientOriginalName())
            ]);

            $result['message'] = 'Source video uploaded successfully.';
            $result['code'] = Response::HTTP_OK;
            $result['data'] = $sourceVideo;
            $result['status'] = true;
        } catch (\Throwable $th) {
            $result['message'] = $th->getMessage();
            $result['code'] = Response::HTTP_INTERNAL_SERVER_ERROR;
            $result['status'] = false;
        }

        return $result;
    }
}
