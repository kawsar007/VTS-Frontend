import React, { useState } from "react";
import SelectField from "./select-field";

const dataProvider = [
  {
    id: 1,
    class: "class1",
    value: "one",
    students: [
      {
        id: 1,
        role: 1001,
        name: "Tuhin Khan",
        email: "tuhinkhan@gmail.com",
      },
      {
        id: 2,
        role: 1002,
        name: "Babu Khan",
        email: "babukhan@gmail.com",
      },
    ],
  },
  {
    id: 2,
    class: "class2",
    value: "two",
    students: [
      {
        id: 1,
        role: 1001,
        name: "Kawsar Mia",
        email: "kawsarmia@gmail.com",
      },
      {
        id: 2,
        role: 1002,
        name: "Toufik Khan",
        email: "toufikkhan@gmail.com",
      },
    ],
  },
  {
    id: 3,
    class: "class3",
    value: "three",
    students: [
      {
        id: 1,
        role: 1001,
        name: "Abu Said",
        email: "abusaid@gmail.com",
      },
      {
        id: 2,
        role: 1002,
        name: "Shamim Khan",
        email: "shamimkhan@gmail.com",
      },
    ],
  },
  {
    id: 4,
    class: "class4",
    value: "four",
    students: [
      {
        id: 1,
        role: 1001,
        name: "Razib Khan",
        email: "razibkhan@gmail.com",
      },
      {
        id: 2,
        role: 1002,
        name: "Tamim Khan",
        email: "tamimkhan@gmail.com",
      },
    ],
  },
];

const TestComp = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <h1>Select a class:</h1>
      <SelectField options={dataProvider} onChange={handleSelectChange} />
      {selectedOption && (
        <div>
          <h2>Selected class: {selectedOption}</h2>
          <h3>Students:</h3>
          <ul>
            {dataProvider
              .find((option) => option.value === selectedOption)
              .students.map((student) => (
                <li key={student.id}>
                  Name: {student.name}, Email: {student.email}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestComp;
