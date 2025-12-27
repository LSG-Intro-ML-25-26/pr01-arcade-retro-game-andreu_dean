@namespace
class SpriteKind:
    Mapa = SpriteKind.create()
    Apuntes = SpriteKind.create()
    Info = SpriteKind.create()
#FUNCIÓN PARA VOLVER A HACER MOVER AL PROFESOR
def reanudar_profesores():
    perseguir(primer_profesor, alumno2, 35)
    perseguir(segundo_profesor, alumno2, 30)
    perseguir(tercer_profesor, alumno2, 25)
# FUNCION GENERAR APUNTES EN MAPA
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
#FUNCION PARA CREAR AL PRIMER PROFE
def crear_primer_profesor():
    global primer_profesor, spawn_primer_profesor
    primer_profesor = sprites.create(img("""
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            """),
        SpriteKind.enemy)
    primer_profesor.set_image(img("""
        ........................
        ........................
        ........................
        ........................
        ..........ffff..........
        ........ff1111ff........
        .......fb111111bf.......
        .......f11111111f.......
        ......fd11111111df......
        ......fd11111111df......
        ......fddd1111dddf......
        ......fbdbfddfbdbf......
        ......fcdcf11fcdcf......
        .......fb111111bf.......
        ......fffcdb1bdffff.....
        ....fc111cbfbfc111cf....
        ....f1b1b1ffff1b1b1f....
        ....fbfbffffffbfbfbf....
        .........ffffff.........
        ...........fff..........
        ........................
        ........................
        ........................
        ........................
        """))
    tiles.place_on_tile(primer_profesor, tiles.get_tile_location(8, 10))
    spawn_primer_profesor = primer_profesor.tilemap_location()
#FUNCION PARA CREAR AL SEGUNDO PROFE
def crear_segundo_profesor():
    global segundo_profesor, spawn_segundo_profesor
    segundo_profesor = sprites.create(img("""
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            """),
        SpriteKind.enemy)
    segundo_profesor.set_image(img("""
        . . . . . . f f f f . . . . . .
        . . . . f f f 2 2 f f f . . . .
        . . . f f f 2 2 2 2 f f f . . .
        . . f f f e e e e e e f f f . .
        . . f f e 2 2 2 2 2 2 e e f . .
        . . f e 2 f f f f f f 2 e f . .
        . . f f f f e e e e f f f f . .
        . f f e f b f 4 4 f b f e f f .
        . f e e 4 1 f d d f 1 4 e e f .
        . . f e e d d d d d d e e f . .
        . . . f e e 4 4 4 4 e e f . . .
        . . e 4 f 2 2 2 2 2 2 f 4 e . .
        . . 4 d f 2 2 2 2 2 2 f d 4 . .
        . . 4 4 f 4 4 5 5 4 4 f 4 4 . .
        . . . . . f f f f f f . . . . .
        . . . . . f f . . f f . . . . .
        """))
    tiles.place_on_tile(segundo_profesor, tiles.get_tile_location(9, 10))
    spawn_segundo_profesor = segundo_profesor.tilemap_location()
#FUNCIÓN PARA DEJAR DE MOVER A LOS PROFES
def parar_profesores():
    primer_profesor.follow(alumno2, 0)
    segundo_profesor.follow(alumno2, 0)
    tercer_profesor.follow(alumno2, 0)
# FUNCION SUMAR APUNTES A PUNTOS
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
            nena-animation-down
            """),
        500,
        False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_right_pressed():
    animation.run_image_animation(alumno2,
        assets.animation("""
            nena-animation-right
            """),
        500,
        False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

#FUNCIÓN PARA CREAR AL TERCER PROFE
def crear_tercer_profesor():
    global tercer_profesor, spawn_tercer_profesor
    tercer_profesor = sprites.create(img("""
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            """),
        SpriteKind.enemy)
    tercer_profesor.set_image(img("""
        . . . . . f f 4 4 f f . . . . .
        . . . . f 5 4 5 5 4 5 f . . . .
        . . . f e 4 5 5 5 5 4 e f . . .
        . . f b 3 e 4 4 4 4 e 3 b f . .
        . . f 3 3 3 3 3 3 3 3 3 3 f . .
        . f 3 3 e b 3 e e 3 b e 3 3 f .
        . f 3 3 f f e e e e f f 3 3 f .
        . f b b f b f e e f b f b b f .
        . f b b e 1 f 4 4 f 1 e b b f .
        f f b b f 4 4 4 4 4 4 f b b f f
        f b b f f f e e e e f f f b b f
        . f e e f b d d d d b f e e f .
        . . e 4 c d d d d d d c 4 e . .
        . . e f b d b d b d b b f e . .
        . . . f f 1 d 1 d 1 d f f . . .
        . . . . . f f b b f f . . . . .
        """))
    tiles.place_on_tile(tercer_profesor, tiles.get_tile_location(10, 10))
    spawn_tercer_profesor = tercer_profesor.tilemap_location()
# MOVIMIENTOS ALUMNO

def on_left_pressed():
    animation.run_image_animation(alumno2,
        assets.animation("""
            nena-animation-left
            """),
        500,
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
    elif mini_mapa_abierto == True:
        sprites.destroy(ventana_mini_mapa)
        mini_mapa_abierto = False
        controller.move_sprite(alumno2, 100, 100)
        reanudar_profesores()
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_b_pressed():
    game.splash("Apuntes a recoger: " + str(objetivo_apuntes_ronda))
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

#FUNCIÓN PARA EL CONTADOR ANTES DE REINICIAR EL JUEGO
def on_countdown_end():
    global reinciando
    reinciando = False
    controller.move_sprite(alumno2, 100, 100)
    reanudar_profesores()
info.on_countdown_end(on_countdown_end)

# FUNCION TELETRANSPORTE

def on_overlap_tile(sprite, location):
    if location.column == 0:
        tiles.place_on_tile(alumno2, tiles.get_tile_location(18, 15))
    else:
        tiles.place_on_tile(alumno2, tiles.get_tile_location(1, 7))
scene.on_overlap_tile(SpriteKind.player,
    sprites.castle.tile_dark_grass3,
    on_overlap_tile)

# FUNCION PARA RESTAR VIDA
def vida_menos():
    global reinciando, spawn_primer_profesor, spawn_segundo_profesor, spawn_tercer_profesor, spawn_alumno
    reinciando = True
    controller.move_sprite(alumno2, 0, 0)
    tiles.place_on_tile(primer_profesor, tiles.get_tile_location(8, 10))
    spawn_primer_profesor = primer_profesor.tilemap_location()
    tiles.place_on_tile(segundo_profesor, tiles.get_tile_location(9, 10))
    spawn_segundo_profesor = segundo_profesor.tilemap_location()
    tiles.place_on_tile(tercer_profesor, tiles.get_tile_location(10, 10))
    spawn_tercer_profesor = tercer_profesor.tilemap_location()
    tiles.place_on_tile(alumno2, tiles.get_tile_location(8, 3))
    spawn_alumno = alumno2.tilemap_location()
    info.change_life_by(-1)
    if info.life() == 0:
        game.game_over(False)
    else:
        game.splash("T'HAN PILLAT COPIANT...")
        info.start_countdown(3)

def on_on_overlap(sprite2, otherSprite):
    sprites.destroy(otherSprite)
    sumar_apuntes()
sprites.on_overlap(SpriteKind.player, SpriteKind.Apuntes, on_on_overlap)

def on_on_overlap2(sprite3, otherSprite2):
    if reinciando == False:
        vida_menos()
sprites.on_overlap(SpriteKind.enemy, SpriteKind.player, on_on_overlap2)

def on_up_pressed():
    animation.run_image_animation(alumno2,
        assets.animation("""
            nena-animation-up
            """),
        500,
        False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

# FUNCIONES MOVIMIENTO PROFE
def perseguir(profesor: Sprite, alumno: Sprite, vel: number):
    profesor.follow(alumno, vel)
# CREACIÓN DE SPRITES
def crear_alumno():
    global alumno2, spawn_alumno
    alumno2 = sprites.create(assets.image("""
        nena-front
        """), SpriteKind.player)
    alumno2.z = 6
    tiles.place_on_tile(alumno2, tiles.get_tile_location(8, 3))
    spawn_alumno = alumno2.tilemap_location()
    controller.move_sprite(alumno2, 100, 100)
    scene.camera_follow_sprite(alumno2)
# FUNCION INICIAR NUEVA RONDA
def iniciar_ronda():
    global apuntes_recogidos
    info.set_score(0)
    apuntes_recogidos = 0
    generar_apuntes()
    crear_alumno()
    crear_primer_profesor()
    crear_segundo_profesor()
    crear_tercer_profesor()
# INICIO DEL JUEGO
spawn_alumno: tiles.Location = None
ventana_mini_mapa: Sprite = None
mini_mapa: minimap.Minimap = None
spawn_tercer_profesor: tiles.Location = None
spawn_segundo_profesor: tiles.Location = None
spawn_primer_profesor: tiles.Location = None
objetivo_apuntes_ronda = 0
apunte: Sprite = None
probabilidad_spawn_paginas = 0
apuntes_recogidos = 0
total_apuntes = 0
tercer_profesor: Sprite = None
segundo_profesor: Sprite = None
alumno2: Sprite = None
primer_profesor: Sprite = None
mini_mapa_abierto = False
ronda = 0
reinciando = False
reinciando = False
info.set_score(0)
info.set_life(3)
tiles.set_current_tilemap(tilemap("""
    nivel1
    """))
ronda = 1
mini_mapa_abierto = False
iniciar_ronda()
game.splash("PRIMERA ENXAMPADA.")

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
        minimap.include_sprite(mini_mapa, primer_profesor, MinimapSpriteScale.DOUBLE)
        minimap.include_sprite(mini_mapa, segundo_profesor, MinimapSpriteScale.DOUBLE)
        minimap.include_sprite(mini_mapa, tercer_profesor, MinimapSpriteScale.DOUBLE)
        ventana_mini_mapa.z = 7
game.on_update_interval(100, on_update_interval)

def on_update_interval2():
    if mini_mapa_abierto == False and reinciando == False:
        reanudar_profesores()
    else:
        parar_profesores()
game.on_update_interval(100, on_update_interval2)
