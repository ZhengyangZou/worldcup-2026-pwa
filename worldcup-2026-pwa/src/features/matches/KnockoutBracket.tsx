const knockoutStages = ['32 强', '16 强', '8 强', '半决赛', '决赛']

export function KnockoutBracket() {
  return (
    <section className="card" id="淘汰赛">
      <div className="card-head">
        <div>
          <h2>淘汰赛对阵图</h2>
          <p>赛程确认后手动更新对阵</p>
        </div>
      </div>
      <div className="knockout-strip">
        <div className="knockout-grid">
          {knockoutStages.map((stage) => (
            <div className="ko-col" key={stage}>
              <h4>{stage}</h4>
              <div className="ko-game">
                <span>🇲🇽 A1 墨西哥</span>
                <b>vs</b>
                <span>🇲🇦 第三名 8</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
