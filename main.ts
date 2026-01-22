namespace SpriteKind {
    export const Mapa = SpriteKind.create()
    export const Apuntes = SpriteKind.create()
    export const Info = SpriteKind.create()
}
/**
 * -------------------------
 */
/**
 * VARIABLES / ARRANQUE
 */
/**
 * -------------------------
 */
// -------------------------
// OVERLAPS (una sola vez)
// -------------------------
sprites.onOverlap(SpriteKind.Player, SpriteKind.Apuntes, function (sprite2, otherSprite) {
    sprites.destroy(otherSprite)
    sumar_apuntes()
})
function reanudar_profesores () {
    perseguir(primer_profesor, alumno2, 35)
    perseguir(segundo_profesor, alumno2, 30)
    perseguir(tercer_profesor, alumno2, 25)
}
// -------------------------
// APUNTES / RONDAS
// -------------------------
function generar_apuntes () {
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
function crear_primer_profesor () {
    primer_profesor = sprites.create(assets.image`sis`, SpriteKind.Enemy)
    primer_profesor.setImage(assets.image`sis`)
    tiles.placeOnTile(primer_profesor, tiles.getTileLocation(8, 10))
    spawn_primer_profesor = primer_profesor.tilemapLocation()
}
function crear_segundo_profesor () {
    segundo_profesor = sprites.create(assets.image`rai`, SpriteKind.Enemy)
    segundo_profesor.setImage(assets.image`rai`)
    tiles.placeOnTile(segundo_profesor, tiles.getTileLocation(9, 10))
    spawn_segundo_profesor = segundo_profesor.tilemapLocation()
}
function parar_profesores () {
    primer_profesor.follow(alumno2, 0)
    segundo_profesor.follow(alumno2, 0)
    tercer_profesor.follow(alumno2, 0)
}
function sumar_apuntes () {
    apuntes_recogidos += 1
    info.changeScoreBy(1)
    objetivo_apuntes_ronda += -1
    if (objetivo_apuntes_ronda == 0) {
        ronda += 1
        if (ronda == 2) {
            game.splash("SEGONA ENXAMPADA.")
        } else if (ronda == 3) {
            game.splash("ENXAMPADA FINAL.")
        } else if (ronda == 4) {
            game.gameOver(true)
        }
        generar_apuntes()
        iniciar_ronda()
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    alumno2,
    assets.animation`nena-animation-down`,
    500,
    false
    )
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    alumno2,
    assets.animation`nena-animation-right`,
    500,
    false
    )
})
function crear_tercer_profesor () {
    tercer_profesor = sprites.create(assets.image`fran`, SpriteKind.Enemy)
    tercer_profesor.setImage(assets.image`fran`)
    tiles.placeOnTile(tercer_profesor, tiles.getTileLocation(10, 10))
    spawn_tercer_profesor = tercer_profesor.tilemapLocation()
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    alumno2,
    assets.animation`nena-animation-left`,
    500,
    false
    )
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
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
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    game.splash("Apuntes a recoger: " + ("" + objetivo_apuntes_ronda))
})
// -------------------------
// TELETRANSPORTE (una sola)
// -------------------------
scene.onOverlapTile(SpriteKind.Player, assets.tile`miMosaico10`, function (sprite, location) {
    if (location.column == 0) {
        tiles.placeOnTile(alumno2, tiles.getTileLocation(18, 15))
    } else {
        tiles.placeOnTile(alumno2, tiles.getTileLocation(1, 7))
    }
})
info.onCountdownEnd(function () {
    reinciando = false
    controller.moveSprite(alumno2, 100, 100)
    reanudar_profesores()
})
// -------------------------
// VIDA
// -------------------------
function vida_menos () {
    reinciando = true
    controller.moveSprite(alumno2, 0, 0)
    tiles.placeOnTile(primer_profesor, tiles.getTileLocation(8, 10))
    spawn_primer_profesor = primer_profesor.tilemapLocation()
    tiles.placeOnTile(segundo_profesor, tiles.getTileLocation(9, 10))
    spawn_segundo_profesor = segundo_profesor.tilemapLocation()
    tiles.placeOnTile(tercer_profesor, tiles.getTileLocation(10, 10))
    spawn_tercer_profesor = tercer_profesor.tilemapLocation()
    tiles.placeOnTile(alumno2, tiles.getTileLocation(8, 3))
    spawn_alumno = alumno2.tilemapLocation()
    info.changeLifeBy(-1)
    if (info.life() == 0) {
        game.gameOver(false)
    } else {
        game.splash("T'HAN ENXAMPAT COPIANT...")
        info.startCountdown(3)
    }
}
// -------------------------
// CONTROLES / ANIMACIONES
// -------------------------
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    animation.runImageAnimation(
    alumno2,
    assets.animation`nena-animation-up`,
    500,
    false
    )
})
// -------------------------
// PROFESORES
// -------------------------
function perseguir (profesor: Sprite, alumno: Sprite, vel: number) {
    profesor.follow(alumno, vel)
}
// -------------------------
// CREACIÓN DE SPRITES
// -------------------------
function crear_alumno () {
    alumno2 = sprites.create(assets.image`nena-front`, SpriteKind.Player)
    alumno2.z = 6
    tiles.placeOnTile(alumno2, tiles.getTileLocation(8, 3))
    spawn_alumno = alumno2.tilemapLocation()
    controller.moveSprite(alumno2, 100, 100)
    scene.cameraFollowSprite(alumno2)
}
// -------------------------
// RONDA / REINICIO
// -------------------------
function iniciar_ronda () {
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
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite3, otherSprite2) {
    if (reinciando == false) {
        vida_menos()
    }
})
let spawn_alumno: tiles.Location = null
let ventana_mini_mapa: Sprite = null
let mini_mapa: minimap.Minimap = null
let spawn_tercer_profesor: tiles.Location = null
let spawn_segundo_profesor: tiles.Location = null
let spawn_primer_profesor: tiles.Location = null
let objetivo_apuntes_ronda = 0
let apunte: Sprite = null
let probabilidad_spawn_paginas = 0
let apuntes_recogidos = 0
let total_apuntes = 0
let tercer_profesor: Sprite = null
let segundo_profesor: Sprite = null
let alumno2: Sprite = null
let primer_profesor: Sprite = null
let mini_mapa_abierto = false
let ronda = 0
let reinciando = false
reinciando = false
info.setScore(0)
info.setLife(3)
tiles.setCurrentTilemap(tilemap`nivel1`)
ronda = 1
mini_mapa_abierto = false
iniciar_ronda()
game.splash("PRIMERA ENXAMPADA.")
game.onUpdate(function () {
    if (mini_mapa_abierto == true) {
        ventana_mini_mapa.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
    }
})
game.onUpdateInterval(100, function () {
    if (mini_mapa_abierto == true) {
        for (let paginas_apuntes of sprites.allOfKind(SpriteKind.Apuntes)) {
            minimap.includeSprite(mini_mapa, paginas_apuntes, MinimapSpriteScale.Double)
        }
        minimap.includeSprite(mini_mapa, alumno2, MinimapSpriteScale.Double)
        minimap.includeSprite(mini_mapa, primer_profesor, MinimapSpriteScale.Double)
        minimap.includeSprite(mini_mapa, segundo_profesor, MinimapSpriteScale.Double)
        minimap.includeSprite(mini_mapa, tercer_profesor, MinimapSpriteScale.Double)
        ventana_mini_mapa.z = 7
    }
})
game.onUpdateInterval(100, function () {
    if (mini_mapa_abierto == false && reinciando == false) {
        reanudar_profesores()
    } else {
        parar_profesores()
    }
})
