namespace SpriteKind {
    export const Mapa = SpriteKind.create()
    export const Apuntes = SpriteKind.create()
    export const Info = SpriteKind.create()
}

sprites.onOverlap(SpriteKind.Player, SpriteKind.Apuntes, function on_on_overlap(sprite2: Sprite, otherSprite: Sprite) {
    sprites.destroy(otherSprite)
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
    
    for (let posicion of tiles.getTilesByType(assets.tile`
        miMosaico9
        `)) {
        if (randint(0, 99) < probabilidad_spawn_paginas) {
            apunte = sprites.create(assets.image`
                miImagen1
                `, SpriteKind.Apuntes)
            tiles.placeOnTile(apunte, posicion)
            total_apuntes += 1
        }
        
    }
    objetivo_apuntes_ronda = total_apuntes
}

function crear_primer_profesor() {
    
    primer_profesor = sprites.create(assets.image`
        sis
        `, SpriteKind.Enemy)
    primer_profesor.setImage(assets.image`
        sis
        `)
    tiles.placeOnTile(primer_profesor, tiles.getTileLocation(8, 10))
    spawn_primer_profesor = primer_profesor.tilemapLocation()
}

function crear_segundo_profesor() {
    
    segundo_profesor = sprites.create(assets.image`
        rai
        `, SpriteKind.Enemy)
    segundo_profesor.setImage(assets.image`
        rai
        `)
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
    controller.moveSprite(alumno2, 0, 0)
    parar_profesores()
    scene.cameraShake(4, 500)
    pause(500)
    scene.setBackgroundImage(assets.image`
        patio
        `)
    game.showLongText(`
            ¡LO HAS CONSEGUIDO!
            ¡Corre, corre que me pillan!
            ¡Saliendo de La Salle a toda prisa!
            `, DialogLayout.Bottom)
    game.gameOver(true)
}

controller.down.onEvent(ControllerButtonEvent.Pressed, function on_down_pressed() {
    animation.runImageAnimation(alumno2, assets.animation`
            myAnim
            `, 200, false)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function on_right_pressed() {
    animation.runImageAnimation(alumno2, assets.animation`
            myAnim2
            `, 200, false)
})
function crear_tercer_profesor() {
    
    tercer_profesor = sprites.create(assets.image`
        fran
        `, SpriteKind.Enemy)
    tercer_profesor.setImage(assets.image`
        fran
        `)
    tiles.placeOnTile(tercer_profesor, tiles.getTileLocation(10, 10))
    spawn_tercer_profesor = tercer_profesor.tilemapLocation()
}

controller.left.onEvent(ControllerButtonEvent.Pressed, function on_left_pressed() {
    animation.runImageAnimation(alumno2, assets.animation`
            myAnim3
            `, 200, false)
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
scene.onOverlapTile(SpriteKind.Player, assets.tile`
        miMosaico10
        `, function on_overlap_tile(sprite: Sprite, location: tiles.Location) {
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
    animation.runImageAnimation(alumno2, assets.animation`
            myAnim0
            `, 200, false)
})
function perseguir(profesor: Sprite, alumno: Sprite, vel: number) {
    profesor.follow(alumno, vel)
}

function crear_alumno() {
    
    alumno2 = sprites.create(assets.image`
        nena-front
        `, SpriteKind.Player)
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
    scene.setBackgroundImage(assets.image`
        frontsalle
        `)
    info.setScore(0)
    info.setLife(3)
    tiles.setCurrentTilemap(tilemap`
        nivel1
        `)
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
            Això ja comença.
            `, DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`pasillosalle`)
    game.showLongText(`
            Camines pel passadís en silenci cap a l'aula.
            La tensió es nota a l'aire.
            `, DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`salle`)
    game.showLongText(`
            Ja ets a la classe. L'examen està a punt de començar.
            Treu les xules i que no t'enxampin!
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
frontsalle_intro = img`
    cfcccccccccccdbbbccbccbccbc6c9cccccccccccccdddd1dddddbbccbbd996666666666666666666666888ccdddddddd1d1111111ddddddddbdddddbb6666666668cbbdd1bbbcfcbbbd996bdbbcccc..
    cccccccccccc61cbcccccc6cbccbc1bccc6cccccbcbbd111ddbddddddbcccddd9966666666666666666666886bddddd1ddd11d11111d1ddddbddddddbccb666666668cbbd1dcbbccbbbd9bc66bcccfc..
    ccccccccccccbdcbcccccccccc6bbdbbbbbb6666ccdb11d11dcddddddddddbcccddd996666666666666666686ddddddd1d1111d1d1d1b1d1ddbddddddddbcb66666686bbd1dbbbccbbb1bbc96cbbccc..
    ccccccccccccdbbbccccccccccccdb6666cbbbbbbc1d11111dbddddddbddddddbbeccd1966666666666666688dddddd8cbd1d1d11ddd1d1dddddddddd1dddbcb666686bbdbdddbcbbbbdbec69ccdccb..
    ccccccccccccdbbbccccccccccccdb66666b6bbcbb1d111111dd11ddbdd1dddddd4ddbcbcd196666666666688dddddd8888cdd1d1d1dddddddddddddb1111ddbcb6688bbdb6cdbbbbbbdbeecbbbdbbb..
    ccccccccccc6bbbcccccccccccccdb666b6666666b1d11111d1bb11d111ddddddddbdddddbccbd99666666688dddddd886688ccdd1b1bdddddddddddd11111dddbcb68bbdd966cbbbbbbbbccbcbbb6b..
    cccccccccccbdcbccccccccccccc1b6666b66666661111111bddbddd111bd1ddddbd1ddd111ddbcbbd9666668dddddd666666688ccdd1d1ddbdbdddddd1111111ddbccbbbdb9666cbbbbdbbfccbbb66..
    cccccccccccddcbcccccccccccc6db6666b6b666661111111bdbbdddd1ddd1dddddbdddd11d1d11ddbcbbd966dddddd666666666688cbdddddbddddddd111111111ddbcbbbdd999666bbbdbbccccbbcc.
    cccccccccccdbbbccccccccccccddb6666666b666b1111111bddbd11dddddd1ddddddbdd1d11d1dd111ddbcbbdd1111dd666666666666888cbdd1bdddddd111111111bbcbbbdb6696668cbddccccccccc
    cccccccccccdcbbccccccccccccdbb6666b66b666bd111111bddd1dddbbbbddddddddddb1111ddddd1111ddbbb1111166666666666666688ccbddddddd111111111cbbbbbdbbb999666bbdccfcfcccf..
    cccbbccccccdcbcccccccccccc6db66666bb666661d111111ddbddddddbbcddddddbdddb11111111d11111d1db11111d66666666666666668888bbdddb111111111bcbbbbbbcebb9666ccbccffccccf..
    9999bcccbbbbcbcccccccccccc6db666b66b666661d11111ddddddd1ddccbdddddddbbdb1111bbbd11dddd11db11111dcbd966666666666668888bbddb111111111dbcbbbbdcccebb96bccccfccfcff..
    bbb9ddddddbcccbbbcccccccccc1b666b66b666661d11111ddbbbbddddddbdddbddddddd11111bdbb11dd1dddb11111bcdccbd9666666666668886bdddb1d111d11dbbcbbbdbcfcccb6bccc68fccccc..
    bbb99ddddddddddbbcccbbb6cc6db6b66b66666661d11111dccccbddddddddddddb1dddb111ddd1dd11d1111db11111bcccccbccdd666666666886dbdddccd11111dcbbbbbdbbccfcccccbb6cffcccc..
    bbbbbbdddddddddddd1dddbbbcbbbb6666666666b1111111dccccccccccddddddddddddbd1d11ddbbdbddd1d1b11111dbccccbccbccbd966666888ddddd688cbd1d1dcbbbbdbdbccfffcbcd6cfcfccc..
    bbbbbbbddddddddddd1111111dbdbcbbcbbbb666b1111111dcccfcccccccbbccbddddddbddbd9dddd1ddd1dd1b11111dbbbccbcccccbbcbb666888ddddd66688ccbdbbcbbbbb1dcbcfccbcbbccfccfc..
    bbbbbbbddddddddddd1111111d111dbbbbbbbbbbb1111111dccccfcfccfcbcccccccbbdbddd1ddddd111ddb1dd11111dbbbbbbbccccdcccccbb668bdddd66668668ccbbbbbbbd1cccccbccbcccf6ccc..
    bbbbbbbbbbddddddddd1d1111d11d66bcbddbbdbdd111111bbbcccccfcccdccccccccccdbbddbdd111d1dd111d111111cbbbbdbbbbcdcccccbcccbbdddcccc66666888ccbbbdd1bcccbbbbbbccfccbb..
    fccccbbbbbbbddddddddddd111dd6cdddb66cc6ddbddd1ddbcbbbbcbccccdccccccccccdcccccbdd11d111dd1d111111cccbbdbbbbbbbccccdcccccdddc6c66666688888cbbbb1dcbccbbbbdccfcfbb..
    fffffffccccbbbbddddddddddddd6bdddd6dddb6b6ddddbbdddbcccccddcdbbbcccccccdccccccccbdddd1111bd11111cccdcbbcbbbbbbbbcbcccccdddcdcc6666666888cbcbbddcbcccbbbbcccfccc..
    fffffffffcccccccccbdddddddddd6bbbd6dcdd6b6bdddbbddbcbdddddccbbcbdbbbccbdcccfcccccdccbccd1b1d1111bbbbcbccccbdbbbbbbbccccdddbbefbb66666688cbbdb6cbcccbbbbdbbcfcbb..
    ffffffffffffffcccccccccccbbbdbcccdd6bb6bbbbdcdbbddbdddd6bcbdbdddbbbccbdbcccccccccdccccccccdd1111bcbbcdbcccbcbccbbbbccccdddbbcfccccc666888bbdb668cbcbbbbbbccfcbb..
    fffffffffffffffccccccccccccccccccbdbbbbdbbbbddbbddbccbbdddddbddddddddddbbccbbccbbdccccccccdd1111cdcbcbccccdcbbbbbbbccccbddbccccccccccb688bbbbb66666cbcbbdcbfcbb..
    ffffffffffffffffffccfcccccccccccccccccccbbbbddbbbb6dddbddb6d6ddddddbddddddbbbccbcbbccccccbdd1111bccbbbcccbdcbbbbbbcccbcbdddcbccccccccccccccccc6666668ccbdbbcfbb..
    ffffffffffffffffffffffffccccccccccccccccccccbbbbbbbbbbbbbbcd6ddddddbdddd6dddddddbbbccccbbbdd1111bccbdbbccbdcdcccbcbccbcbdddcdccbbbbcccccccbbbc66666668ccdbbcfbb..
    fffffffffffffffffffffffffcccccccccccccccccccccccccccbbbbbbddcddddddbbdd6bbddddddbbbdbbccbcdd1d11dcccbcbcbbdcdcccdcbccbccdbdcbcbbbdbbbccffcbbbcb6666668ccdbbbccb..
    fffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccbbbbdddcbbb666ddddddb9cbbbdbdbbdddd1dcccbcbcbbbcdcccbcdccbcbddbdbbcbbddbbbccccbbbbcbbb6666ccbb66ccb..
    ffffffffffffffffffffffffffccffcccccfcccccccccccccccccccccccccccccccbbbbdbbbbbbddbb6d6bdbdbbbbcbddbcbdbbcbcbcbcccbcbccbcbdbbdcbcdbd1dbbbccbbbbbcccebbb6ccbd696c8..
    ffffffffffffffffffffffffffcffffffcccccccccccccccccccccccccccecccccccccccccbdbbbbb66b6bbbbb6bbbbddddb6ddccbcccccccbccccccddbccbcdbdc11cccbcbcbbbccccccbbccb996c6..
    ffffffffffffffffffffffffffffffffffffcfccccccccccccccccccccccccccccecccccccbbcccccbbbbbcbbbbbbbbddddddbbcbbddbcbccbccccccbbbfcbcdbdbddcccbcbbbbcdddbccfcccdd99c6..
    fffffffffffffffffffffffffffffffffffffcccccccccccccccccccccccccccccccccccecccccccccccccccbbbccbbbdddbbcbbbbbbbcbbddcbccccbbbfcdccbbbd1bccbcbbbbcbddddcccccbbbbcc..
    fffffffffffffffffffffffffffffffffffffffccccccccccccccccccccccccccccccccceccccccccccccccccccccccbddbcbbbbbbccdbbcdddddbdbcbbccdbcdbbbdbccccbbcbbdddbbbccccbbcbbc..
    ffffffccfffccfccfccccffcccffffffffffffccccccccccccffffccccccccccccccccccccccccccccccccccccccccccccccccbbbbbcbbb6bddddddddddcbdcb1cbddbccccbbbbbbbdcbcccbcbdbbcf..
    fffffffffffccfccfccccfccfffccccfffffffccbbbbbbcffffffffffffcfffcccccccccccccccccccccccccccccccccccccccccccbbcbbccbbbbbbbddddddddbbdbddcccbbbbbbbd1cdcbccbcbbbbc..
    fffffffffffccfccfccccfccfffcccccccccfccbbbcbbbcfffffffffffffffffffffffffcccccfcccccccccccffccccccccccfccccccccccbbbbbbbbbddddbbbbbbbbbbdcbbbbcbcbdcbcccbccbbbbc..
    fffffffffffcffccfccccfccfccccccccccccccbbbbbbbcfffffffffffffffffffffffffcffffffffffccffffffccccccccccfccffcffccccccccccbbbbbbbbbbbbbbbbbbbbbbbdcddcccccbcbcbcc8..
    ffffffffccfccfcfccccccccfcccfcccccccccccbbbbbbcffffffffffffffffffffffffffffffffffffffffffffccccccccccfcccfcffcfffffffcccccccccbbbbbbbbbbbbbbdddbbdccccccccccc88..
    fffffffccffffcccccfcccccccccfcccccccccccbbbbbbcffffffffffffffffffffffffffffffffffffffffffffccccccccccfcccffffffffffffffcccccccffffcccbbbbbbbbbbbbbbccfffffcdb88..
    ffffffccfffffcbdcccccccccccccccccccccbcbbbbbbcffffcffffffccfffccffffffffffffffffffffffffffffccccccccccfccffffffffffffffffffffccffffffffcccccbbbccfffffffffffcc88.
    fccccccccfffffcccddccccccccccccccfccccbbbbbbbbcffcfcccccffccfcccccfffffffffffffffffffffffffcccccccfccfcccffffffffffffffffffcccfffcccccccfcccffccfffffcccffcff88..
    ccccccccccccccccccbbcccccffffcfccfcccfbbbbbbbbcffcfcccccffccccccccccffccfcfffffffffffffffffcccccccffffcffffffffffffffffffffffcffccccccfcfcccccccfccfcfcfcccccc8..
    ccccccceccccccccccbcbbbbeebbbbbbecccccbbbbbbbbcfccccccccccbbcccccccccfccfcfffccffcfffffffffccccbbccccfffccfffffffffffffffffcfffffccccc666ccffffffcfccccccccccc8..
    ffffffbbecccccccceebbbbbbeebbbbbbbbbbbbbbbbbbbcfcccbccccccbbcccccccfcfccfcfffccfccfffffffffccbbbcccccfccccccfccfffffffffcccccccfcbcccffffffffffffccccccccccccc6..
    ffcffcbbcffeffcccbcecbbbbffeebbbbbeeebbbbbbbbbcfccccccccccbbcccccccccfccfcfffccfccfffffffffccbbbbcfffffcccccfccccfffffffcccccccffffffffffffffffffccccccccccccc6..
    ffbffebbcffcffccccceccbbbccbfceccccfcbbbbbbbbbcfcffccccccccbcfcccccccfccfcfccccfccfffffffffccbbbbbcccfccccccfcffffffffffccccbccffffffffffffffffffccccccccccccc8..
    cccffebbcfffffcfcfccccebeffcffcfcccccbbbbbbbbbcbbbccffccccccccccccffcfccfcfcfccfccffcffffffccbbbbbcccccccfffcfffffffffffcccccccffffffffffffffffcffccccccccccccc..
    cccccebbcffffcffcffeccebeffffcffcffcfcbbbbbbbbcbbcccccbbbbbbbbbbbbbbbbcccffccccccccffffffffccbbbbbccccccffffffffffffccffccccccccffffffffffffffffcfccccccccccccc..
    cccccebeffcffcffcffbfcbbcffffcffcfcccbbbbbbbbbcbbbbbbbbbbbbbbbcbbbbbeebbcccbbbbbbbccccbbbbcccbbbbbfffccccfccfcfffffcfcffccccccccffffffffffffffffccccccccccccfcc..
    cccccbbccfbffcffcffbfcbbcffffcfcbbccfbbbbbbbbbcbbbbbbbeccbbbbbbbbbbecbcbbbceeeeeebbcbbbbbcbccbbbbbcccfcbccbbbbebbcffffffccccccccffffffffffffffffcfccccccccccfcc..
    fcffcbbcccbffcffcffcfcbbcffffcffcfcccbbbbbbbbcbbbbbebbebbbbbccbbcccbbcbbbbbeeeeeebebbbbbbbcccbbbbbccbfbbbbbbbccccffcffffccccccccffffffffffffffffffccccccccfcccc..
    fcffcbbccccfccffcffcfcbbcffffccccccffbbbbbbbbcbbddceebbbbebbccbbbbdbccbdbbbeeeeeebebbbbbcbbccbbbbbcccfcbcccccbfeccccccccccccccccfffffffffffffffffcfcccccccccccc..
    fcffcbbfcccccccccfcfccbbffcfcceccceedbbbbbbbbcbbdddbbbdbbdddddbdbbebbcbbbcfeeeeeeebbdbbbcbbbbbbbbbcccfbdcbbcbbfbecccccccccccccccfffffffffffffffffcfcccccccccccc..
    cfffcbcccccccffcfccccbbbcfcfbbeecbbdbbbbbbbbbbbbdbdbbcbdddbdddbbddbdbbbbbcbeeeeeeeddbbbbebbbbbbbbbccccbbcbccccfbcccfccccccccccccfffffffffffffffffffcfcfccccccfc..
    cfcfcbcfcccccffccecfccbeeccefccebbebbebbbbbddbbdbcbcdebbbdbdbbbbbbdbdbddbbbeeeeeeddddddddbbbbbbbbbcccccccbbbcbfbccccfcccccccbbcbcffffffffffffffffffcfcfccccccfc..
    cfccbbcccccccfccfcbeeebecfcffcccbcceeebbdbdddbbcbcbddcdbbdbdbbbbdedddbddbcceeeeebddddddcbddbbbbbbbbccccbcecccbccbcccfccccbbbbbbbcfffffffffffffffffffffcccccfccc..
    cffbbbcccccfccbccebeeebeffffcffceffeebdddddddbbcdc6cddddddddddddddddbddbccceebeebddddb6bbdddbbbbbbbccccceebbbbccccccfccccbbbbbbbcffffffffffffffffffffccfcfccccf..
    cffbbbfccccfceccccccbbbcccffcffceeeebbdddddddbbcddbddddddbbdeedddddd66dbcccbbeeebdbcbdbbbbbdbbbbbbcccccffffffcfcfffcffccccbbbbbbcffffffffffffffffffcffccccccccf..
    ccccbbccccccceccbbcbbbbcfcffbfccbdb1bbbddddddbcbb6ddbbbbddbbeedbbbedd666cccbeeeebdbcbdbbbbbdbbbbbbcfcccccccceefffbfcffccccbbbbbbbfffffffffffffffffffcfcfcfccccf..
    cccccccccccccccccbbbbccfffffcccb9b111bdddddddbbbbcbdebbbdbbeeebbbdbdddbdccceeeeeedbeeddbbbbfbbbbbbcccccffffffffffcffffccccbbbbbbbfffffffffffffffffffcfcfcfccfcf..
    ccccccbbbbbbbbbbbbbbbccffcffcfc9dc11dbbddddddcbdbbdddbdbdddddddddddd66d9ccceeeeeebc8cedbdccfbbbbbbccccccfffffffccfcfcfccccbbbbbbbfffffffffffffffffffffcfccfcfcf..
    ccccccbbbbbbbbbbbbbbcccffcffcfc9dbddddbddddddcbbbcdddbdddddddddddddddddbeebcbeeeedbcceddbccfbbbbbbcffccffffffffccffccfccccbbbbbbbffffffffffffcffffffffcffcfcfcf..
    ccccccbbbbbbcbbbbbbbcccffbffccbdbebbbbeddddddbbb8ddddbddddedbbbdbbddd66b2ecbceeeebc88cddbcffbbbbbbbcfccffffffffcccfccffcfcbbbbbbbcfffffffffffffffffffffffcfcfcf..
    cccccccccccccbbbbbbbbccffcffccbbdebbbedddddbbbcc6dbddbbbddddbbedeedddddd22ebbbbbbbcccbb6bfffbbbbbbbcfccffffffffcebeccffcfcbbbbbbbcfffffffffffffffffffffffffffff..
    fccccfccfcffffcffccccccffcffccbbdceeebdddddbbccc6cddddddddddddeddddddddd22ebbbbbcbccc666fffcbbbbbbbccccfffffffffffcccffcccbbbbbbbccffffffcfcccfffffffffffffffff..
    ffcccffcffffffcffccfcccfffffccbbdbeebbbbdddbbcccc6ddddddddddbbbddddddddb22ebbbcbbbcbc666cfcebbbbbbbcccccfffffffffffcccccccbbbbbbbcffffffffffcffcfffffffcfcfffff..
    fcccfffcffffffffcfcfcccfcffcfcbbdbdb1bdbbddbbccccbddddbbbbddbbddddb6d666e2ebbbbbbbcbcc6bccccbbbbbbbcccccfffffffffffccccfccbbbbbbbcfffffffcfffffffffffffffcccccc..
    fcccfffffffffcffcffcccffcffcccbbbb1bddddbddbcccccc6dddbbbbbdbbdddd66666b22ecbceeebbbcc66ccecbbbbbbbcccccffffffffcfffffffffccfcccccffffffffffffffffffffffffffcff..
    fcccfffcffcffcffcffcccffcffbccbddbdbbdbdbbdbcccccc66bdddbddddddd6666666ceeeebeeeeeceb8bcccefbbbbbbbcccccffffffffccfcfffffffffccccccccccfffffccfcfffffffffffffff..
    fcccffffffcffcfffffcccfffffbfcbdbbbbbbbebbbbcfccccc6666dbdd666666666bcccffcebeeeeebe8cccceeccbbbbbbcfffffffccccccccffffffffffffccccccccccccccccccccffffffffffff..
    fcccffffffcfffffcffcccffcffcfcbceeeeeeccbbbbcfccccc666666bb6bb6666ccccffffffffcccebecccccecfccbbbbbffffffffffffcccffffffffccccccccccccccccccccccccccccccccccfff..
    ccccfccccccccccccccccbbbbbdbbbcffffffebbbbdbcfcccfccccb66bbbebcccccecfffffffffffccccccccefffccbbbbcfffcccccccccfcffcccccccccccccccccccccccccccccccccccccccccccc..
    cccccccccccccccccccccbbbbbbbbbeeecceebddbddbcffffffeeeecceeececccccffffffffffffffcccccfeccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc..
    cccccccccccccccccccccbbbbbbbbbceeeeeebdddddbcfffffffceeeccceeeecccfffffffffffffffccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbcccccccccccccccccccc..
    cccccccccccccccccccccbbcbbbbbbbeeeeeebddddbbcffffffffccccccccceeeecffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbcccccccccccccccccccccccccc..
    cccccccccccccccccccccbbbbbbbbbbeceeeebddddbbcfccccffffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbcccccccccccccccccccccccc..
    cccccccccccccccccccccbbbbbbbbbbeeeeeebdddbbbffffffffcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbcbbbbbccccccccccccccccccccccc..
    cfcccccccccccccfffcccbbbbbbbbbeeeceeebbbddbbffccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbccccccccccccccccccc..
    ffffffffcccccccccccccccbbbcccceecfeeebbbcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbcccccccccccccccccc..
    cfcccccccccccccccccccffffccccceefee4eccccccccccccccccccccccccccccccccccccccccccccccccccbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbcccccccccccccccccccccccccc..
    cccccccffffccccccccccccccccccceccebeecccccccccccccccccccccccccccccccccccccccccccbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccc..
    fffccccccccccccccccccccccccccceeceeeecccccccccccccccccccccccccccccccccbbcbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccc..
    ccccccccccccccccccccccccccccceecebeecccccccccccccccccccccccccccbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccc..
    fcccccccccccccccccccccccccccceeceeeecccccccccccccccccccbbcbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbcbcccccccccccccccccccccc..
    cccccccccccccccccccccccccccccecceeeeccccccccccccccccccbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbcccccccccccccccccccccccccccc..
    cccccccccccccccccccccccccccccecceeeccccccccccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccccccccccccccccccccccccccccccc..
    cccccccccccccccccccccccccccccecceeeccccccccccccccbbbbbbbbbbbbbbbcbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccccccccccccccccccccccccccc..
    ccccccccccccccccccccccccccccceeeeeecccccccccccccbbbcbbbbbbbcbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbccbccccccccccccccccccccccccc..
    ccccccccccccccccccccccccccccccfceecccccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccccbcbbbbbbbcccccccccc..
    ccccccccccccccccccccccccccccceeceecccccccbbbbbbbbcbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcbbbbbbbbbbbccbbbbbccccccccc..
    ccccccccccccccccccccccccccccceccbbccccccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbccbbbbbbbbbbbbbbbbbbbccccccccccccc..
    `
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
