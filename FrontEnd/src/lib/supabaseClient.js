import { createClient } from "@supabase/supabase-js";

// Récupère les clés depuis tes variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Crée le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
