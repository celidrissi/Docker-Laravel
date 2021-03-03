<?php

namespace App\Console\Commands;

use App\Module;
use Illuminate\Console\Command;

class Analyze extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'modules:analyze';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Permet d\'avoir des informations résumées sur le fonctionnement des modules.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info("Début de l'analyse..");

        $modules = Module::all(['id', 'status'])->toArray();
        $mods = $modules;
        for ($i = 0; $i < count($modules); $i++) {
            if($mods[$i]['status'] == 'SUCCESS')
                $mods[$i]['status'] = 'Fonctionne correctement';
            else if($mods[$i]['status'] == 'WARNING')
                $mods[$i]['status'] = 'Défectueux';
            else
                $mods[$i]['status'] = 'Ne fonctionne pas';
        }
        $this->table(['id', 'status'], $mods);

        $this->info("\nCalcul des statistiques..");
        $stats = [
            'SUCCESS' => 0,
            'WARNING' => 0,
            'DANGER' => 0
        ];
        foreach ($modules as $mod) {
            if($mod['status'] == 'SUCCESS') $stats['SUCCESS'] += 1;
            else if($mod['status'] == 'WARNING') $stats['WARNING'] += 1;
            else $stats['DANGER'] += 1;
        }

        $this->line('Sur ' . count($modules) . ' modules :');
        $this->line('  - ' . $stats['SUCCESS'] . ' sont fonctionnels');
        $this->line('  - ' . $stats['WARNING'] . ' sont défaillants');
        $this->line('  - ' . $stats['DANGER'] . ' ne fonctionnnent pas');

        $this->info("\nFin de l'analyse..\n");

        if(max($stats['SUCCESS'], $stats['WARNING'], $stats['DANGER']) == $stats['DANGER'])
            $this->line('<fg=red>Attention, un grand nombre de modules ne fonctionnement pas. Veuillez vérifier vos équipements.</>');

        return;
    }
}
