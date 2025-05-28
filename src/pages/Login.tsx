import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonToast,
  useIonRouter
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import ReCAPTCHA from 'react-google-recaptcha';

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 10 * 60 * 1000; // 10 minutes

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

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState<number | null>(null);

  // Load lockUntil from localStorage on mount
  useEffect(() => {
    const storedLock = localStorage.getItem('lockUntil');
    if (storedLock) setLockUntil(Number(storedLock));
  }, []);

  // Save lockUntil to localStorage
  useEffect(() => {
    if (lockUntil) {
      localStorage.setItem('lockUntil', lockUntil.toString());
    } else {
      localStorage.removeItem('lockUntil');
    }
  }, [lockUntil]);

  const doLogin = async () => {
    const now = Date.now();

    // Lockout check
    if (lockUntil && now < lockUntil) {
      const remaining = Math.ceil((lockUntil - now) / 1000);
      setAlertMessage(`Too many failed attempts. Try again in ${remaining} seconds.`);
      setShowAlert(true);
      return;
    }

    if (!recaptchaValue) {
      setAlertMessage("Please complete the reCAPTCHA.");
      setShowAlert(true);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);

      if (attempts >= MAX_ATTEMPTS) {
        const lockTime = now + LOCKOUT_DURATION;
        setLockUntil(lockTime);
        setAlertMessage("Too many failed attempts. You are temporarily locked out for 10 minutes.");
      } else {
        setAlertMessage(`Login failed (${attempts}/${MAX_ATTEMPTS}). Please try again.`);
      }

      setShowAlert(true);
      return;
    }

    // Reset lockout on success
    setFailedAttempts(0);
    setLockUntil(null);
    setShowToast(true);

    setTimeout(() => {
      router.push('/it35-lab/app', 'forward', 'replace');
    }, 1000);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div style={{
          backgroundImage: 'https://4kwallpapers.com/images/wallpapers/totoro-minimalist-5120x2880-20906.png',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: -1
        }}></div>

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
            padding: '30px',
            borderRadius: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
          }}>
            <IonCardContent>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontWeight: 'bold', fontSize: '24px', color: '#fff', margin: 0 }}>USER LOGIN</h2>
                <p style={{ marginTop: '10px', fontSize: '14px', color: '#fff' }}>C NIGGAS ONLY!</p>
              </div>

              <IonInput
                style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', color: 'white', marginTop: '10px' }}
                label="Email"
                labelPlacement="floating"
                fill="outline"
                type="email"
                placeholder="Enter your institutional email"
                value={email}
                onIonChange={e => setEmail(e.detail.value ?? '')}
              />

              <IonInput
                style={{ marginTop: '15px', background: 'rgba(255,255,255,0.2)', borderRadius: '10px', color: 'white' }}
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

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '10px',
                fontSize: '14px',
                color: 'white'
              }}>
                <label>
                  <input type="checkbox" style={{ marginRight: '5px' }} />
                  Remember Me
                </label>
                <a href="#" style={{ color: '#ddd', textDecoration: 'underline' }}>Forgot Password</a>
              </div>

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
                style={{ marginTop: '20px', backgroundColor: '#fcbf49' }}
              >
                Sign In
              </IonButton>

              <div style={{ textAlign: 'center', marginTop: '15px', color: 'white', fontSize: '14px' }}>
                Or Sign In With —
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <IonButton
                  style={{ width: '48%', backgroundColor: '#4267B2' }}
                  onClick={async () => {
                    const { error } = await supabase.auth.signInWithOAuth({ provider: 'facebook' });
                    if (error) {
                      setAlertMessage(error.message);
                      setShowAlert(true);
                    }
                  }}
                >
                  Facebook
                </IonButton>

                <IonButton
                  style={{ width: '48%', backgroundColor: '#333' }}
                  onClick={async () => {
                    const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
                    if (error) {
                      setAlertMessage(error.message);
                      setShowAlert(true);
                    }
                  }}
                >
                  GitHub
                </IonButton>
              </div>

              <IonButton
                routerLink="/it35-lab/register"
                expand="block"
                fill="clear"
                shape="round"
                style={{ marginTop: '8px', color: 'white' }}
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
