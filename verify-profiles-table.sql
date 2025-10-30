-- Check if profiles table exists and see its structure
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- Check if there are any profiles in the table
SELECT COUNT(*) as profile_count FROM profiles;

-- Show all profiles (if any)
SELECT * FROM profiles;