export interface LineType {
  id: number;
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  parentId: number;
  rowName: string;
  salary: number;
  supportCosts:number;
  child?: LineType[];
}