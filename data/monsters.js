const monsters = [
  "Aarakocra",
  "Abishai",
  "Abjurer",
  "Aboleth",
  "AbyssalWretch",
  "AirElemental",
  "Alhoon",
  "Alkilith",
  "Allip",
  "Allosaurus",
  "Amnizu",
  "AncientDragon",
  "Androsphinx",
  "Ankheg",
  "Ankylosaurus",
  "Arcanaloth",
  "Archdruid",
  "Archmage",
  "Armanite",
  "AstralDreadnought",
  "Aurochs",
  "AutumnEladrin",
  "AwakenedShrub",
  "AwakenedTree",
  "AxeBeak",
  "Azer",
  "Babau",
  "Baboon",
  "Badger",
  "Balhannoth",
  "Balor",
  "Banderhobb",
  "Banshee",
  "BarbedDevil",
  "Barghest",
  "Barlgura",
  "Basilisk",
  "Bat",
  "Bear",
  "BeardedDevil",
  "Behir",
  "Beholder",
  "Berbalang",
  "Berserker",
  "BlackPudding",
  "Boar",
  "Bodak",
  "Boggle",
  "Boneclaw",
  "BoneDevil",
  "BoneNaga",
  "Brontosaurus",
  "Bugbear",
  "Bulette",
  "Bulezau",
  "Bullywug",
  "Cadaver",
  "Cambion",
  "Camel",
  "Canoloth",
  "CarrionCrawler",
  "Catoblepas",
  "CaveFisher",
  "Centaur",
  "Centipede",
  "ChainDevil",
  "Chasme",
  "Chimera",
  "Chitine",
  "Choker",
  "Choldrith",
  "Chuul",
  "ClayGolem",
  "Cloaker",
  "CloudGiant",
  "Cockatrice",
  "Conjurer",
  "CorpseFlower",
  "Couatl",
  "Crab",
  "Crocodile",
  "Cyclops",
  "Dao",
  "Darkling",
  "Darkmantle",
  "DeathKiss",
  "DeathKnight",
  "Deathlock",
  "DeathlockWight",
  "DeathTyrant",
  "DeepScion",
  "Deinonychus",
  "Demilich",
  "Derro",
  "Deva",
  "Devourer",
  "Dhergoloth",
  "Dimetrodon",
  "DireWolf",
  "DisplacerBeast",
  "Diviner",
  "Djinni",
  "Doppelganger",
  "Draegloth",
  "Dragon",
  "DragonTurtle",
  "Dreadnought",
  "Dretch",
  "Drider",
  "Drow",
  "DrowArachnomancer",
  "DrowMage",
  "Druid",
  "Dryad",
  "Duergar",
  "Duodrone",
  "DustMephit",
  "Dybbuk",
  "Eagle",
  "EarthElemental",
  "Efreeti",
  "Eidolon",
  "ElderDragon",
  "ElderTempest",
  "Empyrean",
  "Enchanter",
  "Erinyes",
  "Ettercap",
  "Ettin",
  "Evoker",
  "FaerieDragon",
  "FireBeetle",
  "FireElemental",
  "FireGiant",
  "Firenewt",
  "Flameskull",
  "FleshGolem",
  "Flind",
  "Flumph",
  "Fomorian",
  "Froghemoth",
  "FrostGiant",
  "Fungus",
  "GalebDuhr",
  "Gargoyle",
  "GasSpore",
  "Gauth",
  "Gazer",
  "GelatinousCube",
  "Ghast",
  "Ghost",
  "Ghoul",
  "GibberingMouther",
  "Giff",
  "Girallon",
  "Githyanki",
  "Githzerai",
  "Glabrezu",
  "GloomWeaver",
  "Gnoll",
  "GnollFleshGnawer",
  "GnollWitherling",
  "Goblin",
  "Gorgon",
  "Goristro",
  "Grell",
  "Grick",
  "Griffon",
  "Grimlock",
  "Grung",
  "GuardDrake",
  "GuardianNaga",
  "Gynosphinx",
  "Hadrosaurus",
  "Halfogre",
  "Harpy",
  "HellfireEngine",
  "HellHound",
  "Hezrou",
  "HillGiant",
  "Hippogriff",
  "Hobgoblin",
  "Homunculus",
  "HookHorror",
  "HornedDevil",
  "Howler",
  "Hydra",
  "Hydroloth",
  "Hyena",
  "IceDevil",
  "IceMephit",
  "Illusionist",
  "Imp",
  "Incubus",
  "IntellectDevourer",
  "InvisibleStalker",
  "IronGolem",
  "Jackal",
  "Jackalwere",
  "Jelly",
  "Kenku",
  "Kirin",
  "Kobold",
  "Korred",
  "Kraken",
  "Kruthik",
  "Kuotoa",
  "Lamia",
  "Lemure",
  "Leucrotta",
  "Leviathan",
  "Lich",
  "Lizard",
  "Mage",
  "MagmaMephit",
  "Magmin",
  "Mammoth",
  "Manes",
  "Manticore",
  "Marid",
  "Marilith",
  "Marut",
  "MasterThief",
  "Mastiff",
  "Maurezhi",
  "MawDemon",
  "Meazel",
  "Medusa",
  "Meenlock",
  "Merregon",
  "Merrenoloth",
  "Merrow",
  "Mezzoloth",
  "Mimic",
  "MindFlayer",
  "Minotaur",
  "Molydeus",
  "Monodrone",
  "Morkoth",
  "MouthOfGrolantor",
  "MudMephit",
  "Mule",
  "Mummy",
  "Myconid",
  "Nabassu",
  "Nagpa",
  "Nalfeshnee",
  "Narzugon",
  "Necromancer",
  "NeedleBlight",
  "Neogi",
  "Neothelid",
  "Nightmare",
  "Nightwalker",
  "Nilbog",
  "Nothic",
  "Nupperibo",
  "Nycaloth",
  "OakenBolter",
  "Oblex",
  "Octopus",
  "Ogre",
  "Oinoloth",
  "Oni",
  "Ooze",
  "Orc",
  "Orog",
  "Orthon",
  "Otyugh",
  "Owl",
  "Owlbear",
  "Ox",
  "Pegasus",
  "Pentadrone",
  "Peryton",
  "Phoenix",
  "Piercer",
  "PitFiend",
  "Pixie",
  "Planetar",
  "Plesiosaurus",
  "Poltergeist",
  "Pseudodragon",
  "Pteranodon",
  "Quadrone",
  "Quaggoth",
  "Quasit",
  "Quetzalcoatlus",
  "Quickling",
  "Quipper",
  "Rakshasa",
  "Rat",
  "Raven",
  "Redcap",
  "Remorhaz",
  "Render",
  "Retriever",
  "Revenant",
  "Rhinoceros",
  "Roc",
  "Roper",
  "Rothe",
  "RustMonster",
  "Rutterkin",
  "Sahuagin",
  "Salamander",
  "Satyr",
  "Scarecrow",
  "Scorpion",
  "SeaHag",
  "SeaHorse",
  "SeaSpawn",
  "Shadow",
  "ShadowDemon",
  "ShamblingMound",
  "ShieldGuardian",
  "Shoosuva",
  "Shrieker",
  "Sibriex",
  "Skeleton",
  "Skulk",
  "SkullLord",
  "Slaad",
  "SlitheringTracker",
  "SmokeMephit",
  "Snail",
  "Snake",
  "Sorrowsworn",
  "SoulMonger",
  "SpawnofKyuss",
  "Spectator",
  "Specter",
  "Spider",
  "SpinedDevil",
  "SpiritNaga",
  "SpiritTroll",
  "SpringEladrin",
  "Sprite",
  "StarSpawnGrue",
  "StarSpawnHulk",
  "StarSpawnMangler",
  "SteamMephit",
  "Steeder",
  "SteelPredator",
  "Stegosaurus",
  "StenchKow",
  "Stirge",
  "StoneCursed",
  "StoneDefender",
  "StoneGiant",
  "StoneGolem",
  "StormGiant",
  "Succubus",
  "SummerEladrin",
  "Svirfneblin",
  "Tanarukk",
  "Tarrasque",
  "Thorny",
  "Thrikreen",
  "Tlincalli",
  "Tortle",
  "Transmuter",
  "Trapper",
  "Treant",
  "Triceratops",
  "Tridrone",
  "Troglodyte",
  "Troll",
  "TwigBlight",
  "TyrannosaurusRex",
  "Ulitharid",
  "Ultroloth",
  "UmberHulk",
  "Unicorn",
  "Vampire",
  "VampiricMist",
  "Vargouille",
  "Vegepygmy",
  "Velociraptor",
  "VineBlight",
  "Vrock",
  "Vulture",
  "Warlock",
  "Wasp",
  "Wastrilith",
  "WaterElemental",
  "Werebear",
  "Wereboar",
  "Wererat",
  "Weretiger",
  "Werewolf",
  "Whelk",
  "Wight",
  "Willowisp",
  "WingedKobold",
  "WinterEladrin",
  "Wolf",
  "WoodWoad",
  "Worg",
  "Worm",
  "Wraith",
  "WretchedSorrowsworn",
  "Wyvern",
  "Xorn",
  "Xvart",
  "Yagnoloth",
  "YethHound",
  "Yeti",
  "Yochlol",
  "Yuanti",
  "Zaratan",
  "Zombie"
];

module.exports = monsters;
