const API_BASE_URL = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'

export const register_me = async (formData) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        return await res.json()
    } catch (error) {
        console.error('Registration error:', error)
    }
}

export const login_me = async (formData) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        return await res.json()
    } catch (error) {
        console.error('Login error:', error)
    }
}

export const forget_password = async (formData) => {
    try {
        const res = await fetch(`${API_BASE_URL}/api/auth/forgetPassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        return await res.json()
    } catch (error) {
        console.error('Forgot password error:', error)
    }
}

