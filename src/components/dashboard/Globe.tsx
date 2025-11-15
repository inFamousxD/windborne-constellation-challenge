import type React from "react"
import { useRef, useEffect, useMemo, useState, useCallback } from "react"
import GlobeGL from "react-globe.gl"
import * as THREE from "three"
import type { BalloonData, BalloonPosition } from "./Dashboard.types"
import GlobeControls from "./GlobeControls"

interface GlobeProps {
    constellation: BalloonData[];
}

interface BalloonPoint {
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
    const [balloonColor, setBalloonColor] = useState('#00d9ff');
    const [arcColor, setArcColor] = useState('#006bae');
    const [pathColor, setPathColor] = useState('#7effc5');
    const [altitudeScale, setAltitudeScale] = useState(500);
    const [selectedHour, setSelectedHour] = useState(0);
    const [showAllHours, setShowAllHours] = useState(false);

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
        return currentBalloons.filter(b => b.id === selectedBalloonId);
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
        const geometry = new THREE.SphereGeometry(0.5, 16, 16);
        const color = new THREE.Color(balloonColor);
        const emissive = new THREE.Color(balloonColor).multiplyScalar(0.7);
        
        const material = new THREE.MeshLambertMaterial({
            color: color,
            emissive: emissive,
            emissiveIntensity: 0.3
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
                background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%);
                border: 2px solid #00d9ff;
                border-radius: 12px;
                padding: 16px 20px;
                color: #e0e6ed;
                font-family: JetBrains Mono;
                box-shadow: 0 8px 32px rgba(0, 217, 255, 0.3), 0 0 60px rgba(0, 217, 255, 0.1);
                backdrop-filter: blur(10px);
                min-width: 200px;
            ">
                <div style="
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 12px;
                    color: #00d9ff;
                    border-bottom: 1px solid rgba(0, 217, 255, 0.3);
                    padding-bottom: 8px;
                    text-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
                ">
                    Balloon #${d.id}
                </div>
                <div style="font-size: 14px; line-height: 1.8;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                        <span style="color: #7dd3fc;">Latitude:</span>
                        <span style="font-weight: 600; color: #fafafa;">${d.lat.toFixed(4)}°</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                        <span style="color: #7dd3fc;">Longitude:</span>
                        <span style="font-weight: 600; color: #fafafa;">${d.lng.toFixed(4)}°</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                        <span style="color: #7dd3fc;">Altitude:</span>
                        <span style="font-weight: 600; color: #fbbf24;">${(d.alt * altitudeScale).toFixed(1)} units</span>
                    </div>
                </div>
                <div style="
                    margin-top: 12px;
                    padding-top: 8px;
                    border-top: 1px solid rgba(0, 217, 255, 0.3);
                    font-size: 11px;
                    color: #7dd3fc;
                    text-align: center;
                ">
                    Click to view trajectory
                </div>
            </div>
        `;
    }, [altitudeScale]);

    return (
        <>
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
            />
            <GlobeGL
                ref={globeEl}
                globeImageUrl="https://unpkg.com/three-globe@2.31.1/example/img/earth-night.jpg"
                bumpImageUrl="https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png"
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
                pathStroke={1}
                pathDashLength={0.05}
                pathDashGap={0.01}
                pathDashAnimateTime={10000}

                // deselect
                onGlobeClick={handleGlobeClick}
            />
        </>
    )
}

export default Globe