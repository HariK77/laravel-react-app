<?php

namespace App\Http\Controllers;

use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class SpaHandleController extends Controller
{
    public function handle(Request $request): ?View
    {
        return view('react');
    }
}
