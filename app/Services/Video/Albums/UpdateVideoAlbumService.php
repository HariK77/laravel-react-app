<?php

namespace App\Services\Video\Albums;

use App\Models\VideoAlbum;
use Illuminate\Support\Str;
use App\Helpers\FileUploadHelper;
use App\Services\BaseService;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\Video\VideoAlbumResource;
use App\Http\Requests\Video\Albums\UpdateVideoAlbumRequest;

class UpdateVideoAlbumService extends BaseService
{
    /**
     * @var UpdateVideoAlbumRequest $request
     */
    protected UpdateVideoAlbumRequest $request;

    /**
     * @var VideoAlbum $videoAlbum
     */
    protected VideoAlbum $videoAlbum;

    public function __construct()
    {
    }

    /**
     * @param UpdateVideoAlbumRequest $request
     * @return self
     */
    public function setRequest(UpdateVideoAlbumRequest $request): self
    {
        $this->request = $request;
        return $this;
    }

    /**
     * @param VideoAlbum $videoAlbum
     * @return self
     */
    public function setVideoAlbum(VideoAlbum $videoAlbum): self
    {
        $this->videoAlbum = $videoAlbum;
        return $this;
    }

    public function actOn(): array
    {
        try {
            $data = $this->request->validated();

            $this->videoAlbum->name = $data['name'];
            $this->videoAlbum->slug = Str::of($data['name'])->slug();
            if ($this->request->has('thumbnail')) {
                FileUploadHelper::fileDelete($this->videoAlbum->thumbnail);
                $data['thumbnail'] = FileUploadHelper::fileUpload(config('paths.thumbnails.video.albums'), $data['thumbnail']);
            }
            $this->videoAlbum->released_at = $data['released_at'];
            $this->videoAlbum->save();

            $this->status = true;
            $this->message = 'Video Album has been updated successfully';
            $this->data = new VideoAlbumResource($this->videoAlbum);
            $this->code = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->message = $th->getMessage();
        }

        return $this->sendData();
    }
}
