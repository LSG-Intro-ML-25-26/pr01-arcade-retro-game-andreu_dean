@namespace
class SpriteKind:
    Mapa = SpriteKind.create()
    Apuntes = SpriteKind.create()
    Info = SpriteKind.create()

def on_on_overlap(sprite2, otherSprite):
    sprites.destroy(otherSprite)
    music.play_sound_effect(music.create_sound_effect(WaveShape.SQUARE, 1600, 1, 255, 0, 100, SoundExpressionEffect.NONE, InterpolationCurve.CURVE), SoundExpressionPlayMode.UNTIL_DONE)
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
    for posicion in tiles.get_tiles_by_type(assets.tile("""miMosaico9""")):
        if randint(0, 99) < probabilidad_spawn_paginas:
            apunte = sprites.create(assets.image("""miImagen1"""), SpriteKind.Apuntes)
            tiles.place_on_tile(apunte, posicion)
            total_apuntes += 1
    objetivo_apuntes_ronda = total_apuntes

def crear_primer_profesor():
    global primer_profesor, spawn_primer_profesor
    primer_profesor = sprites.create(assets.image("""sis"""), SpriteKind.enemy)
    primer_profesor.set_image(assets.image("""sis"""))
    tiles.place_on_tile(primer_profesor, tiles.get_tile_location(8, 10))
    spawn_primer_profesor = primer_profesor.tilemap_location()

def crear_segundo_profesor():
    global segundo_profesor, spawn_segundo_profesor
    segundo_profesor = sprites.create(assets.image("""rai"""), SpriteKind.enemy)
    segundo_profesor.set_image(assets.image("""rai"""))
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
        music.play_sound_effect(music.create_sound_effect(WaveShape.TRIANGLE, 1, 1500, 255, 0, 400, SoundExpressionEffect.NONE, InterpolationCurve.LINEAR), SoundExpressionPlayMode.UNTIL_DONE)
        if ronda == 2:
            game.splash("SEGONA ENXAMPADA.")
            generar_apuntes()
            iniciar_ronda()
        elif ronda == 3:
            game.splash("ENXAMPADA FINAL.")
            generar_apuntes()
            iniciar_ronda()
        elif ronda == 4:
            final_escape_patio()

def final_escape_patio():
    music.stop_all_sounds()
    controller.move_sprite(alumno2, 0, 0)
    parar_profesores()
    scene.camera_shake(4, 500)
    music.play_sound_effect(music.create_sound_effect(WaveShape.SINE, 1, 2000, 255, 0, 1000, SoundExpressionEffect.NONE, InterpolationCurve.LINEAR), SoundExpressionPlayMode.IN_BACKGROUND)
    pause(500)
    scene.set_background_image(assets.image("""patio"""))
    game.show_long_text("""
            ¡HO HAS ACONSEGUIT!
            ¡Corre, corre que t'enxampen!
            ¡Sortint de La Salle a corre-cuita!
            """,
        DialogLayout.BOTTOM)
    game.game_over(True)

def on_down_pressed():
    animation.run_image_animation(alumno2, assets.animation("""myAnim"""), 200, False)
controller.down.on_event(ControllerButtonEvent.PRESSED, on_down_pressed)

def on_right_pressed():
    animation.run_image_animation(alumno2, assets.animation("""myAnim2"""), 200, False)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

def crear_tercer_profesor():
    global tercer_profesor, spawn_tercer_profesor
    tercer_profesor = sprites.create(assets.image("""fran"""), SpriteKind.enemy)
    tercer_profesor.set_image(assets.image("""fran"""))
    tiles.place_on_tile(tercer_profesor, tiles.get_tile_location(10, 10))
    spawn_tercer_profesor = tercer_profesor.tilemap_location()

def on_left_pressed():
    animation.run_image_animation(alumno2, assets.animation("""myAnim3"""), 200, False)
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
scene.on_overlap_tile(SpriteKind.player, assets.tile("""miMosaico10"""), on_overlap_tile)

def on_countdown_end():
    global reinciando
    reinciando = False
    controller.move_sprite(alumno2, 100, 100)
    reanudar_profesores()
info.on_countdown_end(on_countdown_end)

def vida_menos():
    global reinciando
    reinciando = True
    music.play_sound_effect(music.create_sound_effect(WaveShape.NOISE, 500, 1, 255, 0, 400, SoundExpressionEffect.NONE, InterpolationCurve.LINEAR), SoundExpressionPlayMode.UNTIL_DONE)
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
    animation.run_image_animation(alumno2, assets.animation("""myAnim0"""), 200, False)
controller.up.on_event(ControllerButtonEvent.PRESSED, on_up_pressed)

def perseguir(profesor: Sprite, alumno: Sprite, vel: number):
    profesor.follow(alumno, vel)

def crear_alumno():
    global alumno2
    alumno2 = sprites.create(assets.image("""nena-front"""), SpriteKind.player)
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
    scene.set_background_image(assets.image("""frontsalle"""))
    info.set_score(0)
    info.set_life(3)
    tiles.set_current_tilemap(tilemap("""nivel1"""))
    iniciar_ronda()
    game.splash("PRIMERA ENXAMPADA.")

def on_on_overlap2(sprite3, otherSprite2):
    if reinciando == False:
        vida_menos()
sprites.on_overlap(SpriteKind.enemy, SpriteKind.player, on_on_overlap2)

def iniciar_intro():
    scene.set_background_image(assets.image("""logo"""))
    game.show_long_text("""
            L'enxampada de La Salle
            Prem 'A'
            """,
        DialogLayout.BOTTOM)
    
    scene.set_background_image(assets.image("""timer"""))
    music.play_sound_effect(music.create_sound_effect(WaveShape.TRIANGLE, 1600, 1600, 255, 0, 200, SoundExpressionEffect.NONE, InterpolationCurve.CURVE), SoundExpressionPlayMode.UNTIL_DONE)
    game.show_long_text("""
            Són les 8 del matí.
            Avui tens l'examen més important del curs.
            """,
        DialogLayout.BOTTOM)
    
    scene.set_background_image(assets.image("""cama"""))
    game.show_long_text("""
            T'aixeques del llit amb nervis però decidit.
            No pots fallar avui.
            """,
        DialogLayout.BOTTOM)

    scene.set_background_image(assets.image("""front"""))
    game.show_long_text("""
            Arribes a La Salle i respires profundament...
            Això ya comença.
            """,
        DialogLayout.BOTTOM)

    scene.set_background_image(assets.image("""pasillosalle"""))
    game.show_long_text("""
            Camines pel passadís en silenci cap a l'aula.
            La tensió es nota a l'aire.
            """,
        DialogLayout.BOTTOM)

    scene.set_background_image(assets.image("""salle"""))
    game.show_long_text("""
            Ja ets a la classe. L'examen està a punt de començar.
            Treu les xuletes i que no t'enxampin!
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