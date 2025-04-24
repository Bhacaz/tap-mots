export function getTimeGoodAnswer(): number {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('TIME_GOOD_ANSWER') : null;
    return stored ? parseInt(stored, 10) : 5;
}

export class Word {
    text: string;
    progress: number;

    constructor(text: string) {
        this.text = text;
        this.progress = 0;
    }

    completed(): boolean {
        return this.progress >= getTimeGoodAnswer();
    }

    increaseProgress(): void {
        this.progress += 1;
    }

    completionPercentage(): number {
        return this.progress / getTimeGoodAnswer() * 100;
    }
}
