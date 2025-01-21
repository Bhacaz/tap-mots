
export const TIME_GOOD_ANSWER = 3;

export class Word {
    text: string;
    progress: number;

    constructor(text: string) {
        this.text = text;
        this.progress = 0;
    }

    completed(): boolean {
        return this.progress >= TIME_GOOD_ANSWER;
    }

    increaseProgress(): void {
        this.progress += 1;
    }

    completionPercentage(): number {
        return this.progress / TIME_GOOD_ANSWER * 100;
    }
}
