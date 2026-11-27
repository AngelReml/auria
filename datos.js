/* Auria: datos del juego (generado). Unidades, enemigos, regiones e historia. */
(function (root) {
  var D = {
 "ELEMENTOS": [
  "Brasa",
  "Marea",
  "Bosque",
  "Rayo",
  "Alba",
  "Ocaso"
 ],
 "FUERTE": {
  "Brasa": "Bosque",
  "Bosque": "Rayo",
  "Rayo": "Marea",
  "Marea": "Brasa",
  "Alba": "Ocaso",
  "Ocaso": "Alba"
 },
 "COLOR": {
  "Brasa": "#e0562f",
  "Marea": "#3a8fd6",
  "Bosque": "#4fa35a",
  "Rayo": "#d9b529",
  "Alba": "#e9dfb8",
  "Ocaso": "#8a63c9"
 },
 "HEROES": {
  "kael": {
   "n": "Kael",
   "t": "Espadachín errante",
   "el": "Brasa",
   "rar": 3,
   "hp": 320,
   "atk": 110,
   "def": 70,
   "hits": 3,
   "bb": {
    "n": "Tajo de fragua",
    "tipo": "uno",
    "pot": 3
   }
  },
  "dalia": {
   "n": "Dalia",
   "t": "Druida de las raíces",
   "el": "Bosque",
   "rar": 3,
   "hp": 300,
   "atk": 85,
   "def": 70,
   "hits": 2,
   "bb": {
    "n": "Abrazo de raíces",
    "tipo": "cura",
    "pot": 0.4
   }
  },
  "fenn": {
   "n": "Fenn",
   "t": "Arquero de la espesura",
   "el": "Bosque",
   "rar": 2,
   "hp": 240,
   "atk": 95,
   "def": 50,
   "hits": 3,
   "bb": {
    "n": "Flecha viva",
    "tipo": "uno",
    "pot": 2.6
   }
  },
  "mirra": {
   "n": "Mirra",
   "t": "Alquimista de pólvora",
   "el": "Brasa",
   "rar": 3,
   "hp": 260,
   "atk": 120,
   "def": 55,
   "hits": 4,
   "bb": {
    "n": "Triple frasco",
    "tipo": "todos",
    "pot": 1.7
   }
  },
  "brakk": {
   "n": "Brakk",
   "t": "Herrero titán",
   "el": "Brasa",
   "rar": 4,
   "hp": 420,
   "atk": 125,
   "def": 95,
   "hits": 2,
   "bb": {
    "n": "Yunque roto",
    "tipo": "todos",
    "pot": 2
   }
  },
  "nerea": {
   "n": "Nerea",
   "t": "Lancera de arrecife",
   "el": "Marea",
   "rar": 3,
   "hp": 310,
   "atk": 105,
   "def": 75,
   "hits": 4,
   "bb": {
    "n": "Chorro de arrecife",
    "tipo": "uno",
    "pot": 2.8
   }
  },
  "osval": {
   "n": "Osval",
   "t": "Monje de la lluvia",
   "el": "Marea",
   "rar": 2,
   "hp": 280,
   "atk": 70,
   "def": 70,
   "hits": 2,
   "bb": {
    "n": "Lluvia mansa",
    "tipo": "cura",
    "pot": 0.35
   }
  },
  "sirel": {
   "n": "Sirel",
   "t": "Corsaria de las mareas",
   "el": "Marea",
   "rar": 4,
   "hp": 360,
   "atk": 135,
   "def": 75,
   "hits": 5,
   "bb": {
    "n": "Abordaje",
    "tipo": "uno",
    "pot": 3.4
   }
  },
  "gorm": {
   "n": "Gorm",
   "t": "Guardián de musgo",
   "el": "Bosque",
   "rar": 3,
   "hp": 460,
   "atk": 80,
   "def": 120,
   "hits": 1,
   "bb": {
    "n": "Muro de musgo",
    "tipo": "todos",
    "pot": 1.4
   }
  },
  "ziva": {
   "n": "Ziva",
   "t": "Duelista relámpago",
   "el": "Rayo",
   "rar": 3,
   "hp": 250,
   "atk": 125,
   "def": 55,
   "hits": 6,
   "bb": {
    "n": "Zigzag",
    "tipo": "uno",
    "pot": 3
   }
  },
  "tobias": {
   "n": "Tobías",
   "t": "Ingeniero de bobinas",
   "el": "Rayo",
   "rar": 2,
   "hp": 250,
   "atk": 90,
   "def": 55,
   "hits": 3,
   "bb": {
    "n": "Arco de bobina",
    "tipo": "todos",
    "pot": 1.5
   }
  },
  "rhaia": {
   "n": "Rhaia",
   "t": "Jinete de tormenta",
   "el": "Rayo",
   "rar": 4,
   "hp": 380,
   "atk": 130,
   "def": 85,
   "hits": 3,
   "bb": {
    "n": "Pararrayos",
    "tipo": "todos",
    "pot": 2.1
   }
  },
  "liora": {
   "n": "Liora",
   "t": "Paladina del alba",
   "el": "Alba",
   "rar": 4,
   "hp": 440,
   "atk": 110,
   "def": 110,
   "hits": 2,
   "bb": {
    "n": "Escudo solar",
    "tipo": "todos",
    "pot": 1.8
   }
  },
  "edrin": {
   "n": "Edrin",
   "t": "Clérigo cantor",
   "el": "Alba",
   "rar": 2,
   "hp": 250,
   "atk": 65,
   "def": 60,
   "hits": 2,
   "bb": {
    "n": "Coro de luz",
    "tipo": "cura",
    "pot": 0.35
   }
  },
  "ysolde": {
   "n": "Ysolde",
   "t": "Heraldo de vidriera",
   "el": "Alba",
   "rar": 4,
   "hp": 340,
   "atk": 140,
   "def": 70,
   "hits": 4,
   "bb": {
    "n": "Vidriera",
    "tipo": "todos",
    "pot": 2.2
   }
  },
  "vesper": {
   "n": "Vesper",
   "t": "Asesino de sombras",
   "el": "Ocaso",
   "rar": 3,
   "hp": 260,
   "atk": 130,
   "def": 55,
   "hits": 3,
   "bb": {
    "n": "Media luna",
    "tipo": "uno",
    "pot": 3.2
   }
  },
  "morwen": {
   "n": "Morwen",
   "t": "Bruja del velo",
   "el": "Ocaso",
   "rar": 3,
   "hp": 270,
   "atk": 115,
   "def": 60,
   "hits": 4,
   "bb": {
    "n": "Fuegos fatuos",
    "tipo": "todos",
    "pot": 1.8
   }
  },
  "azrak": {
   "n": "Azrak",
   "t": "Caballero del eclipse",
   "el": "Ocaso",
   "rar": 4,
   "hp": 450,
   "atk": 130,
   "def": 100,
   "hits": 2,
   "bb": {
    "n": "Tajo de eclipse",
    "tipo": "uno",
    "pot": 3.6
   }
  },
  "nacha": {
   "n": "Nacha",
   "t": "Cocinera de campaña",
   "el": "Brasa",
   "rar": 3,
   "hp": 290,
   "atk": 75,
   "def": 70,
   "hits": 2,
   "bb": {
    "n": "Guiso ardiente",
    "tipo": "cura",
    "pot": 0.38
   }
  },
  "corvin": {
   "n": "Corvin",
   "t": "Deshollinador acróbata",
   "el": "Brasa",
   "rar": 2,
   "hp": 229,
   "atk": 101,
   "def": 48,
   "hits": 5,
   "bb": {
    "n": "Lluvia de pavesas",
    "tipo": "uno",
    "pot": 2.9
   }
  },
  "saela": {
   "n": "Saela",
   "t": "Bailarina de pavesas",
   "el": "Brasa",
   "rar": 4,
   "hp": 310,
   "atk": 126,
   "def": 69,
   "hits": 3,
   "bb": {
    "n": "Remolino de fuego",
    "tipo": "todos",
    "pot": 1.8
   }
  },
  "baldo": {
   "n": "Don Baldo",
   "t": "Artillero retirado",
   "el": "Brasa",
   "rar": 3,
   "hp": 270,
   "atk": 110,
   "def": 60,
   "hits": 3,
   "bb": {
    "n": "Andanada",
    "tipo": "todos",
    "pot": 1.8
   }
  },
  "tizon": {
   "n": "Tizón",
   "t": "Mastín de ceniza",
   "el": "Brasa",
   "rar": 3,
   "hp": 300,
   "atk": 120,
   "def": 60,
   "hits": 3,
   "bb": {
    "n": "Llamarada",
    "tipo": "uno",
    "pot": 3
   }
  },
  "maris": {
   "n": "Maris",
   "t": "Buceadora de perlas",
   "el": "Marea",
   "rar": 2,
   "hp": 238,
   "atk": 97,
   "def": 53,
   "hits": 3,
   "bb": {
    "n": "Perlas de espuma",
    "tipo": "todos",
    "pot": 1.8
   }
  },
  "tolo": {
   "n": "Tolo",
   "t": "Pescador gigante",
   "el": "Marea",
   "rar": 3,
   "hp": 440,
   "atk": 85,
   "def": 110,
   "hits": 2,
   "bb": {
    "n": "Red de arrastre",
    "tipo": "todos",
    "pot": 1.5
   }
  },
  "aina": {
   "n": "Hermana Aina",
   "t": "Campanera de la lluvia",
   "el": "Marea",
   "rar": 3,
   "hp": 290,
   "atk": 75,
   "def": 70,
   "hits": 2,
   "bb": {
    "n": "Lluvia de campana",
    "tipo": "cura",
    "pot": 0.38
   }
  },
  "anselm": {
   "n": "Anselm",
   "t": "El farero",
   "el": "Marea",
   "rar": 3,
   "hp": 270,
   "atk": 110,
   "def": 60,
   "hits": 3,
   "bb": {
    "n": "Haz del faro",
    "tipo": "todos",
    "pot": 1.8
   }
  },
  "undina": {
   "n": "Undina",
   "t": "Espíritu de fuente",
   "el": "Marea",
   "rar": 4,
   "hp": 345,
   "atk": 138,
   "def": 69,
   "hits": 3,
   "bb": {
    "n": "Ola entera",
    "tipo": "uno",
    "pot": 3
   }
  },
  "rosal": {
   "n": "Rosal",
   "t": "Espadachina de espinas",
   "el": "Bosque",
   "rar": 3,
   "hp": 260,
   "atk": 115,
   "def": 55,
   "hits": 5,
   "bb": {
    "n": "Flor de espinas",
    "tipo": "uno",
    "pot": 2.9
   }
  },
  "boleto": {
   "n": "Abuelo Boleto",
   "t": "Micólogo",
   "el": "Bosque",
   "rar": 2,
   "hp": 238,
   "atk": 97,
   "def": 53,
   "hits": 3,
   "bb": {
    "n": "Nube de esporas",
    "tipo": "todos",
    "pot": 1.8
   }
  },
  "lince": {
   "n": "Lince",
   "t": "Cazadora enmascarada",
   "el": "Bosque",
   "rar": 3,
   "hp": 260,
   "atk": 115,
   "def": 55,
   "hits": 5,
   "bb": {
    "n": "Triple zarpazo",
    "tipo": "uno",
    "pot": 2.9
   }
  },
  "tronco": {
   "n": "Tronco",
   "t": "Leñador",
   "el": "Bosque",
   "rar": 3,
   "hp": 440,
   "atk": 85,
   "def": 110,
   "hits": 2,
   "bb": {
    "n": "Fila de troncos",
    "tipo": "todos",
    "pot": 1.5
   }
  },
  "avellana": {
   "n": "Avellana",
   "t": "Hada mensajera",
   "el": "Bosque",
   "rar": 2,
   "hp": 229,
   "atk": 101,
   "def": 48,
   "hits": 5,
   "bb": {
    "n": "Correo urgente",
    "tipo": "uno",
    "pot": 2.9
   }
  },
  "volta": {
   "n": "Volta",
   "t": "Herrera de pararrayos",
   "el": "Rayo",
   "rar": 3,
   "hp": 300,
   "atk": 120,
   "def": 60,
   "hits": 3,
   "bb": {
    "n": "Descarga a tierra",
    "tipo": "uno",
    "pot": 3
   }
  },
  "ferran": {
   "n": "Maese Ferran",
   "t": "Relojero",
   "el": "Rayo",
   "rar": 3,
   "hp": 270,
   "atk": 110,
   "def": 60,
   "hits": 3,
   "bb": {
    "n": "Cuerda al tiempo",
    "tipo": "todos",
    "pot": 1.8
   }
  },
  "chispa": {
   "n": "Chispa",
   "t": "Autómata de cuerda",
   "el": "Rayo",
   "rar": 2,
   "hp": 238,
   "atk": 97,
   "def": 53,
   "hits": 3,
   "bb": {
    "n": "Sobrecarga",
    "tipo": "todos",
    "pot": 1.8
   }
  },
  "nube": {
   "n": "Nube",
   "t": "Pastora de tormentas",
   "el": "Rayo",
   "rar": 3,
   "hp": 270,
   "atk": 110,
   "def": 60,
   "hits": 3,
   "bb": {
    "n": "Tormenta de bolsillo",
    "tipo": "todos",
    "pot": 1.8
   }
  },
  "halcon": {
   "n": "Halcón",
   "t": "Mensajero alado",
   "el": "Rayo",
   "rar": 4,
   "hp": 345,
   "atk": 138,
   "def": 69,
   "hits": 3,
   "bb": {
    "n": "Picado",
    "tipo": "uno",
    "pot": 3
   }
  },
  "clarisa": {
   "n": "Clarisa",
   "t": "Farolera",
   "el": "Alba",
   "rar": 2,
   "hp": 238,
   "atk": 97,
   "def": 53,
   "hits": 3,
   "bb": {
    "n": "Hilera de luces",
    "tipo": "todos",
    "pot": 1.8
   }
  },
  "gallo": {
   "n": "Fray Gallo",
   "t": "Monje madrugador",
   "el": "Alba",
   "rar": 3,
   "hp": 290,
   "atk": 75,
   "def": 70,
   "hits": 2,
   "bb": {
    "n": "Canto del gallo",
    "tipo": "cura",
    "pot": 0.38
   }
  },
  "aurel": {
   "n": "Aurel",
   "t": "Caballero del espejo",
   "el": "Alba",
   "rar": 4,
   "hp": 506,
   "atk": 98,
   "def": 126,
   "hits": 2,
   "bb": {
    "n": "Reflejo",
    "tipo": "todos",
    "pot": 1.5
   }
  },
  "mielina": {
   "n": "Mielina",
   "t": "Apicultora",
   "el": "Alba",
   "rar": 3,
   "hp": 290,
   "atk": 75,
   "def": 70,
   "hits": 2,
   "bb": {
    "n": "Miel de luz",
    "tipo": "cura",
    "pot": 0.38
   }
  },
  "lucera": {
   "n": "Lucera",
   "t": "Astrónoma",
   "el": "Alba",
   "rar": 4,
   "hp": 310,
   "atk": 126,
   "def": 69,
   "hits": 3,
   "bb": {
    "n": "Lluvia de estrellas",
    "tipo": "todos",
    "pot": 1.8
   }
  },
  "sepia": {
   "n": "Sepia",
   "t": "Cartógrafa de sombras",
   "el": "Ocaso",
   "rar": 3,
   "hp": 300,
   "atk": 120,
   "def": 60,
   "hits": 3,
   "bb": {
    "n": "Círculo de tinta",
    "tipo": "uno",
    "pot": 3
   }
  },
  "matias": {
   "n": "Matías",
   "t": "El sereno",
   "el": "Ocaso",
   "rar": 3,
   "hp": 440,
   "atk": 85,
   "def": 110,
   "hits": 2,
   "bb": {
    "n": "Cerradura de sombra",
    "tipo": "todos",
    "pot": 1.5
   }
  },
  "polilla": {
   "n": "Polilla",
   "t": "Ladrona",
   "el": "Ocaso",
   "rar": 2,
   "hp": 229,
   "atk": 101,
   "def": 48,
   "hits": 5,
   "bb": {
    "n": "Golpe robado",
    "tipo": "uno",
    "pot": 2.9
   }
  },
  "urraca": {
   "n": "Doña Urraca",
   "t": "Coleccionista",
   "el": "Ocaso",
   "rar": 3,
   "hp": 270,
   "atk": 110,
   "def": 60,
   "hits": 3,
   "bb": {
    "n": "Lluvia de joyas",
    "tipo": "todos",
    "pot": 1.8
   }
  },
  "tanido": {
   "n": "Tañido",
   "t": "Campanero fantasma",
   "el": "Ocaso",
   "rar": 4,
   "hp": 310,
   "atk": 126,
   "def": 69,
   "hits": 3,
   "bb": {
    "n": "Campana rota",
    "tipo": "todos",
    "pot": 1.8
   }
  }
 },
 "ENEMIGOS": {
  "bulbo": {
   "n": "Bulbo espinoso",
   "el": "Bosque",
   "hp": 120,
   "atk": 34,
   "def": 20
  },
  "jabali": {
   "n": "Jabalí de musgo",
   "el": "Bosque",
   "hp": 170,
   "atk": 40,
   "def": 30
  },
  "hada_avispa": {
   "n": "Hada avispa",
   "el": "Bosque",
   "hp": 90,
   "atk": 46,
   "def": 15
  },
  "seta_saltarina": {
   "n": "Seta saltarina",
   "el": "Bosque",
   "hp": 200,
   "atk": 38,
   "def": 45
  },
  "espantapajaros": {
   "n": "Espantapájaros enraizado",
   "el": "Bosque",
   "hp": 110,
   "atk": 44,
   "def": 18
  },
  "cuervo_brezo": {
   "n": "Cuervo de brezo",
   "el": "Ocaso",
   "hp": 180,
   "atk": 42,
   "def": 30
  },
  "oveja_zarza": {
   "n": "Oveja de zarza",
   "el": "Bosque",
   "hp": 230,
   "atk": 38,
   "def": 55
  },
  "tocon": {
   "n": "Tocón gruñón",
   "el": "Bosque",
   "hp": 130,
   "atk": 50,
   "def": 20
  },
  "pastora_zarzas": {
   "n": "La Pastora de Zarzas",
   "el": "Bosque",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "ciervo_florido": {
   "n": "Ciervo de cornamenta florida",
   "el": "Bosque",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "roble_andante": {
   "n": "Viejo Roble Andante",
   "el": "Bosque",
   "hp": 1000,
   "atk": 56,
   "def": 50,
   "jefe": 1
  },
  "diablillo": {
   "n": "Diablillo de carbón",
   "el": "Brasa",
   "hp": 120,
   "atk": 34,
   "def": 20
  },
  "salamandra": {
   "n": "Salamandra de magma",
   "el": "Brasa",
   "hp": 170,
   "atk": 40,
   "def": 30
  },
  "minero_escoria": {
   "n": "Minero de escoria",
   "el": "Brasa",
   "hp": 90,
   "atk": 46,
   "def": 15
  },
  "murcielago_ceniza": {
   "n": "Murciélago de ceniza",
   "el": "Brasa",
   "hp": 200,
   "atk": 38,
   "def": 45
  },
  "vagoneta": {
   "n": "Vagoneta poseída",
   "el": "Brasa",
   "hp": 110,
   "atk": 44,
   "def": 18
  },
  "gusano_carbon": {
   "n": "Gusano de carbón",
   "el": "Brasa",
   "hp": 180,
   "atk": 42,
   "def": 30
  },
  "farol_errante": {
   "n": "Farol errante",
   "el": "Brasa",
   "hp": 230,
   "atk": 38,
   "def": 55
  },
  "capataz": {
   "n": "Capataz sin cara",
   "el": "Ocaso",
   "hp": 130,
   "atk": 50,
   "def": 20
  },
  "golem_vagonetas": {
   "n": "Gólem de vagonetas",
   "el": "Brasa",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "la_compuerta": {
   "n": "La Compuerta",
   "el": "Brasa",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "wyrm_fundicion": {
   "n": "Wyrm de la fundición",
   "el": "Brasa",
   "hp": 1000,
   "atk": 56,
   "def": 50,
   "jefe": 1
  },
  "cangrejo": {
   "n": "Cangrejo acorazado",
   "el": "Marea",
   "hp": 120,
   "atk": 34,
   "def": 20
  },
  "medusa": {
   "n": "Medusa voltaica",
   "el": "Rayo",
   "hp": 170,
   "atk": 40,
   "def": 30
  },
  "sirenido": {
   "n": "Sirénido pirata",
   "el": "Marea",
   "hp": 90,
   "atk": 46,
   "def": 15
  },
  "gaviota_tormenta": {
   "n": "Gaviota de tormenta",
   "el": "Rayo",
   "hp": 200,
   "atk": 38,
   "def": 45
  },
  "percebe": {
   "n": "Percebe gigante",
   "el": "Marea",
   "hp": 110,
   "atk": 44,
   "def": 18
  },
  "ancla_fantasma": {
   "n": "Ancla fantasma",
   "el": "Ocaso",
   "hp": 180,
   "atk": 42,
   "def": 30
  },
  "pulpo_tintorero": {
   "n": "Pulpo tintorero",
   "el": "Marea",
   "hp": 230,
   "atk": 38,
   "def": 55
  },
  "marinero_ahogado": {
   "n": "Marinero ahogado",
   "el": "Marea",
   "hp": 130,
   "atk": 50,
   "def": 20
  },
  "mascaron": {
   "n": "Mascarón de proa",
   "el": "Marea",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "kraken_sogas": {
   "n": "Kraken de sogas",
   "el": "Marea",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "leviatan": {
   "n": "Leviatán de la galerna",
   "el": "Rayo",
   "hp": 1000,
   "atk": 56,
   "def": 50,
   "jefe": 1
  },
  "chispa_errante": {
   "n": "Chispa errante",
   "el": "Rayo",
   "hp": 120,
   "atk": 34,
   "def": 20
  },
  "veleta": {
   "n": "Veleta viva",
   "el": "Rayo",
   "hp": 170,
   "atk": 40,
   "def": 30
  },
  "cuervo_cobre": {
   "n": "Cuervo de cobre",
   "el": "Rayo",
   "hp": 90,
   "atk": 46,
   "def": 15
  },
  "automata_oxidado": {
   "n": "Autómata oxidado",
   "el": "Rayo",
   "hp": 200,
   "atk": 38,
   "def": 45
  },
  "oveja_nube": {
   "n": "Oveja de tormenta",
   "el": "Rayo",
   "hp": 110,
   "atk": 44,
   "def": 18
  },
  "engranaje": {
   "n": "Engranaje rodante",
   "el": "Rayo",
   "hp": 180,
   "atk": 42,
   "def": 30
  },
  "aprendiz_bobina": {
   "n": "Aprendiz de bobina",
   "el": "Rayo",
   "hp": 230,
   "atk": 38,
   "def": 55
  },
  "cometa_dientes": {
   "n": "Cometa con dientes",
   "el": "Alba",
   "hp": 130,
   "atk": 50,
   "def": 20
  },
  "molino_desbocado": {
   "n": "Molino desbocado",
   "el": "Rayo",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "gemelos_pararrayos": {
   "n": "Los Gemelos Pararrayos",
   "el": "Rayo",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "coloso_bobinas": {
   "n": "Coloso de Bobinas",
   "el": "Rayo",
   "hp": 1000,
   "atk": 56,
   "def": 50,
   "jefe": 1
  },
  "titere": {
   "n": "Títere sin hilos",
   "el": "Ocaso",
   "hp": 120,
   "atk": 34,
   "def": 20
  },
  "payaso_serrin": {
   "n": "Payaso de serrín",
   "el": "Ocaso",
   "hp": 170,
   "atk": 40,
   "def": 30
  },
  "tragafuegos": {
   "n": "Tragafuegos",
   "el": "Brasa",
   "hp": 90,
   "atk": 46,
   "def": 15
  },
  "caballito": {
   "n": "Caballito de tiovivo",
   "el": "Alba",
   "hp": 200,
   "atk": 38,
   "def": 45
  },
  "oso_trapo": {
   "n": "Oso bailarín de trapo",
   "el": "Bosque",
   "hp": 110,
   "atk": 44,
   "def": 18
  },
  "mono_organillero": {
   "n": "Mono organillero",
   "el": "Rayo",
   "hp": 180,
   "atk": 42,
   "def": 30
  },
  "espejo_deformante": {
   "n": "Espejo deformante",
   "el": "Alba",
   "hp": 230,
   "atk": 38,
   "def": 55
  },
  "funambulista": {
   "n": "Funambulista sombra",
   "el": "Ocaso",
   "hp": 130,
   "atk": 50,
   "def": 20
  },
  "forzudo": {
   "n": "Forzudo de hojalata",
   "el": "Brasa",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "adivina": {
   "n": "La Adivina de la bola rota",
   "el": "Ocaso",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "maestro_pista": {
   "n": "Maestro de Pista",
   "el": "Ocaso",
   "hp": 1000,
   "atk": 56,
   "def": 50,
   "jefe": 1
  },
  "gota_centinela": {
   "n": "Gota centinela",
   "el": "Marea",
   "hp": 120,
   "atk": 34,
   "def": 20
  },
  "monje_piedra": {
   "n": "Monje de piedra",
   "el": "Alba",
   "hp": 170,
   "atk": 40,
   "def": 30
  },
  "carpa_voladora": {
   "n": "Carpa voladora",
   "el": "Marea",
   "hp": 90,
   "atk": 46,
   "def": 15
  },
  "farol_papel": {
   "n": "Farol de papel",
   "el": "Alba",
   "hp": 200,
   "atk": 38,
   "def": 45
  },
  "cabra_niebla": {
   "n": "Cabra de niebla",
   "el": "Marea",
   "hp": 110,
   "atk": 44,
   "def": 18
  },
  "campanilla_viva": {
   "n": "Campanilla viva",
   "el": "Alba",
   "hp": 180,
   "atk": 42,
   "def": 30
  },
  "escriba_tinta": {
   "n": "Escriba de tinta corrida",
   "el": "Ocaso",
   "hp": 230,
   "atk": 38,
   "def": 55
  },
  "grulla_papel": {
   "n": "Grulla de papel mojado",
   "el": "Marea",
   "hp": 130,
   "atk": 50,
   "def": 20
  },
  "hortelano_nubes": {
   "n": "El Hortelano de nubes",
   "el": "Marea",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "dragon_canalon": {
   "n": "Dragón de canalón",
   "el": "Marea",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "campana_ahogada": {
   "n": "La Campana Ahogada",
   "el": "Marea",
   "hp": 1000,
   "atk": 56,
   "def": 50,
   "jefe": 1
  },
  "escorpion_sal": {
   "n": "Escorpión de sal",
   "el": "Alba",
   "hp": 120,
   "atk": 34,
   "def": 20
  },
  "buitre_notario": {
   "n": "Buitre notario",
   "el": "Ocaso",
   "hp": 170,
   "atk": 40,
   "def": 30
  },
  "estatua_sal": {
   "n": "Estatua de sal",
   "el": "Alba",
   "hp": 90,
   "atk": 46,
   "def": 15
  },
  "caravanero": {
   "n": "Caravanero sin sombra",
   "el": "Ocaso",
   "hp": 200,
   "atk": 38,
   "def": 45
  },
  "lagarto_espejismo": {
   "n": "Lagarto espejismo",
   "el": "Marea",
   "hp": 110,
   "atk": 44,
   "def": 18
  },
  "monton_emblemas": {
   "n": "Montón de emblemas",
   "el": "Ocaso",
   "hp": 180,
   "atk": 42,
   "def": 30
  },
  "viento_cara": {
   "n": "Viento con cara",
   "el": "Alba",
   "hp": 230,
   "atk": 38,
   "def": 55
  },
  "camello_huesos": {
   "n": "Camello de huesos",
   "el": "Ocaso",
   "hp": 130,
   "atk": 50,
   "def": 20
  },
  "aduanero": {
   "n": "El Aduanero",
   "el": "Ocaso",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "esfinge_sal": {
   "n": "Esfinge de sal",
   "el": "Alba",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "recaudador": {
   "n": "Recaudador de Nombres",
   "el": "Ocaso",
   "hp": 1000,
   "atk": 56,
   "def": 50,
   "jefe": 1
  },
  "gargola": {
   "n": "Gárgola de vidriera",
   "el": "Alba",
   "hp": 120,
   "atk": 34,
   "def": 20
  },
  "espectro": {
   "n": "Espectro encapuchado",
   "el": "Ocaso",
   "hp": 170,
   "atk": 40,
   "def": 30
  },
  "armadura_hueca": {
   "n": "Armadura hueca",
   "el": "Ocaso",
   "hp": 90,
   "atk": 46,
   "def": 15
  },
  "cirio_andante": {
   "n": "Cirio andante",
   "el": "Alba",
   "hp": 200,
   "atk": 38,
   "def": 45
  },
  "organillo_tubos": {
   "n": "Tubos de órgano",
   "el": "Alba",
   "hp": 110,
   "atk": 44,
   "def": 18
  },
  "angel_escayola": {
   "n": "Ángel de escayola roto",
   "el": "Alba",
   "hp": 180,
   "atk": 42,
   "def": 30
  },
  "rata_sacristia": {
   "n": "Rata de sacristía",
   "el": "Ocaso",
   "hp": 230,
   "atk": 38,
   "def": 55
  },
  "incensario": {
   "n": "Incensario volador",
   "el": "Ocaso",
   "hp": 130,
   "atk": 50,
   "def": 20
  },
  "campanero_doble": {
   "n": "El Campanero doble",
   "el": "Ocaso",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "vidriera_mayor": {
   "n": "La Vidriera Mayor",
   "el": "Alba",
   "hp": 520,
   "atk": 48,
   "def": 40,
   "jefe": 1,
   "sub": 1
  },
  "arconte": {
   "n": "Arconte del Eclipse",
   "el": "Ocaso",
   "hp": 1000,
   "atk": 56,
   "def": 50,
   "jefe": 1
  },
  "arconte_desatado": {
   "n": "Arconte desatado",
   "el": "Ocaso",
   "hp": 1300,
   "atk": 62,
   "def": 50,
   "jefe": 1
  }
 },
 "ZONAS": [
  {
   "id": "colinas_brezo",
   "n": "Colinas de Brezo",
   "idea": "Ecos que nadie llamó y han echado raíces. Luz fija de atardecer.",
   "cielo": [
    "#5b4a7a",
    "#c98a5a",
    "#3f5a3a"
   ],
   "comunes": [
    "bulbo",
    "jabali",
    "hada_avispa",
    "seta_saltarina",
    "espantapajaros",
    "cuervo_brezo",
    "oveja_zarza",
    "tocon"
   ],
   "subjefes": [
    "pastora_zarzas",
    "ciervo_florido"
   ],
   "jefe": "roble_andante",
   "areas": [
    "El camino de brezo",
    "La linde",
    "Raíces viejas",
    "El cercado de zarzas",
    "El roble que anda"
   ]
  },
  {
   "id": "minas_brasa",
   "n": "Minas de Brasa",
   "idea": "Mineros que siguen su turno treinta años después. Calor y hierro.",
   "cielo": [
    "#2a1a1c",
    "#a8421f",
    "#3a2a26"
   ],
   "comunes": [
    "diablillo",
    "salamandra",
    "minero_escoria",
    "murcielago_ceniza",
    "vagoneta",
    "gusano_carbon",
    "farol_errante",
    "capataz"
   ],
   "subjefes": [
    "golem_vagonetas",
    "la_compuerta"
   ],
   "jefe": "wyrm_fundicion",
   "areas": [
    "Bocamina",
    "El turno eterno",
    "Galería del horno",
    "La compuerta",
    "La fundición"
   ]
  },
  {
   "id": "costa_tormenta",
   "n": "Costa de la Tormenta",
   "idea": "Una tormenta y un naufragio que no terminan nunca.",
   "cielo": [
    "#2c2a4a",
    "#5a5f8a",
    "#4a4a44"
   ],
   "comunes": [
    "cangrejo",
    "medusa",
    "sirenido",
    "gaviota_tormenta",
    "percebe",
    "ancla_fantasma",
    "pulpo_tintorero",
    "marinero_ahogado"
   ],
   "subjefes": [
    "mascaron",
    "kraken_sogas"
   ],
   "jefe": "leviatan",
   "areas": [
    "Olas paradas",
    "El naufragio",
    "El rompiente",
    "La bodega",
    "Ojo de la galerna"
   ]
  },
  {
   "id": "mesetas_pararrayos",
   "n": "Mesetas de Pararrayos",
   "idea": "Un rayo lleva treinta años parado en mitad del cielo. Torres, molinos y cobre.",
   "cielo": [
    "#4a3f6a",
    "#c9b45a",
    "#6a6238"
   ],
   "comunes": [
    "chispa_errante",
    "veleta",
    "cuervo_cobre",
    "automata_oxidado",
    "oveja_nube",
    "engranaje",
    "aprendiz_bobina",
    "cometa_dientes"
   ],
   "subjefes": [
    "molino_desbocado",
    "gemelos_pararrayos"
   ],
   "jefe": "coloso_bobinas",
   "areas": [
    "La meseta",
    "Campo de molinos",
    "El taller grande",
    "Las torres gemelas",
    "Bajo el rayo"
   ]
  },
  {
   "id": "feria_ultima_noche",
   "n": "Feria de la Última Noche",
   "idea": "Una feria ambulante cuya última función no acaba. Farolillos, serrín y humo.",
   "cielo": [
    "#1e1a34",
    "#a8483f",
    "#4a3a2c"
   ],
   "comunes": [
    "titere",
    "payaso_serrin",
    "tragafuegos",
    "caballito",
    "oso_trapo",
    "mono_organillero",
    "espejo_deformante",
    "funambulista"
   ],
   "subjefes": [
    "forzudo",
    "adivina"
   ],
   "jefe": "maestro_pista",
   "areas": [
    "La entrada",
    "Las barracas",
    "El tiovivo",
    "Entre bastidores",
    "La pista central"
   ]
  },
  {
   "id": "monasterio_lluvia",
   "n": "Monasterio de la Lluvia Colgada",
   "idea": "La lluvia se quedó suspendida en el aire. Montaña, piedra y campanas.",
   "cielo": [
    "#3a4a6a",
    "#9ab0c4",
    "#55605a"
   ],
   "comunes": [
    "gota_centinela",
    "monje_piedra",
    "carpa_voladora",
    "farol_papel",
    "cabra_niebla",
    "campanilla_viva",
    "escriba_tinta",
    "grulla_papel"
   ],
   "subjefes": [
    "hortelano_nubes",
    "dragon_canalon"
   ],
   "jefe": "campana_ahogada",
   "areas": [
    "La escalinata",
    "El huerto de nubes",
    "El claustro",
    "Los tejados",
    "El campanario"
   ]
  },
  {
   "id": "salinas_nombres",
   "n": "Salinas de los Nombres",
   "idea": "Un desierto de sal donde se amontonan los emblemas de quienes nadie recuerda.",
   "cielo": [
    "#5a4a6a",
    "#d8c8d0",
    "#b8b0a8"
   ],
   "comunes": [
    "escorpion_sal",
    "buitre_notario",
    "estatua_sal",
    "caravanero",
    "lagarto_espejismo",
    "monton_emblemas",
    "viento_cara",
    "camello_huesos"
   ],
   "subjefes": [
    "aduanero",
    "esfinge_sal"
   ],
   "jefe": "recaudador",
   "areas": [
    "La llanura",
    "La aduana",
    "El archivo de sal",
    "Las columnas",
    "La balanza"
   ]
  },
  {
   "id": "catedral_eclipse",
   "n": "Catedral del Eclipse",
   "idea": "Donde se paró el sol. Mitad luz dorada, mitad sombra violeta.",
   "cielo": [
    "#1c1830",
    "#b8943a",
    "#3a3444"
   ],
   "comunes": [
    "gargola",
    "espectro",
    "armadura_hueca",
    "cirio_andante",
    "organillo_tubos",
    "angel_escayola",
    "rata_sacristia",
    "incensario"
   ],
   "subjefes": [
    "campanero_doble",
    "vidriera_mayor"
   ],
   "jefe": "arconte",
   "areas": [
    "El atrio",
    "Nave de las vidrieras",
    "El coro",
    "La escalera",
    "Bajo el sol parado"
   ],
   "extra": "arconte_desatado"
  }
 ],
 "SE_UNE": {
  "0-0-0": "dalia",
  "0-0-2": "fenn",
  "1-1-4": "brakk",
  "2-1-4": "sirel",
  "2-4-4": "vesper",
  "3-0-4": "chispa",
  "4-0-4": "matias",
  "5-0-4": "aina",
  "6-0-4": "sepia",
  "7-1-4": "edrin"
 },
 "RECUERDOS": {
  "kael": [
   "Recuerda el calor: cerró la compuerta del horno desde dentro para que los demás salieran.",
   "Recuerda una cara entre los que salieron. Alguien le gritó su nombre."
  ],
  "dalia": [
   "Recuerda los nombres de todos sus vecinos, uno por uno.",
   "Recuerda que se quedó porque nadie más iba a acordarse."
  ],
  "fenn": [
   "Recuerda la primera flecha que acertó, y la mano de su maestro en el hombro.",
   "Recuerda que nunca llegó a darle las gracias."
  ],
  "sirel": [
   "Recuerda el nombre de su barco. No se lo dice a nadie.",
   "Recuerda que dio la orden de no abandonar a ninguno."
  ],
  "vesper": [
   "Recuerda por qué aceptó el primer recado.",
   "Recuerda que alguien le esperaba en casa aquella semana."
  ],
  "edrin": [
   "Recuerda una canción de cuna con la voz de su madre.",
   "Recuerda que le prometió volver a bajar a cenar."
  ]
 },
 "NOMBRES": {
  "odila": "Maestra Odila",
  "seren": "Seren",
  "narrador": "",
  "brina": "Brina",
  "hulda": "Capataz Hulda",
  "peio": "Contramaestre Peio",
  "calixta": "Ingeniera Calixta",
  "tramoya": "Don Tramoya",
  "benet": "Abad Benet",
  "ulmo": "Escribano Ulmo"
 },
 "ESCENAS": {
  "intro": [
   {
    "q": "narrador",
    "t": "En Auria el sol lleva treinta años a medio tapar. No amanece ni anochece. Y quien muere no se va del todo."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Así que eres tú quien ha pedido el turno de tarde. Aquí siempre es por la tarde, por si no te lo han dicho."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Quien muere deja un eco pegado a su emblema. Nuestro oficio es llamarlos. No son esclavos ni fantasmas: es gente a la que aún le queda algo por hacer."
   },
   {
    "q": "odila",
    "e": "decidido",
    "t": "Toma. A este hace años que nadie lo llama."
   },
   {
    "q": "kael",
    "e": "sorprendido",
    "t": "¿Eh? ¿Ya es de día? ... No, claro. Nunca lo es."
   },
   {
    "q": "kael",
    "e": "alegre",
    "t": "Kael. Escoltaba caravanas, creo. Lo último que recuerdo es calor. Mucho calor. ¿Vamos?"
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Las colinas de brezo están llenas de ecos que nadie llamó. Llevan tanto tiempo quietos que han echado raíces. Empezad por ahí."
   }
  ],
  "post-0-0-0": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Habéis sido cuidadosos con ellos. No todos los del gremio lo son."
   },
   {
    "q": "dalia",
    "e": "triste",
    "t": "Los que llamáis monstruos eran mis vecinos. Se quedaron tanto tiempo quietos que el bosque se los fue quedando."
   },
   {
    "q": "dalia",
    "e": "decidido",
    "t": "Voy con vosotros. Alguien tiene que acordarse de cómo se llamaban."
   }
  ],
  "post-0-0-2": [
   {
    "q": "kael",
    "e": "alegre",
    "t": "Lleva siguiéndonos desde el camino. ¡Sal, que no mordemos!"
   },
   {
    "q": "fenn",
    "e": "triste",
    "t": "El guardabosques era mi maestro. Ahora es el roble grande. Ya no me reconoce."
   },
   {
    "q": "fenn",
    "e": "decidido",
    "t": "Si alguien tiene que tumbarlo, quiero estar yo."
   }
  ],
  "pre-0-4-4": [
   {
    "q": "fenn",
    "e": "triste",
    "t": "Maestro. Soy yo. Lleva usted su sombrero colgado de una rama."
   },
   {
    "q": "kael",
    "e": "decidido",
    "t": "No nos oye, Fenn. Vamos a despertarlo a golpes, que es lo que se me da bien."
   }
  ],
  "post-0-4-4": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Ya está. Ha soltado las raíces."
   },
   {
    "q": "fenn",
    "e": "triste",
    "t": "Antes de irse me ha mirado. Ha dicho: «ya era hora»."
   },
   {
    "q": "kael",
    "e": "sorprendido",
    "t": "¿Irse? ¿Los ecos se pueden ir?"
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Cuando terminan lo que les quedaba por hacer, sí. Es lo que debería pasar. Lo raro es que hagan falta treinta años y una paliza."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Yo no sé qué me queda por hacer."
   },
   {
    "q": "odila",
    "e": "decidido",
    "t": "Lo sabrás. Tu nombre está en el registro de bajas de las Minas de Brasa. Yo empezaría por ahí."
   }
  ],
  "pre-1-0-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Este calor. Es este."
   },
   {
    "q": "dalia",
    "e": "triste",
    "t": "Los picos siguen sonando ahí abajo. Treinta años picando sin saber que el turno acabó."
   }
  ],
  "post-1-2-4": [
   {
    "q": "kael",
    "e": "sorprendido",
    "t": "Ya me acuerdo. No escoltaba la caravana: la saqué de aquí."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "El horno iba a reventar. Cerré la compuerta desde dentro para que salieran los demás. Salieron. Yo no."
   },
   {
    "q": "kael",
    "e": "alegre",
    "t": "Pues no está mal, ¿no? Siempre pensé que habría muerto de algo tonto."
   }
  ],
  "pre-1-4-4": [
   {
    "q": "kael",
    "e": "decidido",
    "t": "El horno sigue encendido porque ellos lo siguen alimentando. Y lo que vive dentro lleva treinta años engordando."
   }
  ],
  "post-1-4-4": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "La compuerta está cerrada. Esta vez por fuera."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "Maestra, ya he hecho lo que me quedaba. ¿Por qué sigo aquí?"
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "Porque nadie puede irse mientras el sol esté parado. Podéis cerrar vuestros asuntos, pero la puerta sigue atrancada."
   },
   {
    "q": "odila",
    "e": "decidido",
    "t": "Quien la atrancó está en la catedral. Era de los nuestros. La mejor. Pero antes está la costa, y allí la tormenta tampoco pasa."
   }
  ],
  "pre-2-0-0": [
   {
    "q": "dalia",
    "e": "sorprendido",
    "t": "Mirad las olas. Están quietas, a medio romper."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Hay un barco ahí. Lleva treinta años naufragando y todavía no ha terminado."
   }
  ],
  "post-2-1-4": [
   {
    "q": "sirel",
    "e": "alegre",
    "t": "¡Por fin alguien con piernas! Capitana Sirel. Mi barco y yo llevamos media vida hundiéndonos y ya aburre."
   },
   {
    "q": "sirel",
    "e": "enfadado",
    "t": "Esa anguila con cuernos se bebe cada rayo de la tormenta. Mientras siga ahí, mi tripulación ni toca fondo ni sale a flote."
   },
   {
    "q": "sirel",
    "e": "decidido",
    "t": "Os llevo hasta ella. A cambio, cuando vayáis a la catedral, yo voy delante."
   }
  ],
  "post-2-4-4": [
   {
    "q": "sirel",
    "e": "triste",
    "t": "Han tocado fondo. Todos. Se ha oído el casco asentarse."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Yo me quedo un rato más. Tengo una cuenta con quien paró el sol: nos quitó hasta el derecho a ahogarnos en paz."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Bonito discurso. Ella os espera, por cierto. Os espera desde que despertasteis al roble."
   },
   {
    "q": "kael",
    "e": "enfadado",
    "t": "¿Y tú quién eres?"
   },
   {
    "q": "vesper",
    "e": "alegre",
    "t": "El que le lleva los recados. Hasta hoy."
   }
  ],
  "pre-7-0-0": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Seren era archivera, como vuestra maestra. Su hijo enfermó el invierno del eclipse."
   },
   {
    "q": "vesper",
    "e": "triste",
    "t": "No quiso que se fuera. Así que atrancó la puerta para todos. Yo morí esa misma semana. Llevo treinta años pagándole un favor que nunca pedí."
   }
  ],
  "post-7-1-4": [
   {
    "q": "edrin",
    "e": "alegre",
    "t": "¿Venís a ver a mi madre? Está arriba. Dice que hoy tampoco puede bajar a cenar."
   },
   {
    "q": "edrin",
    "e": "neutral",
    "t": "Yo canto para que los de las vidrieras no estén tristes. Llevo cantando... no sé. Un rato largo."
   },
   {
    "q": "dalia",
    "e": "triste",
    "t": "Tiene veinte años. Los tiene desde hace treinta."
   }
  ],
  "pre-7-4-4": [
   {
    "q": "seren",
    "e": "neutral",
    "t": "Odila os ha enseñado bien. Siempre fue mejor maestra que yo."
   },
   {
    "q": "seren",
    "e": "triste",
    "t": "Sé lo que he hecho. Cada eco atrapado en una raíz o en un horno es cosa mía. Lo sé todos los días."
   },
   {
    "q": "seren",
    "e": "decidido",
    "t": "Y volvería a hacerlo. Si soltáis el sol, mi hijo se va. Y los vuestros: el chico de la bufanda, la druida, la capitana. Todos. ¿Lo habéis pensado?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Lo llevo pensando desde las minas."
   },
   {
    "q": "seren",
    "e": "enfadado",
    "t": "Entonces no vengáis a explicarme lo que es justo."
   }
  ],
  "post-7-4-4": [
   {
    "q": "seren",
    "e": "triste",
    "t": "Ya no puedo sostenerlo. Te lo dejo a ti. No a un elegido: a quien estaba de turno."
   },
   {
    "q": "kael",
    "e": "alegre",
    "t": "Decidas lo que decidas, ha estado bien que me llamaras."
   }
  ],
  "post-0-2-4": [
   {
    "q": "brina",
    "e": "neutral",
    "t": "Les traigo pan cada tarde. No comen, claro. Pero el ciervo era mi marido y a mí no me cuesta nada."
   },
   {
    "q": "brina",
    "e": "decidido",
    "t": "Si vais a soltarlos, hacedlo bien. Con nombre y apellido, que no son alimañas."
   }
  ],
  "post-1-1-4": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Treinta años dándole al mismo yunque. Creía que era un lunes muy largo."
   },
   {
    "q": "hulda",
    "e": "triste",
    "t": "Yo sigo pasando lista. Falta uno. Siempre falta el mismo."
   },
   {
    "q": "kael",
    "e": "sorprendido",
    "t": "..."
   },
   {
    "q": "brakk",
    "e": "decidido",
    "t": "Voy con vosotros. Ese horno hay que apagarlo con algo más que agua."
   }
  ],
  "pre-3-0-0": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "No corráis. La catedral no abre mientras queden cuatro cerrojos echados."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Un rayo que no cae, una función que no acaba, una lluvia que no llega al suelo, nombres que nadie lee. Seren los dejó así: que nada empuje la puerta."
   },
   {
    "q": "kael",
    "e": "alegre",
    "t": "Cuatro sitios donde las cosas no terminan. Empieza a ser lo nuestro."
   },
   {
    "q": "calixta",
    "e": "enfadado",
    "t": "¡Eh! Si venís a mirar el rayo, poneos a la cola. Mi abuela se murió esperando a que cayera."
   }
  ],
  "post-3-0-4": [
   {
    "q": "calixta",
    "e": "alegre",
    "t": "Ese lo hice yo con piezas del taller. Se llama Chispa. Le di cuerda y ya no supe pararlo."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Lleváoslo. Aquí arriba solo aprende a esperar, y de eso ya sabemos todos."
   }
  ],
  "post-3-4-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El rayo cae. Treinta años tarde, sobre la torre para la que nació."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "A su luz se lee lo que hay grabado en la piedra: «Perdonadme. Es solo un momento.»"
   },
   {
    "q": "calixta",
    "e": "alegre",
    "t": "Ha caído y las torres han aguantado. Abuela, han aguantado."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "La silla está vacía."
   },
   {
    "q": "calixta",
    "e": "triste",
    "t": "Ya. Tenía prisa por contárselo a alguien."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Un cerrojo. Quedan tres."
   }
  ],
  "pre-4-0-0": [
   {
    "q": "tramoya",
    "e": "sorprendido",
    "t": "¡Público! ¡Hay público! Chsss, no digáis nada, que si el Maestro se entera no os deja salir."
   },
   {
    "q": "tramoya",
    "e": "triste",
    "t": "Era la última función de la gira. Alguien dijo «que no se acabe nunca». Y miren ustedes."
   }
  ],
  "post-4-0-4": [
   {
    "q": "matias",
    "e": "neutral",
    "t": "Las doce y sereno. Bueno, las doce no. La hora que sea desde hace treinta años."
   },
   {
    "q": "matias",
    "e": "decidido",
    "t": "Yo cerraba la feria cada noche. Esta no me ha dejado. Vengo con ustedes y de paso llevo las llaves."
   }
  ],
  "post-4-4-4": [
   {
    "q": "narrador",
    "t": "Cae el telón. Los feriantes saludan, y esta vez la sonrisa no está pintada."
   },
   {
    "q": "tramoya",
    "e": "alegre",
    "t": "¿Han visto qué saludo? Treinta años ensayándolo sin querer."
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Aplaudan un poco, hagan el favor. Aunque sea bajito."
   }
  ],
  "pre-5-0-0": [
   {
    "q": "benet",
    "e": "neutral",
    "t": "Cuidado con la cabeza. Las gotas no caen, pero mojan igual si uno se las lleva por delante."
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Rezábamos pidiendo lluvia cuando se paró el sol. Nos la concedieron a medias. Desde entonces desconfío de las oraciones con prisa."
   }
  ],
  "post-5-0-4": [
   {
    "q": "aina",
    "e": "alegre",
    "t": "¿Vais a subir al campanario? ¡Voy! Yo tocaba a lluvia. Me quedé con la campana en la mano y el brazo en alto."
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Llévensela. Tararea. Treinta años tarareando lo mismo."
   }
  ],
  "post-5-4-4": [
   {
    "q": "narrador",
    "t": "La campana suena una vez, entera. Y la lluvia cae de golpe, toda la que debía."
   },
   {
    "q": "benet",
    "e": "alegre",
    "t": "Pues ya llueve. Mira que era fácil."
   },
   {
    "q": "benet",
    "e": "triste",
    "t": "Los hermanos están en el patio, mojándose. Déjenlos un rato. Luego se irán solos."
   }
  ],
  "pre-6-0-0": [
   {
    "q": "ulmo",
    "e": "triste",
    "t": "Aquí vienen a parar los emblemas de la gente a la que ya no nombra nadie. Yo los apunto. No doy abasto."
   },
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "El Recaudador dice que un nombre sin dueño es suyo. Lleva treinta años cobrándoselos."
   }
  ],
  "post-6-0-4": [
   {
    "q": "sepia",
    "e": "neutral",
    "t": "Estoy trazando el mapa de dónde está cada uno. Voy por la mitad de la mitad."
   },
   {
    "q": "sepia",
    "e": "decidido",
    "t": "Si vais a por el de la balanza, os enseño el camino corto. Lo tengo dibujado."
   }
  ],
  "post-6-4-4": [
   {
    "q": "narrador",
    "t": "Ulmo lee. Uno a uno. Con cada nombre, un emblema se enciende y sube."
   },
   {
    "q": "ulmo",
    "e": "alegre",
    "t": "Así sí. En voz alta y sin correr. Así sí se acuerda uno."
   },
   {
    "q": "vesper",
    "e": "triste",
    "t": "Cuatro cerrojos. Ya no queda nada que sujete la puerta, salvo ella."
   },
   {
    "q": "kael",
    "e": "decidido",
    "t": "Pues vamos a hablar con ella."
   }
  ]
 },
 "FINALES": {
  "amanecer": {
   "n": "Soltar el sol",
   "d": "Amanece. Todos los ecos pueden irse por fin, también los tuyos.",
   "texto": "El disco se aparta y amanece por primera vez en treinta años. En la plaza, uno a uno, los tuyos se despiden. Kael se va el último, riéndose de algo. Los emblemas se quedan contigo: ya no pesan, pero no están vacíos."
  },
  "tarde": {
   "n": "Dejarlo como está",
   "d": "El sol sigue parado. Nadie se va. Ocupas el sitio de Seren.",
   "texto": "Subes al sitio de Seren y sostienes el eclipse. Ella baja por fin a cenar con su hijo. Nadie se va de Auria, y nadie descansa. Desde arriba ves la plaza, siempre a la misma hora."
  },
  "eleccion": {
   "n": "Que decida cada uno",
   "d": "Abres la puerta sin empujar a nadie. El sol avanza un poco con cada despedida.",
   "texto": "Desatrancas la puerta y no empujas a nadie. Con cada eco que elige irse, el sol avanza un palmo. Unos se van esa tarde. Otros tardan años. Seren y Edrin se quedan hasta el final, y tú con ellos, llevando el registro."
  }
 },
 "ENTRADAS": {
  "0-0": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El camino sale del gremio y se mete en el brezo. A los lados, bultos con forma de planta. Uno parpadea."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Maestra, ¿por qué mi emblema estaba el último del cajón?"
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Porque pesaba. Camina."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y el aprendiz no dice nada?"
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "El aprendiz mira. Aprende tú, que llevas treinta años de retraso."
   }
  ],
  "0-1": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Ese espantapájaros lleva la chaqueta de mi vecino."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿La lleva él… o es él?"
   },
   {
    "q": "dalia",
    "e": "triste",
    "t": "Tasio. No se la quitaba ni para dormir."
   }
  ],
  "0-2": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Mi maestro marcaba los troncos. Estas marcas son de esta semana."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Entonces sigue enseñando a alguien."
   }
  ],
  "0-3": [
   {
    "q": "brina",
    "e": "neutral",
    "t": "El ciervo de las flores era mi Tomé. Cada primavera me deja la cornamenta llena."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Tendremos cuidado, señora."
   },
   {
    "q": "brina",
    "e": "neutral",
    "t": "No. Tened prisa. Cuidado ya he tenido yo."
   }
  ],
  "0-4": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Hay un sombrero en la rama más alta. Nunca se lo vi quitarse."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Cómo se llama tu maestro?"
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Roque."
   },
   {
    "q": "kael",
    "e": "alegre",
    "t": "Roque, el roble."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Los chistes ya los hizo él todos. Treinta años antes que tú."
   }
  ],
  "1-1": [
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Turno de noche: sesenta y dos. Presentes: sesenta y uno."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Quién falta?"
   },
   {
    "q": "hulda",
    "e": "triste",
    "t": "Uno que cerró una puerta."
   }
  ],
  "1-2": [
   {
    "q": "kael",
    "e": "sorprendido",
    "t": "Conozco este pasillo. Lo conozco corriendo."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Hacia fuera?"
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "Hacia dentro."
   }
  ],
  "1-3": [
   {
    "q": "e:la_compuerta",
    "t": "CERRADA. DESDE. DENTRO."
   },
   {
    "q": "kael",
    "e": "enfadado",
    "t": "Eso ya lo sé. Dime quién se quedó mirando desde fuera."
   }
  ],
  "1-4": [
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Aquella noche salió una mujer con el libro de registro. No miró atrás."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Cómo era?"
   },
   {
    "q": "hulda",
    "e": "decidido",
    "t": "Llevaba un lápiz clavado en el moño."
   }
  ],
  "2-1": [
   {
    "q": "peio",
    "e": "neutral",
    "t": "La capitana dio una orden rara: «que nadie salte»."
   },
   {
    "q": "peio",
    "e": "triste",
    "t": "Llevamos treinta años obedeciéndola."
   }
  ],
  "2-2": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Aquella noche llevaba una pasajera. Sola. Con prisa por llegar a la catedral."
   },
   {
    "q": "kael",
    "e": "sorprendido",
    "t": "¿Llegó?"
   },
   {
    "q": "sirel",
    "e": "triste",
    "t": "Ella sí."
   }
  ],
  "2-3": [
   {
    "q": "sirel",
    "e": "enfadado",
    "t": "En la bodega hay un cofre que no es mío. Tiene un sol tapado en la cerradura."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Como mi emblema."
   }
  ],
  "2-4": [
   {
    "q": "sirel",
    "e": "decidido",
    "t": "Si esa cosa habla, no escuchéis. Dice nombres."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿El de quién?"
   },
   {
    "q": "sirel",
    "e": "triste",
    "t": "El que más miedo te dé oír."
   }
  ],
  "3-1": [
   {
    "q": "calixta",
    "e": "enfadado",
    "t": "Mi abuela juraba que el rayo no se paró solo. Que alguien lo sujetó desde aquí abajo."
   }
  ],
  "3-2": [
   {
    "q": "calixta",
    "e": "neutral",
    "t": "En el taller hay un banco con dos nombres grabados. Seren, y otro tachado."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Tachado con qué?"
   },
   {
    "q": "calixta",
    "e": "sorprendido",
    "t": "Con un lápiz. Muy fuerte."
   }
  ],
  "3-3": [
   {
    "q": "vesper",
    "e": "triste",
    "t": "Los gemelos eran sus aprendices. Les prometió que sería solo un momento."
   }
  ],
  "3-4": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Cuando caiga el rayo, mirad la torre, no el cielo. Hay algo escrito que solo se lee con esa luz."
   }
  ],
  "4-1": [
   {
    "q": "tramoya",
    "e": "triste",
    "t": "En la última función había una butaca reservada. Fila uno. No vino nadie."
   }
  ],
  "4-2": [
   {
    "q": "tramoya",
    "e": "sorprendido",
    "t": "El tiovivo gira al revés desde aquella noche. Todos los caballos miran a la catedral."
   }
  ],
  "4-3": [
   {
    "q": "e:adivina",
    "t": "Tú, el de la bufanda. Ya te leí la mano una vez. Te dije que no entraras."
   },
   {
    "q": "kael",
    "e": "sorprendido",
    "t": "¿Y qué hice?"
   },
   {
    "q": "e:adivina",
    "t": "Reírte."
   }
  ],
  "4-4": [
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "El Maestro no mueve los hilos. Mirad arriba: alguien los dejó atados y se fue."
   }
  ],
  "5-1": [
   {
    "q": "benet",
    "e": "neutral",
    "t": "Dos archiveras subieron aquí aquella tarde. Bajó una."
   }
  ],
  "5-2": [
   {
    "q": "benet",
    "e": "neutral",
    "t": "En el claustro hay una gota más grande que las demás. Dentro se ve una cara."
   },
   {
    "q": "dalia",
    "e": "sorprendido",
    "t": "¿De un monje?"
   },
   {
    "q": "benet",
    "e": "triste",
    "t": "De nadie de esta casa."
   }
  ],
  "5-3": [
   {
    "q": "benet",
    "e": "neutral",
    "t": "La que bajó dejó una nota: «No pude. Que lo haga otro»."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Otro?"
   },
   {
    "q": "benet",
    "e": "alegre",
    "t": "Treinta años después, llegáis vosotros."
   }
  ],
  "5-4": [
   {
    "q": "benet",
    "e": "enfadado",
    "t": "La campana no se hundió sola. La hundieron, para que nadie tocara a difuntos."
   }
  ],
  "6-1": [
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "El Aduanero deja pasar todos los nombres menos uno. Dice que ese ya está pagado."
   }
  ],
  "6-2": [
   {
    "q": "ulmo",
    "e": "sorprendido",
    "t": "He encontrado tu ficha, chico. Causa de la baja: «voluntaria». Firma del registro: una O."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "Una O."
   }
  ],
  "6-3": [
   {
    "q": "kael",
    "e": "enfadado",
    "t": "Maestra. Usted estaba en la mina."
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "Estaba. Y salí."
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "Guardé tu emblema treinta años porque no sabía qué decirte."
   }
  ],
  "6-4": [
   {
    "q": "odila",
    "e": "triste",
    "t": "Seren y yo íbamos a parar el sol un instante. Para despedirnos de los nuestros."
   },
   {
    "q": "odila",
    "e": "decidido",
    "t": "Yo solté. Ella no."
   }
  ],
  "7-1": [
   {
    "q": "vesper",
    "e": "triste",
    "t": "Arriba canta alguien. Lleva treinta años en la misma estrofa y no sabe que la repite."
   }
  ],
  "7-2": [
   {
    "q": "odila",
    "e": "neutral",
    "t": "Esa vidriera la pagamos entre las dos. La mitad clara es suya."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y la oscura?"
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "También. Yo solo puse el plomo."
   }
  ],
  "7-3": [
   {
    "q": "seren",
    "e": "neutral",
    "t": "Odila. Has tardado."
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "Me daba vergüenza subir."
   },
   {
    "q": "seren",
    "e": "triste",
    "t": "A mí me da vergüenza bajar."
   }
  ],
  "7-4": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Ahí está el reloj. De pie. Y ella con las dos manos encima."
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "No las ha quitado en treinta años. Mírale los nudillos."
   }
  ]
 },
 "RUMORES": [
  [
   "Dicen que el roble contesta si le hablas de usted.",
   "Las ovejas de zarza siguen yendo cada tarde al mismo cercado vacío.",
   "Hay quien deja la puerta abierta por si el suyo vuelve a cenar.",
   "Nadie ha visto anochecer aquí. Los viejos ya no saben describirlo."
  ],
  [
   "Abajo siguen fichando a su hora. El reloj de la bocamina lleva treinta años en las siete.",
   "Cuentan que una vagoneta sube sola cada noche hasta la puerta, y se vuelve.",
   "El calor viene de un sitio concreto. Los mineros no lo nombran.",
   "Uno de los picos lleva un nombre grabado que nadie del turno reconoce."
  ],
  [
   "Las olas llevan treinta años a punto de romper. Los pescadores ya ni las miran.",
   "Se oye un silbato de contramaestre con la marea baja.",
   "Dicen que la tormenta tiene un ojo, y que el ojo mira hacia tierra.",
   "En la arena aparecen huellas de botas que salen del agua y no vuelven."
  ],
  [
   "El rayo sigue ahí arriba. Los niños de la meseta creen que es parte del cielo.",
   "Los relojes del taller marcan todos una hora distinta. Uno solo acierta.",
   "Alguien engrasa las torres cada noche. Nadie le ha visto la cara.",
   "Las veletas no señalan el viento. Señalan a la catedral."
  ],
  [
   "La feria no desmonta porque nadie ha dado la orden de desmontar.",
   "El payaso de serrín llora serrín. Barren cada mañana.",
   "Quien se mira en el espejo deformante se ve con la edad que tenía aquella noche.",
   "Hay una carpa cerrada a la que no entra ni el Maestro."
  ],
  [
   "Los monjes apartan las gotas con la mano al pasar, por costumbre.",
   "La lluvia colgada no moja la tumba del último abad.",
   "Se oye una campana por debajo del agua, muy despacio.",
   "Las grullas de papel llevan un nombre escrito por dentro."
  ],
  [
   "Cada emblema del montón fue alguien. El viento a veces los ordena.",
   "El Recaudador no cobra oro. Cobra que te olviden.",
   "Hay caravanas que cruzan la salina sin sombra, y saludan.",
   "Dicen que si lees un nombre en voz alta, pesa menos."
  ],
  [
   "Las vidrieras rotas siguen dando luz de colores, pero al revés.",
   "En el coro falta siempre la misma voz.",
   "La mitad de la catedral está de día. La otra mitad no lo sabe.",
   "Arriba hay una mesa puesta para dos desde hace treinta años."
  ]
 ],
 "MATS": {
  "mat_brasa_1": {
   "n": "Esquirla de carbón incandescente",
   "el": "Brasa",
   "nivel": 1,
   "ico": "ico_mat_brasa_1"
  },
  "mat_brasa_2": {
   "n": "Fragmento de carbón incandescente",
   "el": "Brasa",
   "nivel": 2,
   "ico": "ico_mat_brasa_2"
  },
  "mat_brasa_3": {
   "n": "Núcleo de carbón incandescente",
   "el": "Brasa",
   "nivel": 3,
   "ico": "ico_mat_brasa_3"
  },
  "leg_brasa_1": {
   "n": "Rescoldo eterno",
   "el": "Brasa",
   "nivel": 4,
   "ico": "ico_leg_brasa_1"
  },
  "leg_brasa_2": {
   "n": "Hierro de compuerta",
   "el": "Brasa",
   "nivel": 4,
   "ico": "ico_leg_brasa_2"
  },
  "leg_brasa_3": {
   "n": "Aliento del wyrm",
   "el": "Brasa",
   "nivel": 4,
   "ico": "ico_leg_brasa_3"
  },
  "mat_marea_1": {
   "n": "Esquirla de coral azul",
   "el": "Marea",
   "nivel": 1,
   "ico": "ico_mat_marea_1"
  },
  "mat_marea_2": {
   "n": "Fragmento de coral azul",
   "el": "Marea",
   "nivel": 2,
   "ico": "ico_mat_marea_2"
  },
  "mat_marea_3": {
   "n": "Núcleo de coral azul",
   "el": "Marea",
   "nivel": 3,
   "ico": "ico_mat_marea_3"
  },
  "leg_marea_1": {
   "n": "Perla de galerna",
   "el": "Marea",
   "nivel": 4,
   "ico": "ico_leg_marea_1"
  },
  "leg_marea_2": {
   "n": "Madera del naufragio",
   "el": "Marea",
   "nivel": 4,
   "ico": "ico_leg_marea_2"
  },
  "leg_marea_3": {
   "n": "Escama del leviatán",
   "el": "Marea",
   "nivel": 4,
   "ico": "ico_leg_marea_3"
  },
  "mat_bosque_1": {
   "n": "Esquirla de ámbar",
   "el": "Bosque",
   "nivel": 1,
   "ico": "ico_mat_bosque_1"
  },
  "mat_bosque_2": {
   "n": "Fragmento de ámbar",
   "el": "Bosque",
   "nivel": 2,
   "ico": "ico_mat_bosque_2"
  },
  "mat_bosque_3": {
   "n": "Núcleo de ámbar",
   "el": "Bosque",
   "nivel": 3,
   "ico": "ico_mat_bosque_3"
  },
  "leg_bosque_1": {
   "n": "Savia del roble",
   "el": "Bosque",
   "nivel": 4,
   "ico": "ico_leg_bosque_1"
  },
  "leg_bosque_2": {
   "n": "Flor de cornamenta",
   "el": "Bosque",
   "nivel": 4,
   "ico": "ico_leg_bosque_2"
  },
  "leg_bosque_3": {
   "n": "Espina madre",
   "el": "Bosque",
   "nivel": 4,
   "ico": "ico_leg_bosque_3"
  },
  "mat_rayo_1": {
   "n": "Esquirla de cuarzo de chispa",
   "el": "Rayo",
   "nivel": 1,
   "ico": "ico_mat_rayo_1"
  },
  "mat_rayo_2": {
   "n": "Fragmento de cuarzo de chispa",
   "el": "Rayo",
   "nivel": 2,
   "ico": "ico_mat_rayo_2"
  },
  "mat_rayo_3": {
   "n": "Núcleo de cuarzo de chispa",
   "el": "Rayo",
   "nivel": 3,
   "ico": "ico_mat_rayo_3"
  },
  "leg_rayo_1": {
   "n": "Chispa del rayo quieto",
   "el": "Rayo",
   "nivel": 4,
   "ico": "ico_leg_rayo_1"
  },
  "leg_rayo_2": {
   "n": "Cobre de torre",
   "el": "Rayo",
   "nivel": 4,
   "ico": "ico_leg_rayo_2"
  },
  "leg_rayo_3": {
   "n": "Corazón de bobina",
   "el": "Rayo",
   "nivel": 4,
   "ico": "ico_leg_rayo_3"
  },
  "mat_alba_1": {
   "n": "Esquirla de vidrio claro",
   "el": "Alba",
   "nivel": 1,
   "ico": "ico_mat_alba_1"
  },
  "mat_alba_2": {
   "n": "Fragmento de vidrio claro",
   "el": "Alba",
   "nivel": 2,
   "ico": "ico_mat_alba_2"
  },
  "mat_alba_3": {
   "n": "Núcleo de vidrio claro",
   "el": "Alba",
   "nivel": 3,
   "ico": "ico_mat_alba_3"
  },
  "leg_alba_1": {
   "n": "Vidrio de amanecer",
   "el": "Alba",
   "nivel": 4,
   "ico": "ico_leg_alba_1"
  },
  "leg_alba_2": {
   "n": "Pluma de gallo blanco",
   "el": "Alba",
   "nivel": 4,
   "ico": "ico_leg_alba_2"
  },
  "leg_alba_3": {
   "n": "Luz embotellada",
   "el": "Alba",
   "nivel": 4,
   "ico": "ico_leg_alba_3"
  },
  "mat_ocaso_1": {
   "n": "Esquirla de obsidiana",
   "el": "Ocaso",
   "nivel": 1,
   "ico": "ico_mat_ocaso_1"
  },
  "mat_ocaso_2": {
   "n": "Fragmento de obsidiana",
   "el": "Ocaso",
   "nivel": 2,
   "ico": "ico_mat_ocaso_2"
  },
  "mat_ocaso_3": {
   "n": "Núcleo de obsidiana",
   "el": "Ocaso",
   "nivel": 3,
   "ico": "ico_mat_ocaso_3"
  },
  "leg_ocaso_1": {
   "n": "Sombra plegada",
   "el": "Ocaso",
   "nivel": 4,
   "ico": "ico_leg_ocaso_1"
  },
  "leg_ocaso_2": {
   "n": "Plata de media luna",
   "el": "Ocaso",
   "nivel": 4,
   "ico": "ico_leg_ocaso_2"
  },
  "leg_ocaso_3": {
   "n": "Borde de eclipse",
   "el": "Ocaso",
   "nivel": 4,
   "ico": "ico_leg_ocaso_3"
  },
  "trofeo_0": {
   "n": "Trofeo de Colinas de Brezo",
   "el": null,
   "nivel": 5,
   "region": 0,
   "ico": "ico_trofeo_colinas_brezo"
  },
  "trofeo_1": {
   "n": "Trofeo de Minas de Brasa",
   "el": null,
   "nivel": 5,
   "region": 1,
   "ico": "ico_trofeo_minas_brasa"
  },
  "trofeo_2": {
   "n": "Trofeo de Costa de la Tormenta",
   "el": null,
   "nivel": 5,
   "region": 2,
   "ico": "ico_trofeo_costa_tormenta"
  },
  "trofeo_3": {
   "n": "Trofeo de Mesetas de Pararrayos",
   "el": null,
   "nivel": 5,
   "region": 3,
   "ico": "ico_trofeo_mesetas_pararrayos"
  },
  "trofeo_4": {
   "n": "Trofeo de Feria de la Última Noche",
   "el": null,
   "nivel": 5,
   "region": 4,
   "ico": "ico_trofeo_feria_ultima_noche"
  },
  "trofeo_5": {
   "n": "Trofeo de Monasterio de la Lluvia Colgada",
   "el": null,
   "nivel": 5,
   "region": 5,
   "ico": "ico_trofeo_monasterio_lluvia"
  },
  "trofeo_6": {
   "n": "Trofeo de Salinas de los Nombres",
   "el": null,
   "nivel": 5,
   "region": 6,
   "ico": "ico_trofeo_salinas_nombres"
  },
  "trofeo_7": {
   "n": "Trofeo de Catedral del Eclipse",
   "el": null,
   "nivel": 5,
   "region": 7,
   "ico": "ico_trofeo_catedral_eclipse"
  },
  "sello_incursion": {
   "n": "Sello de incursión",
   "el": null,
   "nivel": 6,
   "ico": "ico_sello_gremio"
  }
 },
 "ITEMS": {
  "arma_brasa_1": {
   "n": "Tizón afilado",
   "tipo": "arma",
   "el": "Brasa",
   "nivel": 1,
   "ico": "ico_arma_brasa_1",
   "bonus": {
    "atk": 0.05
   },
   "receta": {
    "oro": 400,
    "mats": {
     "mat_brasa_1": 8
    }
   }
  },
  "arma_brasa_2": {
   "n": "Espada de fragua",
   "tipo": "arma",
   "el": "Brasa",
   "nivel": 2,
   "ico": "ico_arma_brasa_2",
   "bonus": {
    "atk": 0.09,
    "raf": 0.08
   },
   "receta": {
    "oro": 3000,
    "mats": {
     "mat_brasa_1": 10,
     "mat_brasa_2": 8,
     "mat_brasa_3": 2,
     "sello_incursion": 1
    }
   }
  },
  "arma_brasa_3": {
   "n": "Ascua Primera",
   "tipo": "arma",
   "el": "Brasa",
   "nivel": 3,
   "unico": 1,
   "ico": "ico_arma_brasa_3",
   "bonus": {
    "atk": 0.14,
    "raf": 0.15,
    "bbIni": 30
   },
   "receta": {
    "oro": 20000,
    "mats": {
     "mat_brasa_3": 5,
     "leg_brasa_1": 5,
     "leg_brasa_2": 5,
     "leg_brasa_3": 5,
     "sello_incursion": 5
    }
   }
  },
  "eq_anillo_brasa": {
   "n": "Anillo de brasa",
   "tipo": "equipo",
   "el": "Brasa",
   "nivel": 1,
   "ico": "ico_rel_anillo_brasa",
   "bonus": {
    "hp": 0.08,
    "res": {
     "Brasa": 0.12
    }
   },
   "receta": {
    "oro": 1200,
    "mats": {
     "mat_brasa_1": 6,
     "mat_brasa_2": 4
    }
   }
  },
  "arma_marea_1": {
   "n": "Arpón de coral",
   "tipo": "arma",
   "el": "Marea",
   "nivel": 1,
   "ico": "ico_arma_marea_1",
   "bonus": {
    "atk": 0.05
   },
   "receta": {
    "oro": 400,
    "mats": {
     "mat_marea_1": 8
    }
   }
  },
  "arma_marea_2": {
   "n": "Tridente de marea",
   "tipo": "arma",
   "el": "Marea",
   "nivel": 2,
   "ico": "ico_arma_marea_2",
   "bonus": {
    "atk": 0.09,
    "raf": 0.08
   },
   "receta": {
    "oro": 3000,
    "mats": {
     "mat_marea_1": 10,
     "mat_marea_2": 8,
     "mat_marea_3": 2,
     "sello_incursion": 1
    }
   }
  },
  "arma_marea_3": {
   "n": "Marea Detenida",
   "tipo": "arma",
   "el": "Marea",
   "nivel": 3,
   "unico": 1,
   "ico": "ico_arma_marea_3",
   "bonus": {
    "atk": 0.14,
    "raf": 0.15,
    "bbIni": 30
   },
   "receta": {
    "oro": 20000,
    "mats": {
     "mat_marea_3": 5,
     "leg_marea_1": 5,
     "leg_marea_2": 5,
     "leg_marea_3": 5,
     "sello_incursion": 5
    }
   }
  },
  "eq_colgante_marea": {
   "n": "Colgante de marea",
   "tipo": "equipo",
   "el": "Marea",
   "nivel": 1,
   "ico": "ico_rel_colgante_marea",
   "bonus": {
    "hp": 0.08,
    "res": {
     "Marea": 0.12
    }
   },
   "receta": {
    "oro": 1200,
    "mats": {
     "mat_marea_1": 6,
     "mat_marea_2": 4
    }
   }
  },
  "arma_bosque_1": {
   "n": "Vara de espino",
   "tipo": "arma",
   "el": "Bosque",
   "nivel": 1,
   "ico": "ico_arma_bosque_1",
   "bonus": {
    "atk": 0.05
   },
   "receta": {
    "oro": 400,
    "mats": {
     "mat_bosque_1": 8
    }
   }
  },
  "arma_bosque_2": {
   "n": "Arco de madera viva",
   "tipo": "arma",
   "el": "Bosque",
   "nivel": 2,
   "ico": "ico_arma_bosque_2",
   "bonus": {
    "atk": 0.09,
    "raf": 0.08
   },
   "receta": {
    "oro": 3000,
    "mats": {
     "mat_bosque_1": 10,
     "mat_bosque_2": 8,
     "mat_bosque_3": 2,
     "sello_incursion": 1
    }
   }
  },
  "arma_bosque_3": {
   "n": "Raíz Madre",
   "tipo": "arma",
   "el": "Bosque",
   "nivel": 3,
   "unico": 1,
   "ico": "ico_arma_bosque_3",
   "bonus": {
    "atk": 0.14,
    "raf": 0.15,
    "bbIni": 30
   },
   "receta": {
    "oro": 20000,
    "mats": {
     "mat_bosque_3": 5,
     "leg_bosque_1": 5,
     "leg_bosque_2": 5,
     "leg_bosque_3": 5,
     "sello_incursion": 5
    }
   }
  },
  "eq_brazal_bosque": {
   "n": "Brazal de bosque",
   "tipo": "equipo",
   "el": "Bosque",
   "nivel": 1,
   "ico": "ico_rel_brazal_bosque",
   "bonus": {
    "hp": 0.08,
    "res": {
     "Bosque": 0.12
    }
   },
   "receta": {
    "oro": 1200,
    "mats": {
     "mat_bosque_1": 6,
     "mat_bosque_2": 4
    }
   }
  },
  "arma_rayo_1": {
   "n": "Punta de cobre",
   "tipo": "arma",
   "el": "Rayo",
   "nivel": 1,
   "ico": "ico_arma_rayo_1",
   "bonus": {
    "atk": 0.05
   },
   "receta": {
    "oro": 400,
    "mats": {
     "mat_rayo_1": 8
    }
   }
  },
  "arma_rayo_2": {
   "n": "Lanza pararrayos",
   "tipo": "arma",
   "el": "Rayo",
   "nivel": 2,
   "ico": "ico_arma_rayo_2",
   "bonus": {
    "atk": 0.09,
    "raf": 0.08
   },
   "receta": {
    "oro": 3000,
    "mats": {
     "mat_rayo_1": 10,
     "mat_rayo_2": 8,
     "mat_rayo_3": 2,
     "sello_incursion": 1
    }
   }
  },
  "arma_rayo_3": {
   "n": "Rayo Inmóvil",
   "tipo": "arma",
   "el": "Rayo",
   "nivel": 3,
   "unico": 1,
   "ico": "ico_arma_rayo_3",
   "bonus": {
    "atk": 0.14,
    "raf": 0.15,
    "bbIni": 30
   },
   "receta": {
    "oro": 20000,
    "mats": {
     "mat_rayo_3": 5,
     "leg_rayo_1": 5,
     "leg_rayo_2": 5,
     "leg_rayo_3": 5,
     "sello_incursion": 5
    }
   }
  },
  "eq_guante_rayo": {
   "n": "Guante de rayo",
   "tipo": "equipo",
   "el": "Rayo",
   "nivel": 1,
   "ico": "ico_rel_guante_rayo",
   "bonus": {
    "hp": 0.08,
    "res": {
     "Rayo": 0.12
    }
   },
   "receta": {
    "oro": 1200,
    "mats": {
     "mat_rayo_1": 6,
     "mat_rayo_2": 4
    }
   }
  },
  "arma_alba_1": {
   "n": "Hoja clara",
   "tipo": "arma",
   "el": "Alba",
   "nivel": 1,
   "ico": "ico_arma_alba_1",
   "bonus": {
    "atk": 0.05
   },
   "receta": {
    "oro": 400,
    "mats": {
     "mat_alba_1": 8
    }
   }
  },
  "arma_alba_2": {
   "n": "Maza del alba",
   "tipo": "arma",
   "el": "Alba",
   "nivel": 2,
   "ico": "ico_arma_alba_2",
   "bonus": {
    "atk": 0.09,
    "raf": 0.08
   },
   "receta": {
    "oro": 3000,
    "mats": {
     "mat_alba_1": 10,
     "mat_alba_2": 8,
     "mat_alba_3": 2,
     "sello_incursion": 1
    }
   }
  },
  "arma_alba_3": {
   "n": "Primer Amanecer",
   "tipo": "arma",
   "el": "Alba",
   "nivel": 3,
   "unico": 1,
   "ico": "ico_arma_alba_3",
   "bonus": {
    "atk": 0.14,
    "raf": 0.15,
    "bbIni": 30
   },
   "receta": {
    "oro": 20000,
    "mats": {
     "mat_alba_3": 5,
     "leg_alba_1": 5,
     "leg_alba_2": 5,
     "leg_alba_3": 5,
     "sello_incursion": 5
    }
   }
  },
  "eq_broche_alba": {
   "n": "Broche de alba",
   "tipo": "equipo",
   "el": "Alba",
   "nivel": 1,
   "ico": "ico_rel_broche_alba",
   "bonus": {
    "hp": 0.08,
    "res": {
     "Alba": 0.12
    }
   },
   "receta": {
    "oro": 1200,
    "mats": {
     "mat_alba_1": 6,
     "mat_alba_2": 4
    }
   }
  },
  "arma_ocaso_1": {
   "n": "Hoz mellada",
   "tipo": "arma",
   "el": "Ocaso",
   "nivel": 1,
   "ico": "ico_arma_ocaso_1",
   "bonus": {
    "atk": 0.05
   },
   "receta": {
    "oro": 400,
    "mats": {
     "mat_ocaso_1": 8
    }
   }
  },
  "arma_ocaso_2": {
   "n": "Guadaña de ocaso",
   "tipo": "arma",
   "el": "Ocaso",
   "nivel": 2,
   "ico": "ico_arma_ocaso_2",
   "bonus": {
    "atk": 0.09,
    "raf": 0.08
   },
   "receta": {
    "oro": 3000,
    "mats": {
     "mat_ocaso_1": 10,
     "mat_ocaso_2": 8,
     "mat_ocaso_3": 2,
     "sello_incursion": 1
    }
   }
  },
  "arma_ocaso_3": {
   "n": "Eclipse",
   "tipo": "arma",
   "el": "Ocaso",
   "nivel": 3,
   "unico": 1,
   "ico": "ico_arma_ocaso_3",
   "bonus": {
    "atk": 0.14,
    "raf": 0.15,
    "bbIni": 30
   },
   "receta": {
    "oro": 20000,
    "mats": {
     "mat_ocaso_3": 5,
     "leg_ocaso_1": 5,
     "leg_ocaso_2": 5,
     "leg_ocaso_3": 5,
     "sello_incursion": 5
    }
   }
  },
  "eq_mascara_ocaso": {
   "n": "Máscara de ocaso",
   "tipo": "equipo",
   "el": "Ocaso",
   "nivel": 1,
   "ico": "ico_rel_mascara_ocaso",
   "bonus": {
    "hp": 0.08,
    "res": {
     "Ocaso": 0.12
    }
   },
   "receta": {
    "oro": 1200,
    "mats": {
     "mat_ocaso_1": 6,
     "mat_ocaso_2": 4
    }
   }
  },
  "eq_botas_viaje": {
   "n": "Botas de viaje",
   "tipo": "equipo",
   "el": null,
   "nivel": 2,
   "ico": "ico_rel_botas_viaje",
   "bonus": {
    "bbIni": 20
   },
   "receta": {
    "oro": 800,
    "mats": {
     "mat_rayo_1": 5,
     "mat_bosque_1": 5
    }
   }
  },
  "eq_capa_remiendos": {
   "n": "Capa de remiendos",
   "tipo": "equipo",
   "el": null,
   "nivel": 2,
   "ico": "ico_rel_capa_remiendos",
   "bonus": {
    "hp": 0.06
   },
   "receta": {
    "oro": 800,
    "mats": {
     "mat_bosque_1": 5,
     "mat_ocaso_1": 5
    }
   }
  },
  "eq_cinturon_herrero": {
   "n": "Cinturón de herrero",
   "tipo": "equipo",
   "el": null,
   "nivel": 2,
   "ico": "ico_rel_cinturon_herrero",
   "bonus": {
    "def": 0.08
   },
   "receta": {
    "oro": 800,
    "mats": {
     "mat_brasa_1": 6,
     "mat_marea_1": 4
    }
   }
  },
  "eq_yelmo_viejo": {
   "n": "Yelmo viejo",
   "tipo": "equipo",
   "el": null,
   "nivel": 2,
   "ico": "ico_rel_yelmo_viejo",
   "bonus": {
    "def": 0.05,
    "hp": 0.03
   },
   "receta": {
    "oro": 800,
    "mats": {
     "mat_brasa_1": 4,
     "mat_alba_1": 6
    }
   }
  },
  "eq_llave_maestra": {
   "n": "Llave maestra",
   "tipo": "equipo",
   "el": null,
   "nivel": 2,
   "ico": "ico_rel_llave_maestra",
   "bonus": {
    "atk": 0.04
   },
   "receta": {
    "oro": 1500,
    "mats": {
     "mat_ocaso_1": 6,
     "mat_rayo_2": 3
    }
   }
  },
  "eq_catalejo": {
   "n": "Catalejo",
   "tipo": "equipo",
   "el": null,
   "nivel": 2,
   "ico": "ico_rel_catalejo",
   "bonus": {
    "atk": 0.05
   },
   "receta": {
    "oro": 2500,
    "mats": {
     "mat_marea_2": 5,
     "mat_alba_2": 3
    }
   }
  },
  "eq_farol_sereno": {
   "n": "Farol del sereno",
   "tipo": "equipo",
   "el": null,
   "nivel": 2,
   "ico": "ico_rel_farol_sereno",
   "bonus": {
    "raf": 0.06
   },
   "receta": {
    "oro": 2500,
    "mats": {
     "mat_ocaso_2": 5,
     "mat_brasa_2": 3
    }
   }
  },
  "eq_pluma_cartografa": {
   "n": "Pluma de cartógrafa",
   "tipo": "equipo",
   "el": null,
   "nivel": 2,
   "ico": "ico_rel_pluma_cartografa",
   "bonus": {
    "atk": 0.03,
    "raf": 0.04
   },
   "receta": {
    "oro": 2500,
    "mats": {
     "mat_ocaso_2": 4,
     "mat_marea_2": 4
    }
   }
  },
  "eq_campanilla": {
   "n": "Campanilla de plata",
   "tipo": "equipo",
   "el": null,
   "nivel": 2,
   "ico": "ico_rel_campanilla",
   "bonus": {
    "hp": 0.04,
    "def": 0.04
   },
   "receta": {
    "oro": 2500,
    "mats": {
     "mat_alba_2": 5,
     "mat_marea_2": 3
    }
   }
  },
  "eq_reloj_parado": {
   "n": "Reloj parado",
   "tipo": "equipo",
   "el": null,
   "nivel": 2,
   "ico": "ico_rel_reloj_parado",
   "bonus": {
    "bbIni": 35
   },
   "receta": {
    "oro": 4000,
    "mats": {
     "mat_rayo_2": 6,
     "mat_rayo_3": 2
    }
   }
  },
  "eq_amuleto_roble": {
   "n": "Amuleto del roble",
   "tipo": "equipo",
   "el": null,
   "nivel": 3,
   "ico": "ico_rel_amuleto_roble",
   "bonus": {
    "hp": 0.1
   },
   "receta": {
    "oro": 5000,
    "mats": {
     "trofeo_0": 3,
     "sello_incursion": 2
    }
   }
  },
  "eq_diente_wyrm": {
   "n": "Diente del wyrm",
   "tipo": "equipo",
   "el": null,
   "nivel": 3,
   "ico": "ico_rel_diente_wyrm",
   "bonus": {
    "atk": 0.08
   },
   "receta": {
    "oro": 5000,
    "mats": {
     "trofeo_1": 3,
     "sello_incursion": 2
    }
   }
  },
  "eq_escama_leviatan": {
   "n": "Escama del leviatán",
   "tipo": "equipo",
   "el": null,
   "nivel": 3,
   "ico": "ico_rel_escama_leviatan",
   "bonus": {
    "def": 0.1
   },
   "receta": {
    "oro": 5000,
    "mats": {
     "trofeo_2": 3,
     "sello_incursion": 2
    }
   }
  },
  "eq_engranaje_coloso": {
   "n": "Engranaje del coloso",
   "tipo": "equipo",
   "el": null,
   "nivel": 3,
   "ico": "ico_rel_engranaje_coloso",
   "bonus": {
    "bbIni": 40
   },
   "receta": {
    "oro": 5000,
    "mats": {
     "trofeo_3": 3,
     "sello_incursion": 2
    }
   }
  },
  "eq_hilo_marioneta": {
   "n": "Hilo de marioneta",
   "tipo": "equipo",
   "el": null,
   "nivel": 3,
   "ico": "ico_rel_hilo_marioneta",
   "bonus": {
    "raf": 0.1
   },
   "receta": {
    "oro": 5000,
    "mats": {
     "trofeo_4": 3,
     "sello_incursion": 2
    }
   }
  },
  "eq_badajo": {
   "n": "Badajo de bronce",
   "tipo": "equipo",
   "el": null,
   "nivel": 3,
   "ico": "ico_rel_badajo",
   "bonus": {
    "hp": 0.06,
    "def": 0.06
   },
   "receta": {
    "oro": 5000,
    "mats": {
     "trofeo_5": 3,
     "sello_incursion": 2
    }
   }
  },
  "eq_balanza_pequena": {
   "n": "Balanza pequeña",
   "tipo": "equipo",
   "el": null,
   "nivel": 3,
   "ico": "ico_rel_balanza_pequena",
   "bonus": {
    "atk": 0.04,
    "hp": 0.04,
    "def": 0.04
   },
   "receta": {
    "oro": 5000,
    "mats": {
     "trofeo_6": 3,
     "sello_incursion": 2
    }
   }
  },
  "eq_fragmento_eclipse": {
   "n": "Fragmento de eclipse",
   "tipo": "equipo",
   "el": null,
   "nivel": 3,
   "ico": "ico_rel_fragmento_eclipse",
   "bonus": {
    "atk": 0.06,
    "raf": 0.08
   },
   "receta": {
    "oro": 5000,
    "mats": {
     "trofeo_7": 3,
     "sello_incursion": 2
    }
   }
  }
 },
 "PASOS": {
  "0-0-1": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Ese bulbo guarda una alianza entre las hojas. Era la panadera."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y sigue casada?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Pregúntaselo cuando la sueltes."
   }
  ],
  "0-0-2": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Oigo pasos detrás desde la última curva."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Yo también. Pisa como quien conoce el monte."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Amigo o merienda?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "La merienda no hace ruido."
   }
  ],
  "0-0-3": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "No toquéis los troncos marcados. Mi maestro los marcaba para no talarlos."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y los que no tienen marca?"
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Esos son los que se mueven."
   }
  ],
  "0-0-4": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Aquí se acaba el camino de las ovejas. Más allá ya nadie subía a buscarlos."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "¿Y a mí? ¿Vino alguien a buscarme?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Alguien guardó tu emblema treinta años. Eso es venir despacio."
   }
  ],
  "0-1-1": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "En los bolsillos de la chaqueta hay semillas. Seguía sembrando."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Por eso crece trigo entre el brezo."
   }
  ],
  "0-1-2": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Zarzas trenzadas. Eso no lo hace el monte: lo hace alguien con paciencia."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "La pastora trenzaba así el pelo de sus hijas."
   }
  ],
  "0-1-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Las ovejas nos miran y no huyen."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Esperan a que alguien las cuente. Sin contar no se van a dormir."
   }
  ],
  "0-1-4": [
   {
    "q": "e:pastora_zarzas",
    "e": "neutral",
    "t": "Treinta y siete. Treinta y ocho. Falta una. Siempre falta una."
   },
   {
    "q": "dalia",
    "e": "triste",
    "t": "No falta ninguna, Marga. La que falta eres tú."
   }
  ],
  "0-2-1": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Aquí me enseñó a leer el musgo. El norte, la lluvia, quién ha pasado."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y qué dice ahora?"
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Que ha pasado él. Arrastrando los pies."
   }
  ],
  "0-2-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Las raíces salen del suelo y vuelven a entrar, como puntadas."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Está cosiendo el bosque para que no se le vaya nadie."
   }
  ],
  "0-2-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Fenn. Si lo despertamos y no quiere irse, ¿qué?"
   },
   {
    "q": "fenn",
    "e": "decidido",
    "t": "Entonces me quedo con él. Pero que lo elija despierto."
   }
  ],
  "0-2-4": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Esta marca es mía. La hice mal, con ocho años, y él no la corrigió."
   },
   {
    "q": "dalia",
    "e": "alegre",
    "t": "Ni la ha dejado tapar en treinta."
   }
  ],
  "0-3-1": [
   {
    "q": "brina",
    "e": "neutral",
    "t": "Le traigo pan porque el día que se paró el sol íbamos a merendar."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Y él lo sabe?"
   },
   {
    "q": "brina",
    "e": "neutral",
    "t": "Huele el pan y agacha la cabeza. Algo sabe."
   }
  ],
  "0-3-2": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Las flores de sus cuernos no son del monte. Son de jardín."
   },
   {
    "q": "brina",
    "e": "neutral",
    "t": "De mi ventana. Me las va robando para acordarse."
   }
  ],
  "0-3-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Señora Brina, si lo soltamos ya no vendrá por las tardes."
   },
   {
    "q": "brina",
    "e": "triste",
    "t": "Hijo, llevo treinta años merendando sola delante de él. Eso tampoco es que venga."
   }
  ],
  "0-3-4": [
   {
    "q": "brina",
    "e": "neutral",
    "t": "Tomé. Mírame. Hoy el pan lo he hecho como a ti te gusta: quemado."
   },
   {
    "q": "dalia",
    "e": "sorprendido",
    "t": "Ha levantado la cabeza."
   }
  ],
  "0-4-1": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Dejó de hablarme el día del eclipse. Dijo: «Espera aquí, voy a ver qué le pasa al cielo»."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y?"
   },
   {
    "q": "fenn",
    "e": "triste",
    "t": "Esperé."
   }
  ],
  "0-4-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "El suelo late. Despacio, como quien duerme la siesta."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Pues lo siento por el despertador."
   }
  ],
  "0-4-3": [
   {
    "q": "odila",
    "e": "neutral",
    "t": "El guardabosques fue el primero en echar raíces. Los demás lo imitaron: si el viejo se queda, nos quedamos."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Entonces, si él suelta…"
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Sueltan todos. Por eso os mandé aquí primero."
   }
  ],
  "1-0-1": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Sé dónde está cada escalón sin mirar. No sé cómo me llamaba mi madre, pero esto sí."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "El cuerpo se acuerda antes."
   }
  ],
  "1-0-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Los faroles se apartan a tu paso."
   },
   {
    "q": "kael",
    "e": "sorprendido",
    "t": "Me hacen sitio. Como a un capataz."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "O como a un entierro."
   }
  ],
  "1-0-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Aquí se colgaba una chapa con el nombre al entrar y se recogía al salir."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Queda una colgada."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "No la leas todavía."
   }
  ],
  "1-0-4": [
   {
    "q": "hulda",
    "e": "neutral",
    "t": "¡Alto! Nadie baja sin apuntarse. Nombre."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Kael."
   },
   {
    "q": "hulda",
    "e": "sorprendido",
    "t": "…Ese ya lo tengo. En la otra columna."
   }
  ],
  "1-1-1": [
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Les digo que el turno acabó y me miran como si les quitara el jornal."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y a usted quién le dijo que acabó?"
   },
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Nadie. Por eso sigo pasando lista."
   }
  ],
  "1-1-2": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Ese martilleo no es de pico. Es de fragua."
   },
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Brakk. Treinta años arreglando la misma vagoneta. Dice que hace un ruido raro."
   }
  ],
  "1-1-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Las vagonetas entran llenas y salen vacías."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Devuelven el carbón al horno. Lo están cebando."
   }
  ],
  "1-1-4": [
   {
    "q": "hulda",
    "e": "neutral",
    "t": "La grande se ha comido tres raíles y a un mozo."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Cómo se para?"
   },
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Aquella noche la paró uno poniéndose delante. No lo recomiendo."
   }
  ],
  "1-2-1": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Tú eres el de la escolta. Te dije que no bajaras, que eso era cosa de mineros."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y qué contesté?"
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Nada. Bajaste."
   }
  ],
  "1-2-2": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Hay huellas de carro saliendo. Muchas. Y unas de botas que van al revés."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Son de tu número."
   }
  ],
  "1-2-3": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Sacaste a sesenta y uno. Los conté al pasar, uno por uno, con el martillo en la mano."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "Entonces sí faltaba uno."
   }
  ],
  "1-2-4": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "El calor viene de detrás de esa pared. Me suena a algo que dije."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Qué dijiste?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "«Cerrad cuando pase el último.» Y el último no iba a ser yo."
   }
  ],
  "1-3-1": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "La forjé yo. Cierra por los dos lados, pero el cerrojo de dentro pesa el doble."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Por qué?"
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Porque nadie iba a ser tan burro de echarlo."
   }
  ],
  "1-3-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Hay marcas de dedos en el hierro. Por fuera."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Alguien empujó para abrirme."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "O se apoyó a llorar. Dejan la misma marca."
   }
  ],
  "1-3-3": [
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Fuera quedó una mujer con un libro. Apuntó la hora, cerró el libro y se fue despacio."
   },
   {
    "q": "kael",
    "e": "enfadado",
    "t": "¿Apuntó la hora?"
   },
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Era su oficio, chico. Alguien tiene que apuntar."
   }
  ],
  "1-3-4": [
   {
    "q": "e:la_compuerta",
    "e": "neutral",
    "t": "NO. SE. ABRE. ORDEN. DE. QUIEN. CERRÓ."
   },
   {
    "q": "kael",
    "e": "decidido",
    "t": "Quien cerró soy yo. Y he cambiado de idea."
   }
  ],
  "1-4-1": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "El wyrm era una lagartija de las que se calentaban junto al crisol. Les echábamos migas."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Treinta años de migas."
   }
  ],
  "1-4-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "El carbón que traen no arde. Son emblemas apagados."
   },
   {
    "q": "hulda",
    "e": "triste",
    "t": "Los de los que no encontramos. Los echan al horno para que no se pierdan. No saben hacer otra cosa."
   }
  ],
  "1-4-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "La maestra Odila lleva un lápiz en el moño."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Muchas mujeres llevan lápiz."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Ya. Luego se lo pregunto. Ahora no, que me tiembla la mano."
   }
  ],
  "2-0-1": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "La espuma está dura. Se puede andar por encima."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "No mires abajo."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Ya he mirado. Hay gente con los ojos abiertos."
   }
  ],
  "2-0-2": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Las gaviotas abren el pico y no sale nada."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "El grito va de camino. Lleva treinta años llegando."
   }
  ],
  "2-0-3": [
   {
    "q": "peio",
    "e": "neutral",
    "t": "¡Eh, los de tierra! ¿Traéis hora? Aquí son las siete menos algo desde que me acuerdo."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "En todas partes son las siete menos algo."
   },
   {
    "q": "peio",
    "e": "triste",
    "t": "Vaya. Creía que era cosa nuestra."
   }
  ],
  "2-0-4": [
   {
    "q": "peio",
    "e": "neutral",
    "t": "El barco está a un grito. Pero el mascarón no deja subir a quien no esté en el rol."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y cómo se apunta uno?"
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "Ahogándose, de momento."
   }
  ],
  "2-1-1": [
   {
    "q": "peio",
    "e": "neutral",
    "t": "La capitana está en el puente con el catalejo. No lo ha bajado en treinta años."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Qué mira?"
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "La catedral. Dice que le deben una explicación."
   }
  ],
  "2-1-2": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Los botes están sin arriar. Enteros."
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "«Que nadie salte.» Sabía que nos quedaríamos a medias en el aire. Como las olas."
   }
  ],
  "2-1-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Siguen achicando un agua que no sube."
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "Si paramos, pensamos. Y aquí nadie quiere pensar."
   }
  ],
  "2-1-4": [
   {
    "q": "e:mascaron",
    "e": "neutral",
    "t": "Rol de a bordo: cuarenta almas y una pasajera. Vosotros no constáis."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Apúntanos como visita."
   }
  ],
  "2-2-1": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Pagó el pasaje con la llave de un archivo. Le dije que valía poco. Dijo: «Ya no voy a volver a abrir esa puerta»."
   }
  ],
  "2-2-2": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "No durmió. Pasó la travesía escribiendo una carta y tachándola."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿A quién?"
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Empezaba por «Hijo». No leí más. Soy pirata, no cotilla."
   }
  ],
  "2-2-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Las rocas tienen nombres rascados."
   },
   {
    "q": "sirel",
    "e": "triste",
    "t": "Los de los míos. Los rasco yo, por si alguien los busca."
   }
  ],
  "2-2-4": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Desembarcó aquí, con el mar ya quieto. Se fue andando sobre las olas sin mirar atrás."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "En esta historia hay mucha gente que no mira atrás."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Mirar atrás es de quien puede volver."
   }
  ],
  "2-3-1": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "El cofre lo subió la pasajera. Pesaba como un hombre y no dejó que nadie lo tocara."
   }
  ],
  "2-3-2": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "No tiene llave. Tiene un hueco con forma de emblema."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Prueba el tuyo."
   },
   {
    "q": "kael",
    "e": "sorprendido",
    "t": "…Encaja. Pero no gira."
   }
  ],
  "2-3-3": [
   {
    "q": "peio",
    "e": "neutral",
    "t": "Las sogas se soltaron solas la noche del eclipse y fueron a enroscarse al cofre. Como perros a un amo."
   }
  ],
  "2-3-4": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Si el kraken lo guarda, es que dentro hay algo que no quiere irse."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "O alguien."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Niña, no me des ideas, que duermo encima."
   }
  ],
  "2-4-1": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "El cofre se ha abierto. Dos huecos de terciopelo. En uno, un reloj de arena tumbado. El otro está vacío."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "El que falta se lo llevó ella bajo el brazo."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Y el tumbado, ¿quién lo tumbó?"
   }
  ],
  "2-4-2": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "La galerna tiene un ojo, y en el ojo no llueve. Ahí vive la bestia: en el único sitio seco del mar."
   }
  ],
  "2-4-3": [
   {
    "q": "e:leviatan",
    "e": "neutral",
    "t": "Kael. Kael de la compuerta. Nadie vino."
   },
   {
    "q": "kael",
    "e": "enfadado",
    "t": "Vino alguien. Tarde, pero vino. Calla y sal."
   }
  ],
  "2-4-4": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Cuando caiga, mi gente tocará fondo. No me miréis así: un marinero necesita fondo."
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "Capitana. Ha sido un honor hundirse con usted."
   },
   {
    "q": "sirel",
    "e": "alegre",
    "t": "Hundirse, Peio. Por fin en pasado."
   }
  ],
  "3-0-1": [
   {
    "q": "calixta",
    "e": "neutral",
    "t": "¿Veis esa raya blanca? Es el rayo. Tiene la punta a un palmo del pararrayos."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Un palmo?"
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Lo mido cada año. Un palmo."
   }
  ],
  "3-0-2": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Seren estudió aquí antes de ser archivera. Decía que el tiempo es una corriente y que toda corriente tiene interruptor."
   },
   {
    "q": "calixta",
    "e": "enfadado",
    "t": "¿La conoces?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Le llevo los recados. Llevaba."
   }
  ],
  "3-0-3": [
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Mi abuela subía cada tarde con una silla. «Hoy cae», decía. Se murió sentada, mirando arriba."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Y su eco?"
   },
   {
    "q": "calixta",
    "e": "triste",
    "t": "Sigue en la silla. No me atrevo a llamarla hasta tener algo que enseñarle."
   }
  ],
  "3-0-4": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Ese muñeco de hojalata nos sigue."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Es mío. Lo hice para que esperara por mí y yo pudiera dormir."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "¿Y funciona?"
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Él espera. Yo no duermo."
   }
  ],
  "3-1-1": [
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. Viento: cero. Molinos girando: todos. Conclusión: tic."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Giran con el viento de hace treinta años. Lo tienen guardado."
   }
  ],
  "3-1-2": [
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Los cables de los molinos no van a las casas. Van todos al taller grande."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Parar el sol gasta mucho. Lo pagó esta meseta entera, sin saberlo."
   }
  ],
  "3-1-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Las ovejas echan chispas cuando se rozan."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "No las juntes."
   },
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. Demasiado tarde. Tic."
   }
  ],
  "3-1-4": [
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Ese molino se soltó del eje la noche del eclipse. Desde entonces busca algo que moler."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y qué muele?"
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Las tardes. Por eso aquí pasan tan despacio."
   }
  ],
  "3-2-1": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "No preguntéis de quién es el nombre tachado. Yo pregunté una vez."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Me tuvo treinta años de recadero."
   }
  ],
  "3-2-2": [
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Los planos tienen dos letras. Una dibuja fino. La otra aprieta el lápiz hasta romper el papel."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "He visto apretar así un lápiz. No me acuerdo dónde."
   }
  ],
  "3-2-3": [
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. Hallazgo: dos tazas en el banco. Una con poso. Una limpia. Tic."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Una de las dos se fue antes de acabarse el café."
   }
  ],
  "3-2-4": [
   {
    "q": "calixta",
    "e": "neutral",
    "t": "El interruptor eran dos relojes de arena. Hacen falta dos personas: una por reloj."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Vimos uno, tumbado, en el fondo del mar."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "El otro sigue de pie en la catedral. Por eso estamos como estamos."
   }
  ],
  "3-3-1": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Se llamaban Pol y Nela. Sujetan un cable cada uno desde entonces. Ella les dijo: «No soltéis hasta que yo vuelva»."
   },
   {
    "q": "calixta",
    "e": "triste",
    "t": "Y no ha vuelto."
   }
  ],
  "3-3-2": [
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Entre las torres hay ropa tendida. Sigue húmeda."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Treinta años secándose."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Aquí todo está a punto de."
   }
  ],
  "3-3-3": [
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. Los gemelos preguntan la hora cada minuto. Respondo: la misma. Dicen: gracias. Tic."
   }
  ],
  "3-3-4": [
   {
    "q": "e:gemelos_pararrayos",
    "e": "neutral",
    "t": "¿Venís de su parte? ¿Podemos soltar ya?"
   },
   {
    "q": "vesper",
    "e": "triste",
    "t": "Vengo de su parte. Ella no os lo va a decir nunca. Os lo digo yo: soltad."
   }
  ],
  "3-4-1": [
   {
    "q": "calixta",
    "e": "neutral",
    "t": "El coloso es la mitad del interruptor que no se llevaron. Sigue cerrando el circuito él solo."
   }
  ],
  "3-4-2": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Hay una silla al pie de la torre."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "No la miréis mucho. Se pone nerviosa si cree que hoy tampoco."
   }
  ],
  "3-4-3": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Lo de la torre lo grabó Seren antes de irse. Sé lo que pone. Prefiero que lo leáis vosotros."
   }
  ],
  "3-4-4": [
   {
    "q": "calixta",
    "e": "decidido",
    "t": "Abuela, coge sitio. Hoy cae."
   }
  ],
  "4-0-1": [
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "El programa no lo abran. El último número va cambiando y da un poco de pena."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Qué pone ahora?"
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "«Despedida». Lleva tachada treinta años."
   }
  ],
  "4-0-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Los farolillos están encendidos pero no dan calor."
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Es luz de ensayo, señorita. La buena la guardamos para cuando venga el de la fila uno."
   }
  ],
  "4-0-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Los títeres aplauden cuando pasamos."
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "No se lo tomen a bien. Aplauden a todo. Es lo último que se les olvida."
   }
  ],
  "4-0-4": [
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "El sereno ronda por aquí con las llaves. Si dan con él, podrán entrar sin entrada. No digan que se lo he dicho yo, que cobro por taquilla."
   }
  ],
  "4-1-1": [
   {
    "q": "matias",
    "e": "neutral",
    "t": "La butaca la reservó una señora. Pagó dos funciones: «por si a la primera no puede venir»."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Para quién?"
   },
   {
    "q": "matias",
    "e": "neutral",
    "t": "Para un chico. Apuntó la edad: veinte."
   }
  ],
  "4-1-2": [
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "En el tiro al blanco nadie falla. Las balas se quedan en el aire y el muñeco se agacha por cortesía."
   }
  ],
  "4-1-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Aquí venden algodón de azúcar de hace treinta años."
   },
   {
    "q": "matias",
    "e": "neutral",
    "t": "No lo pruebe. Sabe a víspera."
   }
  ],
  "4-1-4": [
   {
    "q": "e:forzudo",
    "e": "neutral",
    "t": "¡Pasen y vean! ¡Levanto la carpa entera! ¡No puedo soltarla! ¡Pasen y vean!"
   },
   {
    "q": "matias",
    "e": "triste",
    "t": "Si la suelta, se acaba la función. Treinta años con los brazos arriba, el pobre."
   }
  ],
  "4-2-1": [
   {
    "q": "matias",
    "e": "neutral",
    "t": "Gira al revés porque alguien le pidió que desanduviera. Que volviera a antes de que el chico enfermara."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y llega?"
   },
   {
    "q": "matias",
    "e": "neutral",
    "t": "Da la vuelta y vuelve a la misma tarde."
   }
  ],
  "4-2-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Hay un caballo sin jinete, con una manta doblada encima."
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "El de la fila uno también tenía caballo reservado. La señora pensó en todo."
   }
  ],
  "4-2-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Vesper. Tú sabes quién es el chico."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Sé que nunca vio esta feria. Y que su madre se la cuenta cada noche, para que no la eche de menos."
   }
  ],
  "4-2-4": [
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Les voy a pedir una cosa fea. Cuando paren esto, no me dejen ver cómo se apaga. Avísenme y me doy la vuelta."
   }
  ],
  "4-3-1": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Yo estuve aquí. Escolté la caravana de la feria antes que la de la mina."
   },
   {
    "q": "tramoya",
    "e": "sorprendido",
    "t": "¡El de la bufanda! Usted se coló sin pagar."
   },
   {
    "q": "kael",
    "e": "alegre",
    "t": "Suena a mí."
   }
  ],
  "4-3-2": [
   {
    "q": "matias",
    "e": "neutral",
    "t": "La bola de la adivina se rajó la noche del eclipse. Dice que vio de golpe todo lo que iba a pasar y que no cabía."
   }
  ],
  "4-3-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Qué te dijo, Kael? En la mano."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Que una puerta se iba a cerrar conmigo del lado malo. Me pareció un chiste buenísimo."
   }
  ],
  "4-3-4": [
   {
    "q": "e:adivina",
    "e": "neutral",
    "t": "A la de las flores le veo un bosque que la olvida. Al de la bufanda, una mujer con un lápiz. ¿Sigo?"
   },
   {
    "q": "kael",
    "e": "enfadado",
    "t": "No. Ya lo voy viendo yo solo."
   }
  ],
  "4-4-1": [
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "El Maestro era buena persona. Daba de cenar a los tramoyistas. Ahora no puede ni bajar el brazo."
   }
  ],
  "4-4-2": [
   {
    "q": "matias",
    "e": "neutral",
    "t": "Los hilos suben al techo y salen por un agujero. Yo diría que apuntan al este."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "A la catedral. Todo lo que no se acaba está atado allí."
   }
  ],
  "4-4-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Hay un nudo aquí arriba, con una nota. «Para cuando puedas venir. Mamá.»"
   },
   {
    "q": "dalia",
    "e": "triste",
    "t": "Lo ató para él. Una función que lo esperase siempre."
   }
  ],
  "4-4-4": [
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Señoras, señores: último número. Esta vez de verdad. No se levanten antes de que acabe, que llevamos mucho ensayado."
   }
  ],
  "5-0-1": [
   {
    "q": "benet",
    "e": "neutral",
    "t": "Suban despacio. Cada escalón es una oración que no terminamos. Si pisan fuerte se oye el amén."
   }
  ],
  "5-0-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Las gotas tienen cosas dentro. Hojas, un pájaro, una carta."
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Lo que la lluvia pilló a medio caer. La carta no la hemos leído. No es nuestra."
   }
  ],
  "5-0-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Padre, ¿aquí también se quedaron ecos?"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Hijo, aquí nos quedamos todos. Yo incluido. Llevo treinta años muerto y nadie me releva en el cargo."
   }
  ],
  "5-0-4": [
   {
    "q": "benet",
    "e": "neutral",
    "t": "Hay una novicia que no para de mover el brazo. Era la campanera. Si la despiertan, tengan paciencia: habla por los treinta años."
   }
  ],
  "5-1-1": [
   {
    "q": "aina",
    "e": "neutral",
    "t": "¡Yo las vi! Una llevaba un reloj de arena debajo de cada brazo. La otra le decía: «Déjame uno, que pesan»."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y se lo dejó?"
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "A la subida, sí."
   }
  ],
  "5-1-2": [
   {
    "q": "benet",
    "e": "neutral",
    "t": "El hermano hortelano plantó nubes para tener lluvia propia. Le salieron bien. Demasiado."
   }
  ],
  "5-1-3": [
   {
    "q": "aina",
    "e": "neutral",
    "t": "Las nubes del huerto tienen nombre. Esa gorda es Paca. No la piséis, que truena."
   }
  ],
  "5-1-4": [
   {
    "q": "e:hortelano_nubes",
    "e": "neutral",
    "t": "No se riega a destiempo. No se cosecha a destiempo. ¿Quiénes sois para venir a destiempo?"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Hermano Lluc. Son la hora. Llevamos treinta años esperándola."
   }
  ],
  "5-2-1": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "La cara de la gota es de mujer. Está diciendo algo."
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "Una palabra sola. Yo creo que es «perdón». Pero también podría ser «Kael»."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "No se parecen en nada."
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "Con la boca mojada, un poco."
   }
  ],
  "5-2-2": [
   {
    "q": "benet",
    "e": "neutral",
    "t": "Pusieron los relojes en el centro del claustro. A la vez. Y el sol se quedó donde estaba, como un clavo."
   }
  ],
  "5-2-3": [
   {
    "q": "benet",
    "e": "neutral",
    "t": "Dijeron que sería un momento. Una quería despedirse de un hijo. La otra, de un hombre al que debía la vida."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Cómo se llamaba el hombre?"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "No lo dijo. Lloraba demasiado para decir nombres."
   }
  ],
  "5-2-4": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Si esa gota cae, se oirá lo que dice."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Quieres oírlo?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "No lo sé. Pregúntamelo cuando llueva."
   }
  ],
  "5-3-1": [
   {
    "q": "aina",
    "e": "neutral",
    "t": "La que bajó tumbó su reloj antes de irse. Lo vi. Se quedó mirando a ver si amanecía."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y?"
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "Nada. Con uno de pie basta."
   }
  ],
  "5-3-2": [
   {
    "q": "benet",
    "e": "neutral",
    "t": "Intentó quitarle el otro. Forcejearon aquí, en el tejado. Dos mujeres de luto pegándose por un reloj. No he visto nada más triste."
   }
  ],
  "5-3-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "«No pude. Que lo haga otro.» ¿No pudo sostenerlo, o no pudo quitárselo?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Las dos cosas. Me parece que es de las que no pueden las dos cosas."
   }
  ],
  "5-3-4": [
   {
    "q": "e:dragon_canalon",
    "e": "neutral",
    "t": "Glu. Glu. Por aquí no baja nada. Ni agua, ni gente, ni culpa."
   },
   {
    "q": "aina",
    "e": "enfadado",
    "t": "¡Pues yo sí bajo, bicho feo! ¡Que tengo que tocar!"
   }
  ],
  "5-4-1": [
   {
    "q": "benet",
    "e": "neutral",
    "t": "A difuntos se toca para que el muerto sepa que puede irse. Sin toque, se queda en la puerta con el sombrero en la mano."
   }
  ],
  "5-4-2": [
   {
    "q": "aina",
    "e": "neutral",
    "t": "La hundió la que se quedó. Me quitó la cuerda y me dijo: «Hoy no, niña. Hoy no se muere nadie»."
   },
   {
    "q": "aina",
    "e": "triste",
    "t": "Y tenía razón. No se ha muerto nadie del todo."
   }
  ],
  "5-4-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Si suena, ¿sonará por mí también?"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Por todos, hijo. Es una campana, no una lista."
   }
  ],
  "5-4-4": [
   {
    "q": "aina",
    "e": "decidido",
    "t": "Treinta años con el brazo en alto. Como me salga un gallo en la primera campanada, me muero otra vez."
   }
  ],
  "6-0-1": [
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "Cada montón de sal es un nombre que se le ha caído a alguien. Pisad por las orillas."
   }
  ],
  "6-0-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Aquí hay un emblema con mi flor."
   },
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "De tu aldea. Cuando se quedaron en el bosque dejaron de nombrarse entre ellos."
   },
   {
    "q": "dalia",
    "e": "decidido",
    "t": "Yo me los sé todos. Apunta."
   }
  ],
  "6-0-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Escribano, ¿cuántos lleva?"
   },
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "Once mil y pico. Faltan los que se me olvidan mientras apunto a los otros."
   }
  ],
  "6-0-4": [
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "Hay una chica que dibuja mapas del olvido. Dice que si sabes dónde está alguien, ya no está perdido del todo. No le falta razón: le falta papel."
   }
  ],
  "6-1-1": [
   {
    "q": "sepia",
    "e": "neutral",
    "t": "He seguido el nombre que no pasa. No vino solo: lo trajeron a mano, con recibo."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Qué pone?"
   },
   {
    "q": "sepia",
    "e": "neutral",
    "t": "«Depósito. Se recogerá.» Sin fecha."
   }
  ],
  "6-1-2": [
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "Depositar un nombre es raro. La gente los pierde, no los guarda."
   },
   {
    "q": "sepia",
    "e": "neutral",
    "t": "Salvo que te dé miedo que lo llamen antes de que estés lista."
   }
  ],
  "6-1-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y si es el mío?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "El tuyo lo llevas colgado."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Llevo el emblema. El nombre entero, no. Yo solo me sé «Kael»."
   }
  ],
  "6-1-4": [
   {
    "q": "e:aduanero",
    "e": "neutral",
    "t": "Nombre, procedencia, causa de la baja. El suyo consta pagado. Circule."
   },
   {
    "q": "kael",
    "e": "decidido",
    "t": "¿Pagado por quién?"
   },
   {
    "q": "e:aduanero",
    "e": "neutral",
    "t": "Secreto de ventanilla."
   }
  ],
  "6-2-1": [
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "«Voluntaria» casi no se usa. La pone el registrador cuando quiere dejar dicho que alguien eligió."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "O cuando quiere convencerse."
   }
  ],
  "6-2-2": [
   {
    "q": "sepia",
    "e": "neutral",
    "t": "En el mapa, tu línea y la de la O salen juntas de la mina. La tuya se para. La suya da treinta años de vueltas alrededor."
   }
  ],
  "6-2-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Kael. La maestra te dio el emblema el primer día. Sabía quién eras."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "Dijo «a este hace años que nadie lo llama». No dijo «no lo he llamado yo»."
   }
  ],
  "6-2-4": [
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "Ficha completa. «Kael Arrén, escolta. Sacó a sesenta y uno. Entre ellos, a quien firma.»"
   },
   {
    "q": "kael",
    "e": "sorprendido",
    "t": "Arrén."
   },
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "Es bonito. Deberías usarlo."
   }
  ],
  "6-3-1": [
   {
    "q": "odila",
    "e": "neutral",
    "t": "Me empujaste por la compuerta. Yo llevaba el registro, iba la última. Te vi echar el cerrojo."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y apuntó la hora?"
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "Fue lo único que supe hacer con las manos."
   }
  ],
  "6-3-2": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Por qué no me llamó en treinta años?"
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Porque ibas a preguntarme esto."
   }
  ],
  "6-3-3": [
   {
    "q": "odila",
    "e": "neutral",
    "t": "Paré el sol para verte una vez más y darte las gracias. Y cuando lo tuve parado, no me atreví."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Y soltó."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Solté. Es lo único que he hecho bien, y lo hice por cobardía."
   }
  ],
  "6-3-4": [
   {
    "q": "e:esfinge_sal",
    "e": "neutral",
    "t": "¿Qué pesa más: un nombre que nadie dice o uno que alguien calla?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "El segundo. Pregúnteselo a ella, que lo ha cargado."
   }
  ],
  "6-4-1": [
   {
    "q": "odila",
    "e": "neutral",
    "t": "Seren se llevó mi reloj para que no pudiera arrepentirme de haberlo soltado. Lo tiró al mar. Siempre fue la más lista."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Lo encontramos."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Lo sé. Por eso he venido."
   }
  ],
  "6-4-2": [
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "El Recaudador pesa nombres contra sal. Si pesa más la sal, se los queda. Y aquí la sal sobra."
   }
  ],
  "6-4-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Maestra. Gracias aceptadas. Con treinta años de retraso, pero aceptadas."
   },
   {
    "q": "odila",
    "e": "alegre",
    "t": "Arrén tenías que ser. Tu madre contestaba igual."
   }
  ],
  "6-4-4": [
   {
    "q": "odila",
    "e": "decidido",
    "t": "Ese nombre en depósito es el tuyo, entero. Lo dejé yo, para que nadie te lo cobrara. Hoy lo retiro."
   }
  ],
  "7-0-1": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Morí de la misma fiebre que el chico, tres puertas más abajo. Ella me llamó la primera noche: necesitaba a alguien que saliera a los recados."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y el favor?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Dice que me salvó de irme. Nunca me preguntó si quería."
   }
  ],
  "7-0-2": [
   {
    "q": "odila",
    "e": "neutral",
    "t": "Las gárgolas eran canteros. Los conocía. Seren les pagó la obra por adelantado y no los ha dejado cobrar el descanso."
   }
  ],
  "7-0-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Aquí no hay polvo. Treinta años y ni una mota."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Barre ella. Cada noche. Dice que el chico es alérgico."
   }
  ],
  "7-0-4": [
   {
    "q": "vesper",
    "e": "decidido",
    "t": "De aquí en adelante no os acompaño de recadero. Os acompaño porque quiero. Que conste, por si luego alguien pregunta."
   }
  ],
  "7-1-1": [
   {
    "q": "odila",
    "e": "neutral",
    "t": "La canción es una nana. Se la cantaba ella. Ahora la canta él, para dormir a los demás."
   }
  ],
  "7-1-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "En las vidrieras hay gente. Se mueven cuando no miras."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Los que vinieron a pedirle que parase. Los guardó ahí para no tener que contestarles."
   }
  ],
  "7-1-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿El chico sabe que está muerto?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Sabe que lleva mucho rato con veinte años. Es listo. No pregunta para no darle un disgusto a su madre."
   }
  ],
  "7-1-4": [
   {
    "q": "e:campanero_doble",
    "e": "neutral",
    "t": "Tocamos a fiesta. Tocamos a fiesta. A difuntos no, que lo tiene prohibido."
   },
   {
    "q": "odila",
    "e": "decidido",
    "t": "Hoy tocáis lo que toca."
   }
  ],
  "7-2-1": [
   {
    "q": "edrin",
    "e": "neutral",
    "t": "Mi madre dice que fuera hace malo y que mejor no salir. Pero vosotros venís de fuera y venís secos."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Hace la misma tarde que hace treinta años."
   },
   {
    "q": "edrin",
    "e": "neutral",
    "t": "Eso me parecía."
   }
  ],
  "7-2-2": [
   {
    "q": "edrin",
    "e": "neutral",
    "t": "Me sé una canción. La segunda estrofa no me sale. Mamá dice que no hace falta."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Hace falta. Es donde acaban las canciones."
   }
  ],
  "7-2-3": [
   {
    "q": "odila",
    "e": "neutral",
    "t": "Edrin. Yo te tuve en brazos. Pesabas menos que un libro."
   },
   {
    "q": "edrin",
    "e": "alegre",
    "t": "¿Usted es la del lápiz? Mamá habla de usted. Enfadada, pero habla."
   }
  ],
  "7-2-4": [
   {
    "q": "edrin",
    "e": "decidido",
    "t": "Subo con vosotros. No a pelear. A decirle que ya he cenado. Que puede dejar de guardarme el plato."
   }
  ],
  "7-3-1": [
   {
    "q": "seren",
    "e": "neutral",
    "t": "No sigáis. Cada peldaño es un día que le he dado. No me los piséis."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Señora, son once mil. Alguno habrá que pisar."
   }
  ],
  "7-3-2": [
   {
    "q": "edrin",
    "e": "neutral",
    "t": "Mamá. He conocido a una capitana, a un herrero y a una chica que toca la campana. Tienen todos mi edad y son todos viejísimos."
   },
   {
    "q": "seren",
    "e": "triste",
    "t": "Edrin, baja de ahí."
   }
  ],
  "7-3-3": [
   {
    "q": "odila",
    "e": "neutral",
    "t": "Seren. Yo solté y estuve treinta años sin poder mirar a un muerto a la cara. Tú llevas treinta mirando a uno sin dejarle hablar."
   }
  ],
  "7-3-4": [
   {
    "q": "e:vidriera_mayor",
    "e": "neutral",
    "t": "Queríamos decirle. Que parase. Que gracias. Que parase."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Pues decídselo ahora. Os abrimos nosotros."
   }
  ],
  "7-4-1": [
   {
    "q": "seren",
    "e": "neutral",
    "t": "¿Sabéis lo que es sostener una tarde? Pesa como un hijo dormido. No se suelta porque duela el brazo."
   }
  ],
  "7-4-2": [
   {
    "q": "edrin",
    "e": "neutral",
    "t": "Mamá, la segunda estrofa. Me he acordado subiendo. Es la que dice que amanece."
   },
   {
    "q": "seren",
    "e": "triste",
    "t": "No la cantes."
   }
  ],
  "7-4-3": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Seren. Dimito. Treinta años de recados: el último te lo traigo gratis. Es este chico diciéndote que tiene sueño."
   }
  ]
 },
 "CIERRES": {
  "0-0-0": [
   {
    "q": "kael",
    "e": "sorprendido",
    "t": "Se ha deshecho. No como un bicho. Como alguien que por fin se sienta."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Mira lo que deja."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Unas gafas. De cerca."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Pues eso era: alguien que leía. Acuérdate la próxima vez que levantes la espada."
   }
  ],
  "0-0-1": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Se llamaba Olaia. Los jueves hacía pan dulce y lo fiaba hasta el lunes."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Te los sabes todos?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Todos. Es lo único que hago mejor que ellos."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "Yo no me sé ni el mío entero. «Kael», y de ahí no paso."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Pues ya te sabes más que la mitad de este monte."
   }
  ],
  "0-0-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Ha contado nuestros golpes. Uno por uno."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y qué nota nos ha puesto?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Sigue ahí. En el monte, eso es un aprobado."
   }
  ],
  "0-0-3": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Habéis pegado solo a los que no tenían marca."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Nos lo has dicho tú."
   },
   {
    "q": "fenn",
    "e": "sorprendido",
    "t": "Ya. Es que hacía mucho que nadie me hacía caso."
   },
   {
    "q": "dalia",
    "e": "alegre",
    "t": "Aquí se hace caso al que sabe. Ve delante, Fenn."
   }
  ],
  "0-0-4": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Dalia. Los que soltamos… ¿a dónde van?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "No lo sé. Ninguno ha vuelto a contarlo."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Mi maestro decía que el monte no pierde nada. Que solo lo cambia de sitio."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Tu maestro es un roble."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Por eso lo sabrá."
   }
  ],
  "0-1-0": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Tasio. Soy Dalia. La de la casa del pozo."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El espantapájaros la mira un rato largo. No la conoce."
   },
   {
    "q": "dalia",
    "e": "triste",
    "t": "No pasa nada. Yo sí."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Estás bien?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Estoy acostumbrada. Que no es lo mismo."
   }
  ],
  "0-1-1": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Trigo en mitad del monte. Treinta cosechas que no ha segado nadie."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Las ha segado el jabalí."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Menos mal. Me estaba poniendo sentimental."
   }
  ],
  "0-1-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Marga tenía tres hijas. Bajaron al pueblo la mañana del eclipse, a vender queso."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y volvieron?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Desde aquí arriba no se ve."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Por eso cuenta. Quien cuenta, espera a alguien."
   }
  ],
  "0-1-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Ni una se ha movido mientras pegábamos."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "No son ovejas valientes. Son ovejas educadas."
   },
   {
    "q": "fenn",
    "e": "decidido",
    "t": "Viene alguien. Trae un cayado y cuenta en voz alta."
   }
  ],
  "0-1-4": [
   {
    "q": "e:pastora_zarzas",
    "e": "neutral",
    "t": "…Treinta y nueve. Estaba yo. Qué tonta."
   },
   {
    "q": "dalia",
    "e": "alegre",
    "t": "Ya están todas. Puedes cerrar el cercado."
   },
   {
    "q": "e:pastora_zarzas",
    "e": "neutral",
    "t": "¿Y tú de quién eres, niña?"
   },
   {
    "q": "dalia",
    "e": "triste",
    "t": "De la casa del pozo."
   },
   {
    "q": "e:pastora_zarzas",
    "e": "neutral",
    "t": "No me suena. Pero tienes cara de saber contar."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Marga cierra el cercado y ya no está."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Dalia. No te ha conocido."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Ya van dos. No los cuentes tú también."
   }
  ],
  "0-2-0": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Están a la altura de un hombre. No de un árbol."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Entonces todavía levanta el brazo."
   },
   {
    "q": "fenn",
    "e": "alegre",
    "t": "Todavía marca los que no hay que talar. Sigue siendo guardabosques."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Pues a ver si nos marca a nosotros."
   }
  ],
  "0-2-1": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Arrastra los pies. ¿Está herido?"
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Está cansado. Treinta años de guardia sin relevo."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Eso lo entiendo."
   },
   {
    "q": "dalia",
    "e": "sorprendido",
    "t": "¿Te acuerdas de algo?"
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "No. Pero lo entiendo. Como se entiende un dolor de muelas ajeno."
   }
  ],
  "0-2-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "He cortado una raíz y ha salido savia tibia."
   },
   {
    "q": "fenn",
    "e": "triste",
    "t": "No cortes más de las que haga falta."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "No pensaba."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Yo sí pensaba. Lo retiro."
   }
  ],
  "0-2-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Lo de quedarte con él. ¿Va en serio?"
   },
   {
    "q": "fenn",
    "e": "decidido",
    "t": "Me enseñó a no dejar a nadie solo en el monte."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y a irte quién te enseña?"
   },
   {
    "q": "fenn",
    "e": "triste",
    "t": "Eso no entraba en las lecciones."
   }
  ],
  "0-2-4": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Ha pasado hace nada. La corteza está caliente."
   },
   {
    "q": "dalia",
    "e": "sorprendido",
    "t": "Huele a pan."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿A pan? ¿Aquí arriba?"
   }
  ],
  "0-3-0": [
   {
    "q": "brina",
    "e": "neutral",
    "t": "Pegáis fuerte. Bien. A mi Tomé lo flojo no le ha hecho efecto nunca."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Señora, ¿no debería esperar abajo?"
   },
   {
    "q": "brina",
    "e": "neutral",
    "t": "Llevo treinta años esperando abajo, hijo. Hoy subo."
   }
  ],
  "0-3-1": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Brina. ¿Usted se acuerda de mí?"
   },
   {
    "q": "brina",
    "e": "neutral",
    "t": "La de la casa del pozo. La que se sabía los nombres de las vacas ajenas."
   },
   {
    "q": "dalia",
    "e": "alegre",
    "t": "Esa."
   },
   {
    "q": "brina",
    "e": "neutral",
    "t": "Cómo no me voy a acordar, criatura. Si yo sigo viva. Los que olvidan son ellos."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Uno a favor, Dalia."
   }
  ],
  "0-3-2": [
   {
    "q": "brina",
    "e": "neutral",
    "t": "Son geranios. Rojos. Mil veces le dije que eran flor de pobre."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Pues los cuida. No hay una hoja seca."
   },
   {
    "q": "brina",
    "e": "triste",
    "t": "Treinta años regándome los geranios, y yo echándole la culpa a la helada."
   }
  ],
  "0-3-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Brina. Cuando se vaya… yo no sé qué se dice."
   },
   {
    "q": "brina",
    "e": "neutral",
    "t": "No se dice nada. Se le pone el plato igual un par de días, y luego ya no."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y duele menos?"
   },
   {
    "q": "brina",
    "e": "neutral",
    "t": "No. Pero se enfría menos la sopa."
   }
  ],
  "0-3-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El ciervo baja la cornamenta hasta la mano de Brina. Los geranios caen uno a uno."
   },
   {
    "q": "brina",
    "e": "neutral",
    "t": "Anda, ve. Ya te alcanzo yo, que tú siempre has andado más deprisa."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Donde estaba el ciervo queda una boina."
   },
   {
    "q": "brina",
    "e": "triste",
    "t": "Ni eso se llevó. Toda la vida igual."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "…"
   },
   {
    "q": "brina",
    "e": "neutral",
    "t": "No me miréis así. Subid al roble. Yo recojo."
   }
  ],
  "0-4-0": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Todo lo que hemos soltado hoy miraba hacia aquí arriba."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Le hacen caso. Siempre se lo hicieron."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Un pueblo entero esperando a que el más viejo diga «vámonos». Y el más viejo, mirando a ver qué le pasa al cielo."
   }
  ],
  "0-4-1": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Fenn. ¿Qué le vas a decir?"
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Que ya miré yo. Que al cielo no le pasa nada que él pueda arreglar."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Y si pregunta cuánto ha tardado?"
   },
   {
    "q": "fenn",
    "e": "triste",
    "t": "Le diré que un rato."
   }
  ],
  "0-4-2": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El suelo se mueve. Algo muy grande se ha dado la vuelta en sueños."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Vale. Ya sabe que estamos."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "No. Sabe que hay alguien. Todavía no sabe quién."
   }
  ],
  "0-4-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Maestra. Usted sabía todo esto antes de mandarnos."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Sabía dónde estaba el nudo. No sabía si alguien querría deshacerlo."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y por qué no subió usted, en treinta años?"
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "Porque hay gente a la que no sé mirar a la cara."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Otro día hablamos de la tuya."
   },
   {
    "q": "kael",
    "e": "sorprendido",
    "t": "¿De la mía?"
   }
  ],
  "0-4-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El roble se queda quieto. La corteza se abre como un abrigo."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Dentro hay un hombre viejo, sentado, con las manos en las rodillas. Mira a Fenn. Luego mira el sombrero."
   },
   {
    "q": "fenn",
    "e": "triste",
    "t": "Se lo bajo yo, maestro."
   }
  ],
  "1-0-0": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El minero se deshace y el pico sigue un momento en el aire, picando solo."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Sabía por dónde iba a venir el golpe."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Lo has visto venir?"
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "No. Lo sabía."
   }
  ],
  "1-0-1": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Vas el primero y sin farol."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "No me hace falta."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Eso es lo que me preocupa."
   }
  ],
  "1-0-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Los faroles se han inclinado al pasar tú."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Será la corriente."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Aquí abajo no corre el aire, Kael."
   }
  ],
  "1-0-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Sesenta y una chapas recogidas. Una colgada."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "¿La cojo?"
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "Déjala. Si la cojo yo, es mía. Y todavía no quiero que lo sea."
   }
  ],
  "1-0-4": [
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Columna de la izquierda, los que bajan. Columna de la derecha, los que no subieron."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y yo estoy…?"
   },
   {
    "q": "hulda",
    "e": "neutral",
    "t": "En la derecha. Solo. Con buena letra."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Vaya. Para una vez que salgo en una lista."
   }
  ],
  "1-1-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Qué puerta?"
   },
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Una que no se abre desde entonces."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Kael, estás blanco."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Soy un eco, Dalia. Es mi color."
   }
  ],
  "1-1-1": [
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Tú, el de la derecha. ¿Sabes lo que es pasar lista treinta años y que falte siempre el mismo?"
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "No."
   },
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Es como poner un plato de más. Ya te lo dirán."
   }
  ],
  "1-1-2": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "El martilleo ha parado."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Nos ha oído."
   },
   {
    "q": "hulda",
    "e": "neutral",
    "t": "No. Ha acabado un golpe y está pensando el siguiente. Brakk piensa despacio y pega fuerte."
   }
  ],
  "1-1-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Carbón frío, redondo, con una marca en el centro."
   },
   {
    "q": "fenn",
    "e": "triste",
    "t": "No es carbón."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "No. Pero vamos a decir que sí hasta que sepamos qué hacer con ello."
   }
  ],
  "1-1-4": [
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Parada. Y sin ponerse delante nadie."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Me he puesto un poco."
   },
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Ya lo he visto. Es que no aprendes."
   }
  ],
  "1-2-0": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Corrías por aquí con un farol en cada mano."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Tú me viste?"
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Te vimos todos, chico. Íbamos en dirección contraria."
   }
  ],
  "1-2-1": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Por qué bajé, Brakk? Yo era de la escolta. Cobraba por llegar, no por volver."
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Eso mismo te pregunté."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y?"
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Dijiste: «falta gente». Y ya."
   }
  ],
  "1-2-2": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Las huellas que entran van solas. Y no corren."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿No corría?"
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Al final no. Al final andabas. Como quien ya ha decidido."
   }
  ],
  "1-2-3": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "La última fue una mujer con un libro bajo el brazo. No quería salir."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Por qué?"
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Decía que le faltaba apuntar a uno."
   }
  ],
  "1-2-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "La pared está caliente. En el hierro hay una mano marcada, del tamaño de la de Kael."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "…"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Kael."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Dame un momento. Me estoy acordando de todo a la vez."
   }
  ],
  "1-3-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "No contesta."
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Es una puerta, chico."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Lleva treinta años diciendo lo mismo. Algo sabrá."
   }
  ],
  "1-3-1": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Si lo llego a hacer más ligero, igual lo echabas antes y salías."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Si lo llegas a hacer más ligero, no aguanta."
   },
   {
    "q": "brakk",
    "e": "triste",
    "t": "Ya."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Hiciste bien la puerta, Brakk. Es lo único de esa noche que salió bien."
   }
  ],
  "1-3-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Son dedos pequeños. De mujer."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Y hay más abajo. Se fue escurriendo."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "Se sentó."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Se sentó contra la puerta. Mucho rato."
   }
  ],
  "1-3-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Qué hora apuntó?"
   },
   {
    "q": "hulda",
    "e": "neutral",
    "t": "No lo sé. Pero la escribió despacio. Como quien no quiere acabar de escribirla."
   }
  ],
  "1-3-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El cerrojo de dentro cae al suelo. Suena como una campana rota."
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Treinta años cerrada."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Y se abre con pedirlo. Qué rabia."
   }
  ],
  "1-4-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Un lápiz en el moño."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Te suena?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Me suena a alguien que me dijo «camina»."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "…"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "No digas nada todavía."
   }
  ],
  "1-4-1": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Le llamábamos Miga."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "¿Al wyrm?"
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "A la lagartija. Lo otro es lo que pasa cuando das de comer treinta años a algo que no puede irse."
   }
  ],
  "1-4-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Voy a sacarlos del horno. Uno por uno."
   },
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Son cientos, niña."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Me sé muchos nombres. Alguno coincidirá."
   }
  ],
  "1-4-3": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Kael. Si es ella…"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Si es ella, me dio mi emblema sin decir nada y me mandó a un monte."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "¿Y eso qué es?"
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "No lo sé. O mucha cara o mucho miedo."
   }
  ],
  "1-4-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El horno se apaga. Por primera vez en treinta años se oye el silencio de la mina."
   },
   {
    "q": "hulda",
    "e": "neutral",
    "t": "Turno de noche. Sesenta y dos."
   },
   {
    "q": "hulda",
    "e": "alegre",
    "t": "Presentes: sesenta y dos."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Presente."
   }
  ],
  "2-0-0": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "He pisado una ola. Cruje."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Aguanta?"
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Aguanta. Pero se queja."
   }
  ],
  "2-0-1": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "No están muertos. Están a medio ahogarse."
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "¿Y eso es mejor?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Es más largo."
   }
  ],
  "2-0-2": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Cuando esto se mueva van a gritar todas a la vez."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Treinta años de gaviotas."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Me pido estar lejos."
   }
  ],
  "2-0-3": [
   {
    "q": "peio",
    "e": "neutral",
    "t": "¿Y en tierra qué hacéis con una hora que no pasa?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Esperar."
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "Ah. Como aquí, pero secos."
   }
  ],
  "2-0-4": [
   {
    "q": "peio",
    "e": "neutral",
    "t": "El mascarón era la hija del carpintero. La talló con su cara."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y ahora?"
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "Ahora cuenta. Se le da mejor que a mí."
   }
  ],
  "2-1-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Por qué «que nadie salte»?"
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "Porque el mar ya estaba parado. El que saltaba no caía al agua. Se quedaba en el aire."
   },
   {
    "q": "peio",
    "e": "triste",
    "t": "Hay tres a babor. No miréis."
   }
  ],
  "2-1-1": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Treinta años mirando por un catalejo."
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "Dice que si lo baja deja de estar enfadada. Y que sin enfado no sabe mandar."
   }
  ],
  "2-1-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Sabía lo que iba a pasar."
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "La capitana siempre sabe. Lo que no sabe es explicarlo sin gritar."
   }
  ],
  "2-1-3": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Peio. Para un momento."
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "No puedo."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Un momento."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Peio suelta el cubo. Le tiemblan las manos."
   },
   {
    "q": "peio",
    "e": "triste",
    "t": "Ya está. Ya lo he pensado. Dadme el cubo."
   }
  ],
  "2-1-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El mascarón cierra los ojos de madera. En el rol aparece una línea nueva, escrita sola: «Visitas: varias»."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Nos ha apuntado."
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "Entonces ya sois de a bordo. Lo siento mucho."
   }
  ],
  "2-2-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Cómo era?"
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Alta. El pelo de dos colores. No se mareó ni una vez, y hacía un mar de mil demonios."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Me cayó bien. Fíjate si soy tonta."
   }
  ],
  "2-2-1": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Aún tienes la llave?"
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Colgada del cuello. Una pirata no tira una llave."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y qué abre?"
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Nada que yo sepa leer."
   }
  ],
  "2-2-2": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Una madre."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Eso pensé yo. Por eso no le cobré la cena."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Capitana, es usted una blanda."
   },
   {
    "q": "sirel",
    "e": "enfadado",
    "t": "Repite eso y te tiro por la borda. No vas a caer, pero te tiro."
   }
  ],
  "2-2-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Dime los que faltan y los rasco yo."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "No falta ninguno."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Y el tuyo?"
   },
   {
    "q": "sirel",
    "e": "triste",
    "t": "El mío va el último. Es la norma."
   }
  ],
  "2-2-4": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Usted tampoco mira atrás."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Yo miro por el catalejo, que es mirar adelante con mala leche."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Vamos a la bodega. Hay algo que quiero que veas."
   }
  ],
  "2-3-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "El mismo sol tapado. En mi emblema y en un cofre de hace treinta años."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "¿De quién es el dibujo?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Del gremio. Lo llevan los archiveros."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Pues ya sabemos de qué trabajaba la pasajera."
   }
  ],
  "2-3-1": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Lo he levantado. No pesa tanto."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Pesaba."
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Entonces se ha quedado vacío. O lo de dentro ya no pesa igual."
   }
  ],
  "2-3-2": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Encaja."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Entonces está hecho para emblemas como el tuyo."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Como el mío cómo?"
   },
   {
    "q": "dalia",
    "e": "triste",
    "t": "De los que pesan."
   }
  ],
  "2-3-3": [
   {
    "q": "peio",
    "e": "neutral",
    "t": "Las sogas no son malas. Guardan."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "¿El qué?"
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "Lo que les mandaron. Aquí todo el mundo sigue con lo último que le mandaron."
   }
  ],
  "2-3-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Las sogas se aflojan. Por primera vez en treinta años el cofre queda suelto."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "No lo abráis aquí."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Por qué?"
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Porque lo que haya dentro lo quiero ver con luz. Aunque sea esta."
   }
  ],
  "2-4-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Ha dicho uno."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Cuál?"
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "El mío. Pero entero. Con un apellido que no he llegado a entender."
   }
  ],
  "2-4-1": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Un reloj de arena. Tumbado."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "La arena está repartida. Mitad y mitad."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Así no cuenta nada."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "O cuenta que alguien lo paró a propósito."
   }
  ],
  "2-4-2": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Ahí. En lo seco."
   },
   {
    "q": "peio",
    "e": "neutral",
    "t": "Capitana, treinta años y sigue usted señalando con el sable."
   },
   {
    "q": "sirel",
    "e": "alegre",
    "t": "Y tú sigues mirando donde señalo. Algo haremos bien."
   }
  ],
  "2-4-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Kael. No le escuches."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Ha dicho que nadie vino."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Vino alguien a por tu emblema. Vine yo. Vino Fenn."
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Y yo dejé la vagoneta, que no es poco."
   },
   {
    "q": "kael",
    "e": "alegre",
    "t": "Vale. Vale. Ya paro."
   }
  ],
  "2-4-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "La galerna se cierra sobre el ojo. Llueve. Las olas terminan de romper."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Muy abajo, despacio, se oye un casco de madera posarse en la arena."
   },
   {
    "q": "peio",
    "e": "alegre",
    "t": "Fondo, capitana."
   },
   {
    "q": "sirel",
    "e": "triste",
    "t": "Fondo, Peio."
   }
  ],
  "3-0-0": [
   {
    "q": "calixta",
    "e": "neutral",
    "t": "¿Y vosotros quiénes sois?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Gente que viene a tirarte el rayo."
   },
   {
    "q": "calixta",
    "e": "sorprendido",
    "t": "¿Se puede?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Llevamos tres de tres. No prometo nada."
   }
  ],
  "3-0-1": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Treinta años midiendo un palmo."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Alguien tiene que comprobar que no se mueve."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Niña, eso mismo decía yo de mi barco."
   }
  ],
  "3-0-2": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Seren."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Ese es el nombre. Apréndetelo, que lo vas a oír mucho."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Es la pasajera?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Es muchas cosas. Pasajera fue una noche."
   }
  ],
  "3-0-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Cuando caiga, llámala tú."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "¿Y si no cae?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Entonces le dices que su nieta lo midió cada año. Que también es algo que enseñar."
   }
  ],
  "3-0-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El muñeco de hojalata se queda mirando a Kael. Luego le ofrece una llave de cuerda."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Qué quiere?"
   },
   {
    "q": "calixta",
    "e": "alegre",
    "t": "Que le des cuerda. Te ha elegido."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Lo que me faltaba. Un reloj con patas."
   }
  ],
  "3-1-0": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Tu abuela tenía razón."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "¿En qué?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "En todo. Las abuelas suelen. Lo sujetaron desde el taller grande."
   }
  ],
  "3-1-1": [
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. Pregunta: ¿por qué guardar viento?"
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Por si hace falta."
   },
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. Pregunta: ¿hace falta?"
   },
   {
    "q": "calixta",
    "e": "triste",
    "t": "Treinta años sin gastarlo. Yo diría que no."
   }
  ],
  "3-1-2": [
   {
    "q": "calixta",
    "e": "enfadado",
    "t": "¿Nos robó el viento?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Os lo pidió prestado sin preguntar."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Eso es robar."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Sí. Yo también tardé en llamarlo así."
   }
  ],
  "3-1-3": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Están todas de punta."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Pobres."
   },
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. Recomendación: no acariciar. Tic. Recomendación tardía."
   }
  ],
  "3-1-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El molino se para. Las aspas dan una última vuelta, muy despacio."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Ha molido treinta años de tardes."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y la harina?"
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Mira alrededor. Es este polvo."
   }
  ],
  "3-2-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Tachado con lápiz."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Kael."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Ya. Ya lo sé. Sigo sin decir nada."
   }
  ],
  "3-2-1": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "¿Treinta años por una pregunta?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Por una pregunta y por estar muerto en el momento justo."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Recadero, tienes que aprender a decir que no."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Estoy en ello. Mira dónde estoy."
   }
  ],
  "3-2-2": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "La que aprieta rompe el papel en los números."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "¿Y eso?"
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Que no le gustaban las cuentas que salían."
   }
  ],
  "3-2-3": [
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. Hallazgo: la taza limpia tiene polvo. La del poso, no."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Alguien sigue viniendo a beber de la suya."
   },
   {
    "q": "vesper",
    "e": "triste",
    "t": "Viene. No me preguntéis cada cuánto, que aquí no hay cuánto."
   }
  ],
  "3-2-4": [
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Dos personas, dos relojes."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Una soltó y la otra no."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Lo vas entendiendo."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Lo voy temiendo, que no es igual."
   }
  ],
  "3-3-0": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Tenían doce años."
   },
   {
    "q": "dalia",
    "e": "sorprendido",
    "t": "¿Los dos?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Son gemelos, druida."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Ya. Es que quería que alguno tuviera más."
   }
  ],
  "3-3-1": [
   {
    "q": "calixta",
    "e": "neutral",
    "t": "De pequeña les tiraba piedras para ver si se movían."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y?"
   },
   {
    "q": "calixta",
    "e": "triste",
    "t": "Nunca. Ni pestañear."
   }
  ],
  "3-3-2": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "«A punto de.» Eso lo tendría que llevar este país escrito en la bandera."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Auria no tiene bandera."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Estaba a punto de."
   }
  ],
  "3-3-3": [
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. Los gemelos preguntan si soy un reloj."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "¿Qué les has dicho?"
   },
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. Que soy un amigo que hace tic."
   },
   {
    "q": "calixta",
    "e": "alegre",
    "t": "Eso no te lo enseñé yo."
   }
  ],
  "3-3-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Pol suelta primero. Nela mira a su hermano, luego el cable, y abre la mano."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Tienen los dedos marcados para siempre."
   },
   {
    "q": "vesper",
    "e": "triste",
    "t": "Perdonad que no viniera antes. Me daba miedo que me dijerais que no."
   }
  ],
  "3-4-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Qué pone, Vesper?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Si te lo digo, lo lees con mi voz. Y no es mi voz."
   }
  ],
  "3-4-1": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Una máquina sujetando sola lo que tenían que sujetar dos."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Lleva treinta años sin fallar."
   },
   {
    "q": "brakk",
    "e": "triste",
    "t": "Pobre trasto. Sé lo que es."
   }
  ],
  "3-4-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Le he dicho que hoy sí."
   },
   {
    "q": "calixta",
    "e": "enfadado",
    "t": "¡No se lo digas!"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Se lo he dicho bajito."
   },
   {
    "q": "calixta",
    "e": "triste",
    "t": "Como no caiga, se lo explicas tú."
   }
  ],
  "3-4-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿La quieres, Vesper?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "¿A Seren?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Treinta años con alguien. No sé si eso es querer o costumbre."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "A partir de los diez es lo mismo, recadero."
   }
  ],
  "3-4-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El coloso se dobla sobre una rodilla. El circuito se abre."
   },
   {
    "q": "calixta",
    "e": "neutral",
    "t": "Mirad arriba."
   },
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. No miréis arriba. Tic. Mirad la torre."
   }
  ],
  "4-0-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Nos han aplaudido al entrar."
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Hace treinta años que no entra nadie. Aplaudirían a un perro."
   },
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. Entrada triunfal confirmada."
   }
  ],
  "4-0-1": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Está tachada muchas veces. Encima de la misma tachadura."
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Cada noche la escribo y cada noche la tacho."
   },
   {
    "q": "tramoya",
    "e": "triste",
    "t": "Un pregonero que no puede anunciar el final. Ríanse, que tiene gracia."
   }
  ],
  "4-0-2": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "¿Quién es el de la fila uno?"
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Nadie lo sabe. Pero se le espera con mucha educación."
   }
  ],
  "4-0-3": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Uno no aplaude."
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Ese es el crítico. Treinta años sin que le guste nada."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Por fin alguien sincero."
   }
  ],
  "4-0-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Entre dos barracas, un hombre con un farol y un manojo de llaves canta la hora equivocada."
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Ese es. No le digan que lo he dicho yo."
   }
  ],
  "4-1-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y nadie se ha sentado en treinta años?"
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Señor mío, está reservada."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Ya, pero…"
   },
   {
    "q": "tramoya",
    "e": "enfadado",
    "t": "Re-ser-va-da."
   }
  ],
  "4-1-1": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "…"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Vesper. Te has quedado callado."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Estaba contando. Veinte."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Te sale la cuenta?"
   },
   {
    "q": "vesper",
    "e": "triste",
    "t": "Me sale. Ojalá no."
   }
  ],
  "4-1-2": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "He cogido una bala del aire."
   },
   {
    "q": "matias",
    "e": "neutral",
    "t": "Capitana, eso es propiedad de la barraca."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Lleva treinta años sin llegar. Yo diría que está abandonada."
   }
  ],
  "4-1-3": [
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. Lo he probado."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Tú comes?"
   },
   {
    "q": "chispa",
    "e": "neutral",
    "t": "Tic. No. Pero sabe a víspera. Tic. No sé qué es víspera."
   },
   {
    "q": "dalia",
    "e": "triste",
    "t": "El día antes de algo bueno, Chispa."
   }
  ],
  "4-1-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El forzudo baja los brazos. La carpa no se cae."
   },
   {
    "q": "matias",
    "e": "neutral",
    "t": "Treinta años sujetando una carpa que se sostenía sola."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "No se lo digáis."
   },
   {
    "q": "matias",
    "e": "neutral",
    "t": "Ni loco. Que duerma."
   }
  ],
  "4-2-0": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Todos los caballos miran al este."
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "A la catedral."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Los caballos de madera no miran."
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Estos han tenido tiempo de aprender."
   }
  ],
  "4-2-1": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Quería volver a antes."
   },
   {
    "q": "matias",
    "e": "neutral",
    "t": "Todos queremos volver a antes, señorita. Lo raro es dar con un tiovivo que lo intente."
   }
  ],
  "4-2-2": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "La manta está doblada con cuidado."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Y tiene un nombre bordado. Empieza por E."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "No lo leas en alto."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "No pensaba."
   }
  ],
  "4-2-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Lo conociste?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Vivía tres puertas más arriba. Tosía por las noches. Yo también."
   },
   {
    "q": "vesper",
    "e": "triste",
    "t": "Una noche dejó de oírse una de las dos toses. No supe cuál hasta que me llamaron."
   }
  ],
  "4-2-4": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Hecho. Le avisamos."
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "¿Palabra?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Palabra."
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "¿De quién?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "De uno que cumple tarde. Pero cumple."
   }
  ],
  "4-3-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Me leyó la mano?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Eso dice."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Entonces yo estuve aquí. Vivo."
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "¿Te acuerdas?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Del olor a serrín. Solo de eso."
   }
  ],
  "4-3-1": [
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Me debe usted una entrada."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Con treinta años de intereses."
   },
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Se la perdono si me dice una cosa. ¿Le gustó la función?"
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "No me quedé al final. Tenía que llevar una caravana a las minas."
   }
  ],
  "4-3-2": [
   {
    "q": "matias",
    "e": "neutral",
    "t": "Desde entonces solo dice cosas que ya han pasado."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Menuda adivina."
   },
   {
    "q": "matias",
    "e": "neutral",
    "t": "Al contrario, capitana. No falla una."
   }
  ],
  "4-3-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Te lo dijo y entraste igual."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "No me lo creí."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Y si te lo hubieras creído?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "…"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Habría entrado igual. Pero sin reírme."
   }
  ],
  "4-3-4": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "«Un bosque que la olvida.»"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "No le hagas caso."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "No es una adivinanza, Kael. Es una cuenta. Y sé cómo acaba."
   }
  ],
  "4-4-0": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Los nudos son de marinero."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "A ver."
   },
   {
    "q": "sirel",
    "e": "sorprendido",
    "t": "No. Son de madre. Así se ata un zapato de niño: dos veces, para que no se suelte."
   }
  ],
  "4-4-1": [
   {
    "q": "tramoya",
    "e": "neutral",
    "t": "Maestro. Soy Tramoya. Hoy hay público."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El Maestro de Pista no puede girar la cabeza. Pero mueve un dedo."
   },
   {
    "q": "tramoya",
    "e": "triste",
    "t": "Me ha oído. Con eso me vale."
   }
  ],
  "4-4-2": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Si cortamos aquí, ella lo nota allí."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y qué hace?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Nada. No puede soltar las manos. Solo lo nota."
   },
   {
    "q": "vesper",
    "e": "triste",
    "t": "Es lo peor que le podemos hacer. Y hay que hacerlo."
   }
  ],
  "4-4-3": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Nadie dice nada un rato."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Llevo treinta años queriendo partirle la cara a esa mujer."
   },
   {
    "q": "sirel",
    "e": "triste",
    "t": "Y ahora no sé."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Yo tampoco, capitana. Vamos a no saber juntos."
   }
  ],
  "4-4-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Los hilos caen. El Maestro de Pista baja el brazo, se quita la chistera y saluda."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Tramoya. Ahora."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Don Tramoya se da la vuelta, de cara a las gradas vacías, y se tapa los ojos."
   }
  ],
  "5-0-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Me he comido una gota con la cara."
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "¿Y a qué sabe?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "A hace mucho."
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Pues esa es de las recientes."
   }
  ],
  "5-0-1": [
   {
    "q": "matias",
    "e": "neutral",
    "t": "He contado ciento doce amenes."
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Son ciento trece. El último escalón no lo terminó nadie."
   },
   {
    "q": "matias",
    "e": "neutral",
    "t": "¿Y cómo se sube?"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Con fe, o de un salto."
   }
  ],
  "5-0-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "La carta se lee desde fuera. Una palabra sola."
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "No me la diga."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Es un nombre."
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Entonces menos."
   }
  ],
  "5-0-3": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "¿Un abad eco?"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Los vivos se fueron bajando. Alguien tenía que quedarse a decir misa."
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "¿Y viene alguien?"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Las gotas. Son muy puntuales."
   }
  ],
  "5-0-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "En el rellano hay una novicia con el brazo en alto y la boca abierta, a media palabra."
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Esa. Tápense los oídos antes de tocarla."
   }
  ],
  "5-1-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Subieron dos."
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Una delante, sin mirar. Otra detrás, parándose en cada rellano."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Cuál de las dos bajó?"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "La que se paraba."
   }
  ],
  "5-1-1": [
   {
    "q": "aina",
    "e": "neutral",
    "t": "¡Y la de detrás lloraba! Pero sin ruido, que es como llora la gente mayor."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Aina."
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "¿Qué?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Nada. Sigue. Me viene bien oírlo de alguien que no sea ella."
   }
  ],
  "5-1-2": [
   {
    "q": "matias",
    "e": "neutral",
    "t": "¿Nubes en maceta?"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "En bancal. Las macetas son para aficionados."
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "¡Yo regué una y me llovió encima tres días!"
   }
  ],
  "5-1-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "He pisado a Paca."
   },
   {
    "q": "aina",
    "e": "enfadado",
    "t": "¡Kael!"
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Truena. Poco, pero con intención."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Perdón, Paca."
   }
  ],
  "5-1-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El hermano Lluc mira sus nubes, luego el cielo, luego un reloj de sol que no marca nada."
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Ya puedes regar, Lluc."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Lluc sonríe. Abre la mano. Las nubes suben."
   }
  ],
  "5-2-0": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Tiene el pelo recogido."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Con un lápiz?"
   },
   {
    "q": "dalia",
    "e": "triste",
    "t": "Desde aquí no lo veo."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Sí lo ves."
   }
  ],
  "5-2-1": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Aina. ¿Cuál de las dos palabras?"
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "¡No lo sé! Tengo buena vista, no buen oído. Soy campanera: estoy medio sorda."
   },
   {
    "q": "kael",
    "e": "alegre",
    "t": "Mira, eso lo explica todo."
   }
  ],
  "5-2-2": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "¿Y vosotros qué hicisteis?"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Seguir rezando. Pedíamos lluvia. Nos pareció feo cambiar de petición a medias."
   }
  ],
  "5-2-3": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Kael se sienta en el brocal del pozo."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Kael."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "«Un hombre al que debía la vida.»"
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "Saqué a sesenta y uno, Dalia. Y una subió hasta aquí por mí."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "No sé si reírme. Me parece que no."
   }
  ],
  "5-2-4": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Te lo pregunto ahora. ¿Quieres oírlo?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Sí."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Seguro?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "No. Pero sí."
   }
  ],
  "5-3-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "«Que lo haga otro.» Y treinta años después me da mi emblema."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "No te eligió por casualidad."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "Ya. Me mandó lejos. Se manda lejos lo que no se puede mirar."
   }
  ],
  "5-3-1": [
   {
    "q": "aina",
    "e": "neutral",
    "t": "Se quedó ahí sentada hasta que se le durmieron las piernas. Yo quería bajarle agua, pero no podía mover el brazo."
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Hija, llevabas un día muerta."
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "¡Pues con más razón!"
   }
  ],
  "5-3-2": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "¿Quién ganó?"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Nadie, capitana. Una se quedó con un reloj y la otra con la culpa. No sé cuál pesa más."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "El reloj. Te lo digo yo, que la he visto sostenerlo."
   }
  ],
  "5-3-3": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Estás enfadado con ella?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Me guardó el emblema y me escondió el nombre."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Cuando la tenga delante, o le doy un abrazo o le tiro el lápiz. A lo mejor las dos cosas."
   }
  ],
  "5-3-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El canalón se destapa. Un hilo de agua baja por la piedra: el primero en treinta años."
   },
   {
    "q": "aina",
    "e": "alegre",
    "t": "¡Baja! ¡Baja!"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Es un canalón, hija."
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "¡Es un milagro pequeño! ¡Déjeme!"
   }
  ],
  "5-4-0": [
   {
    "q": "matias",
    "e": "neutral",
    "t": "¿Y cómo se saca una campana del agua?"
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "¡Tocándola! Si suena, sube sola. Las campanas flotan cuando cantan."
   },
   {
    "q": "matias",
    "e": "neutral",
    "t": "Eso no es verdad."
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "Aquí sí."
   }
  ],
  "5-4-1": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "«En la puerta, con el sombrero en la mano.»"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "¿Le suena?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Padre, me acaba de describir. Solo me falta el sombrero."
   }
  ],
  "5-4-2": [
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Eso me lo dijo a mí también. «Hoy no.»"
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "¿Y qué le contestaste?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Nada. Yo ya me había muerto. Llegó tarde por una tarde."
   }
  ],
  "5-4-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Si suena por mí, ¿me voy?"
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "No, hijo. La puerta sigue atrancada. Solo sabrás que puedes."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Saber que puedo y no poder."
   },
   {
    "q": "benet",
    "e": "neutral",
    "t": "Bienvenido a la vida monástica."
   }
  ],
  "5-4-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Aina tira de la cuerda con las dos manos. La campana sube del agua, chorreando."
   },
   {
    "q": "aina",
    "e": "decidido",
    "t": "¡Por todos! ¡Por el abad, por los hermanos, por Kael y por mí!"
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "No le sale ningún gallo."
   }
  ],
  "6-0-0": [
   {
    "q": "aina",
    "e": "neutral",
    "t": "¡Cuánta sal!"
   },
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "No grite, hermana. Cada grano es alguien, y se asustan."
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "Perdón."
   },
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "Más bajo."
   }
  ],
  "6-0-1": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "He pisado uno."
   },
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "¿Cuál?"
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "No lo sé."
   },
   {
    "q": "ulmo",
    "e": "triste",
    "t": "Ese es el problema, hijo. Ese es exactamente el problema."
   }
  ],
  "6-0-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Olaia. Tasio. Marga y sus tres. Roque. Tomé."
   },
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "Más despacio."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "No. Deprisa, antes de que se me olviden a mí también."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Dalia…"
   },
   {
    "q": "dalia",
    "e": "enfadado",
    "t": "Apunta, Ulmo."
   }
  ],
  "6-0-3": [
   {
    "q": "matias",
    "e": "neutral",
    "t": "¿Y a usted quién le apunta?"
   },
   {
    "q": "ulmo",
    "e": "sorprendido",
    "t": "¿A mí?"
   },
   {
    "q": "ulmo",
    "e": "triste",
    "t": "No lo había pensado."
   },
   {
    "q": "matias",
    "e": "neutral",
    "t": "Pues yo me quedo con su cara, escribano. Soy sereno: mi oficio es saber quién anda por ahí."
   }
  ],
  "6-0-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "En mitad de la llanura, una chica dibuja de rodillas sobre un pliego más grande que ella."
   },
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "No la pisen. El mapa, digo. A ella tampoco."
   }
  ],
  "6-1-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Qué nombre?"
   },
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "No lo deja ver. Dice que es confidencial."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Un aduanero discreto. Lo que me faltaba por ver muerto."
   }
  ],
  "6-1-1": [
   {
    "q": "sepia",
    "e": "neutral",
    "t": "La letra del recibo aprieta mucho. Ha roto el papel en la fecha."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿En la fecha?"
   },
   {
    "q": "sepia",
    "e": "neutral",
    "t": "Donde iría la fecha. No hay. Solo el roto."
   }
  ],
  "6-1-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "«Antes de que estés lista.»"
   },
   {
    "q": "sepia",
    "e": "neutral",
    "t": "Es lo que haría yo, si quisiera a alguien y no supiera qué decirle."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Guardarle el nombre?"
   },
   {
    "q": "sepia",
    "e": "neutral",
    "t": "Guardárselo bien. Para que no se le estropee mientras me atrevo."
   }
  ],
  "6-1-3": [
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Yo tampoco tengo apellido."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿No?"
   },
   {
    "q": "fenn",
    "e": "neutral",
    "t": "Soy «Fenn, el de Roque». Con eso me encontraban."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "Pues a mí no me encontraba nadie."
   }
  ],
  "6-1-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El Aduanero se cuadra, sella un papel y lo deja en la ventanilla. Detrás ya no hay nadie."
   },
   {
    "q": "sepia",
    "e": "neutral",
    "t": "Es un recibo. A tu nombre."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Qué pone?"
   },
   {
    "q": "sepia",
    "e": "neutral",
    "t": "«Retirar en el archivo.»"
   }
  ],
  "6-2-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Una O."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Kael."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Con lápiz. Apretando."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "Ya no puedo seguir sin decir nada, ¿verdad?"
   }
  ],
  "6-2-1": [
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "He visto diez mil fichas, chico. Esta es la única firmada dos veces."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Dos?"
   },
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "Una al abrirla. Otra debajo, años después. La misma O, más temblona."
   }
  ],
  "6-2-2": [
   {
    "q": "sepia",
    "e": "neutral",
    "t": "Nunca se aleja más de un día de camino de donde se para la tuya."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Treinta años dándome vueltas."
   },
   {
    "q": "sepia",
    "e": "neutral",
    "t": "En mi oficio lo llamamos órbita."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "En el mío, no atreverse a llamar a la puerta."
   }
  ],
  "6-2-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Mintió sin mentir."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Es archivera. Sabe exactamente qué deja escrito y qué no."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Pues se va a hartar de dictarme."
   }
  ],
  "6-2-4": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Kael Arrén."
   },
   {
    "q": "kael",
    "e": "alegre",
    "t": "Kael Arrén. Escolta."
   },
   {
    "q": "dalia",
    "e": "alegre",
    "t": "Te queda bien."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Me queda grande. Ya creceré."
   }
  ],
  "6-3-0": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Odila está de pie entre dos columnas de sal. Se ha quitado el lápiz del moño y lo tiene en la mano."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Pregunta."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "No sé por dónde empezar."
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "Yo tampoco. Por eso he tardado."
   }
  ],
  "6-3-1": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Me dolió?"
   },
   {
    "q": "odila",
    "e": "sorprendido",
    "t": "¿Qué?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Morirme. No me acuerdo."
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "No lo sé. La puerta era gruesa."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Pero golpeaste tres veces desde dentro, para decir que estaba echado. Eso sí lo oí."
   }
  ],
  "6-3-2": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Treinta años en el fondo de un cajón."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Lo sacaba. Cada noche. Lo ponía en la mesa y lo volvía a guardar."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Y qué me decía?"
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "Nada. Ya te digo que no sabía."
   }
  ],
  "6-3-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "No fue cobardía."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Kael."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Soltó porque parar el mundo para dar las gracias es una barbaridad, y usted lo vio."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Cobardía fue lo del cajón."
   },
   {
    "q": "odila",
    "e": "alegre",
    "t": "…Eso sí."
   }
  ],
  "6-3-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "La esfinge se deshace en sal fina. El viento se la lleva sin prisa."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Has contestado bien."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "He contestado lo que es verdad."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Suele coincidir."
   }
  ],
  "6-4-0": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Y por qué ella no?"
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Porque Edrin tenía veinte años y era su hijo. Lo mío era una deuda."
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "No la juzguéis fácil. Yo solté lo que no era mío."
   }
  ],
  "6-4-1": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "O sea, que lo llevé yo. De ida con ella y de vuelta en la bodega."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Sí."
   },
   {
    "q": "sirel",
    "e": "enfadado",
    "t": "¡Treinta años durmiendo encima del interruptor del mundo!"
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "…Me habría venido bien saberlo."
   }
  ],
  "6-4-2": [
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "Pesa mal. Pone el dedo."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Un recaudador que hace trampas?"
   },
   {
    "q": "ulmo",
    "e": "neutral",
    "t": "Chico, he dicho que es recaudador."
   }
  ],
  "6-4-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Conoció a mi madre?"
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Otro día."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Maestra."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Otro día, Arrén. Hoy ya he dicho todo lo que me cabía."
   }
  ],
  "6-4-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Odila pone el recibo en el platillo. La balanza no se mueve."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Kael Arrén. Escolta. Sacó a sesenta y uno."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El platillo baja de golpe. La sal del otro lado salta por los aires."
   },
   {
    "q": "odila",
    "e": "decidido",
    "t": "Pesa más. Siempre pesó más."
   }
  ],
  "7-0-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Las puertas están abiertas."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Nunca las cerró. No hacía falta: nadie llegaba hasta aquí."
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "Yo llegué. Dos veces. Me di la vuelta en el atrio."
   }
  ],
  "7-0-1": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Y querías?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "¿Irme?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Tenía una tos y pocos años. No me dio tiempo a querer nada."
   },
   {
    "q": "vesper",
    "e": "triste",
    "t": "Eso es lo que no le perdono. No el favor: no haber llegado a saber qué habría elegido."
   }
  ],
  "7-0-2": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Buena piedra."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Buenos canteros."
   },
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Les voy a pegar con cuidado."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Eso espero, herrero. Aún les debo un jornal."
   }
  ],
  "7-0-3": [
   {
    "q": "sirel",
    "e": "neutral",
    "t": "¿Barre?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Con una mano. La otra no la quita del reloj."
   },
   {
    "q": "sirel",
    "e": "triste",
    "t": "Maldita sea. Yo venía a odiarla tranquila."
   }
  ],
  "7-0-4": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Anotado."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "¿El qué?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Que vienes porque quieres. Maestra, apúntelo."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Apuntado. Con fecha."
   },
   {
    "q": "vesper",
    "e": "sorprendido",
    "t": "¿Qué fecha?"
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "La de hoy. Ya va siendo hora de que haya una."
   }
  ],
  "7-1-0": [
   {
    "q": "aina",
    "e": "neutral",
    "t": "¡Qué voz! ¡Desafina un poco al final!"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "No desafina. Se para."
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "¿Por qué?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Porque lo que viene después no se lo enseñaron."
   }
  ],
  "7-1-1": [
   {
    "q": "odila",
    "e": "neutral",
    "t": "Yo estaba delante la primera vez que se la cantó. Él tenía tres días."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "¿Edrin?"
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Seren no sabía cantar. Se la inventó entera, del susto de tenerlo en brazos."
   }
  ],
  "7-1-2": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Esa de azul me ha mirado."
   },
   {
    "q": "kael",
    "e": "sorprendido",
    "t": "¿Seguro?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Me ha reconocido. La de azul me ha reconocido."
   },
   {
    "q": "dalia",
    "e": "alegre",
    "t": "Kael. Aquí dentro hay alguien que sabe quién soy."
   }
  ],
  "7-1-3": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Yo tampoco preguntaba."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "¿Tú?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "En las colinas. Sabía que algo no cuadraba y hacía chistes."
   },
   {
    "q": "kael",
    "e": "triste",
    "t": "Me cae bien ese chico y aún no lo conozco."
   }
  ],
  "7-1-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Las dos campanas callan. Por primera vez se oye la voz de arriba sin nada alrededor."
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "Es él."
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Vamos. Y que nadie le diga nada que no pregunte."
   }
  ],
  "7-2-0": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "«Yo solo puse el plomo.»"
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "¿Qué?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Que el plomo es lo que sujeta los cristales, maestra. No es poca cosa."
   }
  ],
  "7-2-1": [
   {
    "q": "edrin",
    "e": "neutral",
    "t": "¿Cuánto es treinta años?"
   },
   {
    "q": "sirel",
    "e": "neutral",
    "t": "Mucho, chico."
   },
   {
    "q": "edrin",
    "e": "neutral",
    "t": "¿Más que una noche larga?"
   },
   {
    "q": "sirel",
    "e": "triste",
    "t": "Bastante más."
   },
   {
    "q": "edrin",
    "e": "neutral",
    "t": "Entonces mamá estará cansadísima."
   }
  ],
  "7-2-2": [
   {
    "q": "aina",
    "e": "neutral",
    "t": "¡Yo me sé canciones enteras! ¡Te enseño!"
   },
   {
    "q": "edrin",
    "e": "alegre",
    "t": "¿De cuáles?"
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "De las de tocar a muerto."
   },
   {
    "q": "matias",
    "e": "neutral",
    "t": "Hermana."
   },
   {
    "q": "aina",
    "e": "neutral",
    "t": "¡Pero alegres!"
   }
  ],
  "7-2-3": [
   {
    "q": "edrin",
    "e": "neutral",
    "t": "¿Por qué está enfadada con usted?"
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Porque yo solté."
   },
   {
    "q": "edrin",
    "e": "neutral",
    "t": "¿Y eso es malo?"
   },
   {
    "q": "odila",
    "e": "triste",
    "t": "Para ella, sí. Para ti… ya me lo dirás tú, que eres el que importa."
   }
  ],
  "7-2-4": [
   {
    "q": "kael",
    "e": "neutral",
    "t": "Edrin. Arriba se va a poner fea la cosa."
   },
   {
    "q": "edrin",
    "e": "neutral",
    "t": "Ya."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Tu madre contra nosotros."
   },
   {
    "q": "edrin",
    "e": "neutral",
    "t": "Mi madre contra todo el mundo desde que tengo memoria. No os lo toméis a mal: es que quiere mucho."
   }
  ],
  "7-3-0": [
   {
    "q": "seren",
    "e": "neutral",
    "t": "Y traes a tu muerto."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Se llama Kael."
   },
   {
    "q": "seren",
    "e": "neutral",
    "t": "Ya lo sé. Lo escribiste cuarenta veces en mis planos."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Buenas tardes, señora. Qué remedio."
   }
  ],
  "7-3-1": [
   {
    "q": "seren",
    "e": "neutral",
    "t": "¿Te hace gracia?"
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "No, señora. Es que cuando tengo miedo me sale así."
   },
   {
    "q": "seren",
    "e": "triste",
    "t": "…A él también. De pequeño."
   }
  ],
  "7-3-2": [
   {
    "q": "edrin",
    "e": "neutral",
    "t": "No bajo."
   },
   {
    "q": "seren",
    "e": "neutral",
    "t": "Edrin."
   },
   {
    "q": "edrin",
    "e": "neutral",
    "t": "Mamá, es la primera vez en treinta años que te digo que no. Déjame disfrutarlo un momento."
   }
  ],
  "7-3-3": [
   {
    "q": "seren",
    "e": "triste",
    "t": "Eso no es justo."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "No. Es verdad, que es peor."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Seren mira a su hijo. Edrin le sostiene la mirada."
   },
   {
    "q": "seren",
    "e": "neutral",
    "t": "Subid. No os lo voy a poner fácil."
   }
  ],
  "7-3-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "La vidriera se abre como una puerta. La gente de dentro sale despacio, estirando los brazos."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Una mujer de azul busca a alguien con la mirada. Encuentra a Dalia. Asiente."
   },
   {
    "q": "dalia",
    "e": "triste",
    "t": "Luego. Luego hablamos."
   }
  ],
  "7-4-0": [
   {
    "q": "brakk",
    "e": "neutral",
    "t": "Tiene las manos como yo el yunque."
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Peor."
   },
   {
    "q": "kael",
    "e": "neutral",
    "t": "Maestra. ¿Usted habría aguantado?"
   },
   {
    "q": "odila",
    "e": "neutral",
    "t": "Ni una semana. Por eso sé lo que le ha costado."
   }
  ],
  "7-4-1": [
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Señora. A los hijos dormidos se les lleva a la cama."
   },
   {
    "q": "seren",
    "e": "neutral",
    "t": "¿Y luego?"
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Luego se les deja la puerta entornada."
   },
   {
    "q": "seren",
    "e": "triste",
    "t": "No sé hacerlo."
   },
   {
    "q": "dalia",
    "e": "neutral",
    "t": "Nadie sabe. Se hace igual."
   }
  ],
  "7-4-2": [
   {
    "q": "edrin",
    "e": "neutral",
    "t": "La voy a cantar, mamá."
   },
   {
    "q": "seren",
    "e": "triste",
    "t": "Edrin, por favor."
   },
   {
    "q": "edrin",
    "e": "neutral",
    "t": "Bajito. Para que sepas cómo acaba. Te la inventaste tú y nunca la has oído entera."
   }
  ],
  "7-4-3": [
   {
    "q": "seren",
    "e": "neutral",
    "t": "¿Tú también, Vesper?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Yo el primero. Tendría que haber dimitido la primera noche."
   },
   {
    "q": "seren",
    "e": "triste",
    "t": "¿Y por qué no lo hiciste?"
   },
   {
    "q": "vesper",
    "e": "neutral",
    "t": "Porque estabas sola. Y porque barrías tan mal que daba pena."
   }
  ],
  "7-4-4": [
   {
    "q": "narrador",
    "e": "neutral",
    "t": "El Arconte cae. Debajo solo queda una mujer cansada, con las manos en un reloj de arena."
   },
   {
    "q": "seren",
    "e": "triste",
    "t": "No puedo abrirlas."
   },
   {
    "q": "narrador",
    "e": "neutral",
    "t": "Odila le pone las suyas encima. Edrin, las suyas encima de las dos."
   },
   {
    "q": "edrin",
    "e": "neutral",
    "t": "A la de tres, mamá."
   }
  ]
 },
 "MEMORIAS": {
  "kael": {
   "r": 1,
   "n": "El olor a hierro caliente",
   "a": "narrador:A Kael le huele la ropa a hierro caliente. No ha estado cerca de ninguna fragua.|kael:Me pasa desde ayer. Huelo a compuerta.|dalia:¿Y a qué huele una compuerta?|kael:A que alguien se ha quedado del lado malo.",
   "c": "narrador:Kael se mira la palma. Tiene marcada una barra, como de haber empujado algo ardiendo.|kael-:Eché un cerrojo. Desde dentro.|dalia:¿Te acuerdas de por qué?|kael:Me acuerdo de que no lo pensé. Que es peor: no tengo ni a quién echarle la culpa.",
   "pide": 2
  },
  "dalia": {
   "r": 0,
   "n": "Los jueves de la panadera",
   "a": "dalia:Olaia hacía pan los jueves. Tasio pasaba a por el suyo y nunca llevaba suelto.|kael:¿Te sabes hasta lo que debía cada uno?|dalia:Tasio debía once panes. Los tengo apuntados.",
   "c": "narrador:Dalia dice los nombres en voz baja, uno por uno, hasta el final del valle. Ninguna planta se gira.|dalia-:Antes contestaban.|kael:Dilos igual.|dalia:Los digo igual. Si me callo yo, ya no los dice nadie.",
   "pide": 1
  },
  "fenn": {
   "r": 0,
   "n": "La primera flecha",
   "a": "fenn:Aquí acerté la primera. A una piña.|kael:¿A cuántos pasos?|fenn:Doce. Roque dijo «bien» y me puso la mano en el hombro. No dijo nada más en todo el día.",
   "c": "narrador:Fenn clava una flecha en el suelo, junto a un tocón, y la deja ahí.|kael:¿No la recoges?|fenn-:Es la que le debía. Nunca le di las gracias.|fenn:Ahora ya sabe dónde está.",
   "pide": 1
  },
  "brakk": {
   "r": 1,
   "n": "La vagoneta",
   "a": "brakk:Esa rueda. La he arreglado mil veces.|kael:¿Y sigue rota?|brakk:Sigue. Cada vez que la dejaba bien, me acordaba de la puerta. Y volvía a desmontarla.",
   "c": "narrador:Brakk aprieta la última tuerca. La vagoneta rueda sola dos palmos y se para.|brakk+:Ya está.|kael:¿Treinta años para eso?|brakk-:Treinta años para atreverme a que estuviera acabada.",
   "pide": 2
  },
  "sirel": {
   "r": 2,
   "n": "El nombre del barco",
   "a": "kael:Capitana, ¿cómo se llamaba el barco?|sirel!:No se pregunta.|kael:¿Trae mala suerte?|sirel:Trae que te lo diga. Y si te lo digo, ya no es solo mío.",
   "c": "narrador:Sirel raspa con la uña la sal de una tabla suelta. Debajo hay tres letras pintadas.|sirel-:Di la orden de no abandonar a ninguno. No abandonamos a ninguno.|sirel:Por eso estamos todos abajo. Fue una buena orden. Fue una orden malísima.",
   "pide": 3
  },
  "vesper": {
   "r": 4,
   "n": "El primer recado",
   "a": "vesper:El primer recado fue una vela. «Llévala a la tercera puerta y enciéndela.»|kael:¿Y qué había en la tercera puerta?|vesper:Mi casa.",
   "c": "narrador:En la ventana hay un cabo de vela. Alguien lo ha ido cambiando.|vesper-:Me esperaban esa semana. Yo llevaba recados a todas las puertas menos a esa.|kael:Aún estás a tiempo.|vesper:Llevo treinta años a tiempo. Ese es el problema.",
   "pide": 3
  },
  "edrin": {
   "r": 7,
   "n": "La cena",
   "a": "edrin:Le dije: «bajo a cenar». Tenía fiebre, pero poca.|dalia:¿Y qué había de cena?|edrin+:Sopa. Mamá hace una sopa malísima. Yo le decía que estaba rica.",
   "c": "narrador:En el refectorio hay dos cuencos. Uno está lleno y frío.|edrin-:Lo sirve cada noche.|edrin:Voy a bajar. Aunque esté fría. Sobre todo si está fría.",
   "pide": 8
  },
  "chispa": {
   "r": 3,
   "n": "Dar cuerda",
   "a": "chispa:Tic. Recuerdo número uno: una mano me da cuerda.|kael:¿De quién?|chispa:Tic. Dato insuficiente. La mano tenía una quemadura en el pulgar.",
   "c": "chispa:Tic. Calixta me hizo para esperar por ella. Tic. He esperado.|chispa:Tic. Pregunta: cuando caiga el rayo, ¿para qué sirvo?|kael:Para lo que quieras.|chispa+:Tic. Eso no estaba en las instrucciones.",
   "pide": 4
  },
  "matias": {
   "r": 4,
   "n": "La ronda",
   "a": "matias:Las once y sereno, decía yo. Aunque no fueran las once ni estuviera sereno.|kael:¿Y la gente?|matias:Dormía mejor. Para eso se dice.",
   "c": "narrador:Matías prueba todas las puertas de la calle. Una está abierta.|matias-:Esta la dejé sin cerrar aquella noche. Por si volvía alguien tarde.|matias:No ha vuelto. La dejo abierta, si a ustedes no les importa.",
   "pide": 5
  },
  "aina": {
   "r": 5,
   "n": "El gallo",
   "a": "aina!:¡La primera vez que toqué me salió un gallo! ¡En un funeral!|kael:¿Un gallo con una campana?|aina:¡Se puede! ¡Hay que ser muy mala!",
   "c": "narrador:Aina toca tres veces. Limpio.|aina-:El abad se rio, aquel día. En el funeral. Se tuvo que tapar con la manga.|aina+:Era de su hermano. Me dijo que a su hermano le habría encantado.",
   "pide": 6
  },
  "sepia": {
   "r": 6,
   "n": "El borde del mapa",
   "a": "sepia:Todo mapa tiene un borde. Ahí se pone un dibujo, para no dejar el hueco.|kael:¿Qué pones tú?|sepia:Nada. Dejo el hueco. Me parece más honrado.",
   "c": "narrador:Sepia desenrolla el pliego. En una esquina hay un punto sin nombre.|sepia-:Es donde me paré yo. No sabía qué escribir al lado.|kael:Pon «aquí».|sepia+:«Aquí.» Vale. Es una escala que entiendo.",
   "pide": 7
  },
  "mirra": {
   "r": 1,
   "n": "La fórmula buena",
   "a": "mirra:Tres frascos. Dos explotan y uno cura. Nunca los etiqueté.|kael:¿Por qué no?|mirra+:Porque así presto atención.",
   "c": "narrador:Mirra encuentra un cuaderno chamuscado. La última página está a medias.|mirra-:Me faltaba una medida. La tenía en la cabeza cuando sonó la sirena.|mirra:Media onza. Era media onza. Treinta años para acordarme de media onza.",
   "pide": 0
  },
  "nacha": {
   "r": 1,
   "n": "El guiso del turno",
   "a": "nacha:Cuarenta raciones. Siempre hago cuarenta, aunque vengan seis.|kael:¿Y lo que sobra?|nacha!:En mi cocina no sobra. Se repite.",
   "c": "narrador:La olla sigue en la lumbre. No se ha pegado.|nacha-:La dejé a fuego lento. «Vuelvo en nada», dije.|nacha:Coged cuchara. Lleva treinta años haciéndose: o está incomible o es lo mejor que vais a probar.",
   "pide": 0
  },
  "corvin": {
   "r": 1,
   "n": "La chimenea más alta",
   "a": "corvin+:Aposté que subía la chimenea grande sin cuerda.|kael:¿Y subiste?|corvin:Hasta la mitad. Lo otro es lo que estoy intentando acordarme.",
   "c": "narrador:Arriba del todo hay un pañuelo atado al pararrayos.|corvin?:Es mío.|corvin+:¡Llegué! ¡Gané la apuesta!|kael:¿A quién?|corvin-:A mi hermano. Voy a tener que bajar a cobrársela.",
   "pide": 0
  },
  "saela": {
   "r": 4,
   "n": "El último baile",
   "a": "saela:Bailaba encima de brasas. La gente creía que era un truco.|dalia:¿Y no lo era?|saela:El truco era no parar. Si paras, quema.",
   "c": "narrador:Saela se queda quieta en mitad de la pista. Cuenta hasta cinco.|saela-:No quema.|saela:Treinta años sin parar por miedo a que quemara. Y no quema.|dalia:¿Y ahora?|saela+:Ahora me siento un rato. A ver qué es eso.",
   "pide": 0
  },
  "baldo": {
   "r": 2,
   "n": "La salva",
   "a": "baldo:Veintiún cañonazos, joven. Ni uno más. Es el reglamento.|kael:¿Para quién eran?|baldo:Para un almirante. Disparé veinte.",
   "c": "narrador:Don Baldo carga el cañón con mucha ceremonia y dispara al cielo.|baldo+:Veintiuno.|kael:El almirante lleva treinta años esperándolo.|baldo-:El almirante era un cretino, joven. El veintiuno era por mi artillero. Ese sí.",
   "pide": 0
  },
  "tizon": {
   "r": 1,
   "n": "El dueño",
   "a": "narrador:Tizón se sienta delante de una bocamina tapiada y no se mueve.|kael:Vamos, perro.|narrador:Tizón no va.",
   "c": "narrador:Entre los cascotes hay una gorra. Tizón la coge con cuidado y la deja a los pies de Kael.|kael-:No es mía, grandullón.|narrador:Tizón la empuja con el hocico. Otra vez.|kael:Vale. Te la guardo yo. Hasta que venga.",
   "pide": 0
  },
  "nerea": {
   "r": 2,
   "n": "La marca del arrecife",
   "a": "nerea:En el arrecife hay una lanza clavada. Marca hasta dónde se puede nadar.|kael:¿La pusiste tú?|nerea:La puso mi madre. Yo la moví diez brazas más lejos.",
   "c": "narrador:La lanza sigue donde Nerea la dejó. Diez brazas más allá del sitio seguro.|nerea-:Fui a demostrar que se podía.|nerea:Se podía ir. No había pensado en la vuelta.",
   "pide": 0
  },
  "osval": {
   "r": 5,
   "n": "Pedir lluvia",
   "a": "osval:Pedí lluvia cuarenta días. Al cuarenta y uno llovió.|kael:Enhorabuena.|osval-:Se quedó a medio caer. No sé si me escucharon a mí o a otro.",
   "c": "narrador:Una gota baja por fin y le cae a Osval en la frente.|osval+:Ah.|osval:Era para mí. Qué poca cosa es una gota. Qué barbaridad de alegría.",
   "pide": 0
  },
  "maris": {
   "r": 2,
   "n": "La perla que no subió",
   "a": "maris:Las perlas buenas están donde ya no llega la luz.|kael:¿Y tú bajabas?|maris+:Yo bajaba a todo. Tenía buen pulmón y poca cabeza.",
   "c": "narrador:Maris abre la mano. Lleva treinta años cerrada.|maris?:La tenía.|maris-:La encontré y no me quedaba aire para subirla. Y no la solté.|maris:Era para la boda de mi hermana. Dásela tú a alguien que se case.",
   "pide": 0
  },
  "tolo": {
   "r": 2,
   "n": "La red",
   "a": "tolo:Mi red era la más grande del puerto. Cabía un barco.|kael:¿Y qué pescabas?|tolo-:Poco. Los peces pequeños se escapaban por los agujeros. Me daban pena.",
   "c": "narrador:En la red de Tolo hay dos críos del puerto, dormidos. Los ha estado sujetando él.|tolo:Se cayeron del muelle con la ola y los cogí. No sabía qué hacer luego.|kael:¿Treinta años?|tolo+:No pesan. Son críos pequeños.",
   "pide": 0
  },
  "anselm": {
   "r": 2,
   "n": "La luz encendida",
   "a": "anselm:Un farero no apaga la luz mientras falte un barco.|kael:¿Cuántos faltan?|anselm:Uno. Siempre falta uno.",
   "c": "narrador:Anselm repasa el cuaderno del faro. Todos los barcos tienen una cruz menos el último.|anselm-:Ya sé cuál es.|anselm:El mío. Salí a buscar al que faltaba y no me apunté al volver.|anselm+:Qué descuido. Puedo apagar.",
   "pide": 0
  },
  "undina": {
   "r": 5,
   "n": "La fuente",
   "a": "undina:Yo era una fuente. La gente me echaba monedas y me contaba cosas.|dalia:¿Qué te pedían?|undina:Casi nunca cosas. Casi siempre personas.",
   "c": "narrador:En el fondo de la pila hay una sola moneda, muy gastada.|undina-:Esta la echó una niña. Pidió que su abuelo no se muriera.|undina:No pude. Me la guardé para acordarme de que no puedo con todo.",
   "pide": 0
  },
  "gorm": {
   "r": 0,
   "n": "El muro",
   "a": "gorm:Levanté un muro para que el ganado no pasara al barranco.|kael:¿Y funcionó?|gorm:El ganado no pasó.",
   "c": "narrador:Del otro lado del muro hay un zurrón de niño, muy viejo.|gorm-:Lo hice alto para las vacas. No pensé en que un crío no podría volver a saltarlo.|gorm:Lo sacaron. Pero estuvo una noche entera llamando. Desde entonces, puertas. Siempre dejo puerta.",
   "pide": 0
  },
  "rosal": {
   "r": 0,
   "n": "El duelo",
   "a": "rosal:Tenía un duelo a primera hora. Por una tontería.|kael:¿Qué tontería?|rosal!:Me llamó «florecilla».",
   "c": "narrador:En el claro espera un espadachín cubierto de zarzas, con la espada en alto.|rosal:Es él. Ha venido los treinta años.|rosal-:Baja eso, idiota. Ganas tú. Has esperado más.",
   "pide": 0
  },
  "boleto": {
   "r": 0,
   "n": "La seta sin nombre",
   "a": "boleto:Esta no viene en mi libro. Ni esta. Hijo, ¿tú ves bien de cerca?|fenn:Veo.|boleto+:Pues mírame si tiene anillo. Yo solo veo setas donde no las hay.",
   "c": "narrador:El Abuelo Boleto abre su cuaderno por la última hoja. Hay un dibujo sin título.|boleto-:Iba a ponerle el nombre de mi mujer. Y se me fue el nombre.|fenn:¿Cómo era ella?|boleto+:Pequeña, parda y no le hacía daño a nadie. Mira: ya tiene nombre.",
   "pide": 0
  },
  "lince": {
   "r": 0,
   "n": "Debajo de la máscara",
   "a": "kael:¿Nunca te la quitas?|lince:No.|kael:¿Ni para comer?|lince:Como poco.",
   "c": "narrador:Lince deja la máscara en una piedra. Debajo hay una cara corriente.|lince-:Cacé un lobo que mataba ovejas. Me hicieron una fiesta.|lince:No era un lobo. Era el perro de Marga, que se había asilvestrado. No lo dije.|kael:Te queda bien la cara.|lince:Pica.",
   "pide": 0
  },
  "tronco": {
   "r": 0,
   "n": "El hacha clavada",
   "a": "tronco:Un árbol al día. Ni dos ni medio.|kael:¿Y el que dejaste a medias?|tronco:¿Cuál?|kael:Ese del hacha clavada.",
   "c": "narrador:Tronco arranca el hacha. El corte está cicatrizado: el árbol ha crecido alrededor.|tronco-:Era el nogal de la escuela. Me mandaron tirarlo y a medio corte vi los nombres grabados.|tronco:Dije «mañana». Menos mal que no hubo mañana.",
   "pide": 0
  },
  "avellana": {
   "r": 0,
   "n": "La carta sin entregar",
   "a": "avellana+:¡Correo urgente! ¡Para… para…!|kael:¿Para quién?|avellana-:Se me ha borrado el sobre.",
   "c": "narrador:Avellana abre la carta. Dentro solo pone: «Sí».|avellana?:¿Sí a qué?|dalia:Alguien preguntó algo importante y alguien contestó.|avellana*:¡Pues hay que encontrar al que preguntó! ¡Lleva treinta años creyendo que era que no!",
   "pide": 0
  },
  "ziva": {
   "r": 3,
   "n": "Más rápida que el trueno",
   "a": "ziva:Entre el rayo y el trueno cabe una estocada. La mía.|kael:¿Y quién lo midió?|ziva+:Nadie. Por eso sigo invicta.",
   "c": "narrador:Ziva tira una estocada al aire. Truena después.|ziva-:Mi maestro decía que yo corría para no tener que quedarme.|ziva:Tenía razón. Me fui de su casa sin despedirme, que era más rápido.",
   "pide": 0
  },
  "tobias": {
   "r": 3,
   "n": "El plano número ocho",
   "a": "tobias:Siete bobinas quemadas. La octava iba a funcionar.|kael:¿Seguro?|tobias!:¡No! ¡Por eso había que probarla!",
   "c": "narrador:Tobías conecta dos cables. La bobina zumba y se enciende una bombilla. Una sola.|tobias?:Funciona.|tobias-:Funcionaba. Me morí con el plano bueno en el bolsillo y nadie supo que era el bueno.|tobias+:Apuntadlo. Bobina ocho. Tobías. Funciona.",
   "pide": 0
  },
  "rhaia": {
   "r": 3,
   "n": "La yegua",
   "a": "rhaia:Mi yegua le tenía miedo a las tormentas. Yo no.|kael:Mala pareja.|rhaia:La mejor. Ella sabía cuándo parar.",
   "c": "narrador:En lo alto de la meseta hay unas herraduras colgadas de un clavo.|rhaia-:Aquel día no quiso subir. La obligué.|rhaia:Bajó ella sola. Yo no. Le debo una disculpa y un saco de avena.",
   "pide": 0
  },
  "volta": {
   "r": 3,
   "n": "A tierra",
   "a": "volta:Un pararrayos no para nada. Lo lleva a tierra, que es distinto.|kael:¿Y los tuyos?|volta+:Los míos llevan a tierra hasta las malas noticias.",
   "c": "narrador:Volta toca el pararrayos de su propia casa. Está torcido.|volta-:Los puse en todo el pueblo. El mío lo dejé para el final.|volta:En casa del herrero, cuchillo de palo. Ahora lo enderezo.",
   "pide": 0
  },
  "ferran": {
   "r": 3,
   "n": "El reloj de la plaza",
   "a": "ferran:Todos mis relojes daban la hora. Ese era el problema.|kael:¿Qué problema es ese?|ferran-:Que la gente miraba el reloj y no al de al lado.",
   "c": "narrador:Maese Ferran abre la caja del reloj de la plaza. Dentro falta una pieza. Está en su bolsillo.|ferran:Lo paré yo, un rato antes del eclipse. Solo este.|ferran-:Quería que mi nieta acabara de contarme una cosa. No me acuerdo de qué.",
   "pide": 0
  },
  "nube": {
   "r": 3,
   "n": "El rebaño de tormentas",
   "a": "nube:Las tormentas son como las ovejas. Si corres detrás, se asustan.|kael:¿Y qué haces?|nube+:Me siento. Vienen solas a ver qué como.",
   "c": "narrador:Una nube pequeña y negra se le acerca a Nube y se le queda encima, sin llover.|nube-:Esta es Tizne. La perdí aquella tarde.|nube:Ha crecido. Ya no cabe en el zurrón.|kael:Llévala igual.|nube+:Claro. ¿Tú dejarías a una tormenta sola?",
   "pide": 0
  },
  "halcon": {
   "r": 3,
   "n": "El mensaje",
   "a": "halcon:Llevo un mensaje atado a la pata. Desde hace treinta años.|kael:¿No lo has leído?|halcon!:Un mensajero no lee.",
   "c": "narrador:Halcón deja que Dalia desate el papel.|dalia:Pone: «No vengas. Ya voy yo».|halcon-:Entonces los dos salieron a la vez.|halcon:Y yo en medio, sin llegar. Dime dónde vive cada uno. Voy a los dos sitios.",
   "pide": 0
  },
  "liora": {
   "r": 7,
   "n": "El juramento",
   "a": "liora:Juré proteger la puerta de la catedral.|kael:Las puertas están abiertas.|liora-:Por eso. Nunca he sabido contra qué.",
   "c": "narrador:Liora deja el escudo apoyado en la jamba, como quien deja un paraguas.|liora:Nadie atacó. Treinta años de guardia y no vino nadie.|liora+:Es el mejor servicio que he hecho. Y el más aburrido.",
   "pide": 0
  },
  "ysolde": {
   "r": 7,
   "n": "El cristal que falta",
   "a": "ysolde:En la vidriera mayor hay un hueco. Del tamaño de una mano.|dalia:¿Se rompió?|ysolde:No se llegó a poner. Yo llevaba el cristal.",
   "c": "narrador:Ysolde saca de la manga un cristal amarillo, envuelto en un pañuelo.|ysolde-:Me paré a mirar el eclipse. Un momento.|ysolde:Es el centro del sol. La vidriera lleva treinta años con un sol al que le falta el medio.|dalia:Como el de fuera.|ysolde:El de fuera no es culpa mía. Este sí.",
   "pide": 0
  },
  "gallo": {
   "r": 5,
   "n": "Maitines",
   "a": "gallo!:¡Arriba! ¡Que es de día!|kael:Fray Gallo, aquí nunca es de día.|gallo:Con más motivo. Alguien tendrá que decirlo.",
   "c": "narrador:Fray Gallo canta la hora. Nadie se levanta.|gallo-:En el monasterio me odiaban. Con cariño, pero me odiaban.|gallo:La última mañana me quedé dormido. Yo. Y fue esa.|gallo+:Así que canto. No vaya a amanecer y pille a todos en la cama.",
   "pide": 0
  },
  "aurel": {
   "r": 7,
   "n": "El espejo",
   "a": "aurel:Mi escudo es un espejo. El que me ataca se ve la cara.|kael:¿Y funciona?|aurel:Casi todos paran. Casi nadie se gusta con esa cara.",
   "c": "narrador:Aurel gira el escudo y se mira él.|aurel-:Yo nunca me había mirado. Era para los demás.|aurel:Tengo cara de cansado. Treinta años enseñándole a la gente la suya y no sabía la mía.",
   "pide": 0
  },
  "clarisa": {
   "r": 7,
   "n": "La calle de los faroles",
   "a": "clarisa:Encendía la calle entera. Cuarenta faroles.|kael:¿Y los apagabas por la mañana?|clarisa-:Ese era el otro turno. Ese era mi marido.",
   "c": "narrador:Los cuarenta faroles siguen encendidos. Al final de la calle hay una escalera apoyada.|clarisa:Es la suya. Subió a apagar el primero y se hizo de tarde.|clarisa+:Mira que le dije que yo encendía demasiado pronto.",
   "pide": 0
  },
  "mielina": {
   "r": 0,
   "n": "La colmena",
   "a": "mielina:A las abejas hay que contarles las novedades. Si no, se van.|kael:¿Qué novedades?|mielina:Bodas, nacimientos. Muertes, sobre todo.",
   "c": "narrador:Mielina se acerca a la colmena y da tres golpes con el nudillo.|mielina-:No les conté la mía. No me dio tiempo.|mielina:«Niñas: la que os cuidaba se ha muerto. Estad tranquilas, que os manda a otra.»|narrador:El zumbido cambia. Luego sigue.",
   "pide": 0
  },
  "lucera": {
   "r": 7,
   "n": "La estrella que faltaba",
   "a": "lucera:Tenía contadas cuatro mil doscientas. Me faltaba una para cerrar el catálogo.|kael:¿Y con el eclipse?|lucera!:¡Con el eclipse se ven mejor! ¡Eso es lo que da rabia!",
   "c": "narrador:Lucera mira por el anteojo, apunta un número y cierra el cuaderno.|lucera+:Cuatro mil doscientas una.|lucera-:Estaba detrás del sol. No iba a verla nunca si no se llega a parar.|lucera:No se lo digáis a nadie. Queda feísimo alegrarse.",
   "pide": 0
  },
  "morwen": {
   "r": 6,
   "n": "Los fuegos",
   "a": "morwen:Cada fuego fatuo es una pregunta que alguien no hizo.|kael:¿Cuál es la tuya?|morwen:Yo las colecciono. No las contesto.",
   "c": "narrador:Uno de los fuegos se le acerca a Morwen y se le posa en el hombro.|morwen-:Este es mío. «¿Te quedas?»|morwen:No se lo pregunté. Di por hecho que no.|kael:¿Y se quedó?|morwen:No lo sé. Me fui antes de saberlo. Soy muy lista para algunas cosas.",
   "pide": 0
  },
  "azrak": {
   "r": 7,
   "n": "La guardia",
   "a": "azrak:Mi señor me dijo: «guarda el puente hasta que anochezca. Entonces vuelvo».|kael:¿Y?|azrak:No ha anochecido.",
   "c": "narrador:En el pretil del puente hay un guante doblado. Dentro, una nota corta.|azrak-:«No voy a volver. Vete a casa.» La dejó antes de irse.|azrak:Sabía que no la leería hasta acabar la guardia.|kael:Te conocía bien.|azrak+:Me conocía fatal. He tardado treinta años menos de lo que él pensaba.",
   "pide": 0
  },
  "polilla": {
   "r": 4,
   "n": "Lo robado",
   "a": "polilla+:Yo solo robo cosas que nadie mira.|kael:¿Por ejemplo?|polilla:Paraguas. Botones. Una vez, una tarde entera.",
   "c": "narrador:Polilla vacía los bolsillos: un dedal, una canica, una llave pequeña.|polilla-:La llave es de la caja de música de una niña de la feria.|polilla:Se la quité para devolvérsela al final de la función. Como una broma.|polilla:La función no acaba. Llevo treinta años con la peor broma del mundo.",
   "pide": 0
  },
  "urraca": {
   "r": 6,
   "n": "La colección",
   "a": "urraca:Lo tengo todo, querido. Menos una cosa.|kael:¿Cuál?|urraca:Si lo supiera, ya la tendría.",
   "c": "narrador:Doña Urraca abre su cofre. Está lleno de emblemas con el nombre borrado.|urraca-:Los recogía de la sal. Pensaba que brillaban.|urraca:Son de gente. No lo sabía. Ayudadme a cargar: hay que llevárselos a ese escribano.",
   "pide": 0
  },
  "tanido": {
   "r": 5,
   "n": "La campana rajada",
   "a": "tanido:Una campana rajada no se puede arreglar. Hay que fundirla y hacerla otra vez.|kael:¿Y la tuya?|tanido-:La mía la rajé yo.",
   "c": "narrador:Tañido pasa el dedo por la grieta, de arriba abajo.|tanido:Toqué a rebato. Demasiado fuerte y demasiado tarde.|tanido-:Salieron todos. No hacía falta rajarla.|tanido:Suena fatal. Pero se oye desde más lejos que ninguna.",
   "pide": 0
  },
  "ilda": {
   "r": 1,
   "n": "La lista de la escolta",
   "a": "ilda:Una capitana no pierde a nadie. Lo trae o va a por él.|kael:¿Y si no se puede?|ilda:Entonces lo apunta. Y vuelve cuando se pueda.",
   "c": "narrador:Ilda saca una lista doblada en cuatro. Todos los nombres están tachados menos uno, que está roto por el doblez.|ilda-:No se lee. Lo he doblado demasiadas veces.|kael:¿Te acuerdas de quién era?|ilda:Me acuerdo de que corría con un farol en cada mano. Con eso lo encuentro.|kael:…|kael:Pues suerte. Hay mucha gente con faroles.",
   "pide": 0
  },
  "nacar": {
   "r": 5,
   "n": "La campana de difuntos",
   "a": "nacar:Fundí todas las campanas de este valle. Me sé la voz de cada una.|kael:¿Cuál es la mejor?|nacar-:La de difuntos del monasterio. La hice tan bien que nadie quiere oírla.",
   "c": "narrador:Nácar da un golpe de nudillo en el bronce mojado. Suena grave, muy largo.|nacar:Una campana de difuntos no es para el muerto. Es para que los demás puedan irse a casa.|nacar-:Lleva treinta años callada. Lo entiendo. Yo tampoco quise tocar la de mi marido.",
   "pide": 0
  },
  "sabina": {
   "r": 0,
   "n": "La semilla guardada",
   "a": "sabina:De cada cosecha se guarda la mejor semilla. No se come, por mucha hambre que haya.|dalia:¿Y la tuya?|sabina:La llevo en el bolsillo. Desde hace treinta años.",
   "c": "narrador:Sabina hace un hoyo con el dedo y deja caer la semilla.|sabina-:No la planté porque aquí no cambia la estación. No iba a salir.|dalia:¿Y ahora?|sabina*:Ahora tampoco. Pero una semilla en un bolsillo no es una semilla: es un botón.",
   "pide": 0
  },
  "orfeo": {
   "r": 3,
   "n": "El interruptor",
   "a": "orfeo:Todo lo que se enciende tiene que poder apagarse. Es lo primero que enseño.|kael:¿Y lo segundo?|orfeo-:Que eso no se le dice a quien acaba de encender algo.",
   "c": "narrador:En el taller hay una lámpara encendida sobre un banco vacío.|orfeo:La dejaba puesta para el último que saliera. Para que no recogiera a oscuras.|orfeo-:Aquella tarde el último fui yo. Y no la apagué: no quedaba nadie a quien dejársela.|narrador:Orfeo baja la palanca. La lámpara se apaga. No pasa nada malo.",
   "pide": 0
  },
  "clara": {
   "r": 0,
   "n": "El pan de las seis",
   "a": "clara:El pan se hace de noche para que esté a las seis. Alguien tiene que no dormir.|kael:¿Y si no amanece?|clara+:Entonces está hecho para cuando amanezca. El pan no pregunta.",
   "c": "narrador:Clara abre el horno. Dentro hay una hornada entera, dorada, intacta.|clara-:La última. La metí y salí a ver qué le pasaba al sol.|clara:Enseñé a amasar a una chica de las colinas. Olaia. Le salía quemado.|clara+:Decidle que el secreto es sacarlo antes. Siempre es antes de lo que una cree.",
   "pide": 0
  },
  "nadie": {
   "r": 6,
   "n": "El nombre",
   "a": "kael:¿Cómo te llamas?|nadie:Nadie.|kael:No, en serio.|nadie:En serio. Me lo pesaron y no dio nada.",
   "c": "narrador:Nadie se agacha y escribe con el dedo en la sal. No se ve lo que pone: el viento lo borra según escribe.|nadie:Lo sé. Me lo sé de memoria.|nadie-:No lo digo porque es lo único que tengo que no ha tocado nadie.|kael:Yo estuve treinta años sin apellido.|nadie:Y mira qué contento estabas.",
   "pide": 0
  }
 }
};
  root.AURIA_DATOS = D;
  if (typeof module !== "undefined") module.exports = D;
})(typeof window !== "undefined" ? window : globalThis);
