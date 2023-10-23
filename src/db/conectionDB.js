import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://hrhlvwoabkxllmwtbcpq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhyaGx2d29hYmt4bGxtd3RiY3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc4MDU0NzQsImV4cCI6MjAxMzM4MTQ3NH0.chYKgIvBowDyNgt47-Pn4ixXlhepbVBDMxygxqgFE98'

const supabase = createClient(supabaseUrl,supabaseKey)

export default supabase;
