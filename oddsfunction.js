const Odds = () => {
  const [prizeToCalRebate, setPrizeToCalRebate] = useState(99250);
  const [odds, setOdds] = useState(100000);
  const [prizeToCalFullOdds, setPrizeToCalFullOdds] = useState(1);
  const [prizeUnit, setPrizeUnit] = useState(1);

  
  const [activeGame, setActiveGame] = useState("5D");
  const [activeModule, setActiveModule] = useState("Two Sides");

  function calculateRebate() {
    let rebate = (+prizeToCalRebate * 100) / (+odds * 1) - 85;
    console.log(rebate);
    return rebate;
  }

  function calculateOdds() {
    let rebate = calculateRebate();

    const fullOdds = (prizeToCalFullOdds * 100) / (85 + rebate);

    return fullOdds;
  }

  const calculatePrizeUnit = () => prizeUnit / 2;

  const games = ["5D", "11 x 5", "Fast 3", "Mark 6", "3D", "PK 10", "Happy 8"];
  const modules = ["Standard", "Two Sides", "Many Tables"];
  return (
    <div className={styles.container}>
      <div>
        REBATE
        <br />
        <div>prize to calculate rebate</div>
        <input
          onChange={(e: any) => setPrizeToCalRebate(e.target.value)}
        />{" "}
        <br /> <br />
        <div>odds eg.100,000</div>
        
        <input onChange={(e: any) => setOdds(e.target.value)} />
        <br />
        <br />
        <div>prize to calculate full odds</div>
        <input onChange={(e: any) => setPrizeToCalFullOdds(e.target.value)} />
        <br />
        <br />
        {/* <button style={{ background: "red" }}>calculate rebate</button> */}
        <span>
          <h3>REBATE : </h3>
        </span>{" "}
        {calculateRebate()}
        <span>
          <h3>FULL ODDS : </h3>
        </span>{" "}
        {calculateOdds()}
        <br />
        <br />
        <br />
        <div>dividing prize to one unit</div>
        <input onChange={(e: any) => setPrizeUnit(e.target.value)} />
        <br />
        {calculatePrizeUnit()}
      </div>
      <div>
        <div>
          {games.map((item, i) => (
            <button
              key={i}
              style={{
                ...buttonStyles[0],
                backgroundColor: activeGame === item ? "orange" : "#4CAF50",
              }}
              onClick={() => setActiveGame(item)}
            >
              {item}
            </button>
          ))}
          <br />
          {modules.map((item, i) => (
            <button
              key={i}
              style={{
                ...buttonStyles[1],
                backgroundColor: activeModule === item ? "orange" : "#008CBA",
              }}
              onClick={() => setActiveModule(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className={styles.tableContainer}>
          <center>
            <h1>
              {activeGame} {activeModule} Odds Information
            </h1>
          </center>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Id</th>
                <th>Odds</th>
              </tr>
            </thead>
            <tbody>
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
