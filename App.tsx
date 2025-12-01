import React, { useState } from 'react';
import { TestData, INITIAL_DATA, FormType } from './types';
import FATForm from './components/FATForm';
import { generateExcel } from './utils/excelGenerator';
import { Printer, FileSpreadsheet, RotateCw } from 'lucide-react';

const App: React.FC = () => {
  const [formType, setFormType] = useState<FormType>('axial');
  const [formData, setFormData] = useState<TestData>(INITIAL_DATA);

  const handleFormChange = (field: keyof TestData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    const jobOrder = formData.jobOrderNo || 'Draft';
    
    // Set document title immediately so the browser sees it for the filename
    document.title = `FAT_Report_${jobOrder}`;

    // Execute print immediately to avoid browser popup blockers
    window.print();

    // Restore the title after a short delay to allow the print dialog to read the new title
    setTimeout(() => {
        document.title = originalTitle;
    }, 500);
  };

  const handleExcelExport = () => {
    generateExcel(formData);
  };

  const toggleFormType = () => {
    setFormType(prev => prev === 'axial' ? 'centrifugal' : 'axial');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 print:py-0 print:bg-white print:block print:overflow-visible">
      
      {/* Controls Bar (Hidden on Print) */}
      <div className="w-full max-w-[210mm] mb-6 flex flex-wrap gap-4 justify-between items-center px-4 md:px-0 no-print">
        <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-blue-900">FAT Report Generator</h1>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-bold uppercase">{formType}</span>
        </div>
        
        <div className="flex gap-3">
          <button 
            type="button"
            onClick={toggleFormType}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded hover:bg-gray-50 text-gray-700 shadow-sm transition-colors"
          >
            <RotateCw size={18} />
            Switch Form Type
          </button>
          
          <button 
            type="button"
            onClick={handleExcelExport}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow-sm transition-colors"
          >
            <FileSpreadsheet size={18} />
            Export to Excel
          </button>

          <button 
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded shadow-sm transition-colors font-bold"
          >
            <Printer size={18} />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="print:w-full print:overflow-visible">
        <FATForm 
          data={formData} 
          onChange={handleFormChange} 
          type={formType}
        />
      </div>

      <div className="mt-8 text-gray-500 text-sm no-print">
         &copy; {new Date().getFullYear()} Hammam Industries & Co. Internal Tool
      </div>
    </div>
  );
};

export default App;