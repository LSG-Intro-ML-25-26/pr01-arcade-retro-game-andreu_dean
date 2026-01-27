namespace SpriteKind {
    export const Mapa = SpriteKind.create()
    export const Apuntes = SpriteKind.create()
    export const Info = SpriteKind.create()
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Apuntes, function on_on_overlap(sprite2: Sprite, otherSprite: Sprite) {
    sprites.destroy(otherSprite)
    music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.UntilDone)
    sumar_apuntes()
})
function reanudar_profesores() {
    if (primer_profesor && segundo_profesor && tercer_profesor) {
        perseguir(primer_profesor, alumno2, 35)
        perseguir(segundo_profesor, alumno2, 30)
        perseguir(tercer_profesor, alumno2, 25)
    }
    
}

function generar_apuntes() {
    
    sprites.destroyAllSpritesOfKind(SpriteKind.Apuntes)
    total_apuntes = 0
    apuntes_recogidos = 0
    if (ronda == 1) {
        probabilidad_spawn_paginas = 25
    } else if (ronda == 2) {
        probabilidad_spawn_paginas = 15
    } else {
        probabilidad_spawn_paginas = 10
    }
    
    for (let posicion of tiles.getTilesByType(assets.tile`miMosaico9`)) {
        if (randint(0, 99) < probabilidad_spawn_paginas) {
            apunte = sprites.create(assets.image`miImagen1`, SpriteKind.Apuntes)
            tiles.placeOnTile(apunte, posicion)
            total_apuntes += 1
        }
        
    }
    objetivo_apuntes_ronda = total_apuntes
}

function crear_primer_profesor() {
    
    primer_profesor = sprites.create(assets.image`sis`, SpriteKind.Enemy)
    primer_profesor.setImage(assets.image`sis`)
    tiles.placeOnTile(primer_profesor, tiles.getTileLocation(8, 10))
    spawn_primer_profesor = primer_profesor.tilemapLocation()
}

function crear_segundo_profesor() {
    
    segundo_profesor = sprites.create(assets.image`rai`, SpriteKind.Enemy)
    segundo_profesor.setImage(assets.image`rai`)
    tiles.placeOnTile(segundo_profesor, tiles.getTileLocation(9, 10))
    spawn_segundo_profesor = segundo_profesor.tilemapLocation()
}

function parar_profesores() {
    if (primer_profesor) {
        primer_profesor.follow(alumno2, 0)
    }
    
    if (segundo_profesor) {
        segundo_profesor.follow(alumno2, 0)
    }
    
    if (tercer_profesor) {
        tercer_profesor.follow(alumno2, 0)
    }
    
}

function sumar_apuntes() {
    
    apuntes_recogidos += 1
    info.changeScoreBy(1)
    objetivo_apuntes_ronda += -1
    if (objetivo_apuntes_ronda == 0) {
        ronda += 1
        music.playSoundEffect(music.createSoundEffect(WaveShape.Triangle, 1, 1500, 255, 0, 400, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
        if (ronda == 2) {
            game.splash("SEGONA ENXAMPADA.")
            generar_apuntes()
            iniciar_ronda()
        } else if (ronda == 3) {
            game.splash("ENXAMPADA FINAL.")
            generar_apuntes()
            iniciar_ronda()
        } else if (ronda == 4) {
            final_escape_patio()
        }
        
    }
    
}

function final_escape_patio() {
    music.stopAllSounds()
    controller.moveSprite(alumno2, 0, 0)
    parar_profesores()
    scene.cameraShake(4, 500)
    music.playSoundEffect(music.createSoundEffect(WaveShape.Sine, 1, 2000, 255, 0, 1000, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.InBackground)
    pause(500)
    scene.setBackgroundImage(assets.image`patio`)
    game.showLongText(`
            ¡HO HAS ACONSEGUIT!
            ¡Corre, corre que t'enxampen!
            ¡Sortint de La Salle a corre-cuita!
            `, DialogLayout.Bottom)
    game.gameOver(true)
}

controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    animation.runImageAnimation(alumno2, assets.animation`myAnim`, 200, false)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(alumno2, assets.animation`myAnim2`, 200, false)
})
function crear_tercer_profesor() {
    
    tercer_profesor = sprites.create(assets.image`fran`, SpriteKind.Enemy)
    tercer_profesor.setImage(assets.image`fran`)
    tiles.placeOnTile(tercer_profesor, tiles.getTileLocation(10, 10))
    spawn_tercer_profesor = tercer_profesor.tilemapLocation()
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    animation.runImageAnimation(alumno2, assets.animation`myAnim3`, 200, false)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    if (mini_mapa_abierto == false) {
        mini_mapa = minimap.minimap(MinimapScale.Quarter, 2, 15)
        ventana_mini_mapa = sprites.create(minimap.getImage(mini_mapa), SpriteKind.Mapa)
        ventana_mini_mapa.setPosition(75, 55)
        mini_mapa_abierto = true
        ventana_mini_mapa.z = 7
        controller.moveSprite(alumno2, 0, 0)
        parar_profesores()
    } else {
        sprites.destroy(ventana_mini_mapa)
        mini_mapa_abierto = false
        controller.moveSprite(alumno2, 100, 100)
        reanudar_profesores()
    }
    
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function on_b_pressed() {
    game.splash("Apuntes a recoger: " + ("" + ("" + objetivo_apuntes_ronda)))
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`miMosaico10`, function on_overlap_tile(sprite: Sprite, location: tiles.Location) {
    if (location.column == 0) {
        tiles.placeOnTile(alumno2, tiles.getTileLocation(18, 15))
    } else {
        tiles.placeOnTile(alumno2, tiles.getTileLocation(1, 7))
    }
    
})
info.onCountdownEnd(function on_countdown_end() {
    
    reinciando = false
    controller.moveSprite(alumno2, 100, 100)
    reanudar_profesores()
})
function vida_menos() {
    
    reinciando = true
    music.playSoundEffect(music.createSoundEffect(WaveShape.Noise, 500, 1, 255, 0, 400, SoundExpressionEffect.None, InterpolationCurve.Linear), SoundExpressionPlayMode.UntilDone)
    controller.moveSprite(alumno2, 0, 0)
    tiles.placeOnTile(primer_profesor, tiles.getTileLocation(8, 10))
    tiles.placeOnTile(segundo_profesor, tiles.getTileLocation(9, 10))
    tiles.placeOnTile(tercer_profesor, tiles.getTileLocation(10, 10))
    tiles.placeOnTile(alumno2, tiles.getTileLocation(8, 3))
    info.changeLifeBy(-1)
    if (info.life() == 0) {
        game.gameOver(false)
    } else {
        game.splash("T'HAN ENXAMPAT COPIANT...")
        info.startCountdown(3)
    }
    
}

controller.up.onEvent(ControllerButtonEvent.Pressed, function on_up_pressed() {
    animation.runImageAnimation(alumno2, assets.animation`myAnim0`, 200, false)
})
function perseguir(profesor: Sprite, alumno: Sprite, vel: number) {
    profesor.follow(alumno, vel)
}

function crear_alumno() {
    
    alumno2 = sprites.create(assets.image`nena-front`, SpriteKind.Player)
    alumno2.z = 6
    tiles.placeOnTile(alumno2, tiles.getTileLocation(8, 3))
    controller.moveSprite(alumno2, 100, 100)
    scene.cameraFollowSprite(alumno2)
}

function iniciar_ronda() {
    
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    info.setScore(0)
    apuntes_recogidos = 0
    generar_apuntes()
    crear_alumno()
    crear_primer_profesor()
    crear_segundo_profesor()
    crear_tercer_profesor()
}

function comenzar_juego() {
    scene.setBackgroundImage(assets.image`frontsalle`)
    info.setScore(0)
    info.setLife(3)
    tiles.setCurrentTilemap(tilemap`nivel1`)
    iniciar_ronda()
    game.splash("PRIMERA ENXAMPADA.")
}

sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function on_on_overlap2(sprite3: Sprite, otherSprite2: Sprite) {
    if (reinciando == false) {
        vida_menos()
    }
    
})
function iniciar_intro() {
    scene.setBackgroundImage(assets.image`logo`)
    game.showLongText(`
            L'enxampada de La Salle
            Prem 'A'
            `, DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`timer`)
    music.playSoundEffect(music.createSoundEffect(WaveShape.Triangle, 1600, 1600, 255, 0, 200, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.UntilDone)
    game.showLongText(`
            Són les 8 del matí.
            Avui tens l'examen més important del curs.
            `, DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`cama`)
    game.showLongText(`
            T'aixeques del llit amb nervis però decidit.
            No pots fallar avui.
            `, DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`front`)
    game.showLongText(`
            Arribes a La Salle i respires profundament...
            Això ya comença.
            `, DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`pasillosalle`)
    game.showLongText(`
            Camines pel passadís en silenci cap a l'aula.
            La tensió es nota a l'aire.
            `, DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`salle`)
    game.showLongText(`
            Ja ets a la classe. L'examen està a punt de començar.
            Treu les xuletes i que no t'enxampin!
            `, DialogLayout.Bottom)
    comenzar_juego()
}

let reinciando = false
let ventana_mini_mapa : Sprite = null
let mini_mapa : minimap.Minimap = null
let mini_mapa_abierto = false
let spawn_tercer_profesor : tiles.Location = null
let spawn_segundo_profesor : tiles.Location = null
let spawn_primer_profesor : tiles.Location = null
let objetivo_apuntes_ronda = 0
let apunte : Sprite = null
let probabilidad_spawn_paginas = 0
let apuntes_recogidos = 0
let total_apuntes = 0
let alumno2 : Sprite = null
let tercer_profesor : Sprite = null
let segundo_profesor : Sprite = null
let primer_profesor : Sprite = null
let ronda = 0
let frontsalle_intro : Image = null
let spawn_alumno = null
ronda = 1
iniciar_intro()
game.onUpdate(function on_on_update() {
    if (mini_mapa_abierto == true) {
        ventana_mini_mapa.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
    }
    
})
game.onUpdateInterval(100, function on_update_interval() {
    if (mini_mapa_abierto == true) {
        for (let paginas_apuntes of sprites.allOfKind(SpriteKind.Apuntes)) {
            minimap.includeSprite(mini_mapa, paginas_apuntes, MinimapSpriteScale.Double)
        }
        minimap.includeSprite(mini_mapa, alumno2, MinimapSpriteScale.Double)
        if (primer_profesor) {
            minimap.includeSprite(mini_mapa, primer_profesor, MinimapSpriteScale.Double)
        }
        
        if (segundo_profesor) {
            minimap.includeSprite(mini_mapa, segundo_profesor, MinimapSpriteScale.Double)
        }
        
        if (tercer_profesor) {
            minimap.includeSprite(mini_mapa, tercer_profesor, MinimapSpriteScale.Double)
        }
        
    }
    
})
game.onUpdateInterval(100, function on_update_interval2() {
    if (mini_mapa_abierto == false && reinciando == false) {
        reanudar_profesores()
    } else {
        parar_profesores()
    }
    
})
