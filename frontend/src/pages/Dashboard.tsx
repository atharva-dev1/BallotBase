import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import type { Poll } from '../types';

const Dashboard: React.FC = () => {
    const [polls, setPolls] = useState<Poll[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchPolls();
    }, []);

    const fetchPolls = async () => {
        try {
            const response = await api.get<Poll[]>('/polls');
            setPolls(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to fetch polls');
        } finally {
            setLoading(false);
        }
    };

    const handleVote = (pollId: string) => {
        navigate(`/poll/${pollId}`);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 animate-fade-in">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <div className="glass-card p-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gradient">BallotBase</h1>
                        <p className="text-white/70 mt-1">Welcome back, {user?.username}!</p>
                    </div>
                    <div className="flex gap-4">
                        {isAdmin && (
                            <button
                                onClick={() => navigate('/create-poll')}
                                className="btn-primary"
                            >
                                <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create Poll
                            </button>
                        )}
                        <button onClick={handleLogout} className="btn-secondary">
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Polls Grid */}
            <div className="max-w-7xl mx-auto">
                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl mb-6">
                        {error}
                    </div>
                )}

                {polls.length === 0 ? (
                    <div className="glass-card p-12 text-center">
                        <svg className="w-24 h-24 mx-auto mb-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <h2 className="text-2xl font-bold text-white/80 mb-2">No Polls Available</h2>
                        <p className="text-white/60">
                            {isAdmin ? 'Create your first poll to get started!' : 'Check back later for new polls.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {polls.map((poll) => {
                            const hasVoted = poll.votedUsers.includes(user?._id || '');
                            const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

                            return (
                                <div
                                    key={poll._id}
                                    className="glass-card p-6 card-hover cursor-pointer"
                                    onClick={() => handleVote(poll._id)}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-semibold text-white flex-1">{poll.question}</h3>
                                        {hasVoted && (
                                            <span className="bg-green-500/20 text-green-300 text-xs px-3 py-1 rounded-full border border-green-500/50">
                                                Voted
                                            </span>
                                        )}
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        {poll.options.map((option) => (
                                            <div key={option._id} className="bg-white/5 rounded-lg p-3">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-white/90 text-sm">{option.text}</span>
                                                    <span className="text-white/60 text-xs">{option.votes} votes</span>
                                                </div>
                                                <div className="w-full bg-white/10 rounded-full h-2">
                                                    <div
                                                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full transition-all duration-500"
                                                        style={{ width: `${totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center text-sm text-white/60">
                                        <span>{totalVotes} total votes</span>
                                        <span>{new Date(poll.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
