import './DashBoard.scss';
import Languages from '../../../Header/Languages';
import { getDashboardOverview } from '../../../../services/apiServices';

import Dropdown from 'react-bootstrap/Dropdown';
import { CiSearch, CiBellOn, CiChat2, CiMenuFries } from 'react-icons/ci';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

const DashBoard = () => {
    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchDataOverview();
    }, []);

    const fetchDataOverview = async () => {
        let res = await getDashboardOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);
            // chart data
            let Qz = res?.DT?.others?.countQuiz ?? 0;
            let Qs = res?.DT?.others?.countQuestions ?? 0;
            let As = res?.DT?.others?.countAnswers ?? 0;

            const data = [
                {
                    name: 'Quizzes',
                    Qz: Qz,
                },
                {
                    name: 'Questions',
                    Qs: Qs,
                },
                {
                    name: 'Answers',
                    As: As,
                },
            ];
            setDataChart(data);
        }
    };

    console.log('dataOverview: ', dataOverview);

    const dataCard = [
        {
            title: 'Total users',
            number: dataOverview && dataOverview.users ? dataOverview.users.total : 'no data',
            percent: '+14%',
            time: 'Since last week',
        },
        {
            title: 'Total users',
            number: dataOverview && dataOverview.others ? dataOverview.others.countQuiz : 'no data',
            percent: '-12%',
            time: 'Since last week',
        },
        {
            title: 'Total Questions',
            number: dataOverview && dataOverview.others ? dataOverview.others.countQuestions : 'no data',
            percent: '-18%',
            time: 'Since last week',
        },
        {
            title: 'Total Answers',
            number: dataOverview && dataOverview.others ? dataOverview.others.countAnswers : 'no data',
            percent: '+27%',
            time: 'Since last week',
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
                                {dataCard.map((card, index) => {
                                    return (
                                        <div className="dashboard-card" key={index}>
                                            <h4 className="dashboard-card-title">{card.title}</h4>
                                            <div className="dashboard-card-number">{card.number}</div>
                                            <div className="dashboard-card-bottom">
                                                <div className="dashboard-card-bottom-left">{card.percent}</div>
                                                <div className="dashboard-card-bottom-right">{card.time}</div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="col-md-7">
                            <div className="dashboard-content-right">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={dataChart}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="Qz" fill="#8884d8" />
                                        <Bar dataKey="Qs" fill="#82ca9d" />
                                        <Bar dataKey="As" fill="#0dcaf0" />
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
