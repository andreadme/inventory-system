<?php

use App\Http\Controllers\InventoryLogController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductSummaryViewController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [ProductSummaryViewController::class, 'getDashboardView'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('inventory-log')->controller(InventoryLogController::class)->group(function () {
        Route::post('create', 'create')->name('inventory.log.create');
    });

    Route::prefix('product')->controller(ProductController::class)->group(function () {
        Route::get('view', 'index')->name('product.view');
        Route::post('create', 'create')->name('product.create');
        Route::get('show/{id}', 'show')->name('product.show');
        Route::post('update', 'update')->name('product.update');
    });

    Route::prefix('product-category')->controller(ProductCategoryController::class)->group(function () {
        Route::get('view', 'index')->name('product.category.view');
        Route::post('create', 'create')->name('product.category.create');
    });
});

require __DIR__.'/auth.php';
