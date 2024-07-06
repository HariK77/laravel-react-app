<?php

namespace App\Services\Video\Conversion;

use Illuminate\Support\Str;
use App\Helpers\FileUploadHelper;
use FFMpeg\Format\Video\X264;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Resources\Video\VideoTrackResource;
use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;
use ProtoneMedia\LaravelFFMpeg\Exporters\EncodingException;
use App\Models\VideoTrack;
use App\Services\BaseService;

class ConvertVideoTrackService extends BaseService
{
    /**
     * @var int $videoTrackId
     */
    protected int $videoTrackId;

    public function __construct(
        protected VideoTrack $videoTrack
    ) {
    }

    /**
     * @param int $videoTrackId
     * @return self
     */
    public function setvideoTrackId(int $videoTrackId): self
    {
        $this->videoTrackId = $videoTrackId;
        return $this;
    }

    public function process(): array
    {
        try {
            $videoTrack = $this->videoTrack->where('id', $this->videoTrackId)->first();
            $outputFilePath = config('paths.streaming.video') . '/' . $videoTrack->album->slug . '/' . $videoTrack->slug . '/' . $videoTrack->slug . '.m3u8';
            $lowBitrate  = (new X264)->setKiloBitrate(500);
            $midBitrate  = (new X264)->setKiloBitrate(1500);
            $highBitrate = (new X264)->setKiloBitrate(3000);

            FFMpeg::open($videoTrack->original_source_url)
                ->exportForHLS()
                ->addFormat($lowBitrate, function ($media) {
                    $media->addFilter('scale=640:480');
                })
                ->addFormat($midBitrate, function ($media) {
                    $media->scale(1280, 720);
                })
                ->addFormat($highBitrate, function ($media) {
                    $media->addFilter(function ($filters, $in, $out) {
                        $filters->custom($in, 'scale=1920:1080', $out);
                    });
                })
                ->save($outputFilePath);

            $videoTrack->stream_url = $outputFilePath;
            $videoTrack->save();

            $this->status = true;
            $this->message = 'Video track has been converted successfully';
            $this->data = new VideoTrackResource($videoTrack);
            $this->code = Response::HTTP_OK;
        } catch (\Throwable $th) {
            $this->message = $th->getMessage();
        } catch (EncodingException $exception) {
            $this->message = $exception->getMessage();
            $this->errors = [
                $exception->getCommand(),
                $exception->getErrorOutput()
            ];
            Log::error('Error while encoding to hls ' . $this->videoTrackId, [
                $exception->getCommand(), $exception->getErrorOutput()
            ]);
        }

        return $this->sendData();
    }
}
