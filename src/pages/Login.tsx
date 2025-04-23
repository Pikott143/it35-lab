import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  IonAlert,
  IonToast,
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';

const Login: React.FC = () => {
  const router = useIonRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Please fill in both fields.');
      setShowAlert(true);
      return;
    }

    setShowToast(true);
    setTimeout(() => {
      router.push('/it35-lab/app', 'forward', 'replace');
    }, 1500);
  };

  return (
    <IonPage>
      <IonContent fullscreen style={{
        background: 'url(https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1950&q=80) center/cover no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          backdropFilter: 'blur(15px)',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '360px',
          width: '90%',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        }}>
          <h2 style={{
            color: '#fff',
            textAlign: 'center',
            marginBottom: '1.5rem',
            fontWeight: '600',
            letterSpacing: '1px'
          }}>Login</h2>

          <IonInput
            fill="outline"
            label="Email"
            labelPlacement="floating"
            type="email"
            placeholder="Email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
            style={{ marginBottom: '1rem' }}
          />

          <IonInput
            fill="outline"
            label="Password"
            labelPlacement="floating"
            type="password"
            placeholder="Password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          >
            <IonInputPasswordToggle slot="end" />
          </IonInput>

          <IonButton
            expand="block"
            shape="round"
            color="light"
            className="ion-margin-top"
            onClick={doLogin}
          >
            Log In
          </IonButton>

          <IonButton
            expand="block"
            fill="clear"
            shape="round"
            routerLink="/it35-lab/register"
            className="ion-margin-top"
            color="light"
          >
            Create Account
          </IonButton>
        </div>

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Oops!"
          message={errorMessage}
          buttons={['OK']}
        />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="success"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;

