<?php

namespace App\Services\Video\Tracks;

use App\Models\VideoTrack;
use Illuminate\Support\Str;
use App\Helpers\FileUploadHelper;
use App\Services\BaseService;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\Video\VideoTrackResource;

class UpdateVideoTrackService extends BaseService
{
    /**
     * @var array $validatedData
     */
    protected array $validatedData;

    /**
     * @var VideoTrack $videoTrack
     */
    protected VideoTrack $videoTrack;

    public function __construct()
    {
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

    /**
     * @param VideoTrack $videoTrack
     * @return self
     */
    public function setVideoTrack(VideoTrack $videoTrack): self
    {
        $this->videoTrack = $videoTrack;
        return $this;
    }

    public function process(): array
    {
        try {
            $data = $this->validatedData;

            $this->videoTrack->name = $data['name'];
            $this->videoTrack->slug = Str::of($data['name'])->slug();
            $this->videoTrack->video_album_id = $data['video_album_id'];
            if (isset($data['thumbnail'])) {
                FileUploadHelper::fileDelete($this->videoTrack->thumbnail);
                $this->videoTrack->thumbnail = FileUploadHelper::fileUpload(config('paths.thumbnails.video.tracks'), $data['thumbnail']);
            }

            if (isset($data['video'])) {
                FileUploadHelper::fileDelete($this->videoTrack->original_source_url);
                $this->videoTrack->original_source_url = FileUploadHelper::fileUpload(config('paths.source.video'), $data['video']);
            }
            $this->videoTrack->save();

            $this->status = true;
            $this->message = 'Video Album has been updated successfully';
            $this->data = new VideoTrackResource($this->videoTrack);
            $this->code = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->message = $th->getMessage();
        }

        return $this->sendData();
    }
}
