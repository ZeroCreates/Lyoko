

ServerEvents.commandRegistry(event => {
    const { commands: Commands } = event;

    event.register(
        Commands.literal('xana')
            .requires(s => s.hasPermission(2))
            .executes(ctx => {
                const server = ctx.source.server;
                const overworld = server.overworld();
                const players = server.getPlayerList().getPlayers();
                const lanteaWorld = server.getLevel('sgjourney:lantea');
                const executingPlayer = ctx.source.player;
                const attack = Math.floor(Math.random() * 4) + 1; // Random number 1-4
                
                const storagePos = BlockPos(8347, 221, -15717); 
                
                lanteaWorld.server.runCommandSilent(`say $xana attack trigger tower`)

                // Attack Logic
                switch (attack) {
                    case 1:
                        overworld.setWeatherParameters(0, 6000, true, true);
                        players.forEach(player => {
                            
                            let name = player.username 
                            if (executingPlayer.username != name) {
                                server.runCommandSilent(`effect give ${name} minecraft:blindness infinite 2`)
                                server.runCommandSilent(`effect give ${name} minecraft:weakness infinite 2`)
                                server.runCommandSilent(`effect give ${name} minecraft:slowness infinite 3`)
                            }
                        });
                        executingPlayer.tell("Trigger Weather Event")
                        break;

                    case 2:
                        players.forEach(player => {

                            for (let i = 0; i < 5; i++) {
                                const x = player.getX() + Math.random() * 6 - 3;
                                const y = player.getY();
                                const z = player.getZ() + Math.random() * 6 - 3;
                                
                                server.runCommandSilent(`summon minecraft:zombie ${x} ${y} ${z} {CustomName:'[{"text":"XanaCorrupted"}]',Health:10000000,Invulnerable:1b,PersistenceRequired:1b,ActiveEffects:[{Id:21,Duration:1000000000,Amplifier:255,ShowParticles:0b},{Id:11,Duration:1000000000,Amplifier:255,ShowParticles:0b},{Id:5,Duration:1000000000,Amplifier:2,ShowParticles:0b}],Attributes:[{Name:"generic.max_health",Base:10000000f}]}`)
                            }
                        });
                        executingPlayer.tell("Trigger Zombie Event")
                        break;
                    case 3:
                        players.forEach(player => {
                            let name = player.username 
                            server.runCommandSilent(`effect give ${name} minecraft:slow_falling infinite 1`)
                            server.runCommandSilent(`effect give ${name} minecraft:slowness infinite 4`)
                        });
                        executingPlayer.tell("Trigger Gravity Event")
                        break;

                    case 4:
                        players.forEach(player => {
                            let name = player.username 
                            server.runCommandSilent(`effect give ${name} minecraft:blindness infinite 2`)
                            server.runCommandSilent(`effect give ${name} minecraft:night_vision infinite 1`)
                        });

                        players.forEach(player => {
                            server.runCommandSilent(`playsound minecraft:ambient.cave ambient ${name} ~ ~ ~ 1 0.5`)
                        });
                        
                        executingPlayer.tell("Trigger Imense Darkness Event")
                        break;
                }

                return 1;
            })
    );
    event.register(
        Commands.literal('returntothepast')
            .requires(s => s.hasPermission(2))
            .executes(ctx => {
                const server = ctx.source.server;
                const players = server.getPlayerList().getPlayers();
                
                players.forEach(player => {
                    let name = player.username 
                    server.runCommandSilent(`effect clear ${name}`)
                    server.runCommandSilent(`kill @e[name="XanaCorrupted"]`)
                });
                server.runCommandSilent(`execute as @a run home`)
                server.runCommandSilent(`weather clear`)
            })
    );
});
