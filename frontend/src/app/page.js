"use client";

import '@/app/globals.css';
import { useState } from 'react';
import { Container } from "@/components/Containers/ContainerStyled";
import ParForm from "@/components/Forms/ParForm";
import ProgressIndicator from '@/components/Indicators/ProgressIndicator';
import styled from 'styled-components';
import LocationFetcher from '@/components/Location/Locations';
import {Button} from '@/components/Button/ButtonStyled';

const Message = styled.h1`
  color: white;
  font-size: 32px;
  text-align: center;
  margin-top: 2rem;
`;

async function sendEventDetails(eventDetails) {
  try {
    const response = await fetch('http://localhost:8000/oglas_eventa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventDetails),
    });

    if (!response.ok) {
      throw new Error('Failed to submit event details');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export default function Home() {
  const labelSets = [
    {
      first: {
        label: "naziv termina",
        id: "id1",
        name: "naziv_termina",
      },
      second: {
        label: "kratki opis",
        id: "id2",
        name: "opis_termina",
      }
    },
    {
      first: {
        label: "mjesto održavanja",
        id: "id1",
        name: "lokacija",
      },
      second: {
        label: "vrijeme održavanja",
        id: "id2",
        name: "pocetak_termina",
      }
    },
    {
      first: {
        label: "broj igrača",
        id: "id1",
        name: "broj_slobodnih_mjesta",
      },
      second: {
        label: "sport",
        id: "id2",
        name: "sport",
      }
    }
  ];
  
  const [formKey, setFormKey] = useState(0);
  const [currentLabelSetIndex, setCurrentLabelSetIndex] = useState(0);
  const [formSubmitCount, setFormSubmitCount] = useState(0);
  const [formValues, setFormValues] = useState([]);

  const handlePress = async () => {
    let broj_slobodnih_mjesta = parseInt(document.getElementById('id1').value);
    let sport = parseInt(document.getElementById('id2').value);
    console.log(broj_slobodnih_mjesta, sport)
    const formData = {
      naziv_termina: formValues[0],
      opis_termina: formValues[1],
      lokacija: formValues[2],
      pocetak_termina: formValues[3],
      broj_slobodnih_mjesta: broj_slobodnih_mjesta,
      sport: sport,
    };console.log(formValues)
    
    try {
      await sendEventDetails(formData);
    } catch (error) {
      console.error('Failed to submit form', error);
    }
  };
  
  const NextSlide = () => {
    let prvaVrijednost= document.getElementById("id1").value;
    let drugaVrijednost= document.getElementById("id2").value;
    setFormValues([...formValues,prvaVrijednost,drugaVrijednost])
    if (formSubmitCount < 2) {
      setFormKey((prevKey) => prevKey + 1);
      setCurrentLabelSetIndex((prevIndex) => (prevIndex + 1) % labelSets.length);
      setFormSubmitCount((prevCount) => prevCount + 1);
    } else {
      setFormSubmitCount((prevCount) => prevCount + 1);
    }
  }

  return (
    <Container>
      {formSubmitCount < 3 ? (
        <>
          <ProgressIndicator steps={3} active_number={formSubmitCount + 1} />
          <ParForm
            key={formKey}
            inputs={labelSets[currentLabelSetIndex]}
            h_text={"Osnovne informacije o terminu"}
          >{(formSubmitCount===2)?(<Button onClick={handlePress}>Završite</Button>) : (<Button onClick={NextSlide}>sljedeće</Button>)}</ParForm>
        </>
      ) : (
        <>
        <Message>uspješno ste dodali termin</Message>
        <LocationFetcher></LocationFetcher></>
        
      )
      }
    </Container>

  );
}



 
        
  
