const BASE_URL = "https://test-subskill.000webhostapp.com/test-subskill/index.php/api";

export const apiService = {
    getRandomImg: async () => {
        try {
            const response = await fetch(`https://some-random-api.ml/meme/`);
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    getJobs: async () => {
        try {
            const response = await fetch(`${BASE_URL}/get/jobs`);
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    getFilteredJobs: async (filters) => {
        const query = new URLSearchParams(filters).toString();
        const endpoint = `${BASE_URL}/get/jobs/filtered?${query}`;
        try {
            const response = await fetch(endpoint);
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    addJob: async (jobData) => {
        try {
            const response = await fetch(`${BASE_URL}/jobs/add`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(jobData)
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    register: async (userData) => {
        try {
            const response = await fetch(`${BASE_URL}/user/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    },

    login: async (loginData) => {
        try {
            const response = await fetch(`${BASE_URL}/user/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
            return await response.json();
        } catch (error) {
            throw error;
        }
    }, 

    logout: async () => {
        try {
            const response = await fetch(`${BASE_URL}/user/logout`, {
                method: 'POST', // ou GET selon ce que vous avez configuré côté serveur
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            throw error;
        }
    },

    deleteJob: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/jobs/delete/${id}`, {
                method: "DELETE"
            });
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la suppression du job:", error);
            throw error;
        }
    },

    updateJob: async (id, jobData) => {
        try {
            const response = await fetch(`${BASE_URL}/jobs/update/${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams(jobData)
            });
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du job:", error);
            throw error;
        }
    },


};
