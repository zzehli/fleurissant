import { useEffect, useState } from "react";
const useFetch= <T,> (url: string, admin: boolean = false) => {
    const [data, setData] = useState<T>();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        setIsError(false);
        setIsLoading(true);
  
        try {
          const result = await fetch(url, {
            headers: {
              'Authorization': admin ? `Bearer ${localStorage.getItem('user')}` : ''
            }
          });
          console.log("result", result)
          if (!result.ok) {
            console.log("error")
            const errorMsg = await result.text()
            throw new Error(`Request error! status: ${result.status}, message: ${errorMsg}`)
          }
          const data = await result.json()
          console.log("data", data)

          setData(data)
        } catch (error) {
          setIsError(true);
          console.log(error)
        }
  
        setIsLoading(false);
      };
  
      fetchData();
    }, [url]);
  
    return { data, isLoading, isError };
  };

  export default useFetch;