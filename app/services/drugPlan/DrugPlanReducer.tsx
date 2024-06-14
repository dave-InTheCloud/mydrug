import { DrugPlan } from "../../model/DrugPlan";
import { Medication } from "../../model/Medication";

type DrugPlanState = {
  drugPlan: DrugPlan;
};

type DrugPlanAction =
  | { type: "SET_DRUG_PLAN"; payload: DrugPlan }
  | { type: "ADD_MEDICATION"; payload: { timeOfDay: string; medication: Medication } };

export const drugPlanReducer = (state: DrugPlanState, action: DrugPlanAction): DrugPlanState => {
  switch (action.type) {
    case 'updateProperty':
        return { ...state, [action.payload.property]: action.payload.value };
    case "SET_DRUG_PLAN":
      return { ...state, drugPlan: action.payload };
    case "ADD_MEDICATION":
      const drugPlan = new DrugPlan();
      drugPlan.addMedication(action.payload.timeOfDay, action.payload.medication);
      return { ...state, drugPlan };
    default:
      return state;
  }
};
