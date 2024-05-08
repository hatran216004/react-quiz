import './DashBoard.scss';
import Languages from '../../../Header/Languages';
import Dropdown from 'react-bootstrap/Dropdown';
import { CiSearch, CiBellOn, CiChat2, CiMenuFries } from 'react-icons/ci';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';

const DashBoard = () => {
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
        },
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="dashboard-header-inner">
                    <h3 className="dashboard-heading">DashBoard</h3>
                    <div className="dashboard-search">
                        <CiSearch className="dashboard-search-icon" />
                        <input type="text" className="dashboard-search-input" placeholder="Search..." />
                    </div>
                    <div className="dashboard-actions">
                        <CiBellOn className="dashboard-actions-icon" />
                        <CiChat2 className="dashboard-actions-icon" />
                        <Languages noMargin />
                        <Dropdown>
                            <Dropdown.Toggle variant="info" id="dropdown-basic">
                                <CiMenuFries />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </header>
            <section className="dashboard-content">
                <h3 className="dashboard-content-title">Analytics Dashboard</h3>
                <p className="dashboard-content-desc">Welcome back, Lucy! We've missed you 👋</p>
                <div className="dashboard-content-body">
                    <div className="row">
                        <div className="col-md-5">
                            <div className="dashboard-content-left">
                                <div className="dashboard-card">
                                    <h4 className="dashboard-card-title">Total users</h4>
                                    <div className="dashboard-card-number">24523</div>
                                    <div className="dashboard-card-bottom">
                                        <div className="dashboard-card-bottom-left">+14%</div>
                                        <div className="dashboard-card-bottom-right">Since last week</div>
                                    </div>
                                </div>
                                <div className="dashboard-card">
                                    <h4 className="dashboard-card-title">Total Quizzes</h4>
                                    <div className="dashboard-card-number">24523</div>
                                    <div className="dashboard-card-bottom">
                                        <div className="dashboard-card-bottom-left">+14%</div>
                                        <div className="dashboard-card-bottom-right">Since last week</div>
                                    </div>
                                </div>
                                <div className="dashboard-card">
                                    <h4 className="dashboard-card-title">Total Questions</h4>
                                    <div className="dashboard-card-number">24523</div>
                                    <div className="dashboard-card-bottom">
                                        <div className="dashboard-card-bottom-left">+14%</div>
                                        <div className="dashboard-card-bottom-right">Since last week</div>
                                    </div>
                                </div>
                                <div className="dashboard-card">
                                    <h4 className="dashboard-card-title">Total Answers</h4>
                                    <div className="dashboard-card-number">24523</div>
                                    <div className="dashboard-card-bottom">
                                        <div className="dashboard-card-bottom-left">+14%</div>
                                        <div className="dashboard-card-bottom-right">Since last week</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="dashboard-content-right">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="pv" fill="#8884d8" />
                                        <Bar dataKey="uv" fill="#82ca9d" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DashBoard;
