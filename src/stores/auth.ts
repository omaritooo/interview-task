import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const isLogged = ref(localStorage.getItem("logged") || false);

  const loginValidation = (payload) => {
    if (payload.username !== "testuser1") {
      return "Incorrect username";
    }
    if (payload.password !== "password") {
      return "Incorrect password";
    }
    isLogged.value = true;
    localStorage.setItem("logged", true);
    router.push("/");
  };
  const logout = () => {
    isLogged.value = false;
    localStorage.removeItem("logged");
    router.push("/login");
  };
  return { isLogged, loginValidation, logout };
});
