@namespace
class SpriteKind:
    Mapa = SpriteKind.create()
    Apuntes = SpriteKind.create()
    Info = SpriteKind.create()

def on_on_overlap(sprite2, otherSprite):
    sprites.destroy(otherSprite)
    sumar_apuntes()
sprites.on_overlap(SpriteKind.player, SpriteKind.Apuntes, on_on_overlap)

def reanudar_profesores():
    if primer_profesor and segundo_profesor and tercer_profesor:
        perseguir(primer_profesor, alumno2, 35)
        perseguir(segundo_profesor, alumno2, 30)
        perseguir(tercer_profesor, alumno2, 25)
def generar_apuntes():
    global total_apuntes, apuntes_recogidos, probabilidad_spawn_paginas, apunte, objetivo_apuntes_ronda
    sprites.destroy_all_sprites_of_kind(SpriteKind.Apuntes)
    total_apuntes = 0
    apuntes_recogidos = 0
    if ronda == 1:
        probabilidad_spawn_paginas = 25
    elif ronda == 2:
        probabilidad_spawn_paginas = 15
    else:
        probabilidad_spawn_paginas = 10
    for posicion in tiles.get_tiles_by_type(assets.tile("""
        miMosaico9
        """)):
        if randint(0, 99) < probabilidad_spawn_paginas:
            apunte = sprites.create(assets.image("""
                miImagen1
                """), SpriteKind.Apuntes)
            tiles.place_on_tile(apunte, posicion)
            total_apuntes += 1
    objetivo_apuntes_ronda = total_apuntes
def crear_primer_profesor():
    global primer_profesor, spawn_primer_profesor
    primer_profesor = sprites.create(assets.image("""
        sis
        """), SpriteKind.enemy)
    primer_profesor.set_image(assets.image("""
        sis
        """))
    tiles.place_on_tile(primer_profesor, tiles.get_tile_location(8, 10))
    spawn_primer_profesor = primer_profesor.tilemap_location()
def crear_segundo_profesor():
    global segundo_profesor, spawn_segundo_profesor
    segundo_profesor = sprites.create(assets.image("""
        rai
        """), SpriteKind.enemy)
    segundo_profesor.set_image(assets.image("""
        rai
        """))
    tiles.place_on_tile(segundo_profesor, tiles.get_tile_location(9, 10))
    spawn_segundo_profesor = segundo_profesor.tilemap_location()
def parar_profesores():
    if primer_profesor:
        primer_profesor.follow(alumno2, 0)
    if segundo_profesor:
        segundo_profesor.follow(alumno2, 0)
    if tercer_profesor:
        tercer_profesor.follow(alumno2, 0)
def sumar_apuntes():
    global apuntes_recogidos, objetivo_apuntes_ronda, ronda
    apuntes_recogidos += 1
    info.change_score_by(1)
    objetivo_apuntes_ronda += -1
    if objetivo_apuntes_ronda == 0:
        ronda += 1
        if ronda == 2:
            game.splash("SEGONA ENXAMPADA.")
        elif ronda == 3:
            game.splash("ENXAMPADA FINAL.")
        elif ronda == 4:
            game.game_over(True)
        generar_apuntes()
        iniciar_ronda()

def on_down_pressed():
    animation.run_image_animation(alumno2,
        assets.animation("""
            myAnim
            """),
        200,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_right_pressed():
    animation.run_image_animation(alumno2,
        assets.animation("""
            myAnim2
            """),
        200,
        False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def crear_tercer_profesor():
    global tercer_profesor, spawn_tercer_profesor
    tercer_profesor = sprites.create(assets.image("""
        fran
        """), SpriteKind.enemy)
    tercer_profesor.set_image(assets.image("""
        fran
        """))
    tiles.place_on_tile(tercer_profesor, tiles.get_tile_location(10, 10))
    spawn_tercer_profesor = tercer_profesor.tilemap_location()

def on_left_pressed():
    animation.run_image_animation(alumno2,
        assets.animation("""
            myAnim3
            """),
        200,
        False)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def on_a_pressed():
    global mini_mapa, ventana_mini_mapa, mini_mapa_abierto
    if mini_mapa_abierto == False:
        mini_mapa = minimap.minimap(MinimapScale.QUARTER, 2, 15)
        ventana_mini_mapa = sprites.create(minimap.get_image(mini_mapa), SpriteKind.Mapa)
        ventana_mini_mapa.set_position(75, 55)
        mini_mapa_abierto = True
        ventana_mini_mapa.z = 7
        controller.move_sprite(alumno2, 0, 0)
        parar_profesores()
    else:
        sprites.destroy(ventana_mini_mapa)
        mini_mapa_abierto = False
        controller.move_sprite(alumno2, 100, 100)
        reanudar_profesores()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_b_pressed():
    game.splash("Apuntes a recoger: " + ("" + str(objetivo_apuntes_ronda)))
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_overlap_tile(sprite, location):
    if location.column == 0:
        tiles.place_on_tile(alumno2, tiles.get_tile_location(18, 15))
    else:
        tiles.place_on_tile(alumno2, tiles.get_tile_location(1, 7))
scene.on_overlap_tile(SpriteKind.player,
    assets.tile("""
        miMosaico10
        """),
    on_overlap_tile)

def on_countdown_end():
    global reinciando
    reinciando = False
    controller.move_sprite(alumno2, 100, 100)
    reanudar_profesores()
info.on_countdown_end(on_countdown_end)

def vida_menos():
    global reinciando
    reinciando = True
    controller.move_sprite(alumno2, 0, 0)
    tiles.place_on_tile(primer_profesor, tiles.get_tile_location(8, 10))
    tiles.place_on_tile(segundo_profesor, tiles.get_tile_location(9, 10))
    tiles.place_on_tile(tercer_profesor, tiles.get_tile_location(10, 10))
    tiles.place_on_tile(alumno2, tiles.get_tile_location(8, 3))
    info.change_life_by(-1)
    if info.life() == 0:
        game.game_over(False)
    else:
        game.splash("T'HAN ENXAMPAT COPIANT...")
        info.start_countdown(3)

def on_up_pressed():
    animation.run_image_animation(alumno2,
        assets.animation("""
            myAnim0
            """),
        200,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def perseguir(profesor: Sprite, alumno: Sprite, vel: number):
    profesor.follow(alumno, vel)
def crear_alumno():
    global alumno2
    alumno2 = sprites.create(assets.image("""
        nena-front
        """), SpriteKind.player)
    alumno2.z = 6
    tiles.place_on_tile(alumno2, tiles.get_tile_location(8, 3))
    controller.move_sprite(alumno2, 100, 100)
    scene.camera_follow_sprite(alumno2)
def iniciar_ronda():
    global apuntes_recogidos
    sprites.destroy_all_sprites_of_kind(SpriteKind.player)
    sprites.destroy_all_sprites_of_kind(SpriteKind.enemy)
    info.set_score(0)
    apuntes_recogidos = 0
    generar_apuntes()
    crear_alumno()
    crear_primer_profesor()
    crear_segundo_profesor()
    crear_tercer_profesor()
def comenzar_juego():
    scene.set_background_image(assets.image("""
        frontsalle
        """))
    info.set_score(0)
    info.set_life(3)
    tiles.set_current_tilemap(tilemap("""
        nivel1
        """))
    iniciar_ronda()
    game.splash("PRIMERA ENXAMPADA.")

def on_on_overlap2(sprite3, otherSprite2):
    if reinciando == False:
        vida_menos()
sprites.on_overlap(SpriteKind.enemy, SpriteKind.player, on_on_overlap2)

def iniciar_intro():
    scene.set_background_image(frontsalle_intro)
    game.show_long_text("""
            L'enxampada de La Salle
            ¡Es hora de COPIAR!
            """,
        DialogLayout.BOTTOM)
    scene.set_background_image(assets.image("""
        pasillosalle
        """))
    game.show_long_text("""
            Caminas por el pasillo en silencio...
            Los nervios se sienten en el aire.
            """,
        DialogLayout.BOTTOM)
    scene.set_background_image(assets.image("""
        salle
        """))
    game.show_long_text("""
            Llegas a la clase. El examen va a empezar.
            ¡Saca las chuletas y que no te vean!
            """,
        DialogLayout.BOTTOM)
        
    comenzar_juego()
reinciando = False
ventana_mini_mapa: Sprite = None
mini_mapa: minimap.Minimap = None
mini_mapa_abierto = False
spawn_tercer_profesor: tiles.Location = None
spawn_segundo_profesor: tiles.Location = None
spawn_primer_profesor: tiles.Location = None
objetivo_apuntes_ronda = 0
apunte: Sprite = None
probabilidad_spawn_paginas = 0
apuntes_recogidos = 0
total_apuntes = 0
alumno2: Sprite = None
tercer_profesor: Sprite = None
segundo_profesor: Sprite = None
primer_profesor: Sprite = None
ronda = 0
frontsalle_intro: Image = None
spawn_alumno = None
frontsalle_intro = img("""
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
    """)
ronda = 1
iniciar_intro()

def on_on_update():
    if mini_mapa_abierto == True:
        ventana_mini_mapa.set_position(scene.camera_property(CameraProperty.X),
            scene.camera_property(CameraProperty.Y))
game.on_update(on_on_update)

def on_update_interval():
    if mini_mapa_abierto == True:
        for paginas_apuntes in sprites.all_of_kind(SpriteKind.Apuntes):
            minimap.include_sprite(mini_mapa, paginas_apuntes, MinimapSpriteScale.DOUBLE)
        minimap.include_sprite(mini_mapa, alumno2, MinimapSpriteScale.DOUBLE)
        if primer_profesor:
            minimap.include_sprite(mini_mapa, primer_profesor, MinimapSpriteScale.DOUBLE)
        if segundo_profesor:
            minimap.include_sprite(mini_mapa, segundo_profesor, MinimapSpriteScale.DOUBLE)
        if tercer_profesor:
            minimap.include_sprite(mini_mapa, tercer_profesor, MinimapSpriteScale.DOUBLE)
game.on_update_interval(100, on_update_interval)

def on_update_interval2():
    if mini_mapa_abierto == False and reinciando == False:
        reanudar_profesores()
    else:
        parar_profesores()
game.on_update_interval(100, on_update_interval2)
