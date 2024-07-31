import { useState } from "react";

const EquiposTop = () => {
  // Valores dummy para la lista de datos
  const initialData = [
    { transactionId: "1", name: "Item 1", checked: false },
    { transactionId: "2", name: "Item 2", checked: false },
    { transactionId: "3", name: "Item 3", checked: false },
  ];

  // Estado para la lista de datos
  const [listOfSearchDataCopy, setListOfSearchDataCopy] = useState(initialData);

  // Manejador de eventos para el cambio en los checkboxes
  const handlebillIssue = (event) => {
    const transactionId = event.target.value;
    const checked = event.target.checked;

    setListOfSearchDataCopy((prevList) =>
      prevList.map((item) =>
        item.transactionId === transactionId ? { ...item, checked } : item
      )
    );
  };

  // Función para renderizar los checkboxes
  const renderCheckBoxes = (list) => {
    return list.map((item) => (
      <div key={item.transactionId}>
        <input
          type="checkbox"
          name="checkedBox"
          id={item.transactionId}
          onChange={handlebillIssue}
          checked={item.checked}
          value={item.transactionId}
        />
        <label htmlFor={item.transactionId}>{item.name}</label>
      </div>
    ));
  };

  return (
    <div>
      <h1>Checkbox List</h1>
      {renderCheckBoxes(listOfSearchDataCopy)}
    </div>
  );
};

export default EquiposTop;
