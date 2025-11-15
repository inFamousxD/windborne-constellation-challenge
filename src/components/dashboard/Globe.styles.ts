import type { CSSProperties } from "react";

export const controlsContainer = (isExpanded: boolean): CSSProperties => ({
    position: 'fixed',
    top: '20px',
    left: '20px',
    background: '#111',
    border: '1px solid #222',
    borderRadius: '10px',
    padding: isExpanded ? '24px' : '12px',
    color: '#aaa',
    fontFamily: 'JetBrains Mono, monospace',
    backdropFilter: 'blur(20px)',
    minWidth: isExpanded ? '300px' : 'auto',
    zIndex: 1000,
    transition: 'all 0.3s ease',
});

export const controlsHeader = (isExpanded: boolean): CSSProperties => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: isExpanded ? '20px' : '0',
    cursor: 'pointer',
});

export const controlsTitle = {
    margin: 0,
    fontSize: '15px',
    color: '#0080c5ff',
    fontWeight: 600,
    letterSpacing: '0.02em',
};

export const collapseIcon = (isExpanded: boolean): CSSProperties => ({
    fontSize: '12px',
    color: '#0080c5ff',
    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.3s ease',
    opacity: 0.7,
});

export const controlsContent: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
};

export const checkboxLabel: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontSize: '13px',
    color: '#cbd5e1',
};

export const checkbox = {
    marginRight: '10px',
    cursor: 'pointer',
    accentColor: '#0080c5ff',
};

export const sliderLabel = {
    fontSize: '13px',
    display: 'block',
    marginBottom: '10px',
    color: '#cbd5e1',
    fontWeight: 500,
};

export const slider = {
    width: '100%',
    cursor: 'pointer',
    accentColor: '#0080c5ff',
};

export const disabledSlider = {
    width: '100%',
    cursor: 'not-allowed',
    accentColor: '#0080c5ff',
    opacity: 0.4,
};

export const sliderScale = {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '10px',
    color: '#94a3b8',
    marginTop: '6px',
};

export const colorSection = {
    borderTop: '1px solid #0080c5ff',
    paddingTop: '16px',
    marginTop: '4px',
};

export const colorSectionTitle = {
    margin: '0 0 14px 0',
    fontSize: '13px',
    color: '#0080c5ff',
    fontWeight: 600,
    letterSpacing: '0.02em',
};

export const colorControl = {
    marginBottom: '14px',
};

export const colorControlLast = {
    marginBottom: '0',
};

export const colorLabel = {
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#cbd5e1',
};

export const colorLabelText = {
    minWidth: '70px',
};

export const colorPicker = {
    width: '42px',
    height: '26px',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    border: 'none',
};

export const colorValue = {
    fontSize: '11px',
    color: '#94a3b8',
};

export const tooltipContainer = {
    background: 'linear-gradient(135deg, rgba(15, 10, 30, 0.98) 0%, rgba(25, 15, 45, 0.98) 100%)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
    borderRadius: '16px',
    padding: '20px 24px',
    color: '#e2e8f0',
    fontFamily: 'JetBrains Mono',
    boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2), 0 0 80px rgba(139, 92, 246, 0.08)',
    backdropFilter: 'blur(20px)',
    minWidth: '220px',
};

export const tooltipHeader = {
    fontSize: '17px',
    fontWeight: 600,
    marginBottom: '14px',
    color: '#a78bfa',
    borderBottom: '1px solid rgba(139, 92, 246, 0.2)',
    paddingBottom: '10px',
    letterSpacing: '0.02em',
};

export const tooltipContent = {
    fontSize: '13px',
    lineHeight: 1.8,
};

export const tooltipRow = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
};

export const tooltipRowLast = {
    display: 'flex',
    justifyContent: 'space-between',
};

export const tooltipLabel = {
    color: '#94a3b8',
};

export const tooltipValue = {
    fontWeight: 600,
    color: '#f1f5f9',
};

export const tooltipAltitudeValue = {
    fontWeight: 600,
    color: '#c084fc',
};

export const tooltipFooter = {
    marginTop: '14px',
    paddingTop: '10px',
    borderTop: '1px solid rgba(139, 92, 246, 0.2)',
    fontSize: '11px',
    color: '#94a3b8',
    textAlign: 'center' as const,
};