// Configuration publique Supabase — la publishable key peut être utilisée côté navigateur.
// Ne jamais mettre une clé secrète/service_role dans un fichier publié.
const SUPABASE_URL = "https://hcxtuqgjoyaduqmmmnte.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_pqevJMjagbbDBL6uzwyZyg_kUSEEKvw";

const { createClient } = supabase;
window.forgeSupabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
