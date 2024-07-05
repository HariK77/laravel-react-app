<?php

namespace App\Enums;

use App\Traits\EnumTrait;

enum VideoType: string
{
    use EnumTrait;

    case MP4 = 'mp4';
    case AVI = 'avi';
    case MKV = 'mkv';

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
}
