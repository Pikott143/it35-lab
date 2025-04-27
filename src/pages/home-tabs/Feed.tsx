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

        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="https://ionicframework.com/docs/img/demos/card-media.png"
          />
          <IonCardHeader>
            <IonCardTitle>ONE PIECE: FILM RED</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          Uta, the most beloved singer on the planet, is known for hiding her own identity when performing. Now, for the first time, she will reveal herself to the world. All of Uta's fans, including the Straw Hats led by Luffy, await.
          </IonCardContent>
        </IonCard>

        <IonCard>
        <img
         alt="One Piece: Dressrosa Arc"
         src="/onepiece.webp"
         />


          <IonCardHeader>
            <IonCardTitle>ONE PIECE: DRESSROSA ARC</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          The Straw Hats and Law reach Dressrosa where they plan to bring down Doflamingo. A sequence of unexpected events shakes the world order, and Doflamingo proves to be a challenge that even some of the strongest warriors cannot overcome.
          </IonCardContent>
        </IonCard>

        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="data:image/jpeg;base64,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"
          />
          <IonCardHeader>
            <IonCardTitle>ONE PIECE: EGGHEAD ARC</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          Luffy arrived on the island of the future, Egghead, where he met Vegapunk. Given that Egghead followed the future theme, fans knew that this would be an arc focused on technology, as well as many inventions made by Vegapunk over the years.
          </IonCardContent>
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
