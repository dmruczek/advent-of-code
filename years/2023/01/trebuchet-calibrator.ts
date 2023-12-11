export class TrebuchetCalibrator {

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