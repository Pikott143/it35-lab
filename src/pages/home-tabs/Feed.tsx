import React from 'react';
import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFabList,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent
} from '@ionic/react';
import { add, colorPalette, document, globe } from 'ionicons/icons';

const Feed: React.FC = () => {
  const handleSearch = (e: any) => {
    console.log('Searching for: ', e.target.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Feed</IonTitle>
        </IonToolbar>
        <IonSearchbar
          placeholder="Search Feed..."
          onIonInput={handleSearch}
          debounce={500} // optional debounce
        />
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {/* Sample Card */}
        <IonCard>
          <img
            alt="One Piece crew in Egghead outfits"
            src="public3c6483bd.webp"
          />
          
          <IonCardHeader>
            <IonCardTitle>Card Title</IonCardTitle>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Here's a small text description for the card content. Nothing more, nothing less.
          </IonCardContent>
        </IonCard>

        <IonCard>
      <img alt="SL" src="https://scontent.fcgm1-1.fna.fbcdn.net/v/t39.30808-6/290905173_10159776384714340_4225162534160083466_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=0b6b33&_nc_eui2=AeHMkf5donuu5kd8vigizemV0Mvpd8XxU0TQy-l3xfFTRHB9hblUjnbe1H0p21YV_PQxiuI1NhfRl185iHgVnqo3&_nc_ohc=Mvgc7AfcywgQ7kNvgGTQwoR&_nc_oc=AdhSK19rvDIsYfp_acr_yxHYGADcnbwzgeOR03yNiySF65lVo2sZ6XAhMigBQj97aKA&_nc_zt=23&_nc_ht=scontent.fcgm1-1.fna&_nc_gid=A8SFDDUmZm6bvtzOD145847&oh=00_AYAHyg9E4sbA14Pa943ccII-tSsKS2fCcHsO1B4ZDMQPiw&oe=67CA9026" />
      <IonCardHeader>
        <IonCardTitle>Solo Leveling</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>The worldwide dungeon-crawling phenomenon is getting an anime adaptation!</IonCardContent>
    </IonCard>

        {/* Floating Action Button */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton size="small">
            <IonIcon icon={add} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton>
              <IonIcon icon={document} />
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={colorPalette} />
            </IonFabButton>
            <IonFabButton>
              <IonIcon icon={globe} />
            </IonFabButton>
          </IonFabList>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Feed;

