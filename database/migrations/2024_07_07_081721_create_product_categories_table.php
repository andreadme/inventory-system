<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_categories', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('name');
            $table->text('description')->nullable();
            $table->softDeletesTz('deleted_at', 3);
            $table->foreignUuid('deleted_by')->nullable()->constrained('users', 'id')->onDelete('cascade');
            $table->timestampTz('updated_at', 3)->nullable()->useCurrentOnUpdate();
            $table->foreignUuid('updated_by')->nullable()->constrained('users', 'id')->onDelete('cascade');
            $table->timestampTz('created_at', 3)->useCurrent();
            $table->foreignUuid('created_by')->nullable()->constrained('users', 'id')->onDelete('cascade');
        });

        DB::statement('ALTER TABLE product_categories ALTER COLUMN id SET DEFAULT uuid_generate_v4();');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_categories');
    }
};
