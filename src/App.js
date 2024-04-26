import React, { useState } from "react";
import "./index.css";

const App = () => {
  const [objects, setObjects] = useState([
    { id: "object-1", name: "Object 1" },
    { id: "object-2", name: "Object 2" },
    { id: "object-3", name: "Object 3" }
  ]);

  const [list, setList] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [newObjectName, setNewObjectName] = useState("");
  const [allObjectsDraggedToList, setAllObjectsDraggedToList] = useState(false);

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();

    if (!draggedItem) return;

    const newList = [...list];
    const draggedIndex = list.findIndex((item) => item.id === draggedItem.id);

    if (newList.includes(draggedItem)) {
      newList.splice(draggedIndex, 1);
      newList.splice(targetIndex, 0, draggedItem);
    } else { 
      if (!newList.some((item) => item.id === draggedItem.id)) {
        newList.splice(targetIndex, 0, draggedItem);
      }
      if (!list.some((item) => item.id === draggedItem.id)) {
        const updatedObjects = objects.filter(
          (object) => object.id !== draggedItem.id
        );
        setObjects(updatedObjects);
        if (updatedObjects.length === 0) {
          setAllObjectsDraggedToList(true);
        } else {
          setAllObjectsDraggedToList(false);
        }
      }
    }

    setList(newList);
    setDraggedItem(null);
  };

  const handleAddObject = () => {
    if (newObjectName.trim() !== "") {
      const newObjectId = `object-${newObjectName.trim().toLowerCase().replace(/\s/g, '-')}`;
      const newObject = {
        id: newObjectId,
        name: newObjectName.trim()
      };
      if (allObjectsDraggedToList) {
        setObjects([...objects, newObject]);
        setAllObjectsDraggedToList(false); 
      } else {
        setObjects([...objects, newObject]);
      }
      
      setNewObjectName("");
    }
  };

  return (
    <div className="container">
      <div className="objects-container">
        <h2>Objects</h2>
        {objects.map((object) => (
          <div
            key={object.id}
            className="object"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, object)}
          >
            {object.name}
          </div>
        ))}
        <div>
          <input
            type="text"
            value={newObjectName}
            onChange={(e) => setNewObjectName(e.target.value)}
            placeholder="Enter new object name"
          />
          <button onClick={handleAddObject}>Add Object</button>
        </div>
      </div>
      <div
        className="list-container"
        onDragOver={(e) => handleDragOver(e)}
        onDrop={(e) => handleDrop(e, list.length)}
      >
        <h2>List</h2>
        {list.map((item, index) => (
          <div
            key={item.id}
            className="list-item"
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={(e) => handleDragOver(e)}
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;