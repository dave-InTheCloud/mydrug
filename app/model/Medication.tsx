export class Medication {
    name: string;
    dose: string;
    remark: string;

    constructor(name: string, dose: string, remark: string) {
        this.name = name;
        this.dose = dose;
        this.remark = remark;
    }
}