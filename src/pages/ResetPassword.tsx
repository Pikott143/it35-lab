import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonAlert,
  IonItem,
  IonLabel,
  IonIcon,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';
import { useIonRouter } from '@ionic/react';
import { refreshOutline } from 'ionicons/icons';

const generateStrongPassword = () => {
  const length = 12;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState(generateStrongPassword());
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const router = useIonRouter();

  // 👇 Exchange the session from the URL hash (important for Supabase)
 useEffect(() => {
  const handleSessionFromUrl = async () => {
    const { data, error } = await supabase.auth.getSessionFromUrl({ storeSession: true });

    if (error) {
      console.error('Error retrieving session from URL:', error.message);
    } else {
      console.log('Session retrieved and stored:', data.session);
    }
  };

  handleSessionFromUrl();
}, []);


  const handleUpdatePassword = async () => {
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
    } else {
      setAlertMessage("Password updated successfully!");
      setShowAlert(true);
      setTimeout(() => router.push('/it35-lab', 'root'), 2000);
    }
  };

  const handleGeneratePassword = () => {
    setPassword(generateStrongPassword());
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <IonCard>
          <IonCardContent>
            <h2>Reset Your Password</h2>

            <IonItem>
              <IonLabel position="stacked">New Password</IonLabel>
              <IonInput
                type="text"
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
              />
            </IonItem>

            <IonButton expand="block" color="medium" onClick={handleGeneratePassword}>
              <IonIcon icon={refreshOutline} slot="start" />
              Generate Strong Password
            </IonButton>

            <IonButton expand="block" onClick={handleUpdatePassword} style={{ marginTop: '1rem' }}>
              Update Password
            </IonButton>
          </IonCardContent>
        </IonCard>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Notification"
          message={alertMessage}
          buttons={['OK']}
        />
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
