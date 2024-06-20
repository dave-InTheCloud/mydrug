import { Medication } from "@/app/model/Medication";
import { DrugPlan } from "../../model/DrugPlan";
import { StorageService } from "../LocalStorageService";

export class DrugPlanService {
  private readonly storage: StorageService<DrugPlan>;
  private readonly key: string = 'drug-plan';

  constructor() {
    this.storage = new StorageService<DrugPlan>();
  }

  async getDrugPlan(): Promise<DrugPlan> {
    const drugPlan = await this.storage.get(this.key);
    if (drugPlan) {
      return drugPlan;
    } else {
      // Return a default drug plan object if the stored drug plan is null
      return new DrugPlan();
    }
  }

  async setDrugPlan(drugPlan: DrugPlan): Promise<void> {
    await this.storage.set(this.key, drugPlan);
  }

  async removeDrugPlan(): Promise<void> {
    await this.storage.remove(this.key);
  }

  async removeDrugPlanByKey(key:string): Promise<void> {
    await this.storage.remove(key);
  }

  async clearDrugPlan(): Promise<void> {
    if (this.storage) {
      await this.removeDrugPlan();
    }
  }

  async addMedication(timeOfDay: string, medication: Medication): Promise<void> {
    const drugPlan = await this.getDrugPlan();
    switch(timeOfDay) {
      case 'morning':
        drugPlan.morning.push(medication);
        break;
      case 'afternoon':
        drugPlan.afternoon.push(medication);
        break;
      case 'evening':
        drugPlan.evening.push(medication);
        break;
      case 'night':
        drugPlan.night.push(medication);
        break;
      case 'bedtime':
        drugPlan.bedtime.push(medication);
        break;
      default:
        console.log('Invalid time of day');
    }
    
    await this.setDrugPlan(drugPlan);
  }

}
