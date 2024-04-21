/*imports use state and react bootstrap components used*/
import { useState } from "react"
import { Card, CardBody, CardHeader, Button } from "react-bootstrap"

/*passes down propts for state and functions from app component*/
export default function MyAnimals({animalList,setUpdatedAnimalName, deleteAnimal, updatedAnimalName, handleSaveChanges}) {
/*sets state for edit mode and id for which animal is being edited*/
  const [editingAnimalId, setEditingAnimalId] = useState(null)
  const [editMode, setEditMode] = useState(false)
  /*funtion to handle when edit button is clicked, takes of animal being updated as parameter
  sets animal being edited using id, sets editing mode to true to show input instead of animal
  name and dispay save, delete, and cancel buttons*/
  const handleEdit = (id) => {
    setEditingAnimalId(id) 
    setEditMode(true)
  }
  /*calls handle save changes funtion from app component and sets edit mode back to false*/
  const handleSave = async (id) => {
    //console.log("Handling the save...", id);
    await handleSaveChanges(id)
    setEditMode(false)
  }
  /*calls delete animal funtion from app component and sets edit mode to false*/
  const handleDelete = async (id) => {
    await deleteAnimal(id) 
    setEditMode(false)
  }
  /*funtion to change edit mode back to false when cancel button is clicked*/
  const handleCancel = () => {
    setEditMode(false)
  }
  /*returns card with "my animals" list*/
    return (
      <div className="d-flex align-items-center justify-content-center">
        <Card style={{ width: '70rem' }} id="animalListCard">
          <CardHeader id="animalListCardHeader">
            <h1>My Current Animals</h1>  
            </CardHeader>
            <CardBody id="animalListCardBody">
            {/*ternary operater to determine how list is displayed depending on if edit mode is set to 
            true or false*/}  
            {!editMode ? (
  <>
   {/*rendering editmode false, maps array of animals and species to a list with edit buttons*/}
    <ul>
      {animalList.map(animal => (
        <li key={animal.id}>
          {animal.name} - {animal.species}
          <Button variant="outline-dark btn-sm ms-2" onClick={() => handleEdit(animal.id)}>Edit</Button>
        </li>
      ))}
    </ul>
  </>
) : (
  <>
  {/*rendering edit mode true, changes animal's name to text input, showws save, delete, and cancel 
  buttons for the animal being edited, the rest remain the same*/}
    <ul>
      {animalList.map(animal => (
        <li key={animal.id}>
          {animal.id === editingAnimalId ? (
            <>
              <input 
              type="text" 
              value={updatedAnimalName}
              onChange={(e) => setUpdatedAnimalName(e.target.value)}
              /> 
              - {animal.species}
              <br/>
              <button id="saveButton" className="btn btn-sm ms-2" onClick={() => handleSave(animal.id)}>Save Changes</button>
              <button id="deleteButton" className="btn btn-sm ms-2" onClick={() => handleDelete(animal.id)}>Delete</button>
              <Button variant="secondary btn-sm ms-2" onClick={() => handleCancel()}>Cancel</Button>
              <br/>
            </>
          ) : (
            <>
              {animal.name} - {animal.species}
              <Button variant="outline-dark btn-sm ms-2" onClick={() => handleEdit(animal.id)}>Edit</Button>
            </>
          )}
        </li>
      ))}
    </ul>
  </>
)}
        </CardBody>
        </Card>
        </div>
    )
}