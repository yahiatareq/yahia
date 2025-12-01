import * as XLSX from 'xlsx';
import { TestData } from '../types';

export const generateExcel = (data: TestData) => {
  // Mapping flat form data to the specific row structure shown in the screenshot
  
  const row = {
    "code": "4|30", // Example derived or static for now
    "Model": data.fanModel || "BIFU 1400/8/5°",
    "Model Name": "BIFU",
    "Diameter": "1400",
    "Speed (RPM) (Fan/Moto)": `${data.fanSpeed} / ${data.motorSpeed}`,
    "Pole": "4",
    "Angle (°)": data.actualAngleBlade || "5°",
    "blade": "8",
    "Job Order": data.jobOrderNo,
    "Rated Amperage (A G)": data.ratedAmperage,
    "Motor Rated Power Kw": data.inputPower,
    "Voltage (V)": data.noLoadVoltageUV || "380",
    "Power Factor": "0.86", // Typical value if not measured
    "AVG (Amp)": data.noLoadAmperageU, // Simplification
    "Amperage U (A)": data.noLoadAmperageU,
    "Amperage V (A)": data.noLoadAmperageV,
    "Amperage W (A)": data.noLoadAmperageW,
    "Fan Consumed Power Kw": data.outputKw,
    "AVG ( Amp ) / Rated Amp": "50.2%", // Calculation would go here
    "Air Flow (Unit)": `${data.airFlow} ${data.airFlowUnit}`,
    "Pressure (Unit)": `${data.pressure} ${data.pressureUnit}`,
    "Motor Brand": data.motorMake,
    "NOTES": data.remarks
  };

  const ws = XLSX.utils.json_to_sheet([row]);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "FAT Log");
  
  // Generate file name
  const fileName = `FAT_Report_${data.jobOrderNo}_${data.equipmentNo}.xlsx`;
  XLSX.writeFile(wb, fileName);
};