const viajeData = [
    {
        day: 1,
        title: "Nagasaki: La Puerta al Mundo",
        location: "Nagasaki",
        story: "Nagasaki fue durante siglos el único puerto abierto al comercio exterior durante el periodo de aislamiento nacional (Sakoku). Su mezcla única de arquitectura europea, templos chinos e historia cristiana la convierten en un inicio de viaje fascinante.",
        sleep: "Alojamiento en el centro de Nagasaki.",
        missions: [
            "Crisol de culturas. Probar el Champon, el plato de fideos local nacido de la influencia china en el puerto.",
            "Cruce de caminos. Pasear por el puente de piedra Meganebashi y buscar la piedra con forma de corazón oculta en el muro.",
            "Noche en la bahía. Subir al mirador del Monte Inasa para contemplar una de las mejores vistas nocturnas de Japón."
        ]
    },
    {
        day: 2,
        title: "Rumbo a Kumamoto: Tierras Volcánicas",
        location: "Ruta Nagasaki - Kumamoto",
        story: "El trayecto en carretera desde Nagasaki te adentra en el corazón de Kyushu, cruzando paisajes cambiantes hasta llegar a una de las ciudades más imponentes de la isla. Kumamoto gira en torno a su majestuoso castillo y combina a la perfección la energía urbana con la cercanía a la naturaleza del monte Aso.",
        sleep: "Hotel en Kumamoto.",
        missions: [
            "El dulce samurái. Probar el Ikinari Dango, dulce típico de Kumamoto hecho con rodajas de boniato y judías rojas.",
            "Titán de piedra. Contemplar las imponentes murallas restauradas del castillo de Kumamoto al llegar por la tarde.",
            "El oso más famoso. Encontrar una estatua o cartel oficial de Kumamon, la icónica mascota de la prefectura."
        ]
    },
    {
        day: 3,
        title: "Kumamoto: La Búsqueda de los Mugiwara",
        location: "Kumamoto",
        story: "Kumamoto es la tierra natal de Eiichiro Oda, creador de One Piece. Tras los devastadores terremotos de 2016, se instalaron estatuas de bronce de toda la tripulación del Sombrero de Paja repartidas por la prefectura como símbolo de reconstrucción y esperanza.",
        sleep: "Hotel en Kumamoto.",
        missions: [
            "El capitán. Encontrar la estatua de bronce de Monkey D. Luffy frente al edificio del Gobierno Prefectural de Kumamoto.",
            "Caza de la tripulación. Localizar al menos a otros tres miembros de los Mugiwara repartidos por los parques y pueblos cercanos.",
            "Banquete pirata. Degustar el auténtico Kumamoto Ramen, caracterizado por su caldo de cerdo tonkotsu con ajo tostado negro."
        ]
    },
    {
        day: 4,
        title: "Kagoshima: Volcanes, Cascadas e Historia Satsuma",
        location: "Ruta Kumamoto - Kagoshima",
        story: "Una ruta hacia el extremo sur llena de túneles ferroviarios ocultos en la selva, arte al aire libre y cascadas humeantes. La jornada culmina frente al imponente volcán activo Sakurajima en la histórica tierra de los samuráis de Satsuma.",
        sleep: "Alojamiento en Kagoshima.",
        missions: [
            "El secreto del riel. Explorar los arcos geométricos del Hakkaku Tunnel engullidos por la vegetación.",
            "Banquete de la Prefectura. Comer el legendario kurobuta (cerdo negro de Kagoshima) en un restaurante local.",
            "Guerreros de Satsuma. Visitar el parque Shiroyama al atardecer y brindar en un izakaya del barrio de Tenmonkan."
        ]
    },
    {
        day: 5,
        title: "Yakushima: El Bosque Encantado de Mononoke",
        location: "Isla de Yakushima",
        story: "Declarada Patrimonio de la Humanidad, esta isla mística inspiró los paisajes de La Princesa Mononoke de Studio Ghibli. Sus bosques de cedros milenarios (yakusugi) envueltos en bruma y musgo verde brillante ofrecen una experiencia espiritual única.",
        sleep: "Minshuku tradicional de madera en Yakushima.",
        missions: [
            "Espíritus del bosque. Recorrer la ruta de senderismo de Shiratani Unsuikyo (Mononoke Hime forest).",
            "Selfie con el abuelo. Fotografiar un cedro Yakusugi de más de 1.000 años de antigüedad.",
            "Elixir de la isla. Probar el shochu local Mitake acompañado de pescado volador frito (tobiuo)."
        ]
    },
    {
        day: 6,
        title: "Aoshima y Takachiho: Mitos y Leyendas",
        location: "Ruta Sur - Miyazaki - Beppu",
        story: "Recorriendo la costa de Miyazaki hacia el norte, el paisaje se llena de mitología sintoísta. Desde la pequeña isla sagrada de Aoshima rodeada de formaciones rocosas únicas hasta las gargantas sagradas donde la diosa del sol Amaterasu se ocultó en una cueva.",
        sleep: "Ryokan u hotel con onsen en Beppu / Oita.",
        missions: [
            "La lavadora del ogro. Cruzar el puente hacia la isla de Aoshima y observar las formaciones rocosas Oni no Sentakuita.",
            "La cueva de la diosa. Visitar el santuario Amanoiwato en Takachiho y apilar piedras en el río de la cueva Amano Yasukawara.",
            "Pollo legendario. Probar el Chicken Nanban, plato estrella de Miyazaki con salsa tártara casera."
        ]
    },
    {
        day: 7,
        title: "Beppu: El Vapor de los Siete Infiernos",
        location: "Beppu - Kitakyushu",
        story: "Beppu es la capital termal de Japón, una ciudad donde columnas de vapor blanco brotan constantemente de las alcantarillas y montañas. Sus famosos Jigoku (infiernos) son estanques volcánicos hirvientes de colores surrealistas que van del azul cobalto al rojo sangre.",
        sleep: "Hotel en Kitakyushu.",
        missions: [
            "Turismo infernal. Visitar el Umi Jigoku (infierno del mar azul) y el Chinoike Jigoku (infierno del estanque de sangre).",
            "Cocina geotérmica. Probar los Jigoku Mushi Purin (flanes) o huevos cocidos directamente al vapor natural de las aguas termales.",
            "Frontera de islas. Llegar a Kitakyushu y contemplar el estrecho de Kanmon que separa Kyushu de Honshu."
        ]
    },
    {
        day: 8,
        title: "Miyajima: La Isla donde Conviven Dioses y Ciervos",
        location: "Isla de Miyajima (Itsukushima)",
        story: "Dejando el coche en tierra firme, el ferry cruza hacia una de las tres vistas más famosas de Japón. Miyajima es una isla sagrada presidida por su icónico torii flotante rojo y coronada por el monte Misen, envuelto en leyendas budistas.",
        sleep: "Alojamiento tradicional en la isla de Miyajima.",
        missions: [
            "En la cima sagrada. Subir hasta la cumbre del Monte Misen para obtener vistas panorámicas del Mar Interior de Seto.",
            "La hoja de arce. Probar un Momiji Manju recién horneado (pastelito con forma de hoja de arce relleno).",
            "Marea nocturna. Ver iluminado el Gran Torii flotante del santuario Itsukushima cuando cae la noche y se van los turistas."
        ]
    },
    {
        day: 9,
        title: "Hiroshima: Memoria, Resiliencia y Saltos entre Islas",
        location: "Hiroshima - Ruta Shimanami Kaido - Matsuyama",
        story: "Hiroshima es un monumento vivo a la paz y la superación humana. Tras recorrer su conmovedor Parque Memorial, la ruta cruza el Mar Interior de Seto por los espectaculares puentes de la ruta Shimanami Kaido para aterrizar en la isla de Shikoku.",
        sleep: "Hotel en Matsuyama.",
        missions: [
            "Símbolo de paz. Visitar la Cúpula de la Bomba Atómica y el Museo Memorial de la Paz de Hiroshima.",
            "El festín en capas. Comer un auténtico Okonomiyaki estilo Hiroshima (preparado con fideos yakisoba en su interior).",
            "El baño de Chihiro. Contemplar el histórico edificio de madera de Dogo Onsen en Matsuyama al llegar por la tarde."
        ]
    },
    {
        day: 10,
        title: "Matsuyama a Kochi: El Corazón Salvaje de Shikoku",
        location: "Matsuyama - Kochi",
        story: "Desde una de las pocas fortalezas originales que quedan en Japón en lo alto de Matsuyama, la carretera atraviesa las montañas de Shikoku hasta la costa del Pacífico. Kochi es tierra de espíritu rebelde, hogar del héroe samurái Sakamoto Ryoma.",
        sleep: "Alojamiento en Kochi.",
        missions: [
            "Castillo original. Subir al castillo de Matsuyama y admirar una de las doce torres originales del periodo Edo.",
            "Fuego y bonito. Probar el Katsuo no Tataki (bonito sellado al fuego con paja) en el bullicioso mercado de Hirome.",
            "Cítrico local. Refrescarse con una bebida o dulce elaborado con Yuzu, el cítrico estrella de la prefectura de Kochi."
        ]
    },
    {
        day: 11,
        title: "Kochi a Tokushima: Gargantas y Remolinos",
        location: "Kochi - Tokushima",
        story: "Un viaje hacia el este de Shikoku rodeado de valles escarpados, ríos color esmeralda y puentes colgantes hechos de lianas en el valle de Iya. Tokushima espera en la costa con su tradición de danza folclórica y fenómenos marinos únicos.",
        sleep: "Hotel en Tokushima.",
        missions: [
            "Cruzar el abismo. Atravesar el puente colgante de lianas Kazurabashi en el remoto valle de Iya.",
            "Ramen oscuro. Probar el Tokushima Ramen, famoso por su caldo oscuro de salsa de soja, cerdo dulce y huevo crudo.",
            "Espíritu festivo. Descubrir la historia del Awa Odori, el festival de danza tradicional más famoso de la región."
        ]
    },
    {
        day: 12,
        title: "La Gran Travesía hacia la Antigua Capital",
        location: "Tokushima - Puente Akashi Kaikyo - Kioto",
        story: "Jornada épica al volante cruzando la isla de Awaji y el monumental puente colgante Akashi Kaikyo para regresar a Honshu. El destino final es Kioto, el alma cultural e histórica de Japón, hogar de miles de templos y tradiciones milenarias.",
        sleep: "Hotel o machiya en Kioto.",
        missions: [
            "Gigante de acero. Cruzar el puente Akashi Kaikyo, uno de los puentes colgantes más largos del mundo.",
            "Primer contacto imperial. Pasear al anochecer por los callejones iluminados con farolillos de Pontocho o Gion.",
            "Cena de bienvenida. Probar unas brochetas yakitori o un bol de ramen caliente en el centro de Kioto."
        ]
    },
    {
        day: 13,
        title: "Kioto: Templos de Madera y Santuarios Infinitos",
        location: "Kioto",
        story: "Kioto condensa más de mil años de historia imperial en sus barrios preservados y templos Patrimonio de la Humanidad. Desde la terraza de madera suspendida de Kiyomizudera hasta los bosques de puertas bermellones de Fushimi Inari, cada rincón respira tradición.",
        sleep: "Hotel o machiya en Kioto.",
        missions: [
            "Balcón sobre el bosque. Contemplar las vistas de la ciudad desde la terraza de madera sin clavos del templo Kiyomizudera.",
            "Pasillo bermellón. Caminar bajo los miles de torii rojos del santuario Fushimi Inari Taisha.",
            "Oro verde. Degustar un helado o dulce tradicional elaborado con té Matcha puro de Uji en las calles de Higashiyama."
        ]
    },
    {
        day: 14,
        title: "Nagoya: El Imperio de los Unificadores",
        location: "Kioto - Nagoya",
        story: "Centro industrial y corazón histórico de los grandes señores de la guerra que unificaron Japón (Oda Nobunaga, Toyotomi Hideyoshi y Tokugawa Ieyasu). Nagoya destaca también por tener una de las gastronomías locales más potentes y contundentes del país (Nagoya Meshi).",
        sleep: "Hotel en Nagoya.",
        missions: [
            "Shachihoko dorados. Visitar el castillo de Nagoya y buscar las míticas carpas con cabeza de tigre que coronan su tejado.",
            "El ritual de la anguila. Comer Hitsumabushi (anguila a la parrilla sobre arroz) siguiendo sus tres pasos tradicionales.",
            "Alitas legendarias. Probar las Tebasaki, las famosas alitas de pollo fritas con salsa dulce y pimienta típicas de la ciudad."
        ]
    },
    {
        day: 15,
        title: "Tottori: El Desierto Frente al Mar de Japón",
        location: "Nagoya - Tottori",
        story: "Cruzando hacia la costa norte del Mar de Japón, el paisaje sorprende con las Dunas de Tottori, una extensión de arena moldeada por el viento junto al océano que parece sacada de otro continente. Una parada insólita y fotogénica en la ruta.",
        sleep: "Alojamiento en Tottori.",
        missions: [
            "Espejismo costero. Subir la gran duna de arena de Tottori para ver el contraste entre el desierto y el Mar de Japón.",
            "Museo de arena. Visitar el Museo de la Arena para admirar esculturas monumentales hechas únicamente con agua y arena.",
            "La fruta real. Probar una pera Nijisseiki (pera asiática local) o un helado elaborado con ella."
        ]
    },
    {
        day: 16,
        title: "Hamada: La Costa Salvaje de San'in",
        location: "Tottori - Hamada (Prefectura de Shimane)",
        story: "Siguiendo la escarpada y menos transitada costa de la región de San'in, la ruta pasa por tierras llenas de santuarios antiguos hasta llegar a Hamada. Es una zona pesquera tranquila famosa por su tradición teatral Kagura y sus formaciones rocosas costeras.",
        sleep: "Alojamiento junto a la costa en Hamada.",
        missions: [
            "Piso de piedra. Caminar por la plataforma rocosa de Iwami Tatamigaura, formada por antiguos sedimentos marinos.",
            "Tesoro del puerto. Probar el Nodoguro (besugo de garganta negra), considerado uno de los pescados más exquisitos de Japón.",
            "Danza de dioses. Buscar referencias o máscaras del Iwami Kagura, el teatro tradicional de danzas mitológicas de la zona."
        ]
    },
    {
        day: 17,
        title: "Fukuoka: Regreso a Kyushu y Cultura Yatai",
        location: "Hamada - Fukuoka",
        story: "Cruzando de vuelta a la isla de Kyushu, Fukuoka recibe al viajero como la metrópoli más vibrante y joven del sur. Famosa por su ambiente relajado, su cercanía al mar y sus icónicos puestos callejeros nocturnos (yatai) a orillas del río.",
        sleep: "Hotel en Fukuoka.",
        missions: [
            "Cena a pie de calle. Sentarse en un puesto callejero Yatai en la zona de Nakasu para cenar hombro con hombro con locales.",
            "El origen del Tonkotsu. Probar el Hakata Ramen de fideos finos y pedir un 'Kaedama' (ración extra de fideos para el caldo sobrante).",
            "Huevas picantes. Degustar el Mentaiko (huevas de abadejo marinadas en chile), el ingrediente estrella de Fukuoka."
        ]
    },
    {
        day: 18,
        title: "De Vuelta a Nagasaki: Cerrando el Círculo",
        location: "Fukuoka - Nagasaki",
        story: "El viaje en carretera completa su gran bucle regresando a la ciudad donde todo empezó. Con otra perspectiva tras haber recorrido tres islas, Nagasaki ofrece el escenario perfecto para bajar el ritmo y explorar los rincones pendientes de su bahía.",
        sleep: "Alojamiento en Nagasaki.",
        missions: [
            "El legado holandés. Recorrer Dejima, la isla artificial que funcionó como único puesto comercial occidental durante siglos.",
            "Bizcocho imperial. Comprar y probar un auténtico Castella, el bizcocho esponjoso introducido por los comerciantes portugueses.",
            "Brindis de ruta. Celebrar el cierre del bucle en carretera con una cena tranquila frente al puerto."
        ]
    },
    {
        day: 19,
        title: "Nagasaki: Últimos Secretos de la Ciudad",
        location: "Nagasaki",
        story: "Último día completo para saborear sin prisas la atmósfera única de Nagasaki, subir por sus colinas llenas de mansiones occidentales históricas y descubrir las cicatrices y esperanzas de su historia moderna.",
        sleep: "Alojamiento en Nagasaki.",
        missions: [
            "Colina con vistas. Visitar el Jardín Glover y contemplar las históricas casas de estilo occidental mirando hacia el puerto.",
            "El otro plato estrella. Probar el Sara Udon, fideos crujientes cubiertos con una espesa salsa de verduras y marisco.",
            "Botín de viaje. Realizar las últimas compras de recuerdos y snacks japoneses antes de preparar las maletas."
        ]
    },
    {
        day: 20,
        title: "Sayonara Japón: Vuelta a Casa",
        location: "Nagasaki - Aeropuerto",
        story: "Fin de una travesía épica de veinte días recorriendo miles de kilómetros, volcanes, islas sagradas y ciudades históricas. Con la tarjeta de memoria llena de recuerdos y el coche devuelto, toca emprender el vuelo de regreso.",
        sleep: "En vuelo de regreso a casa.",
        missions: [
            "Misión cumplida. Devolver el coche de alquiler sin rasguños tras haber completado el gran roadtrip.",
            "Último Ekiben. Comprar una caja bento o unos onigiri en el aeropuerto para despedirse de la gastronomía japonesa.",
            "Planear la vuelta. Anotar en el móvil qué región de Japón quedará pendiente para la próxima aventura."
        ]
    }
]