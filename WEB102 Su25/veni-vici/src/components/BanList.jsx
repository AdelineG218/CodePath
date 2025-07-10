const BanList = ({bannedMonths, bannedYears, onUnban}) => {
    console.log("called BanList")
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <div>
            <h2>Ban List</h2>
            <div className="ban-buttons">
                {bannedMonths.map((m) => (
                    <button onClick={() => onUnban("months", m.toLocaleString('default', { month: 'long' }))}>{months[parseInt(m)-1]}</button>
                ))}
                {bannedYears.map((y) => (
                    <button onClick={() => onUnban("years", y)}>{y}</button>
                ))}
            </div>
        </div>
    );
};

export default BanList;