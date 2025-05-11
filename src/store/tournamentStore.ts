import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface TournamentState {
  teams: any[];
  players: any[];
  payments: any[];
  loading: boolean;
  error: string | null;
  fetchTeams: () => Promise<void>;
  fetchTeamDetails: (teamId: string) => Promise<void>;
  createRegistration: (data: any) => Promise<void>;
  updateTeamStatus: (teamId: string, status: 'approved' | 'rejected') => Promise<void>;
}

export const useTournamentStore = create<TournamentState>((set) => ({
  teams: [],
  players: [],
  payments: [],
  loading: false,
  error: null,

  fetchTeams: async () => {
    set({ loading: true });
    try {
      const { data: teams, error } = await supabase
        .from('teams')
        .select(`
          *,
          players (*),
          payments (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ teams, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchTeamDetails: async (teamId: string) => {
    set({ loading: true });
    try {
      const { data: team, error } = await supabase
        .from('teams')
        .select(`
          *,
          players (*),
          payments (*)
        `)
        .eq('id', teamId)
        .single();

      if (error) throw error;
      set({ 
        players: team.players,
        payments: team.payments,
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createRegistration: async (data) => {
    set({ loading: true });
    try {
      // Insert team
      const { data: team, error: teamError } = await supabase
        .from('teams')
        .insert({
          name: data.teamName,
          type: data.tournamentType,
          logo_url: data.teamLogo,
          user_id: supabase.auth.getUser().then(res => res.data.user?.id)
        })
        .select()
        .single();

      if (teamError) throw teamError;

      // Insert players
      const playersData = data.players.map((player: any) => ({
        team_id: team.id,
        name: player.name,
        game_uid: player.uid
      }));

      const { error: playersError } = await supabase
        .from('players')
        .insert(playersData);

      if (playersError) throw playersError;

      // Insert payment
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          team_id: team.id,
          screenshot_url: data.paymentScreenshot,
          amount: data.tournamentType === 'solo' ? 10 : data.tournamentType === 'duo' ? 18 : 35
        });

      if (paymentError) throw paymentError;

      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateTeamStatus: async (teamId: string, status: 'approved' | 'rejected') => {
    set({ loading: true });
    try {
      const { error } = await supabase
        .from('teams')
        .update({ status })
        .eq('id', teamId);

      if (error) throw error;
      
      // Refresh teams list
      const { data: teams, error: fetchError } = await supabase
        .from('teams')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      
      set({ teams, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  }
}));