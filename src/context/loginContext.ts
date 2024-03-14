import { setLocalStorage } from "../store/localStorage";

export function loginUser(user: string, password: string, history: any, setIsLoading: any, setError: any) {
  setError(false);
  setIsLoading(true);

  if (!!user && !!password && user === "tatva@gmail.com" && password === "tatva123@") {
    setTimeout(() => {
      setLocalStorage('authenticated', "true");
      setError(null)
      setIsLoading(false)

      history.push('/admin/employees')
    }, 2000);
  } else {
    setError(true);
    setIsLoading(false);
  }
}

export function logoutUser(){
    localStorage.removeItem('authenticated');
    window.location.href = "/login";
}