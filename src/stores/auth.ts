import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
  // const isLogged = ref(localStorage.getItem("logged") || false);
  const isLogged = ref(localStorage.getItem("logged") || false);
  const router = useRouter();
  const loginValidation = (payload) => {
    console.log("Test");
    console.log(payload.username);
    if (payload.username !== "testuser1") {
      return "Incorrect username";
    }
    if (payload.password !== "password") {
      return "Incorrect password";
    }
    isLogged.value = true;
    localStorage.setItem("logged", true);
    router.push({ name: "Home" });
  };
  const logout = () => {
    isLogged.value = false;
    localStorage.setItem("logged", false);
  };
  return { isLogged, loginValidation, logout };
});
