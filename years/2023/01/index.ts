import _ from "lodash";
import * as util from "../../../util/util";
import * as test from "../../../util/test";
import chalk from "chalk";
import { log, logSolution, trace } from "../../../util/log";
import { performance } from "perf_hooks";
import { normalizeTestCases } from "../../../util/test";

const YEAR = 2023;
const DAY = 1;

// solution path: C:\Users\Dave\Documents\code\advent-of-code\years\2023\01\index.ts
// data path    : C:\Users\Dave\Documents\code\advent-of-code\years\2023\01\data.txt
// problem url  : https://adventofcode.com/2023/day/1

class TrebuchetCalibrator {

    processCalibrationLine(str:string ) {
        const numbers = this.extractNumbers(str);
        return parseInt((numbers[0] + numbers[numbers.length-1]), 10);
    }

    processCalibrationLine2(str:string ) {
        const numbers = this.extractNumbers2(str);
        return (numbers[0]*10) + numbers[numbers.length-1];
    }

    extractNumbers(str:string) : RegExpMatchArray {
		const result = str.match(/\d/g);
		if (result === null) {
			throw 'error';
		}
		return result;
    }

    extractNumbers2(str:string) {

        let numArray = new Array(str.length);
        const numbersToSearch = [
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9"
        ];

        for (let numToSearch of numbersToSearch) {
            let startIndex = 0, index;
            while ((index = str.indexOf(numToSearch, startIndex)) > -1) {
                numArray[index] = this.convertToNumber(numToSearch);
                startIndex = index + numToSearch.length;
            }
        }

        numArray = numArray.filter(n => n);

        return numArray;

    }

    convertToNumber(str:string) :number {

        const strMap: Record<string, number> = {
            "one": 1,
            "two": 2,
            "three": 3,
            "four": 4,
            "five": 5,
            "six": 6,
            "seven": 7,
            "eight": 8,
            "nine": 9,
        };
        if (strMap[str]) {
            return strMap[str];
        }
        return parseInt(str, 10);
    }

    calibrate(data: string) {
        const stringArray = data.split('\n');
        let total = 0;
        for (let str of stringArray) {
            total += this.processCalibrationLine(str);
        }
        return total;
    }

    calibrate2(data: string) {
        const stringArray = data.split('\n');
        let total = 0;
        for (let str of stringArray) {
            total += this.processCalibrationLine2(str);
        }
        return total;
    }
}

async function p2023day1_part1(input: string, ...params: any[]) {
	const trebuchetCalibrator = new TrebuchetCalibrator();
	return trebuchetCalibrator.calibrate(input);
}

async function p2023day1_part2(input: string, ...params: any[]) {
	const trebuchetCalibrator = new TrebuchetCalibrator();
	return trebuchetCalibrator.calibrate2(input);
}

async function run() {
	const part1tests: TestCase[] = [];
	const part2tests: TestCase[] = [];

	const [p1testsNormalized, p2testsNormalized] = normalizeTestCases(part1tests, part2tests);

	// Run tests
	test.beginTests();
	await test.section(async () => {
		for (const testCase of p1testsNormalized) {
			test.logTestResult(testCase, String(await p2023day1_part1(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	await test.section(async () => {
		for (const testCase of p2testsNormalized) {
			test.logTestResult(testCase, String(await p2023day1_part2(testCase.input, ...(testCase.extraArgs || []))));
		}
	});
	test.endTests();

	// Get input and run program while measuring performance
	const input = await util.getInput(DAY, YEAR);

	const part1Before = performance.now();
	const part1Solution = String(await p2023day1_part1(input));
	const part1After = performance.now();

	const part2Before = performance.now()
	const part2Solution = String(await p2023day1_part2(input));
	const part2After = performance.now();

	logSolution(1, 2023, part1Solution, part2Solution);

	log(chalk.gray("--- Performance ---"));
	log(chalk.gray(`Part 1: ${util.formatTime(part1After - part1Before)}`));
	log(chalk.gray(`Part 2: ${util.formatTime(part2After - part2Before)}`));
	log();
}

run()
	.then(() => {
		process.exit();
	})
	.catch(error => {
		throw error;
	});
