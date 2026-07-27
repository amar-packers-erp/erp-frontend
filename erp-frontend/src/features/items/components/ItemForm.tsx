import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { STOCK_CATEGORIES } from '../../../mocks/items';
import { useCustomers } from '../../customers/hooks/useCustomers';
import type { ItemFormData, Item, OrderConfigurations } from '../types';

const orderConfigSchema = z.object({
  duplexLength: z.string().optional(),
  duplexBreadth: z.string().optional(),
  duplexGsm: z.string().optional(),
  duplexRate: z.string().optional(),
  numberOf2Ply: z.string().optional(),
  twoPlyGsm: z.string().optional(),
  twoPlyRate: z.string().optional(),
  printed: z.boolean().optional(),
  laminated: z.boolean().optional(),
  PrintingSize: z.string().optional(),
  PrintingCost: z.string().optional(),
  PrintingSheets: z.string().optional(),
  lamRollSize: z.string().optional(),
  lamSheetLength: z.string().optional(),
  lamType: z.string().optional(),
  fevicolCostPerSheet: z.string().optional(),
  lamCostPerSheet: z.string().optional(),
  sheeterRate: z.string().optional(),
  pastingRate: z.string().optional(),
  dieRate: z.string().optional(),
  stitchingRate: z.string().optional(),
  strappingRate: z.string().optional(),
});

const schema = z.object({
  itemName: z.string().min(2, 'Item Name is required'),
  brand: z.string().optional(),
  customer: z.string().optional(),
  type: z.enum(['Duplex', 'Reel', 'PrintedPaper', 'FinishedGood', 'Consumable', 'RawMaterial']),
  category: z.string().min(1, 'Category is required'),
  unitOfMeasure: z.string().min(1, 'Unit is required'),
  itemSpecification: z.object({
    gsm: z.string().optional(),
    dimensions: z.string().optional()
  }).optional(),
  boxSpecification: z.object({
    boxType: z.string().optional(),
    boxesPerSheet: z.string().optional(),
    itemSerialNumber: z.string().optional(),
    dieSerialNumber: z.string().optional(),
    length: z.string().optional(),
    breadth: z.string().optional(),
    height: z.string().optional(),
    sheetLength: z.string().optional(),
    sheetBreadth: z.string().optional(),
  }).optional(),
  orderConfigurations: orderConfigSchema.optional(),
});

type FormValues = z.infer<typeof schema>;
type FormOrderConfigurations = NonNullable<FormValues['orderConfigurations']>;

interface ItemFormProps {
  initialData?: Item;
  onSubmit: (data: ItemFormData) => void;
  isSubmitting: boolean;
}

const inputClass = 'w-full rounded-lg border border-gray-300 dark:border-neutral-800 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-black placeholder-gray-400 dark:placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors shadow-inner';

function customerValue(customer: Item['customer']) {
  if (!customer) return '';
  return typeof customer === 'string' ? customer : customer._id;
}

function stringValue(value: unknown, fallback = '') {
  return value === undefined || value === null ? fallback : String(value);
}

function numberValue(value: unknown, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toOrderConfig(oc?: FormOrderConfigurations): OrderConfigurations {
  return {
    duplexLength: numberValue(oc?.duplexLength),
    duplexBreadth: numberValue(oc?.duplexBreadth),
    duplexGsm: numberValue(oc?.duplexGsm),
    duplexRate: numberValue(oc?.duplexRate),
    numberOf2Ply: oc?.numberOf2Ply || '0',
    twoPlyGsm: numberValue(oc?.twoPlyGsm),
    twoPlyRate: numberValue(oc?.twoPlyRate),
    printed: Boolean(oc?.printed),
    laminated: Boolean(oc?.laminated),
    PrintingSize: numberValue(oc?.PrintingSize),
    PrintingCost: numberValue(oc?.PrintingCost),
    PrintingSheets: numberValue(oc?.PrintingSheets),
    lamRollSize: numberValue(oc?.lamRollSize),
    lamSheetLength: numberValue(oc?.lamSheetLength),
    lamType: oc?.lamType || 'BOPP',
    fevicolCostPerSheet: numberValue(oc?.fevicolCostPerSheet),
    lamCostPerSheet: numberValue(oc?.lamCostPerSheet),
    sheeterRate: numberValue(oc?.sheeterRate),
    pastingRate: numberValue(oc?.pastingRate),
    dieRate: numberValue(oc?.dieRate),
    stitchingRate: numberValue(oc?.stitchingRate),
    strappingRate: numberValue(oc?.strappingRate),
  };
}

function defaultsFromItem(initialData?: Item): FormValues {
  const specs = initialData?.itemSpecification || initialData?.specifications || {};
  const oc = initialData?.orderConfigurations || {};

  return {
    itemName: initialData?.itemName || '',
    brand: initialData?.brand || '',
    customer: customerValue(initialData?.customer),
    type: initialData?.type || 'FinishedGood',
    category: initialData?.category || 'Finished Boxes',
    unitOfMeasure: initialData?.unitOfMeasure || 'PCS',
    itemSpecification: {
      gsm: stringValue(specs.gsm),
      dimensions: stringValue(specs.dimensions),
    },
    boxSpecification: {
      boxType: initialData?.boxSpecification?.boxType || '',
      boxesPerSheet: stringValue(initialData?.boxSpecification?.boxesPerSheet, '1'),
      itemSerialNumber: initialData?.boxSpecification?.itemSerialNumber || '',
      dieSerialNumber: initialData?.boxSpecification?.dieSerialNumber || '',
      length: stringValue(initialData?.boxSpecification?.length),
      breadth: stringValue(initialData?.boxSpecification?.breadth),
      height: stringValue(initialData?.boxSpecification?.height),
      sheetLength: stringValue(initialData?.boxSpecification?.sheetLength),
      sheetBreadth: stringValue(initialData?.boxSpecification?.sheetBreadth),
    },
    orderConfigurations: {
      duplexLength: stringValue(oc.duplexLength),
      duplexBreadth: stringValue(oc.duplexBreadth),
      duplexGsm: stringValue(oc.duplexGsm),
      duplexRate: stringValue(oc.duplexRate),
      numberOf2Ply: oc.numberOf2Ply || '0',
      twoPlyGsm: stringValue(oc.twoPlyGsm),
      twoPlyRate: stringValue(oc.twoPlyRate),
      printed: Boolean(oc.printed),
      laminated: Boolean(oc.laminated),
      PrintingSize: stringValue(oc.PrintingSize),
      PrintingCost: stringValue(oc.PrintingCost),
      PrintingSheets: stringValue(oc.PrintingSheets),
      lamRollSize: stringValue(oc.lamRollSize),
      lamSheetLength: stringValue(oc.lamSheetLength),
      lamType: oc.lamType || 'BOPP',
      fevicolCostPerSheet: stringValue(oc.fevicolCostPerSheet),
      lamCostPerSheet: stringValue(oc.lamCostPerSheet),
      sheeterRate: stringValue(oc.sheeterRate),
      pastingRate: stringValue(oc.pastingRate),
      dieRate: stringValue(oc.dieRate),
      stitchingRate: stringValue(oc.stitchingRate),
      strappingRate: stringValue(oc.strappingRate),
    },
  };
}

export function ItemForm({ initialData, onSubmit, isSubmitting }: ItemFormProps) {
  const { data: customersResponse } = useCustomers();
  const customers = customersResponse?.data || [];
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultsFromItem(initialData),
  });

  useEffect(() => {
    reset(defaultsFromItem(initialData));
  }, [initialData, reset]);

  const category = watch('category');
  const type = watch('type');
  const isFinishedGood = type === 'FinishedGood' && category === 'Finished Boxes';

  const onFormSubmit = (data: FormValues) => {
    const payload: ItemFormData = {
      itemName: data.itemName,
      brand: data.brand || '',
      customer: data.customer || null,
      type: data.type,
      category: data.category,
      unitOfMeasure: data.unitOfMeasure,
      itemSpecification: {
        gsm: data.itemSpecification?.gsm || '',
        dimensions: data.itemSpecification?.dimensions || '',
      },
      boxSpecification: {
        boxType: data.boxSpecification?.boxType || '',
        boxesPerSheet: numberValue(data.boxSpecification?.boxesPerSheet, 1),
        itemSerialNumber: data.boxSpecification?.itemSerialNumber || '',
        dieSerialNumber: data.boxSpecification?.dieSerialNumber || '',
        length: numberValue(data.boxSpecification?.length),
        breadth: numberValue(data.boxSpecification?.breadth),
        height: numberValue(data.boxSpecification?.height),
        sheetLength: numberValue(data.boxSpecification?.sheetLength),
        sheetBreadth: numberValue(data.boxSpecification?.sheetBreadth),
      },
      orderConfigurations: toOrderConfig(data.orderConfigurations),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-5 p-1 pb-10">
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-neutral-800 pb-2">Basic Details</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Item Name *</label>
            <input {...register('itemName')} placeholder="e.g. Himalaya Face Wash Inner Box" className={inputClass} />
            {errors.itemName && <p className="mt-1 text-xs text-red-500">{errors.itemName.message}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Brand</label>
            <input {...register('brand')} placeholder="e.g. Himalaya" className={inputClass} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Party / Customer</label>
            <select {...register('customer')} className={inputClass}>
              <option value="">No customer linked</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>{customer.companyName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Category *</label>
            <select {...register('category')} className={inputClass}>
              {STOCK_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Type *</label>
            <select {...register('type')} className={inputClass}>
              <option value="FinishedGood">Finished Good</option>
              <option value="RawMaterial">Raw Material</option>
              <option value="Consumable">Consumable</option>
              <option value="Duplex">Duplex</option>
              <option value="Reel">Reel</option>
              <option value="PrintedPaper">Printed Paper</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Unit of Measure *</label>
          <select {...register('unitOfMeasure')} className={inputClass}>
            <option value="PCS">PCS</option>
            <option value="KG">KG</option>
            <option value="Sheets">Sheets</option>
            <option value="Rolls">Rolls</option>
            <option value="Bundles">Bundles</option>
          </select>
        </div>
      </div>

      {!isFinishedGood && (
        <div className="space-y-4 pt-2">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-neutral-800 pb-2">Material Specifications</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">GSM</label>
              <input {...register('itemSpecification.gsm')} placeholder="e.g. 250" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Dimensions / Size</label>
              <input {...register('itemSpecification.dimensions')} placeholder="e.g. 28x40 inch" className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {isFinishedGood && (
        <>
          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-neutral-800 pb-2">Box Specifications</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Box Type</label>
                <select {...register('boxSpecification.boxType')} className={inputClass}>
                  <option value="">Select Type</option>
                  <option value="Pizza Type">Pizza Type</option>
                  <option value="Flap Type">Flap Type</option>
                  <option value="Carton Type">Carton Type</option>
                  <option value="Ghera Patti">Ghera Patti</option>
                  <option value="Z Patti">Z Patti</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Boxes Per Sheet</label>
                <select {...register('boxSpecification.boxesPerSheet')} className={inputClass}>
                  <option value="0.5">0.5</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Item Serial No.</label>
                <input {...register('boxSpecification.itemSerialNumber')} className={inputClass} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Die Serial No.</label>
                <input {...register('boxSpecification.dieSerialNumber')} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3">
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Length</label><input {...register('boxSpecification.length')} type="number" min="0" step="0.1" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Breadth</label><input {...register('boxSpecification.breadth')} type="number" min="0" step="0.1" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Height</label><input {...register('boxSpecification.height')} type="number" min="0" step="0.1" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Sheet Length</label><input {...register('boxSpecification.sheetLength')} type="number" min="0" step="0.1" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Sheet Breadth</label><input {...register('boxSpecification.sheetBreadth')} type="number" min="0" step="0.1" className={inputClass} /></div>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-neutral-800 pb-2">Repeat Order Template</h4>
            <div className="grid grid-cols-4 gap-3">
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Duplex Length</label><input {...register('orderConfigurations.duplexLength')} type="number" min="0" step="0.1" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Duplex Breadth</label><input {...register('orderConfigurations.duplexBreadth')} type="number" min="0" step="0.1" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Duplex GSM</label><input {...register('orderConfigurations.duplexGsm')} type="number" min="0" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Duplex Rate</label><input {...register('orderConfigurations.duplexRate')} type="number" min="0" step="0.01" className={inputClass} /></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">No. of 2-Ply</label><select {...register('orderConfigurations.numberOf2Ply')} className={inputClass}><option value="0">None</option><option value="1">1</option><option value="2">2</option><option value="3">3</option></select></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">2-Ply GSM</label><input {...register('orderConfigurations.twoPlyGsm')} type="number" min="0" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">2-Ply Rate</label><input {...register('orderConfigurations.twoPlyRate')} type="number" min="0" step="0.01" className={inputClass} /></div>
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><input type="checkbox" {...register('orderConfigurations.printed')} /> Printed</label>
              <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"><input type="checkbox" {...register('orderConfigurations.laminated')} /> Laminated</label>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Printing Size</label><input {...register('orderConfigurations.PrintingSize')} type="number" min="0" step="0.1" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Printing Sheets</label><input {...register('orderConfigurations.PrintingSheets')} type="number" min="0" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Printing Cost/Sheet</label><input {...register('orderConfigurations.PrintingCost')} type="number" min="0" step="0.01" className={inputClass} /></div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Lam Roll</label><input {...register('orderConfigurations.lamRollSize')} type="number" min="0" step="0.1" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Lam Sheet Len</label><input {...register('orderConfigurations.lamSheetLength')} type="number" min="0" step="0.1" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Lam Type</label><select {...register('orderConfigurations.lamType')} className={inputClass}><option value="BOPP">BOPP</option><option value="MAT">MAT</option></select></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Fevicol/Sht</label><input {...register('orderConfigurations.fevicolCostPerSheet')} type="number" min="0" step="0.01" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Lam/Sht</label><input {...register('orderConfigurations.lamCostPerSheet')} type="number" min="0" step="0.01" className={inputClass} /></div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Sheeter</label><input {...register('orderConfigurations.sheeterRate')} type="number" min="0" step="0.01" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Pasting</label><input {...register('orderConfigurations.pastingRate')} type="number" min="0" step="0.01" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Die</label><input {...register('orderConfigurations.dieRate')} type="number" min="0" step="0.01" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Stitch</label><input {...register('orderConfigurations.stitchingRate')} type="number" min="0" step="0.01" className={inputClass} /></div>
              <div><label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Strap</label><input {...register('orderConfigurations.strappingRate')} type="number" min="0" step="0.01" className={inputClass} /></div>
            </div>
          </div>
        </>
      )}

      <div className="pt-6 border-t border-gray-200 dark:border-neutral-800">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? (initialData ? 'Updating Item...' : 'Creating Item...') : (initialData ? 'Update Item' : 'Create Item')}
        </button>
      </div>
    </form>
  );
}
