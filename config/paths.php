<?php

return [
    'profile' => env('PROFILE', 'uploads/profile'),
    'streaming' => [
        'video' => env('STREAMING_VIDEO', 'uploads/straming/video'),
        'audio' => env('STREAMING_AUDIO', 'uploads/straming/audio'),
    ],
    'source' => [
        'video' => env('SOURCE_VIDEO', 'uploads/source/video'),
        'audio' => env('SOURCE_AUDIO', 'uploads/source/audio'),
    ],
    'thumbnails' => [
        'video' => [
            'tracks' => env('THUMBNAILS_VIDEO_TRACKS', 'uploads/thumbnails/video/tracks'),
            'albums' => env('THUMBNAILS_VIDEO_ALBUMS', 'uploads/thumbnails/video/albums'),
        ],
        'audio' => [
            'tracks' => env('THUMBNAILS_AUDIO_TRACKS', 'uploads/thumbnails/audio/tracks'),
            'albums' => env('THUMBNAILS_AUDIO_ALBUMS', 'uploads/thumbnails/audio/albums'),
        ]
    ],
];
