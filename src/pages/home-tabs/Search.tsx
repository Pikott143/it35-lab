import React, { useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

const Search: React.FC = () => {
  const data = [
    'Amsterdam',
    'Buenos Aires',
    'Cairo',
    'Geneva',
    'Hong Kong',
    'Istanbul',
    'London',
    'Madrid',
    'New York',
    'Panama City',
  ];
  
  const [results, setResults] = useState([...data]);

  const handleInput = (event: Event) => {
    const target = event.target as HTMLIonSearchbarElement;
    let query = '';
    if (target) query = target.value!.toLowerCase();

    setResults(data.filter((d) => d.toLowerCase().indexOf(query) > -1));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
          }}
        >
          <IonSearchbar
            placeholder="Search something..."
            style={{ width: '90%', maxWidth: '500px' }}
            debounce={1000}
            onIonInput={(event) => handleInput(event)}
          />
          
          <IonList style={{ width: '90%', maxWidth: '500px', marginTop: '20px' }}>
            {results.map((result, index) => (
              <IonItem key={index}>{result}</IonItem>
            ))}
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Search;
