<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('video_tracks', function (Blueprint $table) {
            $table->id();
            $table->string('name', 200);
            $table->string('slug', 255);
            $table->foreignId('video_album_id')->constrained('video_albums');
            $table->string('original_source_url', 255);
            $table->string('thumbnail')->nullable();
            $table->string('stream_url', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('video_tracks');
    }
};
