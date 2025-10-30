import { supabase } from './supabase'

export interface UserProfile {
  id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  location?: string;
  college?: string;
  graduation_year?: number;
  organizations?: string;
  email_signature?: string;
  companies_interested?: string;
  roles_interested?: string;
  profile_completed: boolean;
  avatar_url?: string;
  bio?: string;
  created_at: string;
  updated_at: string;
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

export async function createUserProfile(userId: string, profileData: Partial<UserProfile>) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .insert({
        id: userId,
        ...profileData
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
}

export async function checkProfileCompletion(userId: string): Promise<boolean> {
  try {
    const profile = await getUserProfile(userId);
    return profile?.profile_completed || false;
  } catch (error) {
    console.error('Error checking profile completion:', error);
    return false;
  }
}