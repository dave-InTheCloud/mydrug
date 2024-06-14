import { Medication } from "./Medication";

export class DrugPlan {
    morning: Medication[];
    afternoon: Medication[];
    evening: Medication[];
    night: Medication[];
    bedtime: Medication[];

    constructor() {
        this.morning = [];
        this.afternoon = [];
        this.evening = [];
        this.night = [];
        this.bedtime = [];
    }
}
