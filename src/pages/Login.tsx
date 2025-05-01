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
  useIonRouter
} from '@ionic/react';
import { logoIonic } from 'ionicons/icons';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import ReCAPTCHA from 'react-google-recaptcha';

// Reusable Alert
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
  const router = useIonRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    if (!recaptchaValue) {
      setAlertMessage("Please complete the reCAPTCHA.");
      setShowAlert(true);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
      return;
    }

    setShowToast(true);
    setTimeout(() => {
      router.push('/it35-lab/app', 'forward', 'replace');
    }, 1000);
  };

  // OAuth login with Google
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
    }
  };

  // OAuth login with GitHub
  const loginWithGithub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });

    if (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
    }
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
        }}>
          <IonCard style={{
            width: '100%',
            maxWidth: '400px',
            padding: '20px',
            borderRadius: '20px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
          }}>
            <IonCardContent>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
               
                <h2 style={{ fontWeight: 'bold', color: 'white', margin: 0 }}>User Login</h2>
              </div>

              <IonInput
                label="Email"
                labelPlacement="floating"
                fill="outline"
                type="email"
                placeholder="Enter your institutional email"
                value={email}
                onIonChange={e => setEmail(e.detail.value ?? '')}
              />

              <IonInput
                style={{ marginTop: '15px' }}
                label="Password"
                labelPlacement="floating"
                fill="outline"
                type="password"
                placeholder="Enter your password"
                value={password}
                onIonChange={e => setPassword(e.detail.value ?? '')}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              {/* Google reCAPTCHA */}
              <div style={{ marginTop: '20px', minHeight: '80px', display: 'flex', justifyContent: 'center' }}>
                <ReCAPTCHA
                  sitekey="6LcWgSorAAAAAEW5Bq4QS5qm51_kdG17t9sXvACe"
                  onChange={(value) => setRecaptchaValue(value)}
                />
              </div>

              <IonButton
                onClick={doLogin}
                expand="block"
                shape="round"
                style={{ marginTop: '20px' }}
              >
                Login
              </IonButton>

              {/* Google & GitHub OAuth Buttons */}
              
              <IonButton
                expand="block"
                shape="round"
                color="dark"
                style={{ marginTop: '5px' }}
                onClick={loginWithGithub}
              >
                Login with GitHub
              </IonButton>

              <IonButton
                routerLink="/it35-lab/register"
                expand="block"
                fill="clear"
                shape="round"
              >
                Don't have an account? Register
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

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
