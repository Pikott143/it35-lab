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
            src="https://i.redd.it/new-promotional-visual-for-film-red-v0-harlfzy7ple91.jpg?width=2067&format=pjpg&auto=webp&s=7a472fe5d386e48db04919adb4a5abde8b04ea42"
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
            alt="Silhouette of mountains"
            src="https://miro.medium.com/v2/resize:fit:780/0*6yau_D6cegZTa-yx.png"
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
            src="https://static1.srcdn.com/wordpress/wp-content/uploads/2024/01/the-straw-hats-from-the-one-piece-anime-ending-dear-sunrise.jpg"
          />
          <IonCardHeader>
            <IonCardTitle>ONE PIECE: EGGHEAD ARC</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          Luffy arrived on the island of the future, Egghead, where he met Vegapunk. Given that Egghead followed the future theme, fans knew that this would be an arc focused on technology, as well as many inventions made by Vegapunk over the years.
          </IonCardContent>
        </IonCard>

        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="https://static.beebom.com/wp-content/uploads/2022/12/Whole-Cake-Island-Saga.jpg?w=1024&quality=75"
          />
          <IonCardHeader>
            <IonCardTitle>ONE PIECE: WHOLECAKE ISLAND ARC</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          Sanji finds out about Pedro's death as the Straw Hats successfully sail out of Totto Land, and as she overhears the news on Cacao Island, Pudding weeps while recalling her memories with Sanji.
          </IonCardContent>
        </IonCard>

        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="https://staticg.sportskeeda.com/editor/2022/09/12d4f-16622229890465-1920.jpg"
          />
          <IonCardHeader>
            <IonCardTitle>ONE PIECE: WANO ARC </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
          From episodes 892 to 1085, One Piece dives into the enigma of Wano Country, ruled by the not-so-charming duo of Kurozumi Orochi and the heavyweight Yonko, Kaido. This arc is the series' mic drop, neatly tying up loose ends from previous tales.
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

