"use client"
import React ,{useState } from "react";

const page = () => {
    const [selectedColor, setSelectedColor] = useState('');

    const colors = [
      { id: 'red', label: 'Red' },
      { id: 'blue', label: 'Blue' },
      { id: 'green', label: 'Green' },
      { id: 'yellow', label: 'Yellow' },
    ];
  
    const handleColorChange = (event) => {
      setSelectedColor(event.target.value);
    };
  
    return (
      <form className="p-4">
        <fieldset className="space-y-2">
          <legend className="text-lg font-medium">Select your favorite color:</legend>
          {colors.map((color) => (
            <label key={color.id} className="flex items-center space-x-2">
              <input
                type="radio"
                name="color"
                value={color.id}
                checked={selectedColor === color.id}
                onChange={handleColorChange}
                className="form-radio text-indigo-600"
              />
              <span>{color.label}</span>
            </label>
          ))}
        </fieldset>
      </form>
    );
  };
  
  
  
 
  
  
export default page;
