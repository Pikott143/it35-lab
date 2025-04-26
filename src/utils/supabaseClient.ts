import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dvboixvgiwlchydojqnr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR2Ym9peHZnaXdsY2h5ZG9qcW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzODA1MDIsImV4cCI6MjA2MDk1NjUwMn0.eKVNqiaThk1CyphFQFOoEofXcv8Erj5Jr_im4JY4Sfk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
