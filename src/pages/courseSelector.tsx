// pages/CourseSelector.tsx

import React, { useState, useEffect } from 'react';

// Define the structure of a course item based on your JSON structure
interface CourseItem {
  EntityName: string;
  CourseType: string;
  Prefix: string;
  Code: string;
  Name: string;
}

interface CourseSelectorProps {
  classList: CourseItem[];
  onClassSelect: (classInfo: string) => void;
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ classList, onClassSelect }) => {
  // State for the dropdown selections
  const [prefixes, setPrefixes] = useState<string[]>([]);
  const [selectedPrefix, setSelectedPrefix] = useState('');
  const [codes, setCodes] = useState<string[]>([]);
  const [selectedCode, setSelectedCode] = useState('');

  // Effect to set prefixes when classList changes
  useEffect(() => {
    const uniquePrefixes = [...new Set(classList.map((item) => item.Prefix))];
    setPrefixes(uniquePrefixes);
  }, [classList]);

  // Effect to set codes when selectedPrefix changes
  useEffect(() => {
    const codesForPrefix = classList
      .filter((item) => item.Prefix === selectedPrefix)
      .map((item) => item.Code);
    setCodes(codesForPrefix);
  }, [selectedPrefix, classList]);

  // Effect to call onClassSelect when both prefix and code are selected
  useEffect(() => {
    if (selectedPrefix && selectedCode) {
      onClassSelect(`${selectedPrefix} ${selectedCode}`);
    }
  }, [selectedPrefix, selectedCode, onClassSelect]);

  // Handlers for dropdown changes
  const handlePrefixChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrefix(event.target.value);
    setSelectedCode(''); // Reset code when prefix changes
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCode(event.target.value);
  };

  return (
    <div>
      <select value={selectedPrefix} onChange={handlePrefixChange}>
        <option value="">Select a Prefix</option>
        {prefixes.map((prefix) => (
          <option key={prefix} value={prefix}>{prefix}</option>
        ))}
      </select>

      {selectedPrefix && (
        <select value={selectedCode} onChange={handleCodeChange}>
          <option value="">Select a Code</option>
          {codes.map((code) => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default CourseSelector;
