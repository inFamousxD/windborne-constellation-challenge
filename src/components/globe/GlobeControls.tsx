import type React from "react"
import { useState } from "react"
import * as styles from "./Globe.styles"
import type { BalloonPoint } from "./Globe";

interface GlobeControlsProps {
    autoRotate: boolean;
    onAutoRotateChange: (value: boolean) => void;
    balloonColor: string;
    onBalloonColorChange: (value: string) => void;
    arcColor: string;
    onArcColorChange: (value: string) => void;
    pathColor: string;
    onPathColorChange: (value: string) => void;
    windColor: string;
    onWindColorChange: (value: string) => void;
    altitudeScale: number;
    onAltitudeScaleChange: (value: number) => void;
    selectedHour: number;
    onSelectedHourChange: (value: number) => void;
    showAllHours: boolean;
    onShowAllHoursChange: (value: boolean) => void;
    showWindVectors: boolean;
    onShowWindVectorsChange: (value: boolean) => void;
    windVectorScale: number;
    onWindVectorScaleChange: (value: number) => void;
    selectedBalloonId: number | null;
    selectedBalloonData: BalloonPoint[];
    constellationSize: number;
    hasWindData: boolean;
}

const GlobeControls: React.FC<GlobeControlsProps> = ({
    autoRotate,
    onAutoRotateChange,
    balloonColor,
    onBalloonColorChange,
    arcColor,
    onArcColorChange,
    pathColor,
    onPathColorChange,
    windColor,
    onWindColorChange,
    altitudeScale,
    onAltitudeScaleChange,
    selectedHour,
    onSelectedHourChange,
    showAllHours,
    onShowAllHoursChange,
    showWindVectors,
    onShowWindVectorsChange,
    windVectorScale,
    onWindVectorScaleChange,
    selectedBalloonId,
    selectedBalloonData,
    constellationSize,
    hasWindData
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div style={styles.controlsContainer(isExpanded)}>
            <div
                style={styles.controlsHeader(isExpanded)}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h3 style={styles.controlsTitle}>
                    {isExpanded ? 'Globe Controls' : ''}
                </h3>
                <span style={styles.collapseIcon(isExpanded)}>
                    ▼
                </span>
            </div>

            {isExpanded && (
                <div style={styles.controlsContent}>
                    {/* Auto-Rotate Toggle */}
                    <div>
                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={autoRotate}
                                onChange={(e) => onAutoRotateChange(e.target.checked)}
                                style={styles.checkbox}
                            />
                            <span>Auto-Rotate Globe</span>
                        </label>
                    </div>

                    {/* Altitude Scale Slider */}
                    <div>
                        <label style={styles.sliderLabel}>
                            Altitude Scale: {altitudeScale}x
                        </label>
                        <input
                            type="range"
                            min="100"
                            max="1000"
                            step="50"
                            value={altitudeScale}
                            onChange={(e) => onAltitudeScaleChange(Number(e.target.value))}
                            style={styles.slider}
                        />
                        <div style={styles.sliderScale}>
                            <span>100</span>
                            <span>1000</span>
                        </div>
                    </div>

                    {/* hr select */}
                    <div>
                        <label style={styles.sliderLabel}>
                            Display Hour: {selectedHour}
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="23"
                            step="1"
                            value={selectedHour}
                            onChange={(e) => onSelectedHourChange(Number(e.target.value))}
                            disabled={showAllHours}
                            style={showAllHours ? styles.disabledSlider : styles.slider}
                        />
                        <div style={styles.sliderScale}>
                            <span>00</span>
                            <span>23</span>
                        </div>
                    </div>

                    {/* all hrs */}
                    <div>
                        <label style={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={showAllHours}
                                onChange={(e) => onShowAllHoursChange(e.target.checked)}
                                style={styles.checkbox}
                            />
                            <span>Show All Hours (Intensive)</span>
                        </label>
                    </div>

                    {/* Wind visualization controls */}
                    {hasWindData && (
                        <>
                            <div style={styles.colorSection}>
                                <h4 style={styles.colorSectionTitle}>
                                    Wind Visualization
                                </h4>

                                {/* Show wind vectors toggle */}
                                <div style={styles.colorControl}>
                                    <label style={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={showWindVectors}
                                            onChange={(e) => onShowWindVectorsChange(e.target.checked)}
                                            style={styles.checkbox}
                                        />
                                        <span>Show Wind Vectors</span>
                                    </label>
                                </div>

                                {/* Wind vector scale */}
                                <div style={styles.colorControl}>
                                    <label style={styles.sliderLabel}>
                                        Vector Scale: {windVectorScale.toFixed(1)}x
                                    </label>
                                    <input
                                        type="range"
                                        min="0.1"
                                        max="5.0"
                                        step="0.1"
                                        value={windVectorScale}
                                        onChange={(e) => onWindVectorScaleChange(Number(e.target.value))}
                                        disabled={!showWindVectors}
                                        style={!showWindVectors ? styles.disabledSlider : styles.slider}
                                    />
                                    <div style={styles.sliderScale}>
                                        <span>0.1</span>
                                        <span>5.0</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ fontSize: '10px' }}>
                                Wind data is currently STATIC (Nov 15th, 2025, 00 GMT) <br />
                                Downloaded .grib from NOAA NOMADS API <br />
                                Currently STATIC as it needs grib2json utility <br />
                                which will need a backend to process, cache, and convert.
                            </div> 
                        </>
                    )}

                    {
                        selectedBalloonId !== null ?
                        <>
                            <div style={styles.colorSection}>
                                <div style={styles.controlsTitle}>
                                    Selected Balloon: #{selectedBalloonId}
                                </div>
                                <div style={styles.colorControlLast}>
                                    <br />
                                    <label style={styles.colorLabel}>
                                        <span style={styles.colorLabelText}>Lat: </span>
                                        <span style={styles.colorValue}>{ selectedBalloonData[0].lat }</span>
                                    </label>
                                    <br />
                                    <label style={styles.colorLabel}>
                                        <span style={styles.colorLabelText}>Lon: </span>
                                        <span style={styles.colorValue}>{ selectedBalloonData[0].lng }</span>
                                    </label>
                                    <br />
                                    <label style={styles.colorLabel}>
                                        <span style={styles.colorLabelText}>Alt: </span>
                                        <span style={styles.colorValue}>{ selectedBalloonData[0].alt }</span>
                                    </label>
                                </div>
                            </div>
                            <div style={styles.colorSectionTitle}>
                                Click anywhere on the Globe to reset
                            </div>
                        </> :
                        <div style={{ ...styles.colorSection}}>
                            <div style={{...styles.colorSectionTitle, color: 'purple'}}>
                                <strong>Click on a Balloon to show its 24-hour path</strong>
                            </div>
                        </div>
                    }
                    {
                        constellationSize === 0 &&
                        <>
                            <div style={{ ...styles.colorSectionTitle, color: 'red' }}>
                                Data could not be fetched. The server might be down.
                                <br />
                                Please try again later. (or Refresh!)
                            </div>
                        </>
                    }
                    {
                        !hasWindData &&
                        <>
                            <div style={{ ...styles.colorSectionTitle, color: 'orange' }}>
                                Wind data not loaded.
                            </div>
                        </>
                    }

                    {/* color controls */}
                    <div style={styles.colorSection}>
                        <h4 style={styles.colorSectionTitle}>
                            Colors
                        </h4>

                        {/* balloon color */}
                        <div style={styles.colorControl}>
                            <label style={styles.colorLabel}>
                                <span style={styles.colorLabelText}>Balloon:</span>
                                <input
                                    type="color"
                                    value={balloonColor}
                                    onChange={(e) => onBalloonColorChange(e.target.value)}
                                    style={styles.colorPicker}
                                />
                                <span style={styles.colorValue}>{balloonColor}</span>
                            </label>
                        </div>

                        {/* arc color */}
                        <div style={styles.colorControl}>
                            <label style={styles.colorLabel}>
                                <span style={styles.colorLabelText}>Arc:</span>
                                <input
                                    type="color"
                                    value={arcColor}
                                    onChange={(e) => onArcColorChange(e.target.value)}
                                    style={styles.colorPicker}
                                />
                                <span style={styles.colorValue}>{arcColor}</span>
                            </label>
                        </div>

                        {/* path color */}
                        <div style={styles.colorControl}>
                            <label style={styles.colorLabel}>
                                <span style={styles.colorLabelText}>Path:</span>
                                <input
                                    type="color"
                                    value={pathColor}
                                    onChange={(e) => onPathColorChange(e.target.value)}
                                    style={styles.colorPicker}
                                />
                                <span style={styles.colorValue}>{pathColor}</span>
                            </label>
                        </div>

                        {/* wind color */}
                        {hasWindData && (
                            <div style={styles.colorControlLast}>
                                <label style={styles.colorLabel}>
                                    <span style={styles.colorLabelText}>Wind:</span>
                                    <input
                                        type="color"
                                        value={windColor}
                                        onChange={(e) => onWindColorChange(e.target.value)}
                                        style={styles.colorPicker}
                                    />
                                    <span style={styles.colorValue}>{windColor}</span>
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default GlobeControls;