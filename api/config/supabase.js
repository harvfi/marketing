import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder_service_role_key';

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn('⚠️  Using placeholder Supabase credentials. Configure real credentials in .env for full functionality.');
}

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
