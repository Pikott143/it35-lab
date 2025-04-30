import React, { useState } from 'react';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonText,
  IonToast,
  useIonRouter
} from '@ionic/react';
import { supabase } from '../utils/supabaseClient';

const AlertBox: React.FC<{ message: string; isOpen: boolean; onClose: () => void }> = ({ message, isOpen, onClose }) => (
  <IonAlert
    isOpen={isOpen}
    onDidDismiss={onClose}
    header="Notification"
    message={message}
    buttons={['OK']}
  />
);

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }
    setShowToast(true);
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 300);
  };

  return (
    <IonPage>
      <IonContent
        className="ion-padding"
        style={{
          background: "url('C:/Users/janin/Downloads/it35-lab/src/image/j9.jpg') no-repeat center center",
          backgroundSize: 'cover'
        }}
      >
        <div style={{
          maxWidth: '400px',
          margin: '0 auto',
          marginTop: '10%',
          padding: '30px',
          borderRadius: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          background: 'rgba(7, 7, 7, 0.8)',
          color: '#333'
        }}>
          <div className="ion-text-center">
            <h2 className="ion-margin-top ion-text-uppercase" style={{ fontWeight: 'bold', color: 'white' }}>
              User Login
            </h2>
          </div>
  
          <IonInput
            className="ion-margin-top"
            label="Email"
            labelPlacement="stacked"
            fill="outline"
            type="email"
            placeholder="Enter Email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
          />
          <IonInput
            className="ion-margin-top"
            label="Password"
            labelPlacement="stacked"
            fill="outline"
            type="password"
            placeholder="Enter Password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>
  
          <IonButton
            onClick={doLogin}
            expand="block"
            shape="round"
            className="ion-margin-top"
            color="primary"
          >
            Login
          </IonButton>
  
          <IonText className="ion-text-center ion-margin-top" style={{ color: 'white' }}>
            <p>Don't have an account?</p>
          </IonText>
  
          <IonButton
            routerLink="/it35-lab/register"
            expand="block"
            shape="round"
            className="ion-margin-top"
            color="light blue" 
          >
            Register here
          </IonButton>
  
        </div>

        {/* Alerts and Toasts */}
        <AlertBox message={alertMessage} isOpen={showAlert} onClose={() => setShowAlert(false)} />
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;