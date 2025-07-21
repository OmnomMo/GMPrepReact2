const SKILLS = [
	"None",
	"Athletics",
	"Acrobatics",
	"Sleight of Hand",
	"Stealth",
	"Arcana",
	"History",
	"Investigation",
	"Nature",
	"Religion",
	"Animal Handling",
	"Insight",
	"Medicine",
	"Perception",
	"Survival",
	"Deception",
	"Intimidation",
	"Performance",
	"Persuasion"
]

const ABILITIES = [
	"STR",
	"DEX",
	"CON",
	"INT",
	"WIS",
	"CHA"
]

function GetAbilityModifier(abilityScore) {
	return Math.floor((abilityScore - 10) / 2);
}

function GetModifierColor(modifier) {
	if (modifier < 0) {
		return "#8B0000";
	}
	if (modifier > 0) {
		return "#228B22";
	}
	return "#696969"
}

export {SKILLS, ABILITIES, GetAbilityModifier, GetModifierColor};