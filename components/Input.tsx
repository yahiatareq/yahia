import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const TableInput: React.FC<InputProps> = ({ className = '', ...props }) => {
  const isDate = props.type === 'date';
  
  // Format date for display in print mode (YYYY-MM-DD -> DD/MM/YYYY)
  const getDisplayValue = () => {
    if (!props.value) return '';
    if (isDate) {
      const val = String(props.value);
      const parts = val.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
    }
    return props.value;
  };

  return (
    <>
      {/* Screen Mode: Interactive Input */}
      <input
        className={`print:hidden w-full h-full px-1 bg-transparent focus:bg-blue-50 focus:outline-none text-center text-sm font-medium text-gray-800 ${isDate ? 'font-mono' : ''} ${className}`}
        {...props}
      />
      {/* Print Mode: Static Text */}
      <span className="hidden print:flex w-full h-full items-center justify-center text-center text-sm font-bold text-blue-900 leading-tight">
        {getDisplayValue()}
      </span>
    </>
  );
};

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    options: string[];
}

export const TableSelect: React.FC<SelectProps> = ({ className = '', options, ...props }) => {
    return (
        <>
            {/* Screen Mode: Dropdown */}
            <select 
                className={`print:hidden w-full h-full px-1 bg-transparent focus:bg-blue-50 focus:outline-none text-center text-xs font-bold text-blue-800 appearance-none cursor-pointer hover:bg-blue-50 ${className}`}
                {...props}
            >
                {options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
            </select>
            {/* Print Mode: Static Text */}
             <span className="hidden print:flex w-full h-full items-center justify-center text-center text-xs font-bold text-blue-900">
                {props.value}
            </span>
        </>
    );
}

export const TableCell: React.FC<{ children?: React.ReactNode; className?: string; colSpan?: number }> = ({ children, className = '', colSpan }) => {
  return (
    <div className={`border-r border-b border-blue-900 flex items-center justify-center relative ${className}`} style={{ gridColumn: colSpan ? `span ${colSpan} / span ${colSpan}` : 'auto' }}>
      {children}
    </div>
  );
};

export const LabelCell: React.FC<{ children?: React.ReactNode; className?: string; colSpan?: number }> = ({ children, className = '', colSpan }) => {
  return (
    <div className={`border-r border-b border-blue-900 px-2 py-1 flex items-center font-bold text-sm bg-blue-100 text-blue-900 print:bg-blue-100 print-color-adjust-exact ${className}`} style={{ gridColumn: colSpan ? `span ${colSpan} / span ${colSpan}` : 'auto' }}>
      {children}
    </div>
  );
};