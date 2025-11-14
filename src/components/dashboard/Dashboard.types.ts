// [latitude, longitude, altitude]
export type BalloonPosition = [number, number, number];

export type ConstellationSnapshot = BalloonPosition[];

export interface BalloonData {
  hour: number;
  data: ConstellationSnapshot;
}

export interface ConstellationState {
  constellation: BalloonData[];
  loading: boolean;
  lastFetch: Date | null;
}

export interface DashboardProps {
  constellation: BalloonData[];
  loading: boolean;
  lastFetch: Date | null;
  onRefresh: () => void;
}