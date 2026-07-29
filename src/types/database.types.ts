/**
 * Placeholder hand-written types matching supabase/schema.sql.
 * Once the project is linked, replace this file by running:
 *   npx supabase gen types typescript --project-id <project-id> > src/types/database.types.ts
 */

export type UserRole = "admin" | "client";
export type ReservationStatus = "pendiente" | "confirmada" | "cancelada" | "completada";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          role: UserRole;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          phone?: string | null;
          role?: UserRole;
          created_at?: string;
        };
        Relationships: [];
      };
      rooms: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          capacity: number;
          price_per_night: number;
          total_units: number;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          capacity: number;
          price_per_night: number;
          total_units?: number;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          capacity?: number;
          price_per_night?: number;
          total_units?: number;
          image_url?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      reservations: {
        Row: {
          id: string;
          user_id: string;
          room_id: string;
          check_in: string;
          check_out: string;
          guests: number;
          status: ReservationStatus;
          total_price: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          room_id: string;
          check_in: string;
          check_out: string;
          guests: number;
          status?: ReservationStatus;
          total_price: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          room_id?: string;
          check_in?: string;
          check_out?: string;
          guests?: number;
          status?: ReservationStatus;
          total_price?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reservations_room_id_fkey";
            columns: ["room_id"];
            isOneToOne: false;
            referencedRelation: "rooms";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reservations_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
}
