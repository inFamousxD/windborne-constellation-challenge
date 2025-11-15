import type React from "react"
import { useRef, useEffect, useMemo, useState, useCallback } from "react"
import GlobeGL from "react-globe.gl"
import * as THREE from "three"
import type { BalloonData, BalloonPosition } from "./Dashboard.types"
import GlobeControls from "./GlobeControls"
import texture from '../../assets/8k_earth_nightmap.jpg';
import * as styles from "./Globe.styles"

interface GlobeProps {
    constellation: BalloonData[];
}

export interface BalloonPoint {
    id: number;
    lat: number;
    lng: number;
    alt: number;
}

interface PathPoint {
    lat: number;
    lng: number;
    alt: number;
}

interface ArcData {
    startLat: number;
    startLng: number;
    endLat: number;
    endLng: number;
    endAlt: number;
}

const Globe: React.FC<GlobeProps> = ({ constellation }) => {
    const globeEl = useRef<any>(null);
    const [selectedBalloonId, setSelectedBalloonId] = useState<number | null>(null);
    
    // Control states
    const [autoRotate, setAutoRotate] = useState(false);
    const [balloonColor, setBalloonColor] = useState('#0080c5');
    const [arcColor, setArcColor] = useState('#cc4700');
    const [pathColor, setPathColor] = useState('#00940a');
    const [altitudeScale, setAltitudeScale] = useState(500);
    const [selectedHour, setSelectedHour] = useState(0);
    const [showAllHours, setShowAllHours] = useState(false);
    const [selectedBalloonData, setSelectedBalloonData] = useState<BalloonPoint[]>([]);

    useEffect(() => {
        // Set auto-rotate based on state
        if (globeEl.current) {
            globeEl.current.controls().autoRotate = autoRotate;
            globeEl.current.controls().autoRotateSpeed = 0.5;
        }
    }, [autoRotate]);

    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const currentBalloons = useMemo<BalloonPoint[]>(() => {
        const hourToDisplay = showAllHours ? 0 : selectedHour;
        const hourData = constellation.find(d => d.hour === hourToDisplay);
        if (!hourData) return [];

        return hourData.data.map((position: BalloonPosition, index: number) => ({
            id: index,
            lat: position[0],
            lng: position[1],
            alt: position[2] / altitudeScale
        }));
    }, [constellation, selectedHour, showAllHours, altitudeScale]);

    const visibleBalloons = useMemo(() => {
        if (selectedBalloonId === null) {
            return currentBalloons;
        }
        const visBalloons =  currentBalloons.filter(b => b.id === selectedBalloonId);
        setSelectedBalloonData(visBalloons);
        return visBalloons;
    }, [currentBalloons, selectedBalloonId]);

    const balloonArcs = useMemo<ArcData[]>(() => {
        if (selectedBalloonId === null) {
            return currentBalloons.map(balloon => ({
                startLat: balloon.lat,
                startLng: balloon.lng,
                endLat: balloon.lat,
                endLng: balloon.lng,
                endAlt: balloon.alt
            }));
        }

        const arcs: ArcData[] = [];
        for (const snapshot of constellation) {
            const position = snapshot.data[selectedBalloonId];
            if (position) {
                arcs.push({
                    startLat: position[0],
                    startLng: position[1],
                    endLat: position[0],
                    endLng: position[1],
                    endAlt: position[2] / (altitudeScale * 1.2)
                });
            }
        }
        return arcs;
    }, [currentBalloons, constellation, selectedBalloonId, altitudeScale]);

    const trajectoryPath = useMemo<PathPoint[][] | null>(() => {
        if (selectedBalloonId === null && !showAllHours) return null;

        if (showAllHours && selectedBalloonId === null) {
            // Show all balloons' paths when showAllHours is enabled
            const allPaths: PathPoint[][] = [];
            const numBalloons = constellation[0]?.data.length || 0;
            
            for (let balloonId = 0; balloonId < numBalloons; balloonId++) {
                const pathPoints: PathPoint[] = [];
                const sortedConstellation = [...constellation].sort((a, b) => a.hour - b.hour);

                for (const snapshot of sortedConstellation) {
                    const position = snapshot.data[balloonId];
                    if (position) {
                        pathPoints.push({
                            lat: position[0],
                            lng: position[1],
                            alt: position[2] / altitudeScale
                        });
                    }
                }

                if (pathPoints.length > 0) {
                    allPaths.push(pathPoints);
                }
            }

            return allPaths.length > 0 ? allPaths : null;
        }

        if (selectedBalloonId !== null) {
            const pathPoints: PathPoint[] = [];
            const sortedConstellation = [...constellation].sort((a, b) => b.hour - a.hour);

            for (const snapshot of sortedConstellation) {
                const position = snapshot.data[selectedBalloonId];
                if (position) {
                    pathPoints.push({
                        lat: position[0],
                        lng: position[1],
                        alt: position[2] / altitudeScale
                    });
                }
            }

            return pathPoints.length > 0 ? [pathPoints] : null;
        }

        return null;
    }, [constellation, selectedBalloonId, showAllHours, altitudeScale]);

    const handleBalloonClick = useCallback((obj: object) => {
        const balloon = obj as BalloonPoint;
        setSelectedBalloonId(balloon.id);
    }, []);

    const handleGlobeClick = useCallback(() => {
        setSelectedBalloonId(null);
    }, []);

    const balloonObject = useCallback(() => {
        const geometry = new THREE.SphereGeometry(0.8, 16, 16);
        const color = new THREE.Color(balloonColor);
        const emissive = new THREE.Color(balloonColor).multiplyScalar(2);
        
        const material = new THREE.MeshLambertMaterial({
            color: color,
            emissive: emissive,
            emissiveIntensity: 5
        });
        return new THREE.Mesh(geometry, material);
    }, [balloonColor]);

    const getArcColor = useCallback(() => {
        return arcColor;
    }, [arcColor]);

    const getPathColor = useCallback(() => {
        return pathColor;
    }, [pathColor]);

    const getBalloonTooltip = useCallback((d: any) => {
        return `
            <div style="
                background: #111;
                border: 1px solid #222;
                border-radius: 10px;
                padding: 20px 24px;
                color: #e2e8f0;
                font-family: JetBrains Mono;
                backdrop-filter: blur(20px);
                min-width: 220px;
            ">
                <div style="
                    font-size: 17px;
                    font-weight: 600;
                    margin-bottom: 14px;
                    color: #0080c5ff;
                    border-bottom: 1px solid rgba(139, 92, 246, 0.2);
                    padding-bottom: 10px;
                    letter-spacing: 0.02em;
                ">
                    Balloon #${d.id}
                </div>
                <div style="font-size: 13px; line-height: 1.8;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #0080c5ff;">Latitude:</span>
                        <span style="font-weight: 600; color: #f1f5f9;">${d.lat.toFixed(4)}°</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                        <span style="color: #0080c5ff;">Longitude:</span>
                        <span style="font-weight: 600; color: #f1f5f9;">${d.lng.toFixed(4)}°</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #0080c5ff;">Altitude:</span>
                        <span style="font-weight: 600; color: #c084fc;">${(d.alt * altitudeScale).toFixed(1)} units</span>
                    </div>
                </div>
                <div style="
                    margin-top: 14px;
                    padding-top: 10px;
                    border-top: 1px solid rgba(139, 92, 246, 0.2);
                    font-size: 14px;
                    color: #0080c5ff;
                ">
                    Click to view trajectory
                </div>
            </div>
        `;
    }, [altitudeScale]);

    return (
        <>
            <div style={{...styles.controlsContainer(true), left: '20px', bottom: '20px', top: 'unset', minWidth: '60px', minHeight: '20px', height: '20px'}}>
                <div style={styles.controlsHeader(true)}>
                    <h3 style={styles.controlsTitle}>
                        <a style={{ color: "white", textDecoration: 'none' }} target="#" title="Source" href="https://github.com/inFamousxD/windborne-constellation-challenge">Source</a>
                    </h3>
                </div>
            </div>
            <GlobeControls
                autoRotate={autoRotate}
                onAutoRotateChange={setAutoRotate}
                balloonColor={balloonColor}
                onBalloonColorChange={setBalloonColor}
                arcColor={arcColor}
                onArcColorChange={setArcColor}
                pathColor={pathColor}
                onPathColorChange={setPathColor}
                altitudeScale={altitudeScale}
                onAltitudeScaleChange={setAltitudeScale}
                selectedHour={selectedHour}
                onSelectedHourChange={setSelectedHour}
                showAllHours={showAllHours}
                onShowAllHoursChange={setShowAllHours}
                selectedBalloonId={selectedBalloonId}
                selectedBalloonData={selectedBalloonData}
                constellationSize={constellation.length}
            />
            <GlobeGL
                ref={globeEl}
                globeImageUrl={texture}
                // globeImageUrl={'https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg'}
                backgroundColor="rgba(0,0,0,1)"
                width={dimensions.width}
                height={dimensions.height}

                // balloons
                objectsData={visibleBalloons}
                objectLat="lat"
                objectLng="lng"
                objectAltitude="alt"
                objectThreeObject={balloonObject}
                objectLabel={getBalloonTooltip}
                onObjectClick={handleBalloonClick}

                // normals
                arcsData={balloonArcs}
                arcStartLat="startLat"
                arcStartLng="startLng"
                arcEndLat="endLat"
                arcEndLng="endLng"
                arcAltitude="endAlt"
                arcAltitudeAutoScale={0}
                arcStroke={0.1}
                arcColor={getArcColor}
                arcDashLength={1}
                arcDashGap={0}

                // paths
                pathsData={trajectoryPath || []}
                pathPoints={(d: any) => d}
                pathPointLat={(p: any) => p.lat}
                pathPointLng={(p: any) => p.lng}
                pathPointAlt={(p: any) => p.alt}
                pathColor={getPathColor}
                pathStroke={3}
                pathDashLength={0.01}
                pathDashGap={0.005}
                pathDashAnimateTime={10000}

                // deselect
                onGlobeClick={handleGlobeClick}
            />
        </>
    )
}

export default Globe