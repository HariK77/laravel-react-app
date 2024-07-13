<?php

namespace App\Services\Video\Albums;

use Illuminate\Support\Str;
use App\Helpers\FileUploadHelper;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Requests\Video\Albums\StoreVideoAlbumRequest;
use App\Http\Resources\Video\VideoAlbumResource;
use App\Models\VideoAlbum;
use App\Services\BaseService;

class StoreVideoAlbumService extends BaseService
{
    /**
     * @var StoreVideoAlbumRequest $request
     */
    protected StoreVideoAlbumRequest $request;

    public function __construct(
        protected VideoAlbum $videoAlbum
    ) {
    }

    /**
     * @param StoreVideoAlbumRequest $request
     * @return self
     */
    public function setRequest(StoreVideoAlbumRequest $request): self
    {
        $this->request = $request;
        return $this;
    }

    public function actOn(): array
    {
        try {
            $data = $this->request->validated();
            $data['thumbnail'] = FileUploadHelper::fileUpload(config('paths.thumbnails.video.albums'), $data['thumbnail']);
            $data['slug'] = Str::of($data['name'])->slug();

            $this->status = true;
            $this->message = 'Video Album has been added successfully';
            $this->data = new VideoAlbumResource($this->videoAlbum->create($data));
            $this->code = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->message = $th->getMessage();
        }

        return $this->sendData();
    }
}
