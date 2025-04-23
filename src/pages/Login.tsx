import {
  IonAlert,
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonToast,
  useIonRouter,
} from '@ionic/react';
import { logoIonic } from 'ionicons/icons';
import { useState } from 'react';

const Login: React.FC = () => {
  const navigation = useIonRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    // Basic dummy validation
    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      setShowAlert(true);
      return;
    }

    // Simulate login success
    setShowToast(true);
    setTimeout(() => {
      navigation.push('/it35-lab/app', 'forward', 'replace');
    }, 1600);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding" fullscreen>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          background: 'linear-gradient(to bottom right, #f0f2f5, #dbe9ff)',
        }}>
          <IonCard style={{
            width: '100%',
            maxWidth: '400px',
            padding: '1.5rem',
            borderRadius: '20px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          }}>
            <IonCardContent>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <IonAvatar style={{ margin: '0 auto', width: '100px', height: '100px' }}>
                  <IonIcon
                    icon={logoIonic}
                    style={{ fontSize: '80px', color: '#3880ff' }}
                  />
                </IonAvatar>
                <h2 style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>USER LOGIN</h2>
              </div>

              <IonInput
                label="Email"
                labelPlacement="floating"
                fill="outline"
                type="email"
                placeholder="Enter your email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
              <IonInput
                className="ion-margin-top"
                fill="outline"
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              <IonButton
                className="ion-margin-top"
                expand="block"
                shape="round"
                onClick={doLogin}
              >
                Login
              </IonButton>

              <IonButton
                routerLink="/it35-lab/register"
                expand="block"
                fill="clear"
                shape="round"
              >
                Don't have an account? <strong>&nbsp;Register here</strong>
              </IonButton>
            </IonCardContent>
          </IonCard>

          <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header="Login Failed"
            message={errorMessage}
            buttons={['OK']}
          />

          <IonToast
            isOpen={showToast}
            onDidDismiss={() => setShowToast(false)}
            message="Login successful! Redirecting..."
            duration={1500}
            position="top"
            color="primary"
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
