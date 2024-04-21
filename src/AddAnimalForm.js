/*imports use state and react-bootstrap components used*/
import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Button } from "react-bootstrap"
/*pass props from add animal function from App component*/
export default function AddAnimalForm({addAnimal}) {
      /*sets state for animal name and animal species input values*/
      const [animalNameValue, setAnimalNameValue] = useState('')
      const [animalSpeciesValue, setAnimalSpeciesValue] =useState('')
      /*function for add animal button, calls add animal function from App component with the parameters
      of animal name and animal species, clears out inputs when button is clicked*/
      const handleAddAnimal = async () => {
            addAnimal({name: animalNameValue, species: animalSpeciesValue})
            setAnimalNameValue("")
            setAnimalSpeciesValue("")
      }
      /*returns add animal form with input for name and specials and add animal button*/
      return (
        <div className="d-flex align-items-center justify-content-center">
          <Card style={{ width: '70rem' }} id="addAnimalCard">
            <CardHeader id="addCardHeader">
            <h1>Add New Animal</h1>
            </CardHeader>
            <CardBody id="addCardBody">
              <div className='d-flex align-items-center gap-3'>
                <input
                  type="text"
                  className='form-control'
                  value={animalNameValue}
                  onChange={(e) => setAnimalNameValue(e.target.value)}
                  placeholder="Enter animal name"
                />
                <input 
                  type="text"
                  className='form-control'
                  value={animalSpeciesValue}
                  onChange={(e) => setAnimalSpeciesValue(e.target.value)}
                  placeholder="Enter animal species"
                />
              <Button variant="dark" onClick={handleAddAnimal}>Add Animal</Button>
              </div>
            </CardBody>
          </Card>
        </div>
      );
    }
  
