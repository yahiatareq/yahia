
export type FormType = 'axial' | 'centrifugal';

export type AirFlowUnit = 'CFM' | 'L/S' | 'm³/hr';
export type PressureUnit = 'Pa' | 'InH2O' | 'mmWg' | 'Bar' | 'mbar' | 'mmbar';

export interface TestData {
  // Header
  equipmentNo: string;
  jobOrderNo: string;
  client: string;
  
  // Fan Name Plate
  mfgNo: string;
  fanModel: string;
  date: string; // YYYY-MM-DD for date input
  itemNo: string; // Axial specific
  powerSupply: string;
  
  airFlow: string;
  airFlowUnit: AirFlowUnit;
  
  pressure: string;
  pressureUnit: PressureUnit;

  fanSpeed: string;
  ratedAmperage: string;
  inputPower: string;
  
  // Motor Name Plate
  motorSerialNo: string;
  motorModel: string;
  protectionIP: string;
  insulationClass: string;
  motorSpeed: string;
  outputKw: string;
  motorMake: string;

  // Pulley & Belt (Centrifugal specific)
  pulleyFanD: string;
  pulleyFanZ: string;
  pulleyMotord: string;
  pulleyMotorZ: string;
  pulleyCenter: string; // 1/2C
  beltSize: string;
  beltQty: string;
  
  // No Load Test
  noLoadVoltageUV: string;
  noLoadVoltageVW: string;
  noLoadVoltageUW: string;
  noLoadAmperageU: string;
  noLoadAmperageV: string;
  noLoadAmperageW: string;
  noLoadMotorBearingDrive: string;
  noLoadMotorBearingOppos: string;
  noLoadCaseTemp: string;
  noLoadAmbientTemp: string;
  noLoadMotorSpeed: string;
  noLoadFanSpeed: string;

  // Load Test
  loadFanBearingDrive: string;
  loadFanBearingOppos: string;
  loadMotorBearingDrive: string;
  loadMotorBearingOppos: string;
  loadAmbientTemp: string;
  loadFanSpeed: string;
  loadVoltage: string;
  loadMotorCasingTemp: string;

  // Extra Axial Specifics
  actualAngleBlade: string;
  closeInletOutlet: string;

  // Footer
  remarks: string;
  testedBy: string;
  testDate: string;
  testTimeStart: string;
  testTimeStop: string;
  witnessedBy: string;
  isAvailable: boolean;
  isNotAvailable: boolean;
}

export const INITIAL_DATA: TestData = {
  equipmentNo: 'EX.F.I-01',
  jobOrderNo: '10986',
  client: '',
  mfgNo: '',
  fanModel: '',
  date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  itemNo: '1-4',
  powerSupply: '380/3/50',
  airFlow: '',
  airFlowUnit: 'CFM',
  pressure: '',
  pressureUnit: 'InH2O',
  fanSpeed: '1440',
  ratedAmperage: '',
  inputPower: '',
  motorSerialNo: '',
  motorModel: '',
  protectionIP: '55',
  insulationClass: 'F',
  motorSpeed: '1389',
  outputKw: '',
  motorMake: 'VOLT',
  pulleyFanD: '',
  pulleyFanZ: '',
  pulleyMotord: '',
  pulleyMotorZ: '',
  pulleyCenter: '',
  beltSize: '',
  beltQty: '',
  noLoadVoltageUV: '380',
  noLoadVoltageVW: '380',
  noLoadVoltageUW: '380',
  noLoadAmperageU: '',
  noLoadAmperageV: '',
  noLoadAmperageW: '',
  noLoadMotorBearingDrive: 'N/R',
  noLoadMotorBearingOppos: 'N/R',
  noLoadCaseTemp: 'N/R',
  noLoadAmbientTemp: 'N/R',
  noLoadMotorSpeed: '',
  noLoadFanSpeed: '',
  loadFanBearingDrive: '',
  loadFanBearingOppos: '',
  loadMotorBearingDrive: '',
  loadMotorBearingOppos: '',
  loadAmbientTemp: '',
  loadFanSpeed: '',
  loadVoltage: '',
  loadMotorCasingTemp: '',
  actualAngleBlade: '',
  closeInletOutlet: '',
  remarks: '',
  testedBy: '',
  testDate: new Date().toISOString().split('T')[0],
  testTimeStart: '',
  testTimeStop: '',
  witnessedBy: '',
  isAvailable: true,
  isNotAvailable: false,
};
