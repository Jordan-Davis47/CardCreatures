import ForrestDragon from "../../Images/Dragons/ForrestDragon.jpg";
import IsolatedDragon from "../../Images/Dragons/IsolatedDragon.jpg";
import PaintedDragon from "../../Images/Dragons/PaintedDragon.jpg";
import EtherealDragon from "../../Images/Dragons/EtherealDragon.jpg";
import SapphireDragon from "../../Images/Dragons/SapphireDragon.jpg";
import WhiteEyesBlackDragon from "../../Images/Dragons/WhiteEyesBlackDragon.png";
import EmperorDragon from "../../Images/Dragons/EmperorDragon.jpg";
import AmethystDragon from "../../Images/Dragons/AmethystDragon.jpg";
import CastleDragon from "../../Images/Dragons/CastleDragon.jpg";
import DragonTamer from "../../Images/Dragons/DragonTamer.jpg";
import DragonWizard from "../../Images/Dragons/DragonWizard.jpg";
import EagleSphinx from "../../Images/Dragons/EagleSphinx.jpg";
import DragonYoungling from "../../Images/Dragons/MistyDragon.jpg";
import ScaledDragon from "../../Images/Dragons/ScaledDragon.jpg";
import SnakeDragon from "../../Images/Dragons/SnakeDragon.jpg";
import YoungDragon from "../../Images/Dragons/YoungDragon.png";
import StoneDragon from "../../Images/Dragons/StoneDragon.jpg";
import ShadowDragon from "../../Images/Dragons/ShadowDragon.jpg";
import TerrorDragon from "../../Images/Dragons/TerrorDragon.jpg";
import DragonFire from "../../Images/Dragons/dragonFireimg.jpg";
import DragonBreathe from "../../Images/Dragons/DragonsBreathe.jpg";
import MountainRange from "../../Images/Dragons/MountainRange.png";
import MountainRangePortrait from "../../Images/Dragons/MountainRangePortrait.jpg";
import DragonSymbol from "../../Images/Dragons/dragonSymbol.jpg";
import ColoredEgg from "../../Images/Dragons/coloredEgg.jpg";
import CrackedDragonEgg from "../../Images/Dragons/crackedDragonEgg.jpg";
import BlackDragonFlame from "../../Images/Dragons/blackDragonFlame.jpg";

//-----------------------------------------------------------------//
import BirdTamer from "../../Images/Nature/BirdTamer.jpg";
import FireStag from "../../Images/Nature/FireStag.jpg";
import ForestWitch from "../../Images/Nature/ForestWitch.jpg";
import GlowingStag from "../../Images/Nature/GlowingStag.jpg";
import GiantBear from "../../Images/Nature/GiantBear.jpg";
import GrizzlyBear from "../../Images/Nature/GrizzlyBear.jpg";
import HowlingWolf from "../../Images/Nature/HowlingWolf.jpg";
import ImpCat from "../../Images/Nature/ImpCat.jpg";
import IslandTortoise from "../../Images/Nature/IslandTortoise.jpg";
import IslandTurtle from "../../Images/Nature/IslandTurtle.jpg";
import LightRabbit from "../../Images/Nature/LightRabbit.jpg";
import LoneWolf from "../../Images/Nature/LoneWolf.jpg";
import MamaBear from "../../Images/Nature/MamaBear.jpg";
import OdinsCrow from "../../Images/Nature/OdinsCrow.jpg";
import Pegasus from "../../Images/Nature/Pegasus.jpg";
import SleepingRhino from "../../Images/Nature/SleepingRhino.jpg";
import ToadSage from "../../Images/Nature/ToadSage.png";
import WitchesCat from "../../Images/Nature/WitchesCat.jpg";
import GaiaTree from "../../Images/Nature/gaiaTree.jpg";
import LizardEye from "../../Images/Nature/lizardEye.jpg";
import girlAndAWolf from "../../Images/Nature/girlAndWolf.jpg";
import SpiritLion from "../../Images/Nature/spiritLion.jpg";
import landscape from "../../Images/Nature/landscape.jpg";
import landscapePortrait from "../../Images/Nature/landscapePortrait.jpg";
import ParasiticLeech from "../../Images/Nature/parasiticLeech.jpg";

export const standardDecks = [
	// **********************************************DRAGON DECK*************************************************************** //
	// ************************************************************************************************************************ //
	{
		name: "DRAGON DECK",
		cards: [
			{
				name: "Forest Dragon",
				atk: 2300,
				def: 1500,
				img: ForrestDragon,
				id: 1,
				type: "monster",
				position: null,
				hasAttacked: false,
				tributesRequired: 1,
				cardDescription: "Guardian and ruler of the great forests, these creatures reign fire on those who seek to destroy the nature they have chosen to call home",
			},
			{
				name: "Dragontail Mountains ",
				img: MountainRangePortrait,
				id: 42,
				type: "spell",
				cardDescription: "Transfrom the land into the sharp stone labyrinth fit only for the dragon race : All dragon cards on the field have their attack increased by 300",
				effect: {
					type: "field spell",
					stat: "atk",
					amount: 300,
				},
			},
			{
				name: "Castle Dragon",
				atk: 900,
				def: 2000,
				img: CastleDragon,
				id: 15,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "With the defensive capabilities of a castle and the raw power of a dragon, this monster wont be counquered easily",
			},
			// {
			// 	name: "Hatching Dragon Egg",
			// 	img: CrackedDragonEgg,
			// 	id: 47,
			// 	type: "spell",
			// 	cardDescription: "Hatch a random dragon card from your deck and bring it into your hand",
			// 	effect: {
			// 		type: "Summon",
			// 		amount: 1,
			// 		condition: "Deck to hand",
			// 	},
			// },
			{
				name: "Dragon Tamer",
				atk: 1400,
				def: 1600,
				img: DragonTamer,
				id: 16,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "A member of the Black Dragon clan thought to be long extinct, these humans are some of the few remaining people that are able to control these feral beasts",
			},
			{
				name: "Wyvern Ambush",
				img: DragonSymbol,
				id: 43,
				type: "trap",
				cardDescription: "Summon a dragon spirit to avenge you: Destroy the card that attacked after the attack has completed",
				effect: {
					type: "destroy",
					amount: "attacker",
				},
			},
			{
				name: "Colossal Black Hole",
				img: GaiaTree,
				id: 49,
				type: "spell",
				cardDescription: "sacrifice 3 random cards from your hand, Destroy all cards on the field",
				effect: {
					type: "destroy",
					amount: "all",
					condition: "Sacrifice",
					conditionAmount: 3,
					conditionLocation: "hand",
				},
			},
			{
				name: "Comfort In The Flames",
				img: DragonSymbol,
				id: 45,
				type: "trap",
				cardDescription: "Reduce the damage inflicted by your opponents attack: Heal your life points by 500",
				effect: {
					type: "heal",
					amount: 500,
				},
			},

			{
				name: "Lucky Dragon Egg",
				img: ColoredEgg,
				id: 46,
				type: "spell",
				cardDescription: "Draw 2 cards",
				effect: {
					type: "draw",
					amount: 2,
				},
			},

			{
				name: "Flame Serpents Revenge",
				img: BlackDragonFlame,
				id: 51,
				type: "trap",
				cardDescription: "Destroy 1 random monster card from your opponents field ",
				effect: {
					type: "destroy",
					amount: 1,
				},
			},

			{
				name: "Dragons Breath",
				img: DragonBreathe,
				id: 36,
				type: "spell",
				cardDescription: "An inferno of fire cast from the mouth of a beastly dragon: Deal 400 damage to your opponents life points",
				effect: {
					type: "damage",
					amount: 400,
				},
			},
			{
				name: "Fury Of The Wyvern King",
				img: DragonFire,
				id: 37,
				type: "spell",
				cardDescription: "A mercilessly blind assault from the king of the Wyvern race: Destroy 1 random card from your opponents field at the cost of a random card from your field",
				effect: {
					type: "destroy",
					amount: 1,
					condition: "sacrifice",
					conditionAmount: 1,
					conditionLocation: "field",
				},
			},
			{
				name: "Isolated Dragon",
				atk: 1100,
				def: 2100,
				img: IsolatedDragon,
				id: 2,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "Isolated in its cave for thousands of years, this dragon will not be driven out of their land with ease and will destroy any who wander in to deep",
			},
			{
				name: "Painted Dragon",
				atk: 1200,
				def: 1200,
				img: PaintedDragon,
				id: 3,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "The artist that created this dragon was so talented, that on the last brush stroke what was a vision became a reality",
			},
			{
				name: "White Eyes Black Dragon",
				atk: 3000,
				def: 2500,
				img: WhiteEyesBlackDragon,
				id: 5,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "The most powerful of all the dragon races, this legendary being will destroy all that cross its path",
				tributesRequired: 2,
			},
			{
				name: "Emperor Dragon",
				atk: 2000,
				def: 2000,
				img: EmperorDragon,
				id: 4,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "Lord of the dragons, answers to no one and nothing.. destroys everything",
				tributesRequired: 1,
			},
			{
				name: "Ethereal Dragon",
				atk: 2200,
				def: 800,
				img: EtherealDragon,
				id: 6,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "A dragon shrouded in as much mystery as it is energy. thought to be a myth, these mystical beings have never been seen by the naked eye",
				tributesRequired: 1,
			},
			{
				name: "Sapphire Dragon",
				atk: 1800,
				def: 1000,
				img: SapphireDragon,
				id: 13,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "Blessed with scales harder than diamonds but with the blue glow of sapphire, these creatures are as beautiful as they are dangerous ",
			},
			{
				name: "Amethyst Dragon",
				atk: 1000,
				def: 1700,
				img: AmethystDragon,
				id: 14,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "",
			},

			{
				name: "Dragon Wizard",
				atk: 2300,
				def: 1900,
				img: DragonWizard,
				id: 17,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "With power found from unnatural means, these humans have learned to harness the raw dragon power and channel it into powerful magic",
				tributesRequired: 1,
			},

			{
				name: "Dragon Youngling",
				atk: 800,
				def: 800,
				img: DragonYoungling,
				id: 44,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "Still fresh from their mothers womb, this infant dragon might not be as mean and powerful as a adolescent dragon but that wont stop them from trying to kill you",
			},
			{
				name: "Scaled Dragon",
				atk: 1900,
				def: 1800,
				img: ScaledDragon,
				id: 20,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "Covered with scales as sturdy as rock, only the most powerful of attacks will penetrate this dragons armour",
			},
			{
				name: "Shadow Dragon",
				atk: 2400,
				def: 1000,
				img: ShadowDragon,
				id: 19,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "Shrouded with shadow and darkness, deadly in the light and a nightmare in the dark. if challenged by this demonic dragon the only defence is escape, if you can even see it coming",
				tributesRequired: 1,
			},
			{
				name: "Snake Dragon",
				atk: 1500,
				def: 2000,
				img: SnakeDragon,
				id: 20,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "A dragon imbued with the cunning and venom of the most deadly of snakes. This hybrid monster will seep the last ounce of life out of the most fearsome of foes",
			},
			{
				name: "Stone Dragon",
				atk: 1200,
				def: 2800,
				img: StoneDragon,
				id: 21,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "With the power of the dragon race and the hardness of mountain rock, this creature is a foe nothing has yet to best",
				tributesRequired: 1,
			},
			{
				name: "Terrorform Dragon",
				atk: 2200,
				def: 1800,
				img: TerrorDragon,
				id: 22,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "A manifestation of darkness, hate and terror. This abominations only instinct is to maim and tortue any living creatue is can find",
			},
			{
				name: "Young Dragon",
				atk: 600,
				def: 500,
				img: YoungDragon,
				id: 23,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "At teenage years dragons can be unpredictable and dangerous, if annoyed or intimidated this young dragon will not back down to anyone or anything",
			},
		],
	},
	// **********************************************NATURE DECK*************************************************************** //
	// ************************************************************************************************************************ //
	{
		name: "NATURE DECK",
		cards: [
			{
				name: "Bird Tamer",
				atk: 2000,
				def: 1600,
				img: BirdTamer,
				id: 7,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "Having won the respect and loyalty of the avian race, to even get close to this master trainer you must overcome the army of deadly birds protecting him",
			},
			{
				name: "Infernal Stag",
				atk: 2200,
				def: 1500,
				img: FireStag,
				id: 8,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "A majestic stag imbued with the power and heat of the fire spirits, some say this mythical being was the favourite creation of the fire gods in ancient times",
				tributesRequired: 1,
			},
			{
				name: "The Great Forest ",
				img: landscapePortrait,
				id: 41,
				type: "spell",
				cardDescription: "Transfrom the land into the Great Forest landscape of Valenwood, home to the most legendary of creatures: All nature cards have their defence increased by 400",
				effect: {
					type: "field spell",
					stat: "def",
					amount: 400,
				},
			},
			{
				name: "Gaias Milk",
				img: GaiaTree,
				id: 45,
				type: "spell",
				cardDescription: "Feel reborn and rejuvinated by the essence of the great mother of nature: Increase your life points by 500 points",
				effect: {
					type: "heal",
					amount: 500,
				},
			},
			{
				name: "Branches Of Peace",
				img: GaiaTree,
				id: 48,
				type: "trap",
				cardDescription: "Increase your life points by the attackers attack points and negate their attack",
				effect: {
					type: "heal",
					amount: "atk",
				},
				negate: true,
			},
			{
				name: "Colossal Black Hole",
				img: GaiaTree,
				id: 49,
				type: "spell",
				cardDescription: "Sacrifice 3 random cards from your hand, destroy all cards on the field",
				effect: {
					type: "destroy",
					amount: "all",
					condition: "sacrifice",
					conditionAmount: 3,
					conditionLocation: "hand",
				},
			},
			{
				name: "Parasitic Leech",
				img: ParasiticLeech,
				id: 50,
				type: "trap",
				cardDescription: "Leave on your opponent an almost invisible parasite that sucks the blood and soul out of its host: Drain your opponents LP into your own by 400 points",
				effect: {
					type: "Drain",
					amount: 400,
				},
			},

			{
				name: "Witch Of The Woods",
				atk: 1100,
				def: 1100,
				img: ForestWitch,
				id: 9,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "A resident of the woods of Gornfang, spending her time honing her dark magic and connection to nature. You will find only the harshest reception from the nature in her territory",
			},
			{
				name: "Giant Bear",
				atk: 3000,
				def: 2500,
				img: GiantBear,
				id: 10,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "Taller than the highest hill, heavier than the biggest boulder. This enormous bear will protect its land and any of its race with deadly rage",
				tributesRequired: 2,
			},
			{
				name: "Glowing Stag",
				atk: 2300,
				def: 1600,
				img: GlowingStag,
				id: 11,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "Light bursts from this noble animal, deflecting any darkness that may befall it and blinding all except the purest of creatures",
				tributesRequired: 1,
			},
			{
				name: "Grizzly Bear",
				atk: 1800,
				def: 1900,
				img: GrizzlyBear,
				id: 12,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "A mother bear hunting in its territory, it may not have the darkest of instincts but it will not hesitate to harm any who dare approach",
			},
			{
				name: "Eaglinx",
				atk: 2100,
				def: 1300,
				img: EagleSphinx,
				id: 18,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription:
					"Some say that the Sphinx needed a way to escape the shackle of being a statue and saw above an Eagle soaring through the sky. Summoning the power of the famed Egyptian gods he formed with the creature and took flight never to touch ground again",
			},
			{
				name: "Howling Wolf",
				atk: 1300,
				def: 1700,
				img: HowlingWolf,
				id: 24,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "The intensity of this wolfs howl is matched only by its killer instinct. Before a leaf falls the pack will surround his prey and devour its soul",
			},
			{
				name: "Furry Impcat",
				atk: 1500,
				def: 900,
				img: ImpCat,
				id: 25,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "The result of cross breeding and experimentation, hunted for its rarity this creature is fearful, fast and rarely seen",
			},
			{
				name: "Island Turtle",
				atk: 1800,
				def: 2700,
				img: IslandTurtle,
				id: 26,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "Legend has it this legendary turtle has lived for so many thousands of years that the island it called home began to grow from its shell, forming a almost indestructible monster",
				tributesRequired: 1,
			},
			{
				name: "Island Tortoise",
				atk: 2700,
				def: 1800,
				img: IslandTortoise,
				id: 27,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "A tortoise the size of an island, while vulnerabilities from its size may exist its speed will shock and stun its enemies",
				tributesRequired: 1,
			},
			{
				name: "Rabbit Lord Of Light",
				atk: 2800,
				def: 2200,
				img: LightRabbit,
				id: 28,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "The animal embodiment of the Lord of Light, this celestial being has the ability to dash at the speed of light while containing the bursting power of light itself",
				tributesRequired: 2,
			},
			{
				name: "Lone Wolf",
				atk: 2200,
				def: 1200,
				img: LoneWolf,
				id: 29,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "A wolf without a pack is usually an easy target, all that have tried to best this animal have quickly realised the grave mistake they have made",
				tributesRequired: 1,
			},
			{
				name: "Mama Bear",
				atk: 1600,
				def: 2400,
				img: MamaBear,
				id: 30,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "A mama bear hunting for her young, approach with caution as there is not much that can stave the ferocity of a mother bear protecting her cubs",
			},
			{
				name: "Odins Crow",
				atk: 1000,
				def: 1000,
				img: OdinsCrow,
				id: 31,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "The pet of the all knowing Norse god, this crow contains the knowledge and sight of every bird in existence",
			},
			{
				name: "Pegasus",
				atk: 2300,
				def: 1700,
				img: Pegasus,
				id: 32,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "The famed steed of the demi god Hercules, created by Zeus this powerful creature is indeed the king of horses",
			},
			{
				name: "Sleeping Rhino",
				atk: 1200,
				def: 2500,
				img: SleepingRhino,
				id: 33,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "This creature is well known in its land as one that sleeps for 22 hours a day, only waking for food and water. It is known to attack any that wake it from its seemingly eternal slumber",
			},
			{
				name: "Toad Sage",
				atk: 2000,
				def: 2000,
				img: ToadSage,
				id: 34,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "A magic weilding wise creature, the representative for the toad race in the council of sages. A powerful group of wizards, warlocks and sages ",
			},
			{
				name: "Witches Cat",
				atk: 600,
				def: 900,
				img: WitchesCat,
				id: 35,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "A witches best friend, if this magical animal crosses your path. be prepared for the worst luck you can imagine",
			},
			{
				name: "Metamorphesis",
				img: LizardEye,
				id: 38,
				type: "spell",
				cardDescription: "Shed your skin and transform into your final form: Increase 1 monsters attack by 400",
				targetRequired: true,
				effect: {
					type: "increase",
					stat: "atk",
					amount: 400,
				},
			},
			{
				name: "Girl And Her Wolf",
				atk: 800,
				def: 1300,
				img: girlAndAWolf,
				id: 39,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "A seemingly vulnerable young girl protected by her wolf, step to close and feel the bite of her protector",
			},
			{
				name: "Spirit Lion",
				atk: 2600,
				def: 2100,
				img: SpiritLion,
				id: 40,
				type: "monster",
				position: null,
				hasAttacked: false,
				cardDescription: "Said to be the king of the spirit jungle, the alpha of all lions and the guardian of the Netherealm",
			},
		],
	},
];
