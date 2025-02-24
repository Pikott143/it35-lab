import { 
  IonButtons,
  IonContent, 
  IonHeader, 
  IonMenuButton, 
  IonPage, 
  IonSearchbar, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react';

const Favorites: React.FC = () => {
  const handleSearch = (e: any) => {
    console.log('Searching for: ', e.target.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Favorites</IonTitle>
        </IonToolbar>
        {/* Add IonSearchbar here */}
        <IonSearchbar 
          placeholder="Search Favorites..." 
          onIonInput={handleSearch} 
          debounce={0}
        />
      </IonHeader>
      <IonContent fullscreen>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          Favorites
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Favorites;
