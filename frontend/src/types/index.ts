export interface User {
    _id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    email: string;
    password: string;
}

export interface PollOption {
    _id: string;
    text: string;
    votes: number;
}

export interface Poll {
    _id: string;
    question: string;
    options: PollOption[];
    createdBy: string;
    createdAt: string;
    votedUsers: string[];
    isActive: boolean;
}

export interface CreatePollData {
    question: string;
    options: string[];
}

export interface VoteData {
    optionId: string;
}

export interface ApiError {
    message: string;
    errors?: Record<string, string>;
}
