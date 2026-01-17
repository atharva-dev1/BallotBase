import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import api from '../utils/api';
import type { Poll } from '../types';
import { useAuth } from '../context/AuthContext';

const PollDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [poll, setPoll] = useState<Poll | null>(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [loading, setLoading] = useState(true);
    const [voting, setVoting] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPoll();
    }, [id]);

    const fetchPoll = async () => {
        try {
            const response = await api.get<Poll>(`/polls/${id}`);
            setPoll(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch poll');
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async () => {
        if (!selectedOption) {
            setError('Please select an option');
            return;
        }

        setVoting(true);
        setError('');

        try {
            await api.post(`/polls/${id}/vote`, { optionId: selectedOption });
            await fetchPoll();
            setSelectedOption('');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to submit vote');
        } finally {
            setVoting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!poll) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="glass-card p-8 text-center">
                    <h2 className="text-2xl font-bold text-white/80 mb-4">Poll Not Found</h2>
                    <button onClick={() => navigate('/dashboard')} className="btn-primary">
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    const hasVoted = poll.votedUsers.includes(user?._id || '');
    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

    const chartData = poll.options.map(option => ({
        name: option.text,
        votes: option.votes,
        percentage: totalVotes > 0 ? ((option.votes / totalVotes) * 100).toFixed(1) : 0,
    }));

    const COLORS = ['#0ea5e9', '#d946ef', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

    return (
        <div className="min-h-screen p-6 animate-fade-in">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="btn-secondary mb-6"
                >
                    <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Dashboard
                </button>

                <div className="glass-card p-8 mb-6 animate-slide-up">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white mb-2">{poll.question}</h1>
                            <p className="text-white/60">
                                Created on {new Date(poll.createdAt).toLocaleDateString()} • {totalVotes} total votes
                            </p>
                        </div>
                        {hasVoted && (
                            <span className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full border border-green-500/50 font-semibold">
                                ✓ You Voted
                            </span>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6">
                            {error}
                        </div>
                    )}

                    {!hasVoted ? (
                        <div className="space-y-3 mb-6">
                            <h3 className="text-lg font-semibold text-white/90 mb-3">Cast Your Vote</h3>
                            {poll.options.map((option) => (
                                <label
                                    key={option._id}
                                    className={`block cursor-pointer transition-all duration-200 ${selectedOption === option._id
                                        ? 'bg-primary-500/30 border-primary-500'
                                        : 'bg-white/5 border-white/20 hover:bg-white/10'
                                        } border-2 rounded-xl p-4`}
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="radio"
                                            name="poll-option"
                                            value={option._id}
                                            checked={selectedOption === option._id}
                                            onChange={(e) => setSelectedOption(e.target.value)}
                                            className="w-5 h-5 text-primary-500 focus:ring-primary-500 focus:ring-2"
                                        />
                                        <span className="ml-3 text-white font-medium">{option.text}</span>
                                    </div>
                                </label>
                            ))}
                            <button
                                onClick={handleVote}
                                disabled={voting || !selectedOption}
                                className="btn-primary w-full mt-4"
                            >
                                {voting ? 'Submitting...' : 'Submit Vote'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-white/90 mb-3">Results</h3>
                            {poll.options.map((option) => {
                                const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                                return (
                                    <div key={option._id} className="bg-white/5 rounded-xl p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-white font-medium">{option.text}</span>
                                            <span className="text-white/70 text-sm">
                                                {option.votes} votes ({percentage.toFixed(1)}%)
                                            </span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-3">
                                            <div
                                                className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all duration-700 animate-glow"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Chart Visualization */}
                {hasVoted && totalVotes > 0 && (
                    <div className="glass-card p-8 animate-slide-up">
                        <h2 className="text-2xl font-bold text-white mb-6">Visual Results</h2>
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis
                                    dataKey="name"
                                    stroke="rgba(255,255,255,0.7)"
                                    tick={{ fill: 'rgba(255,255,255,0.7)' }}
                                />
                                <YAxis
                                    stroke="rgba(255,255,255,0.7)"
                                    tick={{ fill: 'rgba(255,255,255,0.7)' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(0,0,0,0.8)',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        borderRadius: '12px',
                                        color: 'white',
                                    }}
                                    formatter={(value: any, _name: string | undefined, props: any) => [
                                        `${value} votes (${props.payload.percentage}%)`,
                                        'Votes'
                                    ]}
                                />
                                <Bar dataKey="votes" radius={[8, 8, 0, 0]}>
                                    {chartData.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PollDetails;
