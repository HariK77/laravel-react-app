<?php

namespace App\Enums;

use App\Traits\EnumTrait;

enum VideoType: string
{
    use EnumTrait;

    case MP4 = 'mp4';
    case AVI = 'avi';
    case MKV = 'mkv';
}
