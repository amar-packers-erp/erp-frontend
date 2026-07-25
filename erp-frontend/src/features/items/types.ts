export type ItemType = 'Duplex' | 'Reel' | 'PrintedPaper' | 'FinishedGood' | 'Consumable' | 'RawMaterial';

export interface ItemSpecification {
  gsm?: string;
  dimensions?: string;
}

export interface BoxSpecification {
  boxType?: string;
  boxesPerSheet?: number;
  itemSerialNumber?: string;
  dieSerialNumber?: string;
  length?: number;
  breadth?: number;
  height?: number;
  sheetLength?: number;
  sheetBreadth?: number;
}

export interface OrderConfigurations {
  duplexLength?: number;
  duplexBreadth?: number;
  duplexGsm?: number;
  duplexRate?: number;
  numberOf2Ply?: string;
  twoPlyGsm?: number;
  twoPlyRate?: number;
  printed?: boolean;
  laminated?: boolean;
  PrintingSize?: number;
  PrintingCost?: number;
  PrintingSheets?: number;
  lamRollSize?: number;
  lamSheetLength?: number;
  lamType?: string;
  fevicolCostPerSheet?: number;
  lamCostPerSheet?: number;
  sheeterRate?: number;
  pastingRate?: number;
  dieRate?: number;
  stitchingRate?: number;
  strappingRate?: number;
}

export interface Item {
  _id: string;
  itemCode: string;
  itemName: string;
  brand?: string;
  customer?: any;
  type: ItemType;
  category: string;
  itemSpecification?: ItemSpecification;
  specifications?: ItemSpecification;
  boxSpecification?: BoxSpecification;
  orderConfigurations?: OrderConfigurations;
  unitOfMeasure: string;
  createdAt?: string;
}

export interface ItemFormData {
  itemName: string;
  brand?: string;
  customer?: string;
  type: ItemType;
  category: string;
  itemSpecification?: {
    gsm?: string;
    dimensions?: string;
  };
  boxSpecification?: BoxSpecification;
  orderConfigurations?: OrderConfigurations;
  unitOfMeasure: string;
}
