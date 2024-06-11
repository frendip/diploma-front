interface PanelProps {
    className?: string;
}
function Panel({className: externalStyles}: PanelProps) {
    return <div className={`${externalStyles} rounded-tr-lg bg-white/85`}>Panel</div>;
}

export default Panel;
