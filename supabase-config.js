window.supabaseClient = null;

const supabaseUrl = 'https://eiatiehxkwafxryqkcmk.supabase.co';
const supabasePublishableKey = 'sb_publishable__ZUOH1R8EmIxBDDnjJM8ZA_vPR4SPzq';

if (window.supabase && supabaseUrl && supabasePublishableKey) {
    window.supabaseClient = window.supabase.createClient(supabaseUrl, supabasePublishableKey);
}
