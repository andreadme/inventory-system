<?php

namespace App\Services;

use App\Http\Resources\BookedDataHistoryViewResource;
use App\Models\BookedDataHistoryView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

/**
 * Product Class
 * Handles booked-data-related operations.
 */
class ProductService
{
    // public function getHistory(): JsonResponse
    // {
    //     $results = BookedDataHistoryView::where('user_id', auth()->user()->user_id ?? 'b8048947-c87d-4938-966a-898ae273606a')->first();

    //     $data = BookedDataHistoryViewResource::make($results)->resolve();

    //     return $this->success('Successfully Fetch', $data, Response::HTTP_OK);
    // }
}
