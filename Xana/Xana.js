let eventint = 0
let eventtriggerer = null
let eventinfo = {}
let jevent = 0
let jeventinfo = {}
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
                const attack = Math.floor(Math.random() * 5) + 1; // Random number 1-4
                
                const storagePos = BlockPos(8347, 221, -15717); 
                
                lanteaWorld.server.runCommandSilent(`say $xana attack trigger tower`)
                eventtriggerer = executingPlayer.username
                // Attack Logic
                switch (attack) {
                    case 1:
                        overworld.setWeatherParameters(0, 6000, true, true);
                        players.forEach(player => {
                            
                            let name = player.username 
                            server.runCommandSilent(`effect give ${name} minecraft:blindness 10 2`)
                            server.runCommandSilent(`effect give ${name} minecraft:weakness 10 2`)
                            server.runCommandSilent(`effect give ${name} minecraft:slowness 10 3`)

                        });
                        server.runCommandSilent('tellraw @a ["",{"text":"<","bold":true,"color":"black"},{"text":"XANA","bold":true,"color":"dark_red"},{"text":">","bold":true,"color":"black"},{"text":"The storm bends to my command.","color":"red"}]')
                        executingPlayer.tell("Trigger Weather Event")
                        eventint = 1
                        break;

                    case 2:
                        players.forEach(player => {
                            let currentDim = player.level.dimension.toString();
                            if (currentDim == "minecraft:overworld"){
                                
                                for (let i = 0; i < 5; i++) {
                                    const x = player.getX() + Math.random() * 6 - 3;
                                    const y = player.getY();
                                    const z = player.getZ() + Math.random() * 6 - 3;
                                
                                    server.runCommandSilent(`summon minecraft:zombie ${x} ${y} ${z} {CustomName:'[{"text":"XanaCorrupted"}]',Health:10000000,Invulnerable:1b,PersistenceRequired:1b,ActiveEffects:[{Id:21,Duration:1000000000,Amplifier:255,ShowParticles:0b},{Id:11,Duration:1000000000,Amplifier:255,ShowParticles:0b},{Id:5,Duration:1000000000,Amplifier:2,ShowParticles:0b}],Attributes:[{Name:"generic.max_health",Base:10000000f}]}`)
                                }
                            }
                        });

                        server.runCommandSilent('tellraw @a ["",{"text":"<","bold":true,"color":"black"},{"text":"XANA","bold":true,"color":"dark_red"},{"text":">","bold":true,"color":"black"},{"text":"Arise, my corrupted legion.","color":"red"}]')
                        executingPlayer.tell("Trigger Zombie Event")
                        eventint = 2
                        break;
                    case 3:
                        players.forEach(player => {
                            let name = player.username 
                            server.runCommandSilent(`effect give ${name} minecraft:slow_falling 10 1`)
                            server.runCommandSilent(`effect give ${name} minecraft:slowness 10 4`)
                        });
                        server.runCommandSilent('tellraw @a ["",{"text":"<","bold":true,"color":"black"},{"text":"XANA","bold":true,"color":"dark_red"},{"text":">","bold":true,"color":"black"},{"text":"Gravity fractures at my signal.","color":"red"}]')
                        executingPlayer.tell("Trigger Gravity Event")
                        eventint = 3
                        break;

                    case 4:
                        players.forEach(player => {
                            let name = player.username 
                            server.runCommandSilent(`effect give ${name} minecraft:blindness 10 2`)
                            server.runCommandSilent(`effect give ${name} minecraft:night_vision 10 1`)
                        });

                        players.forEach(player => {
                            let name = player.username 
                            server.runCommandSilent(`playsound minecraft:ambient.cave ambient ${name} ~ ~ ~ 1 0.5`)
                        });
                        server.runCommandSilent('tellraw @a ["",{"text":"<","bold":true,"color":"black"},{"text":"XANA","bold":true,"color":"dark_red"},{"text":">","bold":true,"color":"black"},{"text":"Light surrenders to the void.","color":"red"}]')
                        executingPlayer.tell("Trigger Imense Darkness Event")
                        
                        eventint = 4
                        break;
                    case 5:
                        let playersls = []
                        players.forEach(player => {
                            let name = player.username 
                            if (eventtriggerer != name){
                                playersls.push(name)
                            }
                        });
                        eventinfo.possesed = playersls[Math.floor(Math.random() * playersls.length)];
                        server.runCommandSilent('tellraw @a ["",{"text":"<","bold":true,"color":"black"},{"text":"XANA","bold":true,"color":"dark_red"},{"text":">","bold":true,"color":"black"},{"text":"I now speak through this vessel.","color":"red"}]')
                        server.runCommandSilent(`tellraw ${eventinfo.possesed} ["",{"text":"<","bold":true,"color":"black"},{"text":"XANA","bold":true,"color":"dark_red"},{"text":">","bold":true,"color":"black"},{"text":"You are mine now do my bidding.","color":"red"}]`)

                        executingPlayer.tell("Trigger Possess Event")
                        
                        eventint = 5
                        break;
                }

                return 1;
            })
    );
    event.register(
        Commands.literal('xanastop')
            .requires(s => s.hasPermission(2))
            .executes(ctx => {
                const server = ctx.source.server;
                const players = server.getPlayerList().getPlayers();

                eventint = 0
                players.forEach(player => {
                    let name = player.username 
                    server.runCommandSilent(`effect clear ${name}`)
                });
                server.runCommandSilent(`kill @e[name="XanaCorrupted"]`)
                server.runCommandSilent(`weather clear`)
                server.runCommandSilent(`say $xana attack trigger tower remove`)
                server.runCommandSilent('tellraw @a ["",{"text":"XANA ","bold":true,"color":"dark_red"},{"text":"Has Canceled Their Attack","color":"red"}]')
                return 1;
            })
    );
    event.register(
        Commands.literal('towerend')
            .requires(s => s.hasPermission(4))
            .executes(ctx => {
                const server = ctx.source.server;
                const players = server.getPlayerList().getPlayers();

                eventint = 0
                players.forEach(player => {
                    let name = player.username 
                    server.runCommandSilent(`effect clear ${name}`)
                });
                server.runCommandSilent(`kill @e[name="XanaCorrupted"]`)
                server.runCommandSilent(`weather clear`)
                return 1;
            })
    );
    
});
ServerEvents.tick(event => {
    if (eventint == 0) return;
    if (event.server.tickCount % 20 !== 0) return; // Check every 1 seconds (20 ticks)
    const server = event.server
    const players = server.getPlayerList().getPlayers();
    event.server.getPlayerList().getPlayers().forEach(player => {
      let currentDim = player.level.dimension.toString();
  
      let name = player.username 
      if (currentDim == 'minecraft:overworld') {
    switch (eventint) {
        case 1:
                if (eventtriggerer != name) {
                    server.runCommandSilent(`effect give ${name} minecraft:blindness 10 2`)
                    server.runCommandSilent(`effect give ${name} minecraft:weakness 10 2`)
                    server.runCommandSilent(`effect give ${name} minecraft:slowness 10 3`)
                }
            break;

        case 2:
            
            break;
        case 3:
                if (eventtriggerer != name){
                    server.runCommandSilent(`effect give ${name} minecraft:slow_falling 10 1`)
                    server.runCommandSilent(`effect give ${name} minecraft:slowness 10 4`)
                }
            break;

        case 4:
                if (eventtriggerer != name){
                    server.runCommandSilent(`effect give ${name} minecraft:blindness 10 2`)
                    server.runCommandSilent(`effect give ${name} minecraft:night_vision 10 1`)
                }
            break;
        case 5:
                if (eventinfo.possesed != name){
                    server.runCommandSilent(`effect give ${name} minecraft:resistance 10 255`)
                    server.runCommandSilent(`effect give ${name} minecraft:strength 10 3`)
                }
            break;
            }
      }
    });
  });