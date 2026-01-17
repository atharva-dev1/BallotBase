import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        // Redirect if already logged in
        if (user) {
            navigate('/dashboard');
        }

        // Trigger animations
        setIsVisible(true);
    }, [user, navigate]);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
                {/* Logo/Title Section */}
                <div className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
                    <div className="mb-6 inline-block">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 blur-2xl opacity-50 animate-pulse"></div>
                            <svg className="w-24 h-24 mx-auto relative" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold mb-4">
                        <span className="text-gradient">BallotBase</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
                        Create polls, gather opinions, and visualize results in real-time
                    </p>
                </div>

                {/* Features Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-5xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    {/* Feature 1 */}
                    <div className="glass-card p-6 card-hover group">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Secure Authentication</h3>
                        <p className="text-white/70">JWT-based authentication with encrypted passwords</p>
                    </div>

                    {/* Feature 2 */}
                    <div className="glass-card p-6 card-hover group">
                        <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Real-Time Results</h3>
                        <p className="text-white/70">Watch votes update live with beautiful charts</p>
                    </div>

                    {/* Feature 3 */}
                    <div className="glass-card p-6 card-hover group">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Role-Based Access</h3>
                        <p className="text-white/70">Admin and user roles with different permissions</p>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <button
                        onClick={() => navigate('/register')}
                        className="btn-primary text-lg px-8 py-4 group"
                    >
                        <span className="flex items-center gap-2">
                            Get Started
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </button>

                    <button
                        onClick={() => navigate('/login')}
                        className="btn-secondary text-lg px-8 py-4"
                    >
                        Sign In
                    </button>
                </div>

                {/* Stats Section */}
                <div className={`mt-16 grid grid-cols-3 gap-8 max-w-3xl transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-gradient mb-2">100%</div>
                        <div className="text-white/60 text-sm">Secure</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-gradient mb-2">Real-Time</div>
                        <div className="text-white/60 text-sm">Updates</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-bold text-gradient mb-2">Free</div>
                        <div className="text-white/60 text-sm">Forever</div>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-10 right-10 opacity-20">
                <div className="w-20 h-20 border-4 border-primary-500 rounded-full animate-ping"></div>
            </div>
            <div className="absolute bottom-10 left-10 opacity-20">
                <div className="w-16 h-16 border-4 border-accent-500 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export default LandingPage;
