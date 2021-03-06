import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";

// requiring json data for use in dropdown and checkboxes
// const speciesData = require('../data/species.json');

// Custom hook for handling input boxes
// saves us from creating onChange handlers for them individually
const useInput = (init) => {
  const [value, setValue] = useState(init);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [value, onChange];
};

const CreatePost = (props) => {
  const [photo, photoOnChange] = useInput("");
  const [name, nameOnChange] = useInput("");
  const [date, dateOnChange] = useInput("");
  const [genre, genreOnChange] = useInput("");
  const [aperture, apertureOnChange] = useInput("");
  const [shutterSpeed, shutterSpeedOnChange] = useInput("");
  const [iso, isoOnChange] = useInput("");
  const [lighting, lightingOnChange] = useInput("");
  const [notes, notesOnChange] = useInput("");
  // const [ species, setSpecies ] = useState(speciesData[0].name);
  // const [ species_id, setSpeciesId ] = useState(speciesData[0]._id);
  // const [ homeworld, setHomeworld ] = useState(planetsData[0].name);
  // const [ homeworld_id, setHomeworldId ] = useState(planetsData[0]._id);
  // const [ filmSet, setFilmSet ] = useState({});
  // const [ nameError, setNameError ] = useState(null);
  // const [ heightError, setHeightError ] = useState(null);

  // const handleSpeciesChange = e => {
  //   const idx = e.target.value;
  //   setSpecies(speciesData[idx].name);
  //   setSpeciesId(speciesData[idx]._id);
  // };

  const savePhoto = () => {
    // check if name is empty
    // if (name === '') {
    //   setNameError('required');
    // // check if height is not a number
    // } else if(isNaN(aperture)){
    //   setApertureError('must be a number');
    // } else if(isNaN(shutterSpeed)){
    //   setShutterSpeedError('must be a number');
    // } else if(isNaN(iso)){
    //   setIsoError('must be a number');
    // }
    const body = {
      photo,
      name,
      date,
      genre,
      aperture,
      shutterSpeed,
      iso,
      lighting,
      notes,
    };
    fetch("/photos", {
      method: "POST",
      headers: {
        "Content-Type": "Application/JSON",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .then(() => {
        props.history.push("/");
      })
      .catch((err) =>
        console.log("CreateCharacter fetch /api/character: ERROR: ", err)
      );
  };

  // // useEffect to clear nameError when `name` is changed
  // useEffect(()=>{
  //   setNameError(null);
  // }, [name]);

  // // useEffect to clear heightError when `height` is changed
  // useEffect(()=>{
  //   setApertureError(null);
  // }, [aperture]);

  // useEffect(()=>{
  //   setShutterSpeedError(null);
  // }, [shutterSpeed]);

  // useEffect(()=>{
  //   setIsoError(null);
  // }, [iso]);

  // const speciesOptions = speciesData.map((speciesObj, idx) => {
  //   return (
  //     <option key={idx} value={idx}>{speciesObj.name}</option>
  //   );
  // });

  return (
    <section className="add-photo-component">

      {/* <header className="pageHeader"> */}
        <Link to="/collection" className="backLink">
          <button type="button" className="btnSecondary">
            Back to Collection
          </button>
        </Link>
      {/* </header> */}

      <article className="upload-table">
        <h3>Add to collection</h3>
        <div className="upload-fields">
          <label htmlFor="photo-url">Photo URL: </label>
          <input
            name="photo"
            placeholder="https://something.jpg"
            value={photo}
            onChange={photoOnChange}
          />
          {/* {nameError ? (<span className="errorMsg">{nameError}</span>) : null} */}
        </div>
        <div className="upload-fields">
          <label htmlFor="name">Name: </label>
          <input
            name="name"
            placeholder="Solar Eclipse 2021"
            value={name}
            onChange={nameOnChange}
          />
          {/* {nameError ? (<span className="errorMsg">{nameError}</span>) : null} */}
        </div>
        <div className="upload-fields">
          <label htmlFor="date">Date: </label>
          <input
            name="date"
            placeholder="06/10/2021"
            value={date}
            onChange={dateOnChange}
          />
        </div>
        {/* <div className="createCharFields">
          <label htmlFor="genre">Genre: </label>
          <select name="genre" id="species-select" onChange={handleSpeciesChange}>
            {speciesOptions}
          </select>
        </div> */}
        <div className="upload-fields">
          <label htmlFor="genre">Genre: </label>
          <input
            name="genre"
            placeholder="Astronomy"
            value={genre}
            onChange={genreOnChange}
          />
        </div>
        <div className="upload-fields">
          <label htmlFor="aperture">Aperture: </label>
          <input
            name="aperture"
            placeholder="2.8"
            value={aperture}
            onChange={apertureOnChange}
          />
        </div>
        <div className="upload-fields">
          <label htmlFor="shutterSpeed">Shutter Speed: </label>
          <input
            name="shutterSpeed"
            placeholder="1/8000"
            value={shutterSpeed}
            onChange={shutterSpeedOnChange}
          />
        </div>
        <div className="upload-fields">
          <label htmlFor="iso">ISO: </label>
          <input
            name="iso"
            placeholder="100"
            value={iso}
            onChange={isoOnChange}
          />
        </div>
        <div className="upload-fields">
          <label htmlFor="lighting">Lighting: </label>
          <input
            name="lighting"
            placeholder="Daylight"
            value={lighting}
            onChange={lightingOnChange}
          />
        </div>
        <div className="upload-fields">
          <label htmlFor="notes">Notes: </label>
          <textarea
            rows="4"
            columns="20"
            name="notes"
            placeholder="..."
            value={notes}
            onChange={notesOnChange}
          />
          {/* {heightError ? (<span className="errorMsg">{heightError}</span>) : null} */}
        </div>

        <div className="upload-button-container">
          <Link to="/collection" className="backLink">
            <button type="button" className="btnSecondary">
              Cancel
            </button>
          </Link>
          <Link to="/collection">
          <button type="button" className="btnMain" onClick={savePhoto}>
            Save
          </button></Link>
        </div>
      </article>
    </section>
  );
};

export default withRouter(CreatePost);
