import type { CSSProperties } from "react";

export const controlsContainer = (isExpanded: boolean): CSSProperties => ({
    position: 'fixed',
    top: '20px',
    left: '20px',
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
    border: '2px solid #00d9ff',
    borderRadius: '12px',
    padding: isExpanded ? '20px' : '12px',
    color: '#e0e6ed',
    fontFamily: 'JetBrains Mono, monospace',
    boxShadow: '0 8px 32px rgba(0, 217, 255, 0.3), 0 0 60px rgba(0, 217, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    minWidth: isExpanded ? '280px' : 'auto',
    zIndex: 1000,
    transition: 'all 0.3s ease',
});

export const controlsHeader = (isExpanded: boolean): CSSProperties => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isExpanded ? '16px' : '0',
    cursor: 'pointer',
});

export const controlsTitle: CSSProperties = {
    margin: 0,
    fontSize: '16px',
    color: '#00d9ff',
    textShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
};

export const collapseIcon = (isExpanded: boolean): CSSProperties => ({
    fontSize: '12px',
    color: '#7dd3fc',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease',
});

export const controlsContent: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
};

export const checkboxLabel: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '13px',
};

export const checkbox: CSSProperties = {
    marginRight: '8px',
    cursor: 'pointer',
    accentColor: '#00d9ff',
};

export const sliderLabel: CSSProperties = {
    fontSize: '13px',
    display: 'block',
    marginBottom: '8px',
};

export const slider: CSSProperties = {
    width: '100%',
    cursor: 'pointer',
    accentColor: '#00d9ff',
};

export const disabledSlider: CSSProperties = {
    width: '100%',
    cursor: 'not-allowed',
    accentColor: '#00d9ff',
    opacity: 0.5,
};

export const sliderScale: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '10px',
    color: '#7dd3fc',
    marginTop: '4px',
};

export const colorSection: CSSProperties = {
    borderTop: '1px solid rgba(0, 217, 255, 0.3)',
    paddingTop: '12px',
};

export const colorSectionTitle: CSSProperties = {
    margin: '0 0 12px 0',
    fontSize: '14px',
    color: '#7dd3fc',
};

export const colorControl: CSSProperties = {
    marginBottom: '12px',
};

export const colorControlLast: CSSProperties = {
    marginBottom: '0',
};

export const colorLabel: CSSProperties = {
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
};

export const colorLabelText: CSSProperties = {
    minWidth: '70px',
};

export const colorPicker: CSSProperties = {
    width: '40px',
    height: '24px',
    cursor: 'pointer',
    border: '1px solid #00d9ff',
    borderRadius: '4px',
};

export const colorValue: CSSProperties = {
    fontSize: '11px',
    color: '#7dd3fc',
};

export const tooltipContainer: CSSProperties = {
    background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 100%)',
    border: '2px solid #00d9ff',
    borderRadius: '12px',
    padding: '16px 20px',
    color: '#e0e6ed',
    fontFamily: 'JetBrains Mono',
    boxShadow: '0 8px 32px rgba(0, 217, 255, 0.3), 0 0 60px rgba(0, 217, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    minWidth: '200px',
};

export const tooltipHeader: CSSProperties = {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '12px',
    color: '#00d9ff',
    borderBottom: '1px solid rgba(0, 217, 255, 0.3)',
    paddingBottom: '8px',
    textShadow: '0 0 10px rgba(0, 217, 255, 0.5)',
};

export const tooltipContent: CSSProperties = {
    fontSize: '14px',
    lineHeight: 1.8,
};

export const tooltipRow: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '6px',
};

export const tooltipRowLast: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
};

export const tooltipLabel: CSSProperties = {
    color: '#7dd3fc',
};

export const tooltipValue: CSSProperties = {
    fontWeight: 600,
    color: '#fafafa',
};

export const tooltipAltitudeValue: CSSProperties = {
    fontWeight: 600,
    color: '#fbbf24',
};

export const tooltipFooter: CSSProperties = {
    marginTop: '12px',
    paddingTop: '8px',
    borderTop: '1px solid rgba(0, 217, 255, 0.3)',
    fontSize: '11px',
    color: '#7dd3fc',
    textAlign: 'center' as const,
};