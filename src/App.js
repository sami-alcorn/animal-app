/* imports for css, usestate, useseffect, and my other components*/
import './App.css';
import React, { useState, useEffect } from 'react';
import MyAnimals from './MyAnimals';
import AddAnimalForm from './AddAnimalForm';


export default function App() {
  /*setting state for list of animals fetched from API, state connected to updated name input
  to update API*/
  const [animalList, setAnimalList] = useState([]);
  const [updatedAnimalName, setUpdatedAnimalName] = useState('')

  /*function to fetch list of animals from API*/
  const fetchAnimals  = async () => {
    const response = await fetch('https://660c5c273a0766e85dbdfd9f.mockapi.io/animals-app/Animals')
    const data = await response.json()
    setAnimalList(data);
  }
  /*calling fetch animals funtion inside use effect*/
  useEffect( () => {
     fetchAnimals();
  }, [])
 /*function to save changes made to animal name and update API with updated name using PUT*/
  const handleSaveChanges = async (animalId) => {
// console.log("Handling save changes...", animalId);
      const response = await fetch(`https://660c5c273a0766e85dbdfd9f.mockapi.io/animals-app/Animals/${animalId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ name: updatedAnimalName }),
        })
      const data = await response.json()
      setUpdatedAnimalName(data)
      /*calling fetch animals function againg to updated the virtual DOM so information displayed matches
      data from API*/
      fetchAnimals()
      }
      /*function to remove animal from the API when delete button is clicked*/
      const deleteAnimal = async (animalId) => {
        // console.log("Deleting the animal...", animalId);
        await fetch(`https://660c5c273a0766e85dbdfd9f.mockapi.io/animals-app/Animals/${animalId}`, {
          method: "DELETE"
        }) 
        /*resets animal list to reflect animal has been deleted then call fetch animals function
        again to display updated list*/
        setAnimalList([...animalList])
        fetchAnimals()
      }
  /*function to update API with added animal using POST*/
  const addAnimal = async (newAnimalData) => {
    const response = await fetch('https://660c5c273a0766e85dbdfd9f.mockapi.io/animals-app/Animals', {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newAnimalData)
  })
    const createdAnimalWithId = await response.json()
    /*updates animal list to include newly added animal*/
    setAnimalList([...animalList, createdAnimalWithId])
  }
  /*returns my animals and add animal form components*/
  return (
    <div>
      <div>
      {/*passes down props FETCH, PUT, and DELETE functiongs*/}
      <MyAnimals animalList={animalList} setUpdatedAnimalName={setUpdatedAnimalName} handleSaveChanges={handleSaveChanges} deleteAnimal={deleteAnimal} />
      </div>
      <div>
        {/*passes down props for POST function*/}
        <AddAnimalForm addAnimal={addAnimal}/>
      </div>
    </div>
  );

  }

