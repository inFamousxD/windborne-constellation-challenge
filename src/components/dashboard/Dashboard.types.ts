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

export interface WindGrid {
  header: {
    parameterNumberName: string;
    nx: number;
    ny: number;
    lo1: number;
    la1: number;
    dx: number;
    dy: number;
  };
  data: number[];
}

export interface WindData {
  u: WindGrid;
  v: WindGrid;
}

export interface DashboardProps {
  constellation: BalloonData[];
  loading: boolean;
  lastFetch: Date | null;
  onRefresh: () => void;
  windData: WindData | null;
  getWindAt: (lat: number, lng: number) => { u: number; v: number } | null;
}