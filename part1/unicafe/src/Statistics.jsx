import StatisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const average = (good * 1 + neutral * 0 + bad * -1) / all
    const positive = good / all * 100

    return (
        <>
            <h2>statistics</h2>
            {all === 0 && <div>No feedback given</div>}
            {all > 0 && (
                <>

                    <table>
                        <tbody>
                            <tr>
                                <StatisticLine text="good" value={good} />
                            </tr>
                            <tr>
                                <StatisticLine text="neutral" value={neutral} />
                            </tr>
                            <tr>
                                <StatisticLine text="bad" value={bad} />
                            </tr>
                            <tr>
                                <StatisticLine text="all" value={all} />
                            </tr>
                            <tr>
                                <StatisticLine text="average" value={average} />
                            </tr>
                            <tr>
                                <StatisticLine text="positive" value={`${positive} %`} />
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </>
    )
}

export default Statistics
