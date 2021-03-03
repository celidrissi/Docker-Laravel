<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateModulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->nullable(false);
            $table->longText('description')->nullable(false);
            $table->string('number_identifier')->nullable(false);

            $table->float('temperature')->nullable()->default(0);
            $table->boolean('show_temperature')->nullable(false)->default(false);

            $table->string('used_time')->nullable()->default('0');
            $table->boolean('show_used_time')->nullable(false)->default(false);

            $table->integer('datas_send')->nullable()->default(0);
            $table->boolean('show_datas_send')->nullable(false)->default(0);

            $table->enum('status', ['SUCCESS', 'WARNING', 'DANGER'])->nullable()->default('SUCCESS');
            $table->boolean('show_status')->nullable(false)->default(false);

            $table->timestamps();

            $table->unsignedBigInteger('module_type_id');
            $table->foreign('module_type_id')
                ->references('id')
                ->on('module_types')
                ->onDelete('cascade')
                ->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('modules', function (Blueprint $table) {
            //
        });
    }
}
