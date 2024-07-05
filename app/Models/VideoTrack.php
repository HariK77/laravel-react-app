<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VideoTrack extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'video_album_id',
        'original_source_url',
        'thumbnail',
        'stream_url',
    ];

    public function album(): BelongsTo
    {
        return $this->belongsTo(VideoAlbum::class, 'video_album_id');
    }
}
