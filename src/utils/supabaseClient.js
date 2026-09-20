// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Возьмите эти ключи в настройках вашего проекта Supabase (Settings -> API)
const SUPABASE_URL = 'https://syrzcskzeketkjbvkyeg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cnpjc2t6ZWtldGtqYnZreWVnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MTY3MTcsImV4cCI6MjEwNTQ5MjcxN30.tj4pcyduYEWxx0TPo5PnKPKYb6heGrusNmH_8yID_wI';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);