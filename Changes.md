- Need to work on moving all the exceptions into on file -- app.php
- Pass validated data instead of entire request object into services
- make and interface with process and validated data and implement it to Base Service class
- delete files with model events


Misc
***************************

    // mimetypes:
    // video/x-ms-asf,
    // video/x-flv,
    // video/mp4,
    // application/x-mpegURL,
    // video/MP2T,
    // video/3gpp,
    // video/quicktime,
    // video/x-msvideo,
    // video/x-ms-wmv,
    // video/avi'
    // video/x-matroska


    // public function mimes(): array
    // {
    //     return match ($this) {
    //         case self::Avatar => [
    //             'image/jpeg',
    //             'image/png',
    //             'image/gif',
    //         ],
    //         case self::Music => [
    //             'audio/wav',
    //             'audio/mpeg',
    //             'audio/flac',
    //             'audio/x-wav',
    //             'audio/x-m4a',
    //         ],
    //     };
    // }


**********************************************************


// use Illuminate\Support\Str;
// use Illuminate\Support\Facades\Storage;
// use ProtoneMedia\LaravelFFMpeg\FFMpeg\FFProbe;
// use ProtoneMedia\LaravelFFMpeg\Support\FFMpeg;

// $directories = Storage::disk('videos')->directories('Movies');
//         // dd($directories);
//         $data = [];

//         foreach ($directories as $key => $directory) {
//             $filePaths = Storage::disk('videos')->files($directory);
//             foreach ($filePaths as $key => $filePath) {
//                 if (Str::contains($filePath, '.mkv')) {
//                     $data[] = FFProbe::create()->streams(Storage::disk('videos')->path('/'.$filePath))->all();
//                 }
//             }
//         }
//         dd($data);