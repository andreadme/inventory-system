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
        Schema::create('product_status_types', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->string('name');
            $table->softDeletesTz('deleted_at', 3);
            $table->timestampTz('updated_at', 3)->nullable()->useCurrentOnUpdate();
            $table->timestampTz('created_at', 3)->useCurrent();
        });

        DB::statement('ALTER TABLE product_status_types ALTER COLUMN id SET DEFAULT uuid_generate_v4();');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_status_types');
    }
};
