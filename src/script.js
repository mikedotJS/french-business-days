#!/usr/bin/env node

function getEasterDate(year) {
	const floor = Math.floor;
	const G = year % 19;
	const C = floor(year / 100);
	const H = (C - floor(C / 4) - floor((8 * C + 13) / 25) + 19 * G + 15) % 30;
	const I =
		H - floor(H / 28) * (1 - floor(29 / (H + 1)) * floor((21 - G) / 11));
	const J = (year + floor(year / 4) + I + 2 - C + floor(C / 4)) % 7;
	const L = I - J;
	const month = 3 + floor((L + 40) / 44);
	const day = L + 28 - 31 * floor(month / 4);
	return new Date(year, month - 1, day);
}

function getFrenchHolidays(year) {
	const easter = getEasterDate(year);
	const holidays = [
		new Date(year, 0, 1),
		new Date(year, 4, 1),
		new Date(year, 4, 8),
		new Date(year, 6, 14),
		new Date(year, 7, 15),
		new Date(year, 10, 1),
		new Date(year, 10, 11),
		new Date(year, 11, 25),
		new Date(easter.getFullYear(), easter.getMonth(), easter.getDate() + 1),
		new Date(easter.getFullYear(), easter.getMonth(), easter.getDate() + 39),
		new Date(easter.getFullYear(), easter.getMonth(), easter.getDate() + 50),
	];
	return holidays.map((d) => d.toDateString());
}

function countBusinessDays(month, year, startDay = 1, lastDay = null) {
	const daysInMonth = new Date(year, month, 0).getDate();
	const endDay = lastDay || daysInMonth;

	if (
		startDay < 1 ||
		startDay > daysInMonth ||
		endDay < 1 ||
		endDay > daysInMonth
	) {
		console.error(
			`❌ Erreur : Les jours doivent être entre 1 et ${daysInMonth}`,
		);
		process.exit(1);
	}

	if (startDay > endDay) {
		console.error(
			"❌ Erreur : Le jour de début ne peut pas être après le jour de fin.",
		);
		process.exit(1);
	}

	let count = 0;
	const holidays = getFrenchHolidays(year);

	const start = new Date(year, month - 1, startDay);
	const end = new Date(year, month - 1, endDay);

	const current = new Date(start);
	while (current <= end) {
		const day = current.getDay();
		const isWeekend = day === 0 || day === 6;
		const isHoliday = holidays.includes(current.toDateString());

		if (!isWeekend && !isHoliday) {
			count++;
		}
		current.setDate(current.getDate() + 1);
	}
	return count;
}

const args = process.argv.slice(2);
const monthArg = args.indexOf("--month");
const yearArg = args.indexOf("--year");
const startDayArg = args.indexOf("--start-day");
const endDayArg = args.indexOf("--end-day");

if (monthArg === -1 || yearArg === -1) {
	console.log(
		"Usage: node business-days.js --month <1-12> --year <YYYY> [--start-day <1-31>] [--end-day <1-31>]",
	);
	process.exit(1);
}

const month = Number.parseInt(args[monthArg + 1], 10);
const year = Number.parseInt(args[yearArg + 1], 10);
const startDay =
	startDayArg !== -1 ? Number.parseInt(args[startDayArg + 1], 10) : 1;
const endDay =
	endDayArg !== -1 ? Number.parseInt(args[endDayArg + 1], 10) : null;

if (Number.isNaN(month) || Number.isNaN(year) || month < 1 || month > 12) {
	console.error("❌ Erreur : Mois ou année invalide.");
	process.exit(1);
}

const result = countBusinessDays(month, year, startDay, endDay);

console.log(
	`📅 Jours ouvrés du ${startDay}/${month}/${year} au ${endDay || "fin du mois"} : ${result}`,
);
