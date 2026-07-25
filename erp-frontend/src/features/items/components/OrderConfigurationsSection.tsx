import type { UseFormRegister } from 'react-hook-form';

interface OrderConfigurationsSectionProps {
  register: UseFormRegister<any>;
  inputClass: string;
}

export function OrderConfigurationsSection({ register, inputClass }: OrderConfigurationsSectionProps) {
  return (
    <div className="space-y-4 pt-2">
      <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-neutral-800 pb-2">
        Order Configurations (Auto-Fill Template)
      </h4>
      <p className="text-xs text-gray-500 mb-4">These values will auto-fill when this item is selected in the Order Form</p>

      {/* Duplex / Paper Board Cost */}
      <div>
        <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Duplex / Paper Board Cost</h5>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Length (in)</label>
            <input {...register('orderConfigurations.duplexLength')} type="number" min="0" step="0.1" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Breadth (in)</label>
            <input {...register('orderConfigurations.duplexBreadth')} type="number" min="0" step="0.1" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">GSM</label>
            <input {...register('orderConfigurations.duplexGsm')} type="number" min="0" step="1" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Rate (₹/kg)</label>
            <input {...register('orderConfigurations.duplexRate')} type="number" min="0" step="0.01" className={inputClass} />
          </div>
        </div>
      </div>

      {/* 2-PLY COST */}
      <div className="pt-2">
        <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">2-PLY COST</h5>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">No. of 2-Ply</label>
            <select {...register('orderConfigurations.numberOf2Ply')} className={inputClass}>
              <option value="0">None</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">GSM of Each Ply</label>
            <input {...register('orderConfigurations.twoPlyGsm')} type="number" min="0" step="1" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Rate of Roll (₹)</label>
            <input {...register('orderConfigurations.twoPlyRate')} type="number" min="0" step="0.01" className={inputClass} />
          </div>
        </div>
      </div>

      {/* FINISHING & PRINTING */}
      <div className="pt-2">
        <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">FINISHING & PRINTING</h5>
        <div className="flex space-x-4 mb-3">
          <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" {...register('orderConfigurations.printed')} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span>Printed</span>
          </label>
          <label className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" {...register('orderConfigurations.laminated')} className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <span>Laminated</span>
          </label>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Printing Size (sq in)</label>
            <input {...register('orderConfigurations.PrintingSize')} type="number" min="0" step="0.1" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Printing Sheets</label>
            <input {...register('orderConfigurations.PrintingSheets')} type="number" min="0" step="1" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Cost/Sheet (₹)</label>
            <input {...register('orderConfigurations.PrintingCost')} type="number" min="0" step="0.01" className={inputClass} />
          </div>
        </div>
      </div>

      {/* LAMINATION */}
      <div className="pt-2">
        <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">LAMINATION</h5>
        <div className="grid grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Roll Size (in)</label>
            <input {...register('orderConfigurations.lamRollSize')} type="number" min="0" step="0.1" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Sheet Len (in)</label>
            <input {...register('orderConfigurations.lamSheetLength')} type="number" min="0" step="0.1" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Lam Type</label>
            <select {...register('orderConfigurations.lamType')} className={inputClass}>
              <option value="BOPP">BOPP</option>
              <option value="MAT">MAT</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Fevicol (₹/Sht)</label>
            <input {...register('orderConfigurations.fevicolCostPerSheet')} type="number" min="0" step="0.01" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Lam (₹/Sht)</label>
            <input {...register('orderConfigurations.lamCostPerSheet')} type="number" min="0" step="0.01" className={inputClass} />
          </div>
        </div>
      </div>

      {/* PROCESSING COSTS */}
      <div className="pt-2">
        <h5 className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">PROCESSING COSTS</h5>
        <div className="grid grid-cols-5 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Sheeter (₹/2Ply)</label>
            <input {...register('orderConfigurations.sheeterRate')} type="number" min="0" step="0.01" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Pasting (₹/Sht)</label>
            <input {...register('orderConfigurations.pastingRate')} type="number" min="0" step="0.01" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Die (₹/Sht)</label>
            <input {...register('orderConfigurations.dieRate')} type="number" min="0" step="0.01" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Stitch (₹/Box)</label>
            <input {...register('orderConfigurations.stitchingRate')} type="number" min="0" step="0.01" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Strap (₹/Bndl)</label>
            <input {...register('orderConfigurations.strappingRate')} type="number" min="0" step="0.01" className={inputClass} />
          </div>
        </div>
      </div>
    </div>
  );
}
