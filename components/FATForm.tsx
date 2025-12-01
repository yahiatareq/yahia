import React from 'react';
import { TestData, FormType, AirFlowUnit, PressureUnit } from '../types';
import { TableInput, LabelCell, TableCell, TableSelect } from './Input';
import { Check, X } from 'lucide-react';

interface FATFormProps {
  data: TestData;
  onChange: (field: keyof TestData, value: string | boolean) => void;
  type: FormType;
}

const FATForm: React.FC<FATFormProps> = ({ data, onChange, type }) => {
  const handleChange = (field: keyof TestData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(field, e.target.value);
  };

  const isAxial = type === 'axial';

  return (
    // Container: 
    // Screen: Centered, Shadowed, with margins.
    // Print: 210mm Width, Full Height, Padding 10mm (to simulate margins since we set @page margin to 0)
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white p-8 border border-gray-300 shadow-2xl print:shadow-none print:border-none print:w-[210mm] print:h-auto print:p-[10mm] print:m-0 print:overflow-visible">
      
      {/* Header / Logo Section */}
      <div className="flex justify-between items-end mb-4 border-b-4 border-blue-900 pb-2">
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 flex items-center justify-center relative">
              <img 
                src="./logo.png" 
                alt="Hammam Industries Logo" 
                className="max-w-full max-h-full object-contain"
              />
          </div>
          <div className="flex flex-col justify-center pb-1">
            <h1 className="text-3xl font-black text-blue-900 leading-none tracking-tight">
                HAMMAM INDUSTRIES & CO.
            </h1>
            <h2 className="text-2xl font-bold text-blue-900 leading-none text-right tracking-wide mt-2" style={{ fontFamily: 'Tahoma, sans-serif' }}>
                صناعات همام وشركاه
            </h2>
          </div>
        </div>
        <div className="pb-2">
          <h1 className="text-2xl font-black text-blue-900 uppercase tracking-tight text-right">Factory Acceptance Test (FAT)</h1>
        </div>
      </div>

      {/* Equipment Type Box */}
      <div className="flex items-center gap-2 mb-4">
          <div className="border-2 border-blue-900 px-6 py-1 font-bold text-sm bg-blue-50 text-blue-900 uppercase tracking-wide print:bg-blue-50 print-color-adjust-exact">
            ({isAxial ? 'F' : 'A'}) {isAxial ? 'Axial Inline Direct Drive' : 'Centrifugal Belt Drive'}
          </div>
      </div>

      {/* Top Info Bar */}
      <div className="grid grid-cols-12 border-t-2 border-l-2 border-blue-900 text-sm mb-6 shadow-sm print:shadow-none">
        <LabelCell colSpan={2} className="border-l-0">Equipment No.:</LabelCell>
        <TableCell colSpan={2}><TableInput value={data.equipmentNo} onChange={handleChange('equipmentNo')} className="font-bold" /></TableCell>
        
        <LabelCell colSpan={2}>Job Order No.</LabelCell>
        <TableCell colSpan={2}><TableInput value={data.jobOrderNo} onChange={handleChange('jobOrderNo')} className="font-bold" /></TableCell>
        
        <LabelCell colSpan={1}>Client :</LabelCell>
        <TableCell colSpan={3}><TableInput value={data.client} onChange={handleChange('client')} className="font-bold" /></TableCell>
      </div>

      {/* Main Data Grid */}
      <div className="border-t-2 border-l-2 border-blue-900 text-sm shadow-sm print:shadow-none">
        
        {/* SECTION: Name Plate Data (Fan) */}
        <div className="grid grid-cols-12">
          <div className="col-span-12 bg-blue-200 border-r border-b border-blue-900 text-center font-bold italic py-1 text-blue-900 print:bg-blue-200 print-color-adjust-exact">
            Name Plate Data (Fan)
          </div>
          
          {/* Row 1 */}
          <LabelCell colSpan={2}>HI MFG No.</LabelCell>
          <TableCell colSpan={4}><TableInput value={data.mfgNo} onChange={handleChange('mfgNo')} /></TableCell>
          <LabelCell colSpan={2}>Air Flow</LabelCell>
          <TableCell colSpan={1} className="p-0">
             <TableSelect 
                options={['CFM', 'L/S', 'm³/hr']} 
                value={data.airFlowUnit} 
                onChange={handleChange('airFlowUnit')} 
             />
          </TableCell>
          <TableCell colSpan={3}><TableInput value={data.airFlow} onChange={handleChange('airFlow')} /></TableCell>

          {/* Row 2 */}
          <LabelCell colSpan={2}>Model</LabelCell>
          <TableCell colSpan={4}><TableInput value={data.fanModel} onChange={handleChange('fanModel')} /></TableCell>
          <LabelCell colSpan={2}>Pressure</LabelCell>
          <TableCell colSpan={1} className="p-0">
            <TableSelect 
                options={['InH2O', 'Pa', 'mmWg', 'Bar', 'mbar', 'mmbar']} 
                value={data.pressureUnit} 
                onChange={handleChange('pressureUnit')} 
             />
          </TableCell>
          <TableCell colSpan={3}><TableInput value={data.pressure} onChange={handleChange('pressure')} /></TableCell>

          {/* Row 3 */}
          <LabelCell colSpan={2}>Date</LabelCell>
          <TableCell colSpan={4}><TableInput type="date" value={data.date} onChange={handleChange('date')} /></TableCell>
          <LabelCell colSpan={2}>Speed</LabelCell>
          <TableCell colSpan={1}><div className="w-full text-center text-xs font-bold text-gray-500">R.P.M</div></TableCell>
          <TableCell colSpan={3}><TableInput value={data.fanSpeed} onChange={handleChange('fanSpeed')} /></TableCell>

          {/* Row 4 */}
          <LabelCell colSpan={2}>Item No.</LabelCell>
          <TableCell colSpan={4}><TableInput value={data.itemNo} onChange={handleChange('itemNo')} /></TableCell>
          <LabelCell colSpan={2}>Rated Amperage</LabelCell>
          <TableCell colSpan={1}><div className="w-full text-center text-xs font-bold text-gray-500">Amp.</div></TableCell>
          <TableCell colSpan={3}><TableInput value={data.ratedAmperage} onChange={handleChange('ratedAmperage')} /></TableCell>

          {/* Row 5 */}
          <LabelCell colSpan={2}>Power Supply</LabelCell>
          <TableCell colSpan={4}><TableInput value={data.powerSupply} onChange={handleChange('powerSupply')} /></TableCell>
          <LabelCell colSpan={2}>Input Power</LabelCell>
          <TableCell colSpan={1}><div className="w-full text-center text-xs font-bold text-gray-500">Kw.</div></TableCell>
          <TableCell colSpan={3}><TableInput value={data.inputPower} onChange={handleChange('inputPower')} /></TableCell>
        </div>

        {/* SECTION: Name Plate Data (Motor) */}
        <div className="grid grid-cols-12 mt-1 border-t-2 border-blue-900">
          <div className="col-span-8 bg-blue-200 border-r border-b border-blue-900 text-center font-bold italic py-1 text-blue-900 print:bg-blue-200 print-color-adjust-exact">
            Name Plate Data (Motor)
          </div>
          <div className="col-span-4 bg-blue-200 border-r border-b border-blue-900 flex items-center justify-center px-2 font-bold italic py-1 text-blue-900 print:bg-blue-200 print-color-adjust-exact">
            Make: <TableInput className="font-bold uppercase text-left ml-2 w-24 border-b border-blue-800 h-6" value={data.motorMake} onChange={handleChange('motorMake')} />
          </div>

          <LabelCell colSpan={2}>Serial No.</LabelCell>
          <TableCell colSpan={3}><TableInput value={data.motorSerialNo} onChange={handleChange('motorSerialNo')} /></TableCell>
          <LabelCell colSpan={1}>Model</LabelCell>
          <TableCell colSpan={3}><TableInput value={data.motorModel} onChange={handleChange('motorModel')} /></TableCell>
          <LabelCell colSpan={1}>Speed</LabelCell>
          <LabelCell colSpan={1} className="bg-white font-normal text-xs text-center border-l-0 text-gray-500">R.P.M</LabelCell>
          <TableCell colSpan={1}><TableInput value={data.motorSpeed} onChange={handleChange('motorSpeed')} /></TableCell>

          <LabelCell colSpan={2}>Protection IP</LabelCell>
          <TableCell colSpan={1}><TableInput value={data.protectionIP} onChange={handleChange('protectionIP')} /></TableCell>
          <LabelCell colSpan={2}>Insulation Class</LabelCell>
          <TableCell colSpan={3}><TableInput value={data.insulationClass} onChange={handleChange('insulationClass')} /></TableCell>
          <LabelCell colSpan={2}>Out Put</LabelCell>
          <LabelCell colSpan={1} className="bg-white font-normal text-xs text-center border-l-0 text-gray-500">Kw.</LabelCell>
          <TableCell colSpan={1}><TableInput value={data.outputKw} onChange={handleChange('outputKw')} /></TableCell>
        </div>

        {/* SECTION: Pulley & Belt Data (Centrifugal Only) */}
        {!isAxial && (
           <div className="grid grid-cols-12 mt-1 border-t-2 border-blue-900">
             <div className="col-span-12 bg-blue-200 border-r border-b border-blue-900 text-center font-bold italic py-1 text-blue-900 print:bg-blue-200 print-color-adjust-exact">
               Pulley & Belt Data
             </div>
             
             {/* Headers for Pulley */}
             <div className="col-span-2 border-r border-b border-blue-900"></div>
             <div className="col-span-1 border-r border-b border-blue-900 font-bold text-center bg-blue-100 text-blue-900 flex items-center justify-center print:bg-blue-100 print-color-adjust-exact">RPM</div>
             <div className="col-span-2 border-r border-b border-blue-900 font-bold text-center bg-blue-100 text-blue-900 flex items-center justify-center print:bg-blue-100 print-color-adjust-exact">D</div>
             <div className="col-span-2 border-r border-b border-blue-900 font-bold text-center bg-blue-100 text-blue-900 flex items-center justify-center print:bg-blue-100 print-color-adjust-exact">d</div>
             <div className="col-span-1 border-r border-b border-blue-900 font-bold text-center bg-blue-100 text-blue-900 text-lg flex items-center justify-center print:bg-blue-100 print-color-adjust-exact">Ø</div>
             
             {/* Visual Diagram Placeholder Area */}
             <div className="col-span-4 row-span-4 border-r border-b border-blue-900 relative flex items-center justify-center p-2 bg-white">
                <svg viewBox="0 0 200 100" className="w-full h-full opacity-80">
                   <circle cx="50" cy="50" r="30" fill="none" stroke="#1e3a8a" strokeWidth="2" />
                   <circle cx="150" cy="50" r="20" fill="none" stroke="#1e3a8a" strokeWidth="2" />
                   <path d="M50 20 L150 30" stroke="#1e3a8a" strokeWidth="2" />
                   <path d="M50 80 L150 70" stroke="#1e3a8a" strokeWidth="2" />
                   <text x="100" y="20" fontSize="10" textAnchor="middle" fill="#1e3a8a">1/2 C</text>
                   <text x="50" y="50" fontSize="10" textAnchor="middle" fill="#1e3a8a" fontWeight="bold">D</text>
                   <text x="150" y="50" fontSize="10" textAnchor="middle" fill="#1e3a8a" fontWeight="bold">d</text>
                </svg>
             </div>

             {/* Fan Row */}
             <LabelCell colSpan={2}>Fan</LabelCell>
             <TableCell colSpan={1}><div className="bg-gray-50 w-full h-full print:bg-transparent"></div></TableCell>
             <TableCell colSpan={2}><TableInput placeholder="Z-150-2" value={data.pulleyFanZ} onChange={handleChange('pulleyFanZ')} /></TableCell>
             <TableCell colSpan={2}><TableInput placeholder="2012" value={data.pulleyFanD} onChange={handleChange('pulleyFanD')} /></TableCell>
             <TableCell colSpan={1}><TableInput placeholder="25" value={data.pulleyFanD} onChange={handleChange('pulleyFanD')} /></TableCell>

             {/* Motor Row */}
             <LabelCell colSpan={2}>Motor</LabelCell>
             <TableCell colSpan={1}><TableInput value={data.fanSpeed} onChange={handleChange('fanSpeed')} /></TableCell>
             <TableCell colSpan={2}><TableInput placeholder="Z-85-2" value={data.pulleyMotorZ} onChange={handleChange('pulleyMotorZ')} /></TableCell>
             <TableCell colSpan={2}><TableInput placeholder="1610" value={data.pulleyMotord} onChange={handleChange('pulleyMotord')} /></TableCell>
             <TableCell colSpan={1}><TableInput placeholder="28" value={data.pulleyMotord} onChange={handleChange('pulleyMotord')} /></TableCell>

             {/* Belt Row */}
             <LabelCell colSpan={2}>Belt</LabelCell>
             <LabelCell colSpan={1} className="bg-white text-right pr-2 text-gray-600">Size:</LabelCell>
             <TableCell colSpan={2}><TableInput value={data.beltSize} onChange={handleChange('beltSize')} /></TableCell>
             <LabelCell colSpan={1} className="bg-white text-right pr-2 text-gray-600">Q'ty:</LabelCell>
             <TableCell colSpan={1}><TableInput value={data.beltQty} onChange={handleChange('beltQty')} /></TableCell>
           </div>
        )}

        {/* SECTION: No Load Test Data */}
        <div className="grid grid-cols-12 mt-1 border-t-2 border-blue-900">
          <div className="col-span-12 bg-blue-200 border-r border-b border-blue-900 text-center font-bold italic py-1 text-blue-900 print:bg-blue-200 print-color-adjust-exact">
            No Load Test Data
          </div>
          
          <LabelCell colSpan={2}>Voltage</LabelCell>
          <LabelCell colSpan={1} className="bg-white font-normal text-gray-600">U-V</LabelCell>
          <TableCell colSpan={2}><TableInput value={data.noLoadVoltageUV} onChange={handleChange('noLoadVoltageUV')} /></TableCell>
          <LabelCell colSpan={1} className="bg-white font-normal border-l border-blue-900 text-gray-600">V-W</LabelCell>
          <TableCell colSpan={2}><TableInput value={data.noLoadVoltageVW} onChange={handleChange('noLoadVoltageVW')} /></TableCell>
          <LabelCell colSpan={1} className="bg-white font-normal border-l border-blue-900 text-gray-600">U-W</LabelCell>
          <TableCell colSpan={3}><TableInput value={data.noLoadVoltageUW} onChange={handleChange('noLoadVoltageUW')} /></TableCell>

          <LabelCell colSpan={2}>Amperage</LabelCell>
          <LabelCell colSpan={1} className="bg-white font-normal text-gray-600">U</LabelCell>
          <TableCell colSpan={2}><TableInput value={data.noLoadAmperageU} onChange={handleChange('noLoadAmperageU')} /></TableCell>
          <LabelCell colSpan={1} className="bg-white font-normal border-l border-blue-900 text-gray-600">V</LabelCell>
          <TableCell colSpan={2}><TableInput value={data.noLoadAmperageV} onChange={handleChange('noLoadAmperageV')} /></TableCell>
          <LabelCell colSpan={1} className="bg-white font-normal border-l border-blue-900 text-gray-600">W</LabelCell>
          <TableCell colSpan={3}><TableInput value={data.noLoadAmperageW} onChange={handleChange('noLoadAmperageW')} /></TableCell>

          <LabelCell colSpan={2} className="row-span-2 items-start pt-2">
            Motor Bearing Temp. °C
          </LabelCell>
          
          {/* Sub rows for bearing */}
          <LabelCell colSpan={1} className="bg-white font-normal text-xs text-gray-600">Drive E</LabelCell>
          <TableCell colSpan={2}><TableInput value={data.noLoadMotorBearingDrive} onChange={handleChange('noLoadMotorBearingDrive')} /></TableCell>
          <LabelCell colSpan={3} className="bg-white font-normal text-sm border-l border-blue-900 text-gray-600">Case Temp. °C</LabelCell>
          <TableCell colSpan={1}><TableInput value={data.noLoadCaseTemp} onChange={handleChange('noLoadCaseTemp')} /></TableCell>
          <LabelCell colSpan={2} className="bg-white font-bold text-sm border-l border-blue-900 text-blue-900">Motor Speed</LabelCell>
          <TableCell colSpan={1}><TableInput value={data.noLoadMotorSpeed || data.motorSpeed} onChange={handleChange('noLoadMotorSpeed')} /></TableCell>

          {/* Sub row 2 */}
          <div className="col-span-12 grid grid-cols-10 border-r border-blue-900" style={{ gridColumn: 'span 10 / span 10'}}>
             <LabelCell colSpan={1} className="bg-white font-normal text-xs border-t-0 text-gray-600">Oppos E</LabelCell>
             <TableCell colSpan={2} className="border-t-0"><TableInput value={data.noLoadMotorBearingOppos} onChange={handleChange('noLoadMotorBearingOppos')} /></TableCell>
             <LabelCell colSpan={3} className="bg-white font-normal text-sm border-l border-blue-900 border-t-0 text-gray-600">Ambient Temp. °C</LabelCell>
             <TableCell colSpan={1} className="border-t-0"><TableInput value={data.noLoadAmbientTemp} onChange={handleChange('noLoadAmbientTemp')} /></TableCell>
             <LabelCell colSpan={2} className="bg-white font-bold text-sm border-l border-blue-900 border-t-0 text-blue-900">Fan Speed</LabelCell>
             <TableCell colSpan={1} className="border-t-0"><TableInput value={data.noLoadFanSpeed || data.fanSpeed} onChange={handleChange('noLoadFanSpeed')} /></TableCell>
          </div>
        </div>

        {/* SECTION: Load Test Data */}
        <div className="grid grid-cols-12 mt-1 border-t-2 border-blue-900">
          <div className="col-span-12 bg-blue-200 border-r border-b border-blue-900 text-center font-bold italic py-1 text-blue-900 print:bg-blue-200 print-color-adjust-exact">
            Load Test Data
          </div>

          {/* Row 1 */}
          <LabelCell colSpan={2} className="row-span-2 items-start pt-1">Fan Bearing Temp. °C</LabelCell>
          <LabelCell colSpan={1} className="bg-white font-normal text-xs text-gray-600">Drive E</LabelCell>
          <TableCell colSpan={2}><TableInput value={data.loadFanBearingDrive} onChange={handleChange('loadFanBearingDrive')} /></TableCell>
          <LabelCell colSpan={3} className="bg-white font-bold text-sm border-l border-blue-900 row-span-2 text-blue-900 flex items-center">Ambient Temp. °C</LabelCell>
          <TableCell colSpan={1} className="row-span-2"><TableInput value={data.loadAmbientTemp} onChange={handleChange('loadAmbientTemp')} /></TableCell>
          <LabelCell colSpan={2} className="bg-white font-bold text-sm border-l border-blue-900 row-span-2 leading-tight text-blue-900 flex items-center">Motor Casing Temp.°C</LabelCell>
          <TableCell colSpan={1} className="row-span-2"><TableInput value={data.loadMotorCasingTemp} onChange={handleChange('loadMotorCasingTemp')} /></TableCell>

           {/* Row 1b */}
           <div className="col-span-3 grid grid-cols-3 border-r border-blue-900" style={{ gridColumn: 'span 3 / span 3'}}>
             <LabelCell colSpan={1} className="bg-white font-normal text-xs border-l-0 text-gray-600">Oppos E</LabelCell>
             <TableCell colSpan={2} className=""><TableInput value={data.loadFanBearingOppos} onChange={handleChange('loadFanBearingOppos')} /></TableCell>
           </div>
          
           {/* Row 2 */}
          <LabelCell colSpan={2} className="row-span-2 items-start pt-1">Motor Bearing Temp. °C</LabelCell>
          <LabelCell colSpan={1} className="bg-white font-normal text-xs text-gray-600">Drive E</LabelCell>
          <TableCell colSpan={2}><TableInput value={data.loadMotorBearingDrive} onChange={handleChange('loadMotorBearingDrive')} /></TableCell>
          <LabelCell colSpan={3} className="bg-white font-bold text-sm border-l border-blue-900 text-blue-900">Fan Speed</LabelCell>
          <TableCell colSpan={1}><TableInput value={data.loadFanSpeed} onChange={handleChange('loadFanSpeed')} /></TableCell>
          <TableCell colSpan={3} className="bg-gray-100 print:bg-gray-100 print-color-adjust-exact"></TableCell>

          {/* Row 2b */}
           <div className="col-span-7 grid grid-cols-7 border-r border-blue-900" style={{ gridColumn: 'span 7 / span 7'}}>
             <LabelCell colSpan={1} className="bg-white font-normal text-xs border-l-0 text-gray-600">Oppos E</LabelCell>
             <TableCell colSpan={2} className=""><TableInput value={data.loadMotorBearingOppos} onChange={handleChange('loadMotorBearingOppos')} /></TableCell>
             <LabelCell colSpan={3} className="bg-white font-bold text-sm border-l border-blue-900 text-blue-900">Voltage</LabelCell>
             <TableCell colSpan={1}><TableInput value={data.loadVoltage} onChange={handleChange('loadVoltage')} /></TableCell>
           </div>
           <TableCell colSpan={3} className="bg-gray-100 border-t-0 print:bg-gray-100 print-color-adjust-exact"></TableCell>

        </div>
        
        {/* Extra Specifics for Axial */}
        {isAxial && (
          <div className="grid grid-cols-12 mt-1 border-t-2 border-blue-900">
             <LabelCell colSpan={3}>Actual Angle Blade</LabelCell>
             <TableCell colSpan={3}><TableInput value={data.actualAngleBlade} onChange={handleChange('actualAngleBlade')} /></TableCell>
             <LabelCell colSpan={3}>Close Inlet / Outlet Air</LabelCell>
             <TableCell colSpan={3}><TableInput value={data.closeInletOutlet} onChange={handleChange('closeInletOutlet')} /></TableCell>
          </div>
        )}

        {/* Remarks Section - Increased Height */}
        <div className="mt-1 border-2 border-blue-900 min-h-[280px] relative flex flex-col">
            <div className="absolute top-0 left-0 p-1 px-2 font-bold text-sm underline text-blue-900 bg-blue-50 rounded-br print:bg-blue-50 print-color-adjust-exact z-10">Remarks:</div>
            
            {/* Screen input */}
            <textarea 
              className="print:hidden w-full flex-grow p-2 pt-8 text-sm resize-none focus:outline-none bg-transparent min-h-[280px]"
              value={data.remarks}
              onChange={(e) => onChange('remarks', e.target.value)}
            />
            {/* Print text */}
            <div className="hidden print:block w-full flex-grow p-2 pt-8 text-sm whitespace-pre-wrap font-medium text-blue-900 min-h-[280px]">
                {data.remarks}
            </div>
        </div>

        {/* Footer Signature */}
        <div className="mt-1 border-2 border-blue-900 grid grid-cols-12">
            <div className="col-span-8 border-r-2 border-blue-900">
               <div className="grid grid-cols-8 border-b-2 border-blue-900 h-12">
                  <div className="col-span-2 p-2 font-bold text-sm bg-blue-100 text-blue-900 flex items-center print:bg-blue-100 print-color-adjust-exact">Tested By:</div>
                  <div className="col-span-6 p-2 flex items-center justify-end"><TableInput placeholder="-------------------------------------" value={data.testedBy} onChange={handleChange('testedBy')} className="text-center" /></div>
               </div>
               <div className="grid grid-cols-8 h-10">
                  <div className="col-span-2 p-2 font-bold text-sm border-r border-blue-900 bg-blue-100 text-blue-900 flex items-center print:bg-blue-100 print-color-adjust-exact">Test Date:</div>
                  <div className="col-span-3 p-0 border-r border-blue-900"><TableInput type="date" value={data.testDate} onChange={handleChange('testDate')} /></div>
                  <div className="col-span-1 p-2 font-bold text-xs bg-blue-50 flex items-center justify-center print:bg-blue-50 print-color-adjust-exact leading-none text-center">Time Start:</div>
                  <div className="col-span-2 p-2"><TableInput type="time" value={data.testTimeStart} onChange={handleChange('testTimeStart')} /></div>
               </div>
            </div>
            <div className="col-span-4 flex flex-col">
              <div className="p-2 font-bold text-sm border-b-2 border-blue-900 bg-blue-100 text-blue-900 h-12 flex items-end print:bg-blue-100 print-color-adjust-exact">Witnessed By:</div>
              <div className="flex-grow grid grid-cols-4">
                 <div className="col-span-4 flex-grow border-b border-blue-900 h-10"><TableInput value={data.witnessedBy} onChange={handleChange('witnessedBy')} /></div>
                 <div className="col-span-2 border-r border-blue-900 p-1 font-bold text-xs bg-blue-50 flex items-center justify-center print:bg-blue-50 print-color-adjust-exact leading-none text-center">Time Stop:</div>
                 <div className="col-span-2 p-1"><TableInput type="time" value={data.testTimeStop} onChange={handleChange('testTimeStop')} /></div>
              </div>
            </div>
        </div>

        {/* Form ID */}
        <div className="mt-1 text-xs font-bold text-gray-500">FQP-802-05-01-(F)</div>

        {/* Checkboxes */}
        <div className="flex gap-8 mt-2">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => { onChange('isAvailable', !data.isAvailable); onChange('isNotAvailable', false); }}
            >
               <div className="w-6 h-6 border-2 border-blue-900 flex items-center justify-center bg-white shadow-sm print:shadow-none">
                 {data.isAvailable && <Check className="w-5 h-5 text-blue-900" strokeWidth={3} />}
               </div>
               <span className="text-sm font-bold text-blue-900">Available</span>
            </div>
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => { onChange('isNotAvailable', !data.isNotAvailable); onChange('isAvailable', false); }}
            >
               <div className="w-6 h-6 border-2 border-blue-900 flex items-center justify-center bg-white shadow-sm print:shadow-none">
                  {data.isNotAvailable && <X className="w-5 h-5 text-red-600" strokeWidth={3} />}
               </div>
               <span className="text-sm font-bold text-blue-900">Not Available</span>
            </div>
        </div>
        
        <div className="text-center text-xs text-gray-400 mt-2">1/1</div>

      </div>
    </div>
  );
};

export default FATForm;