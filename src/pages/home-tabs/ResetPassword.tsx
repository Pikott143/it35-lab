import { IonButton, IonContent, IonInput, IonLabel, IonPage, IonToast } from '@ionic/react';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [suggestedPassword, setSuggestedPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const generateSecurePassword = () => {
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
      let newPassword = '';
      for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        newPassword += charset[randomIndex];
      }
      return newPassword;
    };
    setSuggestedPassword(generateSecurePassword());
  }, []);

  const handleReset = async () => {
    const { error } = await supabase.auth.updateUser({ password });

    if (!error) {
      setShowToast(true);
    } else {
      console.error(error.message);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <h2>Reset Your Password</h2>

        <IonLabel>Suggested Password (copy if you want):</IonLabel>
        <IonInput readonly value={suggestedPassword} />

        <IonLabel position="stacked">New Password</IonLabel>
        <IonInput
          type="password"
          placeholder="Enter your new password"
          value={password}
          onIonChange={(e) => setPassword(e.detail.value!)}
        />

        <IonButton expand="block" onClick={handleReset}>
          Update Password
        </IonButton>

        <IonToast
          isOpen={showToast}
          message="Password successfully updated!"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default ResetPassword;
