import { Preset } from "./Preset";

export class StateMachineLog {
    id: number;
    user: string;
    preset: Preset;
    startTime: Date;
    endTime: Date;
    duration: number;

    constructor(
        id: number,
        user: string,
        preset: Preset,
        startTime: Date,
        endTime: Date,
        duration: number,
    ) {
        this.id = id;
        this.user = user;
        this.preset = preset;
        this.startTime = startTime;
        this.endTime = endTime;
        this.duration = duration;
    }

}
