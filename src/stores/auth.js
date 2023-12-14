import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, register, logout, getUser } from "../http/auth-api";

export const useAuthStore = defineStore('authStore', () => {
    const user = ref(null)
    const errors = ref({})

    const isLoggedIn = computed(() => !!user.value)

    const fetchUser = async () => {
        try{
            const { data } = await getUser()
            user.value = data
        }catch (error){
            user.value = null
        }
    }

    const handleLogin = async (credentials) => {
        //await csrfCookie()
        try{
            const custom = await login(credentials)
            errors.value = {}
            console.log(custom);
        }catch(error){
            if(error.response && error.response.status === 400){
                errors.value = error.response.data.errors;
            }else if(error.response.status === 401){
                errors.value = ['Invalid login details!']
            }
        }
        //await fetchUser()
    }

    const handleRegister = async (newUser) => {
        await register(newUser)
        await login({
            email: newUser.email,
            password: newUser.password
        })
    }

    const handleLogout = async () => {
        await logout()
        user.value = null
    }

    return{
        user,
        errors,
        isLoggedIn,
        fetchUser,
        handleLogin,
        handleRegister,
        handleLogout
    }
});