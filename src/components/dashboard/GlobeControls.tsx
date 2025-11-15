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
    altitudeScale: number;
    onAltitudeScaleChange: (value: number) => void;
    selectedHour: number;
    onSelectedHourChange: (value: number) => void;
    showAllHours: boolean;
    onShowAllHoursChange: (value: boolean) => void;
    selectedBalloonId: number | null;
    selectedBalloonData: BalloonPoint[]
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
    altitudeScale,
    onAltitudeScaleChange,
    selectedHour,
    onSelectedHourChange,
    showAllHours,
    onShowAllHoursChange,
    selectedBalloonId,
    selectedBalloonData
}) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div style={styles.controlsContainer(isExpanded)}>
            <div
                style={styles.controlsHeader(isExpanded)}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <h3 style={styles.controlsTitle}>
                    {isExpanded ? 'Globe Controls' : '⚙️'}
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
                        <div style={styles.colorControlLast}>
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

                    </div>
                    {
                        selectedBalloonId &&
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
                                Click anywhere on the Globe to reset the selection
                            </div>
                        </>
                    }
                </div>
            )}
        </div>
    );
};

export default GlobeControls;