<?php

namespace App\Services\Video\Tracks;

use Illuminate\Support\Str;
use App\Helpers\FileHelper;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\Video\VideoTrackResource;
use App\Models\VideoTrack;
use App\Services\BaseService;

class StoreVideoTrackService extends BaseService
{
    /**
     * @var array $validatedData
     */
    protected array $validatedData;

    public function __construct(
        protected VideoTrack $videoTrack
    ) {
    }

    /**
     * @param array $validatedData
     * @return self
     */
    public function setValidatedData(array $validatedData): self
    {
        $this->validatedData = $validatedData;
        return $this;
    }

    public function process(): array
    {
        try {
            $data = $this->validatedData;

            $data['thumbnail'] = FileHelper::fileUpload(config('paths.thumbnails.video.tracks'), $data['thumbnail']);
            $data['slug'] = Str::of($data['name'])->slug();
            $data['original_source_url'] = FileHelper::fileUpload(config('paths.source.video'), $data['video']);

            $this->status = true;
            $this->message = 'Video track has been added successfully';
            $this->data = new VideoTrackResource($this->videoTrack->create($data));
            $this->code = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->message = $th->getMessage();
        }

        return $this->sendData();
    }
}
