// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Возьмите эти ключи в настройках вашего проекта Supabase (Settings -> API)
const SUPABASE_URL = 'https://tppdvmbwccgfyxnleiep.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRwcGR2bWJ3Y2NnZnl4bmxlaWVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MTUwMTAsImV4cCI6MjEwNTQ5MTAxMH0._T1pt4zK8rkfJwN5AOC3xNx_V5QLUkjVeb0cHXGYfos';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);